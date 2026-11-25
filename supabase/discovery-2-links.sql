-- SKAYL Discovery, update 2: lets the admin view and copy a link again later.
-- Run once in Supabase → SQL Editor. Safe to run again.
alter table public.discovery_links add column if not exists token_encrypted text;
