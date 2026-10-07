"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { TRADES, type Trade } from "@/lib/waitlist";

/* Listbox-pattern dropdown. Submits through a hidden input named "trade". */
export function TradeSelect({
  label,
  value,
  onChange,
  invalid,
}: {
  label: string;
  value: Trade | "";
  onChange: (t: Trade) => void;
  invalid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function openAt(i: number) {
    setActive(i);
    setOpen(true);
  }

  function choose(i: number) {
    onChange(TRADES[i]);
    setOpen(false);
    button.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    const current = value ? TRADES.indexOf(value) : 0;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openAt(current);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, TRADES.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(TRADES.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={root} className="relative flex min-w-0 flex-col gap-2 text-left font-medium">
      <span id={`${id}-label`}>{label}</span>
      <input type="hidden" name="trade" value={value} />
      <button
        ref={button}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={invalid}
        onClick={() => (open ? setOpen(false) : openAt(value ? TRADES.indexOf(value) : 0))}
        onKeyDown={onKeyDown}
        className={`flex h-14 w-full items-center justify-between gap-2 rounded-xl border bg-paper px-4 text-left text-base font-normal transition-colors duration-150 hover:border-ink-3 ${
          invalid ? "border-attn" : open ? "border-ink" : "border-line"
        }`}
      >
        <span className={value ? "text-ink" : "text-ink-3"}>{value || "Pick one"}</span>
        <ChevronDown
          className={`size-5 shrink-0 text-ink-2 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-2xl border border-line bg-paper p-1.5 shadow-[0_18px_40px_-16px_oklch(0%_0_0/0.35)]"
        >
          {TRADES.map((t, i) => (
            <li
              key={t}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={value === t}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-base font-normal ${
                active === i ? "bg-panel" : ""
              }`}
            >
              {t}
              {value === t && <Check className="size-4" aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
