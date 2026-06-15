import { NextResponse } from "next/server";

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL   ?? "";
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

function round(n: number) { return Math.round(n * 100) / 100; }

export async function GET() {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const res = await fetch(`${UPSTASH_URL}/pipeline`, {
      method:  "POST",
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}`, "Content-Type": "application/json" },
      body:    JSON.stringify([["LRANGE", "hr_submissions", "0", "-1"]]),
      cache:   "no-store",
    });
    const data = await res.json();
    const raw: string[] = data[0]?.result ?? [];

    if (raw.length === 0) {
      return NextResponse.json({
        count: 0, avg: null, distribution: [], maturityBreakdown: {}, top25: 4,
      });
    }

    const rows = raw.map(s => JSON.parse(s));
    const count = rows.length;

    const avg = {
      fluency:    round(rows.reduce((s, d) => s + Number(d.fluency),    0) / count),
      governance: round(rows.reduce((s, d) => s + Number(d.governance), 0) / count),
      techstack:  round(rows.reduce((s, d) => s + Number(d.techstack),  0) / count),
      change:     round(rows.reduce((s, d) => s + Number(d.change),     0) / count),
      total:      round(rows.reduce((s, d) => s + Number(d.total),      0) / count),
    };

    const buckets = ["1.0-1.5","1.5-2.0","2.0-2.5","2.5-3.0","3.0-3.5","3.5-4.0"];
    const distribution = buckets.map(label => {
      const [lo, hi] = label.split("-").map(Number);
      return { range: label, count: rows.filter(d => Number(d.total) >= lo && Number(d.total) < hi + 0.001).length };
    });

    const maturityBreakdown = { beginner: 0, developing: 0, proficient: 0, advanced: 0 };
    rows.forEach(d => { if (d.maturity in maturityBreakdown) maturityBreakdown[d.maturity as keyof typeof maturityBreakdown]++; });

    const sorted = rows.map(d => Number(d.total)).sort((a, b) => a - b);
    const top25  = sorted[Math.floor(sorted.length * 0.75)] ?? 4;

    return NextResponse.json({ count, avg, distribution, maturityBreakdown, top25 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
