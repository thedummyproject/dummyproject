import { NextResponse } from "next/server";
import { normalizeEmail, saveSubscriber } from "@/lib/subscribers";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function allowed(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(ip, recent);
    return false;
  }

  recent.push(now);
  attempts.set(ip, recent);

  if (attempts.size > 5_000) {
    for (const [key, value] of attempts) {
      if (value.every((at) => now - at >= WINDOW_MS)) attempts.delete(key);
    }
  }

  return true;
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();

  if (!allowed(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many tries. Give it a minute and submit again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that submission. Try again." },
      { status: 400 },
    );
  }

  const email = normalizeEmail((body as { email?: unknown } | null)?.email);

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right. Check it and try again." },
      { status: 422 },
    );
  }

  try {
    await saveSubscriber(email);
  } catch (error) {
    console.error("[notify] subscriber persistence failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save your email just now. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
