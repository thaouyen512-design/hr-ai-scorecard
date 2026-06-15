// ─────────────────────────────────────────────────────────────
// HR AI Readiness Scorecard — Google Apps Script
// Paste this entire file into the Apps Script editor of your
// Google Sheet, then deploy as Web App (Anyone, even anonymous).
// ─────────────────────────────────────────────────────────────

const SHEET_NAME = "Responses";
const HEADERS = ["created_at","fluency","governance","techstack","change","total","maturity"];

/** Ensure the sheet has headers on first run */
function ensureHeaders() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** POST  — save one assessment result (anonymous) */
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = ensureHeaders();
    sheet.appendRow([
      new Date().toISOString(),
      Number(data.fluency)    || 0,
      Number(data.governance) || 0,
      Number(data.techstack)  || 0,
      Number(data.change)     || 0,
      Number(data.total)      || 0,
      String(data.maturity)   || "",
    ]);
    return respond({ success: true });
  } catch (err) {
    return respond({ success: false, error: err.toString() });
  }
}

/** GET  — return aggregate stats for the dashboard */
function doGet() {
  try {
    const sheet = ensureHeaders();
    const rows  = sheet.getDataRange().getValues();

    if (rows.length <= 1) {
      return respond({ count: 0, avg: null, distribution: [], maturityBreakdown: {} });
    }

    // Skip header row
    const data = rows.slice(1).map(r => ({
      fluency:    Number(r[1]),
      governance: Number(r[2]),
      techstack:  Number(r[3]),
      change:     Number(r[4]),
      total:      Number(r[5]),
      maturity:   String(r[6]),
    }));

    const count = data.length;

    // Per-dimension averages
    const avg = {
      fluency:    round(data.reduce((s,d) => s + d.fluency,    0) / count),
      governance: round(data.reduce((s,d) => s + d.governance, 0) / count),
      techstack:  round(data.reduce((s,d) => s + d.techstack,  0) / count),
      change:     round(data.reduce((s,d) => s + d.change,     0) / count),
      total:      round(data.reduce((s,d) => s + d.total,      0) / count),
    };

    // Score distribution buckets: 1.0-1.5, 1.5-2.0, 2.0-2.5, 2.5-3.0, 3.0-3.5, 3.5-4.0
    const buckets = ["1.0-1.5","1.5-2.0","2.0-2.5","2.5-3.0","3.0-3.5","3.5-4.0"];
    const distribution = buckets.map(label => {
      const [lo, hi] = label.split("-").map(Number);
      return { range: label, count: data.filter(d => d.total >= lo && d.total < hi + 0.001).length };
    });

    // Maturity breakdown
    const maturityBreakdown = { beginner: 0, developing: 0, proficient: 0, advanced: 0 };
    data.forEach(d => { if (d.maturity in maturityBreakdown) maturityBreakdown[d.maturity]++; });

    // Top 25% threshold
    const sorted  = [...data].map(d => d.total).sort((a,b) => a - b);
    const top25   = sorted[Math.floor(sorted.length * 0.75)] ?? 4;

    return respond({ count, avg, distribution, maturityBreakdown, top25 });
  } catch (err) {
    return respond({ error: err.toString() });
  }
}

function round(n) { return Math.round(n * 100) / 100; }

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Required for CORS preflight on some clients */
function doOptions() {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
