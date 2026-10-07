"use client";

import { useState } from "react";
import { EV_QUOTE, OUTLET_TOTAL, usd } from "@/lib/sample";
import { IronworksAppIcon } from "./app-icon";
import { ShapeArt } from "./shape-art";

type Note = { when: string; title: string; body: string };

const TRADES: { name: string; notes: Note[] }[] = [
  {
    name: "Electrician",
    notes: [
      { when: "now", title: "Dana Whitfield is booked", body: "Answered her missed call. Breaker repair, Thu 9:00 AM." },
      { when: "4m ago", title: `Luis Ortega paid ${usd(OUTLET_TOTAL, true)}`, body: "Outlet repair, paid by text. Arriving Thursday." },
      { when: "18m ago", title: `Quote approved · ${usd(EV_QUOTE)}`, body: "Marcus Lee, EV charger install. Deposit requested." },
    ],
  },
  {
    name: "Plumber",
    notes: [
      { when: "now", title: "Grace Kim is booked", body: "Answered her missed call. Water heater leak, Thu 9:00 AM." },
      { when: "6m ago", title: `Hector Ruiz paid ${usd(460, true)}`, body: "Drain clearing, paid by text. Arriving Thursday." },
      { when: "22m ago", title: `Quote approved · ${usd(2850)}`, body: "Sun Bakery, kitchen repipe. Deposit requested." },
    ],
  },
  {
    name: "HVAC",
    notes: [
      { when: "now", title: "Ana Duarte is booked", body: "No-heat call answered at 6:12 AM. Furnace repair, 10:00 AM." },
      { when: "9m ago", title: `Tom Okafor paid ${usd(189, true)}`, body: "Fall tune-up, paid by text. Arriving Thursday." },
      { when: "31m ago", title: `Quote approved · ${usd(7400)}`, body: "Marcus Lee, heat pump install. Monthly payments set up." },
    ],
  },
  {
    name: "Handyman",
    notes: [
      { when: "now", title: "Jen Park is booked", body: "Answered her text. Fence repair and gutters, Sat 9:00 AM." },
      { when: "5m ago", title: `Luis Ortega paid ${usd(240, true)}`, body: "Door and trim repair, paid by text. Arriving Thursday." },
      { when: "26m ago", title: `Quote approved · ${usd(680)}`, body: "Priya Nair, deck boards. Deposit requested." },
    ],
  },
];

/* iPhone-style lock screen with a trade switcher: each trade sees its own kind of jobs. */
export function LockScreen() {
  const [trade, setTrade] = useState(0);

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div role="tablist" aria-label="See it for your trade" className="mb-4 grid grid-cols-4 rounded-full border border-line bg-paper p-1">
        {TRADES.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={trade === i}
            onClick={() => setTrade(i)}
            className={`h-10 whitespace-nowrap rounded-full px-2 text-sm font-semibold transition-colors duration-150 sm:text-[15px] ${
              trade === i ? "bg-ink text-on-ink" : "text-ink-2 hover:text-ink"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        aria-label={`What Ironworks did for a ${TRADES[trade].name.toLowerCase()} this morning`}
        className="visual relative select-none overflow-hidden rounded-[40px] font-[family-name:var(--font-ios)]"
      >
        <div className="absolute inset-0 bg-art-cobalt" />
        <div className="absolute inset-x-0 bottom-0 top-[50%]">
          <ShapeArt
            seed={88}
            cols={9}
            rows={6}
            bg="var(--color-art-cobalt)"
            colors={["var(--color-art-sun)", "var(--color-art-ice)"]}
            kinds={[0, 1, 5]}
            density={0.45}
          />
        </div>
        <div className="relative px-5 pb-8 pt-10 sm:px-8">
          <p className="text-center text-[17px] font-semibold text-on-ink">Friday, October 16</p>
          <p className="text-center text-[88px] font-semibold leading-none tracking-tight text-on-ink sm:text-[104px]">9:41</p>
          <ul key={trade} className="mt-10 space-y-2.5">
            {TRADES[trade].notes.map((n) => (
              <li key={n.title} className="flex gap-3 rounded-[22px] bg-paper p-3.5 shadow-[0_8px_24px_-14px_oklch(0%_0_0/0.5)]">
                <IronworksAppIcon className="size-10 rounded-[10px]" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[15px] font-semibold">{n.title}</p>
                    <span className="shrink-0 text-[13px] text-ios-gray">{n.when}</span>
                  </div>
                  <p className="line-clamp-2 min-h-[2lh] text-[15px] leading-snug">{n.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
