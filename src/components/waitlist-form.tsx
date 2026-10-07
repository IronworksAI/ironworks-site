"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { parseWaitlist, type Role, type Trade } from "@/lib/waitlist";
import { TradeSelect } from "./trade-select";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; field?: "email" | "trade" | "city"; message: string };

const COPY: Record<Role, { tradeLabel: string; email: string; button: string; done: string }> = {
  pro: {
    tradeLabel: "Your trade",
    email: "you@yourshop.com",
    button: "Join the waitlist",
    done: "We're opening a few cities at a time and will email you when yours is ready.",
  },
  homeowner: {
    tradeLabel: "Who do you need most?",
    email: "you@email.com",
    button: "Get notified",
    done: "We'll email you as soon as pros near you are on Ironworks.",
  },
};

const field =
  "h-14 w-full min-w-0 rounded-xl border border-line bg-paper px-4 text-base text-ink placeholder:text-ink-3 aria-[invalid=true]:border-attn";

export function WaitlistForm() {
  const [role, setRole] = useState<Role>("pro");
  const [trade, setTrade] = useState<Trade | "">("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      role,
      email: form.get("email"),
      trade: form.get("trade"),
      city: form.get("city") ?? undefined,
      company: form.get("company"),
    };

    const check = parseWaitlist(payload);
    if (!check.ok) {
      setStatus({ kind: "error", field: check.field, message: check.error });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: "error", field: data.field, message: data.error ?? "Something went wrong. Try again." });
        return;
      }
      setStatus({ kind: "done" });
    } catch {
      setStatus({ kind: "error", message: "You look offline. Check your connection and try again." });
    }
  }

  if (status.kind === "done") {
    return (
      <div role="status" className="mx-auto flex max-w-xl items-start gap-4 rounded-3xl border border-line p-6 text-left">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-confetti-green text-ink">
          <Check className="size-5" strokeWidth={3} aria-hidden />
        </span>
        <p className="text-lg">
          <span className="block font-bold">You&apos;re on the list.</span>
          <span className="text-ink-2">{COPY[role].done}</span>
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const err = status.kind === "error" ? status : null;
  const copy = COPY[role];

  return (
    <form onSubmit={onSubmit} noValidate autoComplete="off" className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <fieldset className="rounded-full border border-line p-1.5 shadow-[0_8px_24px_-12px_oklch(0%_0_0/0.18)]">
        <legend className="sr-only">Who are you?</legend>
        <div className="grid grid-cols-2">
          {(
            [
              ["pro", "I run a trade business"],
              ["homeowner", "I need a pro"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="relative">
              <input
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                onChange={() => {
                  setRole(value);
                  setStatus({ kind: "idle" });
                }}
                className="peer sr-only"
              />
              <span className="flex h-14 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-3 text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-panel peer-checked:bg-ink peer-checked:text-on-ink peer-checked:hover:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus sm:text-base">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 text-left sm:grid-cols-3">
        <TradeSelect label={copy.tradeLabel} value={trade} onChange={setTrade} invalid={err?.field === "trade"} />
        <label className="flex min-w-0 flex-col gap-2 font-medium">
          Email
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder={copy.email}
            aria-invalid={err?.field === "email"}
            aria-describedby={err ? "wl-err" : undefined}
            className={field}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-2 font-medium">
          City
          <input
            type="text"
            name="city"
            autoComplete="off"
            placeholder="Oakland, CA"
            aria-invalid={err?.field === "city"}
            className={field}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mx-auto inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-ink px-10 text-lg font-semibold text-on-ink transition-opacity duration-150 hover:opacity-85 active:translate-y-px disabled:cursor-progress disabled:opacity-60"
      >
        {sending ? "Joining…" : copy.button}
      </button>

      <p id="wl-err" role="alert" className="-mt-2 min-h-5 text-center text-sm font-medium text-attn">
        {err?.message}
      </p>
    </form>
  );
}
