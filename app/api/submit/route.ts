import { NextRequest, NextResponse } from "next/server";

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL   ?? "";
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

export async function POST(req: NextRequest) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const body  = await req.json();
    const entry = JSON.stringify({ created_at: new Date().toISOString(), ...body });

    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method:  "POST",
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" },
      body:    JSON.stringify([["RPUSH", "hr_submissions", entry]]),
    });
    const data = await res.json();
    const ok   = Array.isArray(data) && typeof data[0]?.result === "number" && data[0].result > 0;
    return NextResponse.json({ success: ok });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
