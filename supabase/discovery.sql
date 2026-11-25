-- ─────────────────────────────────────────────────────────────────────────────
-- SKAYL Discovery forms: database setup
-- Run once in Supabase → SQL Editor → New query → paste all of this → Run.
-- Safe to run again: everything uses "if not exists" / "or replace".
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Links: one per client. The raw token is never stored, only its SHA-256 hash.
create table if not exists public.discovery_links (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  ref text not null unique,                       -- e.g. SKL-D-2026-001
  client_name text not null,
  organisation text,
  client_email text,
  greeting text,
  intro_message text,
  sections text[] not null,                       -- e.g. {website,design,app}
  overrides jsonb not null default '{}'::jsonb,   -- per-link intros, labels and option lists
  status text not null default 'not_opened'
    check (status in ('not_opened', 'opened', 'in_progress', 'submitted', 'revoked')),
  expires_at timestamptz not null,                -- "expired" is worked out from this, never stored
  opened_at timestamptz,
  last_activity_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists discovery_links_created_at_idx on public.discovery_links (created_at desc);

-- 2. Answers: one row per link, autosaved as the client goes.
create table if not exists public.discovery_responses (
  link_id uuid primary key references public.discovery_links (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  respondent_email text,
  pdf_path text,                                  -- path in the private "discovery-pdfs" bucket
  client_email_sent_at timestamptz,
  admin_email_sent_at timestamptz,
  email_error text,
  updated_at timestamptz not null default now()
);

-- 3. Reference numbers: SKL-D-<year>-001, 002 … counted per year, never repeated.
create table if not exists public.discovery_ref_counters (
  year int primary key,
  last_value int not null default 0
);

create or replace function public.next_discovery_ref()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  y int := extract(year from (now() at time zone 'Europe/London'))::int;
  n int;
begin
  insert into discovery_ref_counters (year, last_value)
  values (y, 1)
  on conflict (year) do update set last_value = discovery_ref_counters.last_value + 1
  returning last_value into n;
  return 'SKL-D-' || y || '-' || lpad(n::text, 3, '0');
end;
$$;

-- 4. Rate limiting: counts requests per (hashed) visitor per time window.
create table if not exists public.discovery_rate_limits (
  key text not null,
  window_start timestamptz not null,
  hits int not null default 0,
  primary key (key, window_start)
);

create or replace function public.discovery_rate_limit_hit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  w timestamptz := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  h int;
begin
  insert into discovery_rate_limits (key, window_start, hits)
  values (p_key, w, 1)
  on conflict (key, window_start) do update set hits = discovery_rate_limits.hits + 1
  returning hits into h;

  -- tidy up old windows now and then
  if random() < 0.02 then
    delete from discovery_rate_limits where window_start < now() - interval '1 day';
  end if;

  return h <= p_limit;
end;
$$;

-- 5. Lock everything down. No public policies: only the website's server code
--    (using the service role key) can read or write these tables.
alter table public.discovery_links enable row level security;
alter table public.discovery_responses enable row level security;
alter table public.discovery_ref_counters enable row level security;
alter table public.discovery_rate_limits enable row level security;

revoke all on public.discovery_links, public.discovery_responses, public.discovery_ref_counters, public.discovery_rate_limits
  from anon, authenticated;

-- The website's server uses the service role. Grant it explicitly, because
-- newer Supabase projects don't always expose new tables automatically.
grant usage on schema public to service_role;
grant all on public.discovery_links, public.discovery_responses, public.discovery_ref_counters, public.discovery_rate_limits
  to service_role;

revoke execute on function public.next_discovery_ref() from public, anon, authenticated;
revoke execute on function public.discovery_rate_limit_hit(text, int, int) from public, anon, authenticated;
grant execute on function public.next_discovery_ref() to service_role;
grant execute on function public.discovery_rate_limit_hit(text, int, int) to service_role;

-- 6. Private storage bucket for the submission PDFs (not public; links are signed and short-lived).
insert into storage.buckets (id, name, public)
values ('discovery-pdfs', 'discovery-pdfs', false)
on conflict (id) do nothing;
