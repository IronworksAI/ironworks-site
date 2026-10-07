export const TRADES = [
  "Electrician",
  "Plumber",
  "HVAC",
  "Carpenter",
  "Roofer",
  "Painter",
  "Handyman",
  "Other",
] as const;

export type Trade = (typeof TRADES)[number];

export type Role = "pro" | "homeowner";

export type WaitlistEntry = {
  role: Role;
  email: string;
  trade: Trade;
  city?: string;
};

type ParseResult =
  | { ok: true; entry: WaitlistEntry }
  | { ok: false; field: "email" | "trade" | "city"; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseWaitlist(input: unknown): ParseResult {
  const data = (input ?? {}) as Record<string, unknown>;

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) {
    return { ok: false, field: "email", error: "Enter an email like you@yourshop.com." };
  }

  const trade = data.trade;
  if (typeof trade !== "string" || !TRADES.includes(trade as Trade)) {
    return { ok: false, field: "trade", error: "Pick your trade." };
  }

  const city = typeof data.city === "string" ? data.city.trim() : "";
  if (city.length > 80) {
    return { ok: false, field: "city", error: "Keep the city under 80 characters." };
  }

  const role: Role = data.role === "homeowner" ? "homeowner" : "pro";

  return { ok: true, entry: { role, email, trade: trade as Trade, ...(city ? { city } : {}) } };
}
