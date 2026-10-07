import { ShapeArt } from "./shape-art";

const links = [
  { href: "#ask", label: "Meet Ironworks" },
  { href: "#flow", label: "How it works" },
  { href: "#money", label: "Your money" },
  { href: "#pricing", label: "Pricing" },
];

function Mark() {
  // An I-beam, the shape every ironworker knows.
  return (
    <svg aria-hidden viewBox="8 8 48 48" className="size-7" fill="currentColor">
      <path d="M8 8H56V20H44A6 6 0 0 0 38 26V38A6 6 0 0 0 44 44H56V56H8V44H20A6 6 0 0 0 26 38V26A6 6 0 0 0 20 20H8Z" />
    </svg>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-2xl font-medium tracking-tight">
          <Mark />
          Ironworks
        </a>
        <nav aria-label="Main" className="hidden items-center gap-2 text-[17px] font-medium lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex h-12 items-center whitespace-nowrap rounded-full px-5 transition-colors duration-150 hover:bg-panel"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#join"
          className="inline-flex h-12 items-center whitespace-nowrap rounded-full bg-ink px-6 text-[17px] font-medium text-on-ink transition-opacity duration-150 hover:opacity-85"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}

const FOOTER_COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Ironworks",
    links: [
      ["How it works", "#flow"],
      ["Your money", "#money"],
      ["Rewards", "#rewards"],
      ["Pricing", "#pricing"],
    ],
  },
  {
    title: "Built for",
    links: [
      ["Electricians", "#join"],
      ["Plumbers", "#join"],
      ["HVAC techs", "#join"],
      ["Every other trade", "#join"],
    ],
  },
  {
    title: "Get in",
    links: [
      ["Join the waitlist", "#join"],
      ["I need a pro", "#join"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-on-ink">
      <div className="visual select-none h-20 sm:h-24">
        <ShapeArt
          seed={240}
          cols={36}
          rows={2}
          bg="var(--color-ink)"
          colors={["var(--color-art-sun)", "var(--color-art-tomato)", "var(--color-app-green)", "var(--color-art-ice)", "var(--color-art-orchid)"]}
          density={0.8}
        />
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Run your shop on Ironworks. It&apos;s free.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex h-14 items-center whitespace-nowrap rounded-full bg-on-ink px-8 text-lg font-semibold text-ink transition-opacity duration-150 hover:opacity-85"
          >
            Join the waitlist
          </a>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <p className="text-sm text-on-ink/50">{c.title}</p>
              <ul className="mt-4 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="whitespace-nowrap text-[17px] text-on-ink/85 transition-colors duration-150 hover:text-on-ink">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-2 px-4 text-sm text-on-ink/50 sm:flex-row sm:px-6">
        <p>Free software for the people who build and fix things.</p>
        <p>© 2026 Ironworks</p>
      </div>
      <p
        aria-hidden
        className="visual select-none mx-auto mt-6 max-w-[1400px] translate-y-[18%] px-2 text-center text-[21vw] font-bold leading-[0.8] tracking-[-0.06em] text-on-ink xl:text-[290px]"
      >
        Ironworks
      </p>
    </footer>
  );
}
