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

function ResultsContent() {
  const searchParams = useSearchParams();

  const answers: AssessmentAnswers = {
    fluency: searchParams.get("fluency")?.split(",").map(Number) ?? [],
    governance: searchParams.get("governance")?.split(",").map(Number) ?? [],
    techstack: searchParams.get("techstack")?.split(",").map(Number) ?? [],
    change: searchParams.get("change")?.split(",").map(Number) ?? [],
  };

  const scores = calcScores(answers);
  const maturity = getMaturity(scores.total);

  const radarData = DIMENSIONS.map((d) => ({
    dimension: d.label,
    score: scores.dimensions[d.id as DimensionId],
    benchmark: 2.2,
    fullMark: 4,
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white px-4 py-12 text-center print:hidden">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <p className="text-indigo-300 text-sm mb-2">Kết quả đánh giá HR AI Readiness</p>
          <h1 className="text-4xl font-extrabold mb-3">
            {scores.total.toFixed(1)}
            <span className="text-indigo-300 text-2xl font-semibold"> / 4.0</span>
          </h1>
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-3"
            style={{ background: maturity.bg, color: maturity.color }}
          >
            {maturity.labelVi} · {maturity.labelEn}
          </div>
          <p className="text-indigo-200 text-sm max-w-md mx-auto">{maturity.description}</p>
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

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Score cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DIMENSIONS.map((d) => {
            const s = scores.dimensions[d.id as DimensionId];
            const m = getMaturity(s);
            return (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm animate-fade-in"
              >
                <div className="text-3xl mb-2">{d.icon}</div>
                <div className="text-2xl font-extrabold" style={{ color: d.color }}>
                  {s.toFixed(1)}
                </div>
                <div className="text-xs text-slate-400 mb-2">/ 4.0</div>
                <div className="text-xs font-semibold text-slate-700">{d.label}</div>
                {/* Score bar */}
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${scoreToPercent(s)}%`, background: d.color }}
                  />
                </div>
                <div className="text-xs mt-1.5 font-medium" style={{ color: m.color }}>
                  {m.labelVi}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart + bar breakdown */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Radar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-700 text-sm mb-4">Radar Chart — 4 Chiều</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
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
                  fillOpacity={0.1}
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
                <Tooltip formatter={(v: number) => `${v.toFixed ? v.toFixed(1) : v} / 4.0`} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 justify-center mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-indigo-500 rounded" /> Điểm của bạn
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-slate-400 rounded border-dashed" /> Benchmark (2.2)
              </span>
            </div>
          </div>

          {/* Bar breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-700 text-sm mb-5">Điểm Chi Tiết</h3>
            <div className="space-y-4">
              {DIMENSIONS.map((d) => {
                const s = scores.dimensions[d.id as DimensionId];
                const m = getMaturity(s);
                return (
                  <div key={d.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-700">
                        {d.icon} {d.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: d.color }}>
                        {s.toFixed(1)} / 4.0
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${scoreToPercent(s)}%`, background: d.color }}
                      />
                    </div>
                    <div className="text-xs mt-1 font-medium" style={{ color: m.color }}>
                      {m.labelVi}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Khuyến Nghị Hành Động</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {DIMENSIONS.map((d) => {
              const s = scores.dimensions[d.id as DimensionId];
              const recs = getRecs(d.id as DimensionId, s);
              const m = getMaturity(s);
              return (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in"
                >
                  <div
                    className="px-5 py-3 flex items-center gap-2 border-b border-slate-100"
                    style={{ background: d.lightBg }}
                  >
                    <span className="text-lg">{d.icon}</span>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{d.label}</div>
                      <div className="text-xs font-medium" style={{ color: m.color }}>
                        {m.labelVi} · {s.toFixed(1)} / 4.0
                      </div>
                    </div>
                  </div>
                  <ul className="p-4 space-y-2.5">
                    {recs.map((r, i) => (
                      <li key={i} className="text-sm text-slate-700 leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benchmark */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 animate-fade-in">
          <h3 className="font-bold text-slate-800 mb-4">📊 So Sánh Benchmark Ngành (2026)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-indigo-600">{scores.total.toFixed(1)}</div>
              <div className="text-xs text-slate-500 mt-1">Điểm của bạn</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-500">2.2</div>
              <div className="text-xs text-slate-500 mt-1">Trung bình ngành</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-green-600">3.0</div>
              <div className="text-xs text-slate-500 mt-1">Top 25% (Proficient)</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-600">35%</div>
              <div className="text-xs text-slate-500 mt-1">HR dùng được AI*</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">* Nguồn: AIHR HR Trends Report 2026</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 print:hidden pb-6">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            🖨️ Export PDF
          </button>
          <Link
            href="/assessment"
            className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            🔄 Làm lại
          </Link>
          <button
            onClick={handleCopy}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all"
          >
            📋 Copy kết quả
          </button>
          <Link
            href="/"
            className="px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            ← Trang chủ
          </Link>
        </div>

        <p className="text-center text-xs text-slate-400 pb-4">
          HR AI Readiness Scorecard · Dựa trên AIHR HR Trends 2026 ·{" "}
          {new Date().toLocaleDateString("vi-VN")}
        </p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-500 text-sm">Đang tính điểm...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
