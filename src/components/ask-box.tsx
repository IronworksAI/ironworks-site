"use client";

import {
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  FileText,
  Phone,
  Receipt,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const TOPICS: { name: string; icon: LucideIcon; asks: string[] }[] = [
  {
    name: "Calls",
    icon: Phone,
    asks: [
      "Call back everyone I missed today",
      "Tell new callers I'm booked until Thursday",
      "Pick up emergency calls after 6 PM",
    ],
  },
  {
    name: "Quotes",
    icon: FileText,
    asks: [
      "Quote a 200 amp panel upgrade for the Okafors",
      "Resend Marcus his EV charger quote",
      "Ask for a 30% deposit on anything over $1,000",
    ],
  },
  {
    name: "Schedule",
    icon: CalendarDays,
    asks: ["Book Dana for Thursday at 9", "Move my 2 PM to tomorrow morning", "Text tomorrow's customers a reminder"],
  },
  {
    name: "Invoices",
    icon: Receipt,
    asks: ["Invoice Luis for the outlet repair", "Send Priya a bank pay link", "Remind anyone who's a week late"],
  },
  {
    name: "Money",
    icon: Wallet,
    asks: ["How much did I make this week?", "Pay me out right now", "Offer monthly payments on the water heater job"],
  },
  {
    name: "Taxes",
    icon: CreditCard,
    asks: [
      "Put this receipt on the Alder St job",
      "How much should I set aside this quarter?",
      "Send my Q3 numbers to my accountant",
    ],
  },
];

/* Types an ask, holds it, deletes it, moves to the next. Shows the first ask still under reduced motion. */
function useTypewriter(lines: string[]) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let line = 0;
    let len = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        len += 1;
        setShown(full.slice(0, len));
        if (len === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 40);
      } else {
        len -= 1;
        setShown(full.slice(0, len));
        if (len === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setTimeout(() => setShown(lines[0]), 0);
    } else {
      timer = setTimeout(tick, 250);
    }
    return () => clearTimeout(timer);
  }, [lines]);

  return shown;
}

export function AskBox() {
  const [topic, setTopic] = useState(0);
  const [first, setFirst] = useState(0);
  const asks = TOPICS[topic].asks;
  // Start the loop at whichever ask was clicked last.
  const order = useMemo(() => [...asks.slice(first), ...asks.slice(0, first)], [asks, first]);
  const shown = useTypewriter(order);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative">
        <p className="sr-only">Example: {order[0]}</p>
        <div
          aria-hidden
          className="visual select-none flex h-20 w-full items-center overflow-hidden whitespace-nowrap rounded-full bg-panel pl-8 pr-24 text-lg text-ink sm:text-xl"
        >
          {shown}
          <span className="caret ml-0.5 inline-block h-7 w-[2px] shrink-0 bg-ink" />
        </div>
        <a
          href="#join"
          aria-label="Join the waitlist"
          className="absolute right-3 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-on-ink transition-opacity duration-150 hover:opacity-85"
        >
          <ArrowUp className="size-5" aria-hidden />
        </a>
      </div>

      <div role="tablist" aria-label="What you can ask about" className="scroll-row mt-8 flex gap-2 overflow-x-auto sm:justify-center">
        {TOPICS.map((t, i) => (
          <button
            key={t.name}
            role="tab"
            aria-selected={topic === i}
            onClick={() => {
              setTopic(i);
              setFirst(0);
            }}
            className={`inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 text-base font-semibold transition-colors duration-150 ${
              topic === i ? "bg-panel text-ink" : "text-ink-2 hover:text-ink"
            }`}
          >
            <t.icon className="size-[18px]" aria-hidden />
            {t.name}
          </button>
        ))}
      </div>

      <ul role="tabpanel" className="mt-6 divide-y divide-line">
        {asks.map((a, i) => {
          const Icon = TOPICS[topic].icon;
          return (
            <li key={a}>
              <button
                type="button"
                onClick={() => setFirst(i)}
                className={`group flex w-full items-center gap-4 py-5 text-left text-lg transition-colors duration-150 hover:text-ink ${
                  order[0] === a ? "text-ink" : "text-ink-2"
                }`}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="flex-1">{a}</span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
