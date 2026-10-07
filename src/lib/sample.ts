// Sample shop data for the product visuals on the landing page.
// Totals are computed from parts so every number on the page adds up.

export function usd(n: number, cents = false) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export const SHOP = "Reyes Electric";

export const OUTLET_INVOICE = [
  { item: "Labor, 2 hr", amt: 2 * 120 },
  { item: "GFCI outlets × 2", amt: 2 * 42.5 },
  { item: "Trip charge", amt: 60 },
];
export const OUTLET_TOTAL = OUTLET_INVOICE.reduce((s, l) => s + l.amt, 0); // 385

export const EV_QUOTE = 1240;

export const WEEKS = [8240, 9880, 10125, 10175];
export const MONTH_TOTAL = WEEKS.reduce((s, w) => s + w, 0); // 38,420

export const TIERS = { pro: 10000, master: 50000 };
export const SUPPLY_CREDIT_RATE = 0.0025;

export const Q3 = {
  income: 118600,
  expenses: [41200, 6950, 3850],
  setAsideRate: 0.25,
};
export const Q3_PROFIT = Q3.income - Q3.expenses.reduce((s, e) => s + e, 0); // 66,600
export const Q3_SET_ASIDE = Q3_PROFIT * Q3.setAsideRate; // 16,650
