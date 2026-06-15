import { NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

// Server-side proxy — avoids browser CORS when fetching stats
export async function GET() {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const res  = await fetch(`${APPS_SCRIPT_URL}?t=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
