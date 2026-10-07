import type { ReactNode } from "react";
import { MONTH_TOTAL, SUPPLY_CREDIT_RATE, usd } from "@/lib/sample";
import { ShapeArt } from "./shape-art";

const h2 = "text-[length:var(--text-display-s)] font-bold leading-[1.05] tracking-[-0.03em]";

/* ---------- Job board: the workflow software itself ---------- */

type Job = { who: string; what: string; meta: string; amt?: number; flag?: { text: string; tone: "money" | "attn" | "plain" } };

const COLUMNS: { name: string; dot: string; jobs: Job[] }[] = [
  {
    name: "New request",
    dot: "bg-art-orchid",
    jobs: [
      { who: "Grace Kim", what: "Ceiling fan install", meta: "Marketplace · 8 min ago", flag: { text: "AI replied", tone: "plain" } },
      { who: "Hector Ruiz", what: "Outdoor outlet", meta: "Missed call · 9:15 AM", flag: { text: "AI replied", tone: "plain" } },
    ],
  },
  {
    name: "Quoted",
    dot: "bg-art-cobalt",
    jobs: [
      { who: "Marcus Lee", what: "EV charger install", meta: "Approved today", amt: 1240, flag: { text: "Deposit due", tone: "attn" } },
      { who: "Sun Bakery", what: "Lighting retrofit", meta: "Sent Monday", amt: 3390 },
    ],
  },
  {
    name: "Booked",
    dot: "bg-art-sun",
    jobs: [
      { who: "Dana Whitfield", what: "Breaker keeps tripping", meta: "Thu 9:00 AM", amt: 385 },
      { who: "Tom Okafor", what: "Panel upgrade, 200A", meta: "Fri 8:00 AM", amt: 3800, flag: { text: "Deposit paid", tone: "money" } },
    ],
  },
  {
    name: "Invoiced",
    dot: "bg-art-tomato",
    jobs: [{ who: "Priya Nair", what: "Light fixtures", meta: "Reminder sent", amt: 640, flag: { text: "6 days late", tone: "attn" } }],
  },
  {
    name: "Paid",
    dot: "bg-app-green",
    jobs: [
      { who: "Luis Ortega", what: "Outlet repair", meta: "By card · Today", amt: 385 },
      { who: "Ana Duarte", what: "Basement rewire", meta: "By bank · Mon", amt: 2650 },
      { who: "Tom Okafor", what: "Panel deposit", meta: "By card · Mon", amt: 1140 },
    ],
  },
];

const colTotal = (jobs: Job[]) => jobs.reduce((s, j) => s + (j.amt ?? 0), 0);
const initials = (n: string) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

const flagTone = { money: "bg-money-soft text-money", attn: "bg-attn-soft text-attn", plain: "bg-panel text-ink-2" };

const SIDEBAR = [
  ["Inbox", "3"],
  ["Jobs", ""],
  ["Calendar", ""],
  ["Customers", ""],
  ["Money", ""],
  ["Taxes", ""],
];

export function JobBoard() {
  const paid = colTotal(COLUMNS[4].jobs);
  const owed = colTotal(COLUMNS[3].jobs);
  const quoted = colTotal(COLUMNS[1].jobs);
  return (
    <div className="visual select-none rounded-[32px] bg-panel p-3 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 px-2 pb-4 text-sm text-ink-2">
        <span className="font-medium text-ink">Comes in from</span>
        {["Calls", "Texts", "Email", "Your website", "Ironworks marketplace"].map((c) => (
          <span key={c} className="rounded-full bg-paper px-3 py-1">
            {c}
          </span>
        ))}
      </div>
      <div className="flex overflow-hidden rounded-2xl border border-line bg-paper">
        <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-panel/40 p-4 lg:flex">
          <p className="mb-5 flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-xs font-bold text-on-ink">RE</span>
            Reyes Electric
          </p>
          <ul className="space-y-1 text-[15px]">
            {SIDEBAR.map(([name, count]) => (
              <li
                key={name}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${name === "Jobs" ? "bg-paper font-semibold shadow-sm" : "text-ink-2"}`}
              >
                {name}
                {count && <span className="rounded-full bg-ink px-1.5 text-xs font-bold text-on-ink">{count}</span>}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-5 py-4">
            <div>
              <p className="text-xl font-bold">Jobs</p>
              <p className="text-sm text-ink-3">This week</p>
            </div>
            <dl className="flex gap-6 text-sm">
              <div>
                <dt className="text-ink-3">Quoted</dt>
                <dd className="font-bold tabular-nums">{usd(quoted)}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Owed to you</dt>
                <dd className="font-bold tabular-nums text-attn">{usd(owed)}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Paid</dt>
                <dd className="font-bold tabular-nums text-money">{usd(paid)}</dd>
              </div>
            </dl>
          </div>

          <div className="scroll-row flex gap-3 overflow-x-auto p-4">
            {COLUMNS.map((c) => (
              <section key={c.name} aria-label={c.name} className="w-56 shrink-0 rounded-xl bg-panel p-2.5 xl:w-auto xl:min-w-0 xl:flex-1">
                <div className="mb-2 flex items-center justify-between px-1.5">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <span className={`size-2.5 rounded-full ${c.dot}`} />
                    {c.name}
                    <span className="font-normal text-ink-3">{c.jobs.length}</span>
                  </p>
                  {colTotal(c.jobs) > 0 && <span className="text-xs tabular-nums text-ink-3">{usd(colTotal(c.jobs))}</span>}
                </div>
                <ul className="space-y-2">
                  {c.jobs.map((j) => (
                    <li key={j.who + j.what} className="rounded-lg border border-line bg-paper p-3 shadow-[0_1px_2px_oklch(0%_0_0/0.05)]">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight">{j.what}</p>
                        {j.amt !== undefined && <p className="text-sm font-semibold tabular-nums">{usd(j.amt)}</p>}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-panel text-[10px] font-bold">
                          {initials(j.who)}
                        </span>
                        <p className="truncate text-xs text-ink-3">
                          {j.who} · {j.meta}
                        </p>
                      </div>
                      {j.flag && (
                        <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${flagTone[j.flag.tone]}`}>
                          {j.flag.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Rewards: earn extra money ---------- */

const REFERRAL = 200;
const SUPPLY_CREDIT = MONTH_TOTAL * SUPPLY_CREDIT_RATE;

const EARN = [
  { big: "0.25%", label: "back as credit at your supply house, on every dollar you collect" },
  { big: usd(REFERRAL), label: "for you and every shop you bring on, once they get going" },
  { big: "Free", label: "instant payouts and lower rates as you grow" },
];

export function Rewards() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <h2 className={h2}>On top of free, you earn extra money.</h2>
        <p className="mt-5 max-w-xl text-xl text-ink-2">
          Rewards are real money, not points. The more you run through Ironworks, the more comes back to you.
        </p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {EARN.map((e) => (
            <li key={e.big} className="flex items-baseline gap-6 py-5">
              <span className="w-28 shrink-0 text-4xl font-bold tracking-tight tabular-nums">{e.big}</span>
              <span className="text-lg text-ink-2">{e.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="visual select-none relative overflow-hidden rounded-[32px]">
        <div className="absolute inset-0">
          <ShapeArt
            seed={11}
            cols={8}
            rows={9}
            bg="var(--color-art-forest)"
            colors={["var(--color-app-green)", "var(--color-art-mint)", "var(--color-art-sun)"]}
            density={0.55}
          />
        </div>
        <div className="relative flex min-h-[460px] items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-sm rounded-[28px] bg-paper p-6 shadow-[0_24px_50px_-24px_oklch(0%_0_0/0.55)]">
            <p className="text-sm text-ink-3">Rewards earned in October</p>
            <p className="mt-1 text-5xl font-bold tracking-tight tabular-nums text-money">{usd(SUPPLY_CREDIT + REFERRAL, true)}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line text-[15px]">
              <li className="flex justify-between gap-3 py-3">
                <span className="text-ink-2">Supply house credit</span>
                <span className="font-semibold tabular-nums">{usd(SUPPLY_CREDIT, true)}</span>
              </li>
              <li className="flex justify-between gap-3 py-3">
                <span className="text-ink-2">Referral: Northgate Plumbing</span>
                <span className="font-semibold tabular-nums">{usd(REFERRAL, true)}</span>
              </li>
              <li className="flex justify-between gap-3 py-3">
                <span className="text-ink-2">What you paid for the software</span>
                <span className="font-semibold tabular-nums">{usd(0, true)}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-ink-3">Example shop collecting {usd(MONTH_TOTAL)} a month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Trades, as hardware-store tags ---------- */

const TRADES: { name: string; does: string; art: { seed: number; bg: string; c: string[] }; pos: string; rot: string }[] = [
  { name: "Electricians", does: "panels, outlets, EV chargers", art: { seed: 101, bg: "var(--color-art-sun)", c: ["var(--color-art-rust)"] }, pos: "left-[22%] top-[3%]", rot: "-rotate-6" },
  { name: "Plumbers", does: "leaks, heaters, repipes", art: { seed: 102, bg: "var(--color-art-ice)", c: ["var(--color-art-cobalt)"] }, pos: "right-[22%] top-[7%]", rot: "rotate-12" },
  { name: "HVAC techs", does: "tune-ups, installs, no-heat calls", art: { seed: 103, bg: "var(--color-art-blush)", c: ["var(--color-art-orchid)"] }, pos: "left-[4%] top-[34%]", rot: "-rotate-[22deg]" },
  { name: "Roofers", does: "repairs, reroofs, gutters", art: { seed: 104, bg: "var(--color-art-mint)", c: ["var(--color-art-forest)"] }, pos: "right-[4%] top-[38%]", rot: "rotate-[26deg]" },
  { name: "Carpenters", does: "decks, trim, framing", art: { seed: 105, bg: "var(--color-art-sun)", c: ["var(--color-art-forest)"] }, pos: "left-[10%] bottom-[10%]", rot: "rotate-[24deg]" },
  { name: "Handymen", does: "a little of everything", art: { seed: 106, bg: "var(--color-art-blush)", c: ["var(--color-art-tomato)"] }, pos: "right-[10%] bottom-[12%]", rot: "-rotate-[20deg]" },
  { name: "Painters", does: "interiors, exteriors, cabinets", art: { seed: 107, bg: "var(--color-art-ice)", c: ["var(--color-art-orchid)"] }, pos: "left-[32%] bottom-[6%]", rot: "rotate-6" },
  { name: "Landscapers", does: "lawns, beds, cleanups", art: { seed: 108, bg: "var(--color-art-mint)", c: ["var(--color-art-rust)"] }, pos: "right-[32%] bottom-[8%]", rot: "-rotate-6" },
];

function TradeTag({ t, className }: { t: (typeof TRADES)[number]; className: string }) {
  return (
    <div className={`visual select-none flex w-52 flex-col gap-4 rounded-3xl border border-line bg-paper p-3 shadow-[0_12px_28px_-16px_oklch(0%_0_0/0.35)] ${className}`}>
      <div className="h-20 overflow-hidden rounded-2xl">
        <ShapeArt seed={t.art.seed} cols={4} rows={2} bg={t.art.bg} colors={t.art.c} density={0.7} />
      </div>
      <div className="px-2 pb-2">
        <p className="text-lg font-bold">{t.name}</p>
        <p className="text-sm text-ink-3">{t.does}</p>
      </div>
    </div>
  );
}

export function TradesFloat() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:h-[900px] lg:py-0">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {TRADES.map((t) => (
          <TradeTag key={t.name} t={t} className={`absolute ${t.pos} ${t.rot}`} />
        ))}
      </div>
      <div className="relative flex h-full flex-col items-center justify-center text-center lg:pb-24">
        <h2 className={`${h2} max-w-2xl`}>Built for every trade</h2>
        <p className="mt-5 max-w-xl text-xl text-ink-2">
          Set it up the way your shop already works. Your services, your prices, your hours.
        </p>
        <a
          href="#join"
          className="mt-8 inline-flex h-14 items-center whitespace-nowrap rounded-full bg-ink px-8 text-lg font-semibold text-on-ink transition-opacity duration-150 hover:opacity-85"
        >
          Join the waitlist
        </a>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:hidden">
        {TRADES.map((t, i) => (
          <li key={t.name}>
            <TradeTag t={t} className={`w-full ${i % 2 ? "rotate-2" : "-rotate-2"}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Pricing ---------- */

const PLANS: {
  name: string;
  price: string;
  blurb: string;
  includes: string[];
  primary: boolean;
  art: ReactNode;
}[] = [
  {
    name: "Run your shop",
    price: "Free",
    blurb: "Everything you need, free forever. No contract, no card.",
    includes: [
      "AI that answers your calls and texts",
      "Quotes, scheduling and invoices",
      "Your own booking page",
      "Receipts, mileage and tax estimates",
    ],
    primary: true,
    art: (
      <ShapeArt
        seed={3}
        cols={10}
        rows={5}
        bg="var(--color-art-mint)"
        colors={["var(--color-art-rust)", "var(--color-art-rust)", "var(--color-art-sun)"]}
        kinds={[0, 1, 2]}
        density={0.62}
      />
    ),
  },
  {
    name: "Get paid",
    price: "Only when you're paid",
    blurb: "A small fee on card and bank payments. Cash and checks are free.",
    includes: [
      "Customers pay from a text",
      "Deposits taken when a quote is approved",
      "In your bank in about 2 business days",
      "Monthly payments for customers on big jobs",
    ],
    primary: false,
    art: (
      <ShapeArt
        seed={29}
        cols={10}
        rows={5}
        bg="var(--color-art-ice)"
        colors={["var(--color-art-orchid)", "var(--color-art-cobalt)"]}
        kinds={[3, 4, 5]}
        density={0.6}
      />
    ),
  },
  {
    name: "Rewards",
    price: "Earn extra money",
    blurb: "On top of free. The more you run through Ironworks, the more comes back to you.",
    includes: [
      "Credit at your supply house on every dollar",
      `${usd(REFERRAL)} for every shop you bring on`,
      "Free instant payouts as you grow",
      "Lower rates at higher tiers",
    ],
    primary: false,
    art: (
      <ShapeArt
        seed={57}
        cols={20}
        rows={10}
        bg="var(--color-art-blush)"
        colors={["var(--color-art-forest)", "var(--color-art-tomato)"]}
        kinds={[2, 4, 0]}
        density={0.75}
      />
    ),
  },
];

export function Pricing() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {PLANS.map((p) => (
        <li key={p.name} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper">
          <div className="visual select-none h-44 sm:h-48">{p.art}</div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-xl">{p.name}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight">{p.price}</p>
            <p className="mt-2 text-lg text-ink-2">{p.blurb}</p>
            <ul className="mt-6 list-disc space-y-1.5 pl-6 text-lg text-ink-2">
              {p.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a
                href="#join"
                className={`inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full text-base font-semibold transition-colors duration-150 ${
                  p.primary ? "bg-ink text-on-ink hover:opacity-85" : "border border-line hover:bg-panel"
                }`}
              >
                Join the waitlist
              </a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
