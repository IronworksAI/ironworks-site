"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Clock,
  Grip,
  Info,
  PhoneIncoming,
  PhoneMissed,
  Plus,
  SquarePen,
  Star,
  Voicemail,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { EV_QUOTE, OUTLET_TOTAL, usd } from "@/lib/sample";
import { IronworksAppIcon } from "./app-icon";
import { ShapeArt } from "./shape-art";

/* iPhone-style app screens, drawn here in the system iOS font. */

const APPS = ["Phone", "Messages", "Calendar", "Mail", "Wallet"] as const;
type App = (typeof APPS)[number];

/* Apple's own icon artwork, from the App Store listings (itunes.apple.com lookup API), saved in public/apps. */
const ICON_FILE: Record<App, string> = {
  Phone: "/apps/phone.png",
  Messages: "/apps/messages.png",
  Calendar: "/apps/calendar.png",
  Mail: "/apps/mail.png",
  Wallet: "/apps/wallet.png",
};

function AppIcon({ app }: { app: App }) {
  return (
    <Image
      src={ICON_FILE[app]}
      alt=""
      width={72}
      height={72}
      draggable={false}
      className="size-16 rounded-[22.5%] shadow-[0_6px_14px_-8px_oklch(0%_0_0/0.5)] sm:size-[72px]"
    />
  );
}

/* ---------- Screens ----------
   Every screen shares one layout: 24px side padding, content on top, an iOS bar pinned to the bottom. */

const X = "px-6";

function Screen({ children, bar }: { children: ReactNode; bar: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className="shrink-0 border-t border-ios-sep bg-ios-fill/80">{bar}</div>
    </div>
  );
}

function LargeTitle({ children }: { children: ReactNode }) {
  return <p className={`${X} pb-2 pt-6 text-[32px] font-bold leading-none tracking-tight`}>{children}</p>;
}

function TabBar({ items, active, tint }: { items: [string, LucideIcon][]; active: string; tint: string }) {
  return (
    <div className={`grid ${X} pb-5 pt-2`} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map(([label, Icon]) => (
        <span key={label} className={`flex flex-col items-center gap-0.5 text-[10px] font-medium ${label === active ? tint : "text-ios-gray"}`}>
          <Icon className="size-6" strokeWidth={label === active ? 2.2 : 1.6} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}

function Recents() {
  const rows = [
    { name: "Dana Whitfield", sub: "Missed · mobile", time: "7:42 AM", missed: true, icon: PhoneMissed },
    { name: "Hector Ruiz", sub: "Answered by Ironworks", time: "9:15 AM", missed: false, icon: PhoneIncoming },
    { name: "Grace Kim", sub: "Answered by Ironworks", time: "9:58 AM", missed: false, icon: PhoneIncoming },
    { name: "Spam Risk", sub: "Blocked by Ironworks", time: "10:02 AM", missed: false, icon: PhoneIncoming },
  ];
  return (
    <Screen
      bar={
        <TabBar
          tint="text-app-blue"
          active="Recents"
          items={[
            ["Favorites", Star],
            ["Recents", Clock],
            ["Contacts", CircleUser],
            ["Keypad", Grip],
            ["Voicemail", Voicemail],
          ]}
        />
      }
    >
      <LargeTitle>Recents</LargeTitle>
      <div className={`${X} py-2`}>
        <div className="grid grid-cols-2 rounded-[9px] bg-ios-fill p-0.5 text-center text-[13px] font-semibold">
          <span className="rounded-[7px] bg-paper py-1 shadow-sm">All</span>
          <span className="py-1">Missed</span>
        </div>
      </div>
      <ul className={X}>
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 border-b border-ios-sep py-2.5">
            <r.icon className={`size-4 shrink-0 ${r.missed ? "text-app-red" : "text-ios-gray"}`} aria-hidden />
            <div className="min-w-0 flex-1">
              <p className={`text-[17px] font-semibold leading-tight ${r.missed ? "text-app-red" : ""}`}>{r.name}</p>
              <p className="text-[14px] text-ios-gray">{r.sub}</p>
            </div>
            <span className="text-[14px] text-ios-gray">{r.time}</span>
            <Info className="size-5 text-app-blue" aria-hidden />
          </li>
        ))}
      </ul>
      <div className={`${X} pt-4`}>
        <div className="flex gap-3 rounded-[18px] bg-ios-fill p-3">
          <IronworksAppIcon className="size-8 rounded-[8px]" />
          <p className="text-[14px] leading-snug">
            <span className="font-semibold">Called Dana back.</span> Breaker repair booked for Thu 9:00 AM.
          </p>
        </div>
      </div>
    </Screen>
  );
}

function Thread() {
  return (
    <Screen
      bar={
        <div className={`flex items-center gap-2 ${X} pb-5 pt-2.5`}>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ios-sep text-ios-gray">
            <Plus className="size-5" aria-hidden />
          </span>
          <span className="flex h-9 flex-1 items-center rounded-full border border-ios-sep bg-paper px-3.5 text-[16px] text-ios-gray">
            iMessage
          </span>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-1 border-b border-ios-sep pb-2 pt-5">
        <span className="flex size-12 items-center justify-center rounded-full bg-ios-gray text-lg font-semibold text-on-ink">LO</span>
        <p className="flex items-center text-[12px]">
          Luis Ortega <ChevronRight className="size-3 text-ios-gray" aria-hidden />
        </p>
      </div>
      <div className={`space-y-1.5 ${X} pt-3 text-[16px] leading-snug`}>
        <p className="text-center text-[11px] text-ios-gray">
          <span className="font-semibold">Today</span> 11:48 AM
        </p>
        <p className="w-fit max-w-[78%] rounded-[18px] bg-bubble-in px-3.5 py-2">All done? What do I owe you?</p>
        <p className="ml-auto w-fit max-w-[78%] rounded-[18px] bg-bubble px-3.5 py-2 text-on-ink">
          Thanks Luis! Here&apos;s your invoice for the outlet repair.
        </p>
        <div className="ml-auto w-56 overflow-hidden rounded-[18px] bg-bubble-in">
          <div className="h-14">
            <ShapeArt seed={5} cols={6} rows={2} bg="var(--color-art-forest)" colors={["var(--color-app-green)", "var(--color-art-mint)"]} kinds={[0, 1, 5]} density={0.6} />
          </div>
          <div className="px-3.5 py-2">
            <p className="text-[15px] font-semibold">Invoice · {usd(OUTLET_TOTAL, true)}</p>
            <p className="text-[13px] text-ios-gray">ironworks.pay</p>
          </div>
        </div>
        <p className="text-right text-[11px] font-semibold text-ios-gray">Delivered</p>
        <p className="w-fit max-w-[78%] rounded-[18px] bg-bubble-in px-3.5 py-2">Just paid, thanks!</p>
        <p className="pt-1 text-center text-[11px] text-ios-gray">Luis paid {usd(OUTLET_TOTAL, true)} by card · 11:52 AM</p>
      </div>
    </Screen>
  );
}

function DayView() {
  const week = [
    ["S", 11],
    ["M", 12],
    ["T", 13],
    ["W", 14],
    ["T", 15],
    ["F", 16],
    ["S", 17],
  ] as const;
  const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "Noon", "1 PM", "2 PM"];
  const HOUR = 38;
  const events = [
    { start: 0, len: 1.5, title: "Panel upgrade, 200A", where: "Tom Okafor · 41 Alder St", bar: "bg-art-cobalt", fill: "bg-art-ice", added: false },
    { start: 2, len: 1, title: "Outdoor outlet", where: "Hector Ruiz · Added by Ironworks", bar: "bg-app-green", fill: "bg-art-mint", added: true },
    { start: 4, len: 1, title: "Ceiling fan install", where: "Grace Kim · 220 Hayes St", bar: "bg-art-orchid", fill: "bg-art-blush", added: false },
    { start: 5.5, len: 1, title: "Smoke detectors", where: "Ana Duarte · Added by Ironworks", bar: "bg-app-green", fill: "bg-art-mint", added: true },
  ];
  return (
    <Screen
      bar={
        <div className={`flex justify-between ${X} pb-5 pt-3 text-[17px] text-app-red`}>
          <span>Today</span>
          <span>Calendars</span>
          <span>Inbox</span>
        </div>
      }
    >
      <p className={`flex items-center ${X} pt-5 text-[17px] text-app-red`}>
        <ChevronLeft className="-ml-1.5 size-5" aria-hidden /> October
      </p>
      <div className={`mt-3 grid grid-cols-7 ${X} text-center`}>
        {week.map(([d, n]) => (
          <div key={n} className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-medium text-ios-gray">{d}</span>
            <span
              className={`flex size-9 items-center justify-center rounded-full text-[17px] ${n === 16 ? "bg-app-red font-semibold text-on-ink" : ""}`}
            >
              {n}
            </span>
          </div>
        ))}
      </div>
      <p className={`mt-3 border-b border-ios-sep ${X} pb-3 text-center text-[13px] font-semibold`}>Friday, October 16, 2026</p>
      <div className="relative ml-[4.75rem] mr-6 mt-5" style={{ height: hours.length * HOUR }}>
        {hours.map((h, i) => (
          <div key={h} className="absolute inset-x-0 border-t border-ios-sep" style={{ top: i * HOUR }}>
            <span className="absolute -left-[3.5rem] -top-[7px] w-11 text-right text-[11px] text-ios-gray">{h}</span>
          </div>
        ))}
        {events.map((e) => (
          <div
            key={e.title}
            className={`absolute inset-x-0 flex overflow-hidden rounded-[6px] ${e.fill}`}
            style={{ top: e.start * HOUR + 2, height: e.len * HOUR - 4 }}
          >
            <span className={`w-1 shrink-0 ${e.bar}`} />
            <div className="min-w-0 px-2.5 py-1">
              <p className="truncate text-[13px] font-semibold leading-tight">{e.title}</p>
              <p className={`truncate text-[11px] leading-tight ${e.added ? "font-semibold text-money" : "text-ink-2"}`}>{e.where}</p>
            </div>
          </div>
        ))}
        <div className="absolute inset-x-0 flex items-center" style={{ top: 3.3 * HOUR }}>
          <span className="-ml-1 size-2 rounded-full bg-app-red" />
          <span className="h-px flex-1 bg-app-red" />
        </div>
      </div>
    </Screen>
  );
}

function Inbox() {
  const mails = [
    { from: "Marcus Lee", time: "9:41 AM", subject: "EV charger install quote?", preview: `Ironworks replied: Thanks Marcus! Your quote for ${usd(EV_QUOTE)} is attached. Tap to approve.`, unread: true },
    { from: "Sun Bakery", time: "8:12 AM", subject: "Lighting retrofit for the shop", preview: "Ironworks replied: We can come look Monday at 2 PM. Does that work?", unread: true },
    { from: "Jen Park", time: "Yesterday", subject: "Do you do generators?", preview: "Ironworks replied: We install standby generators. Here's a quick quote form.", unread: false },
  ];
  return (
    <Screen
      bar={
        <div className={`relative flex items-center justify-center ${X} pb-5 pt-3`}>
          <span className="text-[11px] text-ink">Updated Just Now</span>
          <SquarePen className="absolute right-6 size-6 text-app-blue" strokeWidth={1.8} aria-hidden />
        </div>
      }
    >
      <LargeTitle>Inbox</LargeTitle>
      <ul className="mt-2">
        {mails.map((m) => (
          <li key={m.from} className="relative pl-11 pr-6">
            {m.unread && <span className="absolute left-5 top-[19px] size-2.5 rounded-full bg-app-blue" />}
            <div className="border-b border-ios-sep py-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[17px] font-semibold">{m.from}</p>
                <span className="flex shrink-0 items-center text-[14px] text-ios-gray">
                  {m.time} <ChevronRight className="size-4" aria-hidden />
                </span>
              </div>
              <p className="text-[15px]">{m.subject}</p>
              <p className="line-clamp-2 text-[15px] leading-snug text-ios-gray">{m.preview}</p>
            </div>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

const PAYMENTS = [
  { who: "Priya Nair", what: "Light fixtures", when: "Today", amt: 640 },
  { who: "Luis Ortega", what: "Outlet repair", when: "Today", amt: OUTLET_TOTAL },
  { who: "Tom Okafor", what: "Panel upgrade deposit", when: "Monday", amt: 1140 },
];

function Wallet() {
  const total = PAYMENTS.reduce((s, p) => s + p.amt, 0);
  return (
    <Screen
      bar={
        <div className={`flex items-center justify-center ${X} pb-5 pt-3 text-[17px] text-app-blue`}>See All Transactions</div>
      }
    >
      <div className={`${X} pt-6`}>
        <div className="relative h-40 overflow-hidden rounded-[14px] bg-ink text-on-ink shadow-[0_12px_24px_-12px_oklch(0%_0_0/0.5)]">
          <div className="absolute right-0 top-0 h-1/2 w-1/2 opacity-70">
            <ShapeArt seed={4} cols={4} rows={2} bg="var(--color-ink)" colors={["var(--color-art-sun)", "var(--color-art-tomato)", "var(--color-app-green)"]} density={0.35} />
          </div>
          <div className="relative flex h-full flex-col justify-between p-4">
            <p className="flex items-center gap-1.5 text-[15px] font-semibold">
              <IronworksAppIcon className="size-6 rounded-[6px] ring-1 ring-on-ink/30" /> Ironworks
            </p>
            <div>
              <p className="text-[13px] opacity-80">Arriving in your bank Thursday</p>
              <p className="text-[32px] font-semibold tabular-nums">{usd(total, true)}</p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-[20px] font-bold">Latest Transactions</p>
        <ul className="mt-2 overflow-hidden rounded-[12px] bg-ios-fill">
          {PAYMENTS.map((p) => (
            <li key={p.who} className="flex items-center gap-3 border-b border-ios-sep px-3 py-2.5 last:border-0">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper text-[13px] font-semibold">
                {p.who
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold">{p.who}</p>
                <p className="truncate text-[13px] text-ios-gray">
                  {p.what} · {p.when}
                </p>
              </div>
              <p className="text-[15px] font-semibold tabular-nums">+{usd(p.amt, true)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}

const VIEWS: Record<App, { said: string; steps: string[]; screen: ReactNode }> = {
  Phone: {
    said: "You were up a ladder. Ironworks picked up and booked Dana in.",
    steps: ["Picked up the call you missed", "Figured out it was the kitchen breaker", "Booked Thu 9:00 AM and texted Dana"],
    screen: <Recents />,
  },
  Messages: {
    said: "The job's done, so the invoice goes out by text.",
    steps: ["Built the invoice from your job notes", "Texted Luis a pay link", "He paid by card 4 minutes later"],
    screen: <Thread />,
  },
  Calendar: {
    said: "Friday had two holes. Now it doesn't.",
    steps: ["Spotted 2 open slots on Friday", "Offered them to customers waiting on a date", "Both booked, reminders sent"],
    screen: <DayView />,
  },
  Mail: {
    said: "Website requests get answered in minutes, not tonight.",
    steps: ["Read 3 new requests from your website", `Sent Marcus his quote for ${usd(EV_QUOTE)}`, "Booked a site visit at Sun Bakery"],
    screen: <Inbox />,
  },
  Wallet: {
    said: "Late payers get a nudge. The money lands in your bank.",
    steps: ["Sent Priya a friendly reminder", "Collected 3 payments this week", `${usd(2165, true)} arriving Thursday`],
    screen: <Wallet />,
  },
};

export function HandlesIt() {
  const [app, setApp] = useState<App>("Phone");
  const v = VIEWS[app];

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[length:var(--text-display-s)] font-bold leading-[1.05] tracking-[-0.03em]">
          Ironworks handles it while you&apos;re on the job
        </h2>
        <p className="mt-4 text-xl text-ink-2">It works through the apps your customers already use.</p>
      </div>

      <div role="tablist" aria-label="Apps" className="scroll-row mx-auto mt-10 flex max-w-fit gap-4 overflow-x-auto px-2 pb-2 sm:gap-8">
        {APPS.map((a) => (
          <button
            key={a}
            role="tab"
            aria-selected={app === a}
            onClick={() => setApp(a)}
            className={`visual select-none flex shrink-0 flex-col items-center gap-2 rounded-3xl p-2 transition-[transform,opacity] duration-150 ease-[var(--ease-out)] ${
              app === a ? "-translate-y-1" : "opacity-55 hover:opacity-100"
            }`}
          >
            <AppIcon app={a} />
            <span className={`text-sm ${app === a ? "font-semibold" : ""}`}>{a}</span>
            <span aria-hidden className={`size-1.5 rounded-full ${app === a ? "bg-ink" : "bg-transparent"}`} />
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="mx-auto mt-6 grid max-w-5xl items-center gap-8 rounded-[36px] bg-panel p-4 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-12 lg:p-10"
      >
        <div className="px-2">
          <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{v.said}</p>
          <ol className="mt-8 space-y-3">
            {v.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-2xl bg-paper px-4 py-3.5 text-lg">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-ink">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div
          key={app}
          className="visual select-none mx-auto h-[540px] w-full max-w-sm overflow-hidden rounded-[32px] bg-paper font-[family-name:var(--font-ios)] text-ink shadow-[0_24px_50px_-28px_oklch(0%_0_0/0.5)]"
        >
          {v.screen}
        </div>
      </div>
    </div>
  );
}
