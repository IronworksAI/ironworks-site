import { AskBox } from "@/components/ask-box";
import { HandlesIt } from "@/components/handles-it";
import { Hero } from "@/components/hero";
import { MoneyCards } from "@/components/money-cards";
import { JobBoard, Pricing, Rewards, TradesFloat } from "@/components/sections";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { WaitlistForm } from "@/components/waitlist-form";

const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6";
const h2 = "text-[length:var(--text-display-s)] font-bold leading-[1.05] tracking-[-0.03em]";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top" className="flex-1">
        <Hero />

        <section id="ask" className={`${wrap} scroll-mt-24 py-20 lg:py-28`}>
          <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
            <h2 className={h2}>Just tell it what you need</h2>
            <p className="mt-4 text-xl text-ink-2">Type it or say it, like you&apos;d text your office manager.</p>
          </div>
          <AskBox />
        </section>

        <section className={`${wrap} py-20 lg:py-28`}>
          <HandlesIt />
        </section>

        <section id="rewards" className={`${wrap} scroll-mt-24 py-20 lg:py-28`}>
          <Rewards />
        </section>

        <section id="pricing" className={`${wrap} scroll-mt-24 py-20 lg:py-28`}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className={h2}>It&apos;s free. Then it pays you.</h2>
            <p className="mt-5 text-2xl leading-snug">
              No monthly fee, ever. A small fee only when a customer pays you, and rewards that put money back in your
              pocket.
            </p>
          </div>
          <Pricing />
        </section>

        <section id="flow" className={`${wrap} scroll-mt-24 py-20 lg:py-28`}>
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className={h2}>Every job, start to paid</h2>
              <p className="mt-5 text-xl text-ink-2">
                Every call, text and email comes into one place. Ironworks takes each job from the first hello to money
                in your bank, and you can see where every job stands.
              </p>
            </div>
            <a
              href="#join"
              className="inline-flex h-14 shrink-0 items-center self-start whitespace-nowrap rounded-full bg-ink px-8 text-lg font-semibold text-on-ink transition-opacity duration-150 hover:opacity-85 lg:self-auto"
            >
              Join the waitlist
            </a>
          </div>
          <JobBoard />
        </section>

        <section id="money" className={`${wrap} scroll-mt-24 py-20 lg:py-28`}>
          <MoneyCards />
        </section>

        <TradesFloat />

        <section id="join" className={`${wrap} scroll-mt-24 pb-28 pt-12 text-center`}>
          <h2 className={h2}>Be first in your city</h2>
          <p className="mx-auto mb-10 mt-5 max-w-xl text-xl text-ink-2">
            We&apos;re opening one city at a time and setting up every early shop by hand, including moving your customer
            list over.
          </p>
          <WaitlistForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
