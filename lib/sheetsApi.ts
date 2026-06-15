// Google Apps Script Web App URL — filled in after deploy
export const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

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

/** Submit one anonymous result via Next.js API proxy (avoids CORS + redirect issues on POST) */
export async function submitResult(payload: {
  fluency: number;
  governance: number;
  techstack: number;
  change: number;
  total: number;
  maturity: string;
}): Promise<boolean> {
  if (!APPS_SCRIPT_URL) return false;
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/** Fetch aggregate stats via Next.js API proxy (avoids browser CORS on GET) */
export async function fetchStats(): Promise<StatsResponse | null> {
  if (!APPS_SCRIPT_URL) return null;
  try {
    const res = await fetch(`/api/stats?t=${Date.now()}`, { cache: "no-store" });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
