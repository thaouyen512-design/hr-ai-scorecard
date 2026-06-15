import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

// Server-side POST proxy — avoids CORS + redirect issues from browser
export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
