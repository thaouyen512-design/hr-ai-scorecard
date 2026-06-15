"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { DIMENSIONS } from "@/data/questions";
import { calcScores, getMaturity, scoreToPercent } from "@/lib/scoring";
import { getRecs } from "@/data/recommendations";
import type { AssessmentAnswers, DimensionId } from "@/types";

/* Maturity level → icon */
const MATURITY_ICONS: Record<string, string> = {
  beginner: "🌱",
  developing: "🌿",
  proficient: "🌳",
  advanced: "🚀",
};

function ResultsContent() {
  const searchParams = useSearchParams();

  const answers: AssessmentAnswers = {
    fluency:    searchParams.get("fluency")?.split(",").map(Number)    ?? [],
    governance: searchParams.get("governance")?.split(",").map(Number) ?? [],
    techstack:  searchParams.get("techstack")?.split(",").map(Number)  ?? [],
    change:     searchParams.get("change")?.split(",").map(Number)     ?? [],
  };

  const scores   = calcScores(answers);
  const maturity = getMaturity(scores.total);

  const radarData = DIMENSIONS.map((d) => ({
    dimension: d.label,
    score:     scores.dimensions[d.id as DimensionId],
    benchmark: 2.2,
    fullMark:  4,
  }));

  function handleCopy() {
    const lines = [
      "HR AI Readiness Scorecard",
      `Điểm tổng: ${scores.total.toFixed(1)} / 4.0 (${maturity.labelVi})`,
      "",
      ...DIMENSIONS.map(
        (d) => `${d.icon} ${d.label}: ${scores.dimensions[d.id as DimensionId].toFixed(1)} / 4.0`
      ),
      "",
      "Nguồn: AIHR HR Trends 2026",
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(() => alert("✅ Đã copy kết quả!"));
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Background dots */}
      <div className="fixed inset-0 bg-nodes opacity-40 pointer-events-none"/>
      {/* Ambient blobs */}
      <div
        className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full
                    opacity-15 blur-3xl pointer-events-none animate-float-slow"
        style={{ background: maturity.color }}
      />
      <div className="fixed bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full
                      bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 blur-3xl
                      pointer-events-none animate-float"/>

      <div className="relative z-10">

        {/* ── Hero score banner ── */}
        <div className="px-4 pt-12 pb-10 text-center animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400
                                      hover:text-slate-600 text-sm mb-6 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0
                     11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75
                     0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"/>
              </svg>
              Về trang chủ
            </Link>

            <p className="text-slate-500 text-sm mb-3">Kết quả đánh giá HR AI Readiness</p>

            {/* Big score circle */}
            <div className="relative inline-flex items-center justify-center mb-5">
              <svg width="160" height="160" viewBox="0 0 160 160" className="rotate-[-90deg]">
                <circle cx="80" cy="80" r="68" stroke="#f1f5f9" strokeWidth="12" fill="none"/>
                <circle
                  cx="80" cy="80" r="68"
                  stroke={maturity.color}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(2 * Math.PI * 68 * (scores.total - 1)) / 3} ${2 * Math.PI * 68}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900">
                  {scores.total.toFixed(1)}
                </span>
                <span className="text-slate-400 text-sm font-medium">/ 4.0</span>
              </div>
            </div>

            {/* Maturity badge */}
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           text-sm font-bold shadow-lg"
                style={{ background: maturity.bg, color: maturity.color,
                         boxShadow: `0 4px 20px ${maturity.color}30` }}
              >
                <span className="text-base">{MATURITY_ICONS[maturity.level]}</span>
                {maturity.labelVi} · {maturity.labelEn}
              </span>
            </div>

            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              {maturity.description}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-12 space-y-6">

          {/* ── Dimension score cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DIMENSIONS.map((d) => {
              const s = scores.dimensions[d.id as DimensionId];
              const m = getMaturity(s);
              const pct = scoreToPercent(s);
              return (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl border p-5 text-center shadow-sm
                             hover:shadow-md transition-shadow animate-fade-in"
                  style={{ borderColor: `${d.color}33` }}
                >
                  <div className="text-3xl mb-3">{d.icon}</div>
                  <div className="text-2xl font-extrabold mb-0.5" style={{ color: d.color }}>
                    {s.toFixed(1)}
                  </div>
                  <div className="text-xs text-slate-400 mb-2.5">/ 4.0</div>
                  <div className="text-xs font-bold text-slate-700 mb-1">{d.label}</div>

                  {/* Mini progress ring */}
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: d.color }}
                    />
                  </div>

                  <div
                    className="text-xs mt-2 font-semibold px-2 py-0.5 rounded-full inline-block"
                    style={{ background: m.bg, color: m.color }}
                  >
                    {m.labelVi}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Chart + bar breakdown ── */}
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Radar chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-1">Radar Chart — 4 Chiều</h3>
              <p className="text-xs text-slate-400 mb-4">So sánh với benchmark ngành (2.2)</p>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0"/>
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fontSize: 11, fontWeight: 600, fill: "#475569" }}
                  />
                  <PolarRadiusAxis
                    domain={[0, 4]}
                    tickCount={5}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <Radar
                    name="Benchmark ngành"
                    dataKey="benchmark"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.08}
                    strokeDasharray="5 4"
                    strokeWidth={1.5}
                  />
                  <Radar
                    name="Điểm của bạn"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#6366f1" }}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v.toFixed ? v.toFixed(1) : v} / 4.0`]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0",
                                    fontSize: "12px" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 justify-center mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 bg-indigo-500 rounded"/>
                  Điểm của bạn
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-px bg-slate-400"/>
                  Benchmark (2.2)
                </span>
              </div>
            </div>

            {/* Bar breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-1">Điểm Chi Tiết</h3>
              <p className="text-xs text-slate-400 mb-5">Phân tích theo từng chiều đánh giá</p>
              <div className="space-y-5">
                {DIMENSIONS.map((d) => {
                  const s = scores.dimensions[d.id as DimensionId];
                  const m = getMaturity(s);
                  return (
                    <div key={d.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                          <span>{d.icon}</span> {d.label}
                        </span>
                        <span className="text-sm font-bold" style={{ color: d.color }}>
                          {s.toFixed(1)}
                          <span className="text-slate-400 font-normal text-xs"> / 4.0</span>
                        </span>
                      </div>
                      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                        {/* Benchmark marker at 2.2 = 40% */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                          style={{ left: "40%" }}
                        />
                        <div
                          className="h-3 rounded-full transition-all duration-700"
                          style={{ width: `${scoreToPercent(s)}%`, background: d.color }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-medium" style={{ color: m.color }}>
                          {m.labelVi}
                        </span>
                        <span className="text-xs text-slate-400">
                          {scoreToPercent(s)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Recommendations ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">🎯</span>
              <h3 className="text-lg font-bold text-slate-800">Khuyến Nghị Hành Động</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {DIMENSIONS.map((d) => {
                const s = scores.dimensions[d.id as DimensionId];
                const recs = getRecs(d.id as DimensionId, s);
                const m = getMaturity(s);
                return (
                  <div
                    key={d.id}
                    className="bg-white rounded-2xl border shadow-sm overflow-hidden animate-fade-in"
                    style={{ borderColor: `${d.color}33` }}
                  >
                    {/* Card header */}
                    <div
                      className="px-5 py-4 flex items-center justify-between border-b"
                      style={{ background: d.lightBg, borderColor: `${d.color}22` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{d.icon}</span>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{d.label}</div>
                          <div className="text-xs text-slate-500">{d.sublabel}</div>
                        </div>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: m.bg, color: m.color }}
                      >
                        {s.toFixed(1)} / 4.0
                      </span>
                    </div>

                    {/* Recommendations list */}
                    <ul className="p-5 space-y-3">
                      {recs.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                          <span
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center
                                       justify-center text-white text-xs font-bold"
                            style={{ background: d.color }}
                          >
                            {i + 1}
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Benchmark comparison ── */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50
                          rounded-2xl border border-indigo-100 p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">📊</span>
              <h3 className="font-bold text-slate-800">So Sánh Benchmark Ngành 2026</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { val: scores.total.toFixed(1), label: "Điểm của bạn",     color: "#6366f1" },
                { val: "2.2",                   label: "Trung bình ngành",  color: "#94a3b8" },
                { val: "3.0",                   label: "Top 25%",           color: "#10b981" },
                { val: "35%",                   label: "HR dùng được AI*",  color: "#f59e0b" },
              ].map((item) => (
                <div key={item.label}
                  className="bg-white/70 rounded-xl p-4 border border-white shadow-sm">
                  <div className="text-3xl font-extrabold mb-1" style={{ color: item.color }}>
                    {item.val}
                  </div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">* Nguồn: AIHR HR Trends Report 2026</p>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-wrap gap-3 print:hidden pb-4">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl
                         text-sm font-semibold text-slate-700 hover:bg-slate-50
                         transition-all flex items-center gap-1.5"
            >
              <span>🖨️</span> Export PDF
            </button>
            <Link
              href="/assessment"
              className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl
                         text-sm font-semibold text-slate-700 hover:bg-slate-50
                         transition-all flex items-center gap-1.5"
            >
              <span>🔄</span> Làm lại
            </Link>
            <button
              onClick={handleCopy}
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold
                         hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200
                         flex items-center gap-1.5"
            >
              <span>📋</span> Copy kết quả
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 pb-4">
            HR AI Readiness Scorecard · AIHR HR Trends 2026 ·{" "}
            {new Date().toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Print header */}
      <div className="hidden print:block p-8 border-b">
        <h1 className="text-2xl font-bold">HR AI Readiness Scorecard</h1>
        <p className="text-gray-500">{new Date().toLocaleDateString("vi-VN")}</p>
        <p className="mt-1 text-xl font-bold">
          Điểm tổng: {scores.total.toFixed(1)} / 4.0 · {maturity.labelVi}
        </p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600
                            rounded-full animate-spin"/>
            Đang tính điểm...
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
