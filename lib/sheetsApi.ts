// Community feature routes through Next.js API → Upstash Redis (no CORS, no Apps Script)

export interface StatsResponse {
  count: number;
  avg: {
    fluency: number;
    governance: number;
    techstack: number;
    change: number;
    total: number;
  } | null;
  distribution: { range: string; count: number }[];
  maturityBreakdown: {
    beginner: number;
    developing: number;
    proficient: number;
    advanced: number;
  };
  top25: number;
}

export async function submitResult(payload: {
  fluency: number;
  governance: number;
  techstack: number;
  change: number;
  total: number;
  maturity: string;
}): Promise<boolean> {
  try {
    const res  = await fetch("/api/submit", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

export async function fetchStats(): Promise<StatsResponse | null> {
  try {
    const res = await fetch(`/api/stats?t=${Date.now()}`, { cache: "no-store" });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
