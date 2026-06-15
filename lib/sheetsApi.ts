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

/** Submit one anonymous result to Google Sheets.
 *  Uses no-cors because Apps Script doesn't return CORS headers on POST.
 *  The request still reaches the server — we just can't read the response. */
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
      mode: "no-cors",          // bypass CORS — response will be opaque
      body: JSON.stringify(payload),
    });
    return true;                // opaque response = request sent, assume OK
  } catch {
    return false;
  }
}

/** Fetch aggregate stats from Google Sheets (GET — Apps Script returns CORS on GET) */
export async function fetchStats(): Promise<StatsResponse | null> {
  if (!APPS_SCRIPT_URL) return null;
  try {
    const res = await fetch(
      `${APPS_SCRIPT_URL}?t=${Date.now()}`,   // cache-bust
      { cache: "no-store" }
    );
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}
