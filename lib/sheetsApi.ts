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

/** Submit one anonymous result to Google Sheets */
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
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

/** Fetch aggregate stats from Google Sheets */
export async function fetchStats(): Promise<StatsResponse | null> {
  if (!APPS_SCRIPT_URL) return null;
  try {
    const res = await fetch(APPS_SCRIPT_URL, { next: { revalidate: 300 } });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
