import { ArrowRight } from "lucide-react";
import { LockScreen } from "./lock-screen";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-12 sm:px-6 lg:pb-28 lg:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <h1 className="max-w-[12ch] text-[length:var(--text-display)] font-bold leading-[1.02] tracking-[-0.035em]">
            You do the work. Ironworks does the rest.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-2 sm:text-xl">
            The missed calls, the quotes, the invoices you haven&apos;t sent. Ironworks handles all of it for
            electricians, plumbers and every trade. Free to use.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#join"
              className="inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-8 text-lg font-semibold text-on-ink transition-opacity duration-150 hover:opacity-85"
            >
              Join the waitlist
            </a>
            <a
              href="#ask"
              className="inline-flex h-14 items-center gap-1.5 whitespace-nowrap rounded-full px-5 text-lg font-semibold text-ink transition-colors duration-150 hover:bg-panel"
            >
              See how it works <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <LockScreen />
      </div>
    </section>
  );
}
