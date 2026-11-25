import { Eyebrow, Headline, InkPanel } from "@/components/discovery/ui";
import Wordmark from "@/components/discovery/Wordmark";
import SignInForm from "./SignInForm";

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <main className="grid min-h-[100svh] gap-4 p-3 sm:p-4 lg:grid-cols-2">
      <InkPanel className="flex min-h-[300px] flex-col justify-between px-7 pb-9 pt-8 sm:px-10 lg:min-h-0 lg:px-14 lg:pb-14 lg:pt-12">
        <Wordmark width={76} tone="dark" />
        <div className="mt-16">
          <Eyebrow tone="dark">SKAYL Studio</Eyebrow>
          <Headline className="mt-6 max-w-[10ch] text-[3rem] text-cream sm:text-[4rem] lg:text-[5.4rem]">Welcome back</Headline>
        </div>
      </InkPanel>
      <div className="flex items-center justify-center px-3 py-10 sm:px-8">
        <div className="w-full max-w-[420px]">
          <h2 className="display text-[2rem] leading-tight md:text-[2.4rem]">Sign in</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-muted">We’ll email you a one-time link. No password needed.</p>
          <SignInForm />
        </div>
      </div>
    </main>
  );
}
