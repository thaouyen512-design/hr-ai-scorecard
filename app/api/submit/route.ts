import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

/**
 * Server-side submit proxy.
 * Uses GET with query params instead of POST to avoid the redirect
 * issue where Google's infrastructure converts POST → GET on 302,
 * preventing doPost() from ever running.
 */
export async function POST(req: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();

    const url = new URL(APPS_SCRIPT_URL);
    url.searchParams.set("action",     "submit");
    url.searchParams.set("fluency",    String(body.fluency));
    url.searchParams.set("governance", String(body.governance));
    url.searchParams.set("techstack",  String(body.techstack));
    url.searchParams.set("change",     String(body.change));
    url.searchParams.set("total",      String(body.total));
    url.searchParams.set("maturity",   String(body.maturity));

    const res  = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
