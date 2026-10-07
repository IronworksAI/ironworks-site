import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { parseWaitlist } from "@/lib/waitlist";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend it worked.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return Response.json({ ok: true });
  }

  const parsed = parseWaitlist(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error, field: parsed.field }, { status: 400 });
  }

  const record = { ...parsed.entry, createdAt: new Date().toISOString() };
  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    } catch (err) {
      console.error("waitlist webhook failed", err);
      return Response.json({ error: "We couldn't save that. Try again in a minute." }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify(record) + "\n");
    return Response.json({ ok: true });
  }

  console.error("WAITLIST_WEBHOOK_URL is not set; dropping waitlist signup");
  return Response.json({ error: "The waitlist isn't taking signups yet. Try again soon." }, { status: 503 });
}
