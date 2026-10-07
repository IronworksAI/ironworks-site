"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MONTH_TOTAL, OUTLET_INVOICE, OUTLET_TOTAL, Q3_SET_ASIDE, WEEKS, usd } from "@/lib/sample";
import { ShapeArt } from "./shape-art";

const DEPOSIT_RATE = 0.3;
const PANEL_QUOTE = 3800;

const card = "w-full max-w-[18rem] rounded-2xl bg-paper p-5 shadow-[0_18px_36px_-18px_oklch(0%_0_0/0.45)]";

const CARDS: { title: string; body: string; art: ReactNode; visual: ReactNode }[] = [
  {
    title: "Get paid by text",
    body: "Send the invoice from the driveway. Your customer pays from their phone and the money lands in your bank.",
    art: (
      <ShapeArt seed={5} cols={9} rows={8} bg="var(--color-art-forest)" colors={["var(--color-app-green)", "var(--color-art-mint)"]} kinds={[0, 1, 5]} density={0.5} />
    ),
    visual: (
      <div className={card}>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Outlet repair</p>
          <span className="rounded-full bg-money-soft px-2.5 py-0.5 text-xs font-bold text-money">Paid</span>
        </div>
        <ul className="mt-3 space-y-1.5 border-y border-line py-3 text-sm text-ink-2">
          {OUTLET_INVOICE.map((l) => (
            <li key={l.item} className="flex justify-between">
              <span>{l.item}</span>
              <span className="tabular-nums">{usd(l.amt, true)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between font-bold">
          <span>Total</span>
          <span className="tabular-nums">{usd(OUTLET_TOTAL, true)}</span>
        </p>
      </div>
    ),
  },
  {
    title: "See what you made",
    body: "Every job and every dollar in one place, week by week. No spreadsheet, no shoebox of receipts.",
    art: (
      <ShapeArt seed={19} cols={9} rows={8} bg="var(--color-art-sun)" colors={["var(--color-art-rust)", "var(--color-paper)"]} kinds={[2, 3, 1]} density={0.5} />
    ),
    visual: (
      <div className={card}>
        <p className="text-sm text-ink-3">October</p>
        <p className="text-4xl font-bold tracking-tight tabular-nums">{usd(MONTH_TOTAL)}</p>
        <div className="mt-5 flex h-20 items-end gap-2.5">
          {WEEKS.map((w, i) => (
            <div
              key={i}
              className={`flex-1 rounded-md ${i === WEEKS.length - 1 ? "bg-ink" : "bg-panel-2"}`}
              style={{ height: `${(w / Math.max(...WEEKS)) * 100}%` }}
            />
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-money">Best week yet: {usd(Math.max(...WEEKS))}</p>
      </div>
    ),
  },
  {
    title: "Deposits up front",
    body: "Big job? Ask for a deposit the moment the quote is approved, so materials are covered before you start.",
    art: (
      <ShapeArt seed={41} cols={9} rows={8} bg="var(--color-art-ice)" colors={["var(--color-art-cobalt)", "var(--color-art-orchid)"]} kinds={[4, 5, 3]} density={0.5} />
    ),
    visual: (
      <div className={card}>
        <p className="font-semibold">Panel upgrade, 200A</p>
        <p className="text-sm text-ink-3">Tom Okafor · Quote approved</p>
        <div className="mt-4 h-2.5 rounded-full bg-panel">
          <div className="h-full rounded-full bg-money" style={{ width: `${DEPOSIT_RATE * 100}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="font-semibold text-money">Deposit paid {usd(PANEL_QUOTE * DEPOSIT_RATE)}</span>
          <span className="text-ink-3">of {usd(PANEL_QUOTE)}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Taxes, already sorted",
    body: "Snap a receipt and it's filed on the right job. Ironworks tells you what to set aside each quarter.",
    art: (
      <ShapeArt seed={73} cols={9} rows={8} bg="var(--color-art-blush)" colors={["var(--color-art-tomato)", "var(--color-art-forest)"]} kinds={[0, 2, 4]} density={0.5} />
    ),
    visual: (
      <div className={card}>
        <p className="text-sm text-ink-3">Set aside for Q3</p>
        <p className="text-4xl font-bold tracking-tight tabular-nums">{usd(Q3_SET_ASIDE)}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-ink-2">
          <li className="flex justify-between">
            <span>Receipts filed</span>
            <span className="font-semibold text-ink">38</span>
          </li>
          <li className="flex justify-between">
            <span>Miles logged</span>
            <span className="font-semibold text-ink">2,140</span>
          </li>
        </ul>
      </div>
    ),
  },
];

export function MoneyCards() {
  const row = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [track, setTrack] = useState({ left: 0, width: 100 });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => {
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
      setTrack({ left: (el.scrollLeft / el.scrollWidth) * 100, width: (el.clientWidth / el.scrollWidth) * 100 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 20), behavior: "smooth" });
  };

  const btn =
    "flex size-14 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors duration-150 hover:bg-panel disabled:opacity-35 disabled:hover:bg-paper";

  return (
    <>
      <div className="mb-12 flex items-end justify-between gap-6">
        <h2 className="max-w-3xl text-[length:var(--text-display-s)] font-bold leading-[1.05] tracking-[-0.03em]">
          Your money, all in one place
        </h2>
        <div className="flex shrink-0 gap-3">
          <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => scroll(-1)} className={btn}>
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button type="button" aria-label="Next" disabled={edge.end} onClick={() => scroll(1)} className={btn}>
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <ul
        ref={row}
        className="scroll-row -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mr-6 sm:ml-0 sm:pl-0"
      >
        {CARDS.map((c, i) => (
          <li
            key={c.title}
            className="flex w-[80vw] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-paper sm:w-[380px]"
          >
            <div className="visual select-none relative h-80">
              <div className="absolute inset-0">{c.art}</div>
              <div className="relative flex h-full items-center justify-center p-8">{c.visual}</div>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold">{c.title}</h3>
                <span className="text-sm text-ink-3 tabular-nums">
                  {i + 1} / {CARDS.length}
                </span>
              </div>
              <p className="mt-3 text-lg leading-relaxed text-ink-2">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-6 h-1 rounded-full bg-panel-2">
        <div
          className="h-full rounded-full bg-ink transition-[margin] duration-150"
          style={{ width: `${track.width}%`, marginLeft: `${track.left}%` }}
        />
      </div>
    </>
  );
}
