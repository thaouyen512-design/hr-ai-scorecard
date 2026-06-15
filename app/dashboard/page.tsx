"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend,
} from "recharts";
import { DIMENSIONS } from "@/data/questions";
import { getMaturity } from "@/lib/scoring";
import { fetchStats, APPS_SCRIPT_URL } from "@/lib/sheetsApi";
import type { StatsResponse } from "@/lib/sheetsApi";
import type { DimensionId } from "@/types";

/* ── Maturity colours ── */
const MATURITY_CFG = [
  { key: "beginner",   label: "Chưa bắt đầu",   color: "#ef4444" },
  { key: "developing", label: "Đang phát triển", color: "#f59e0b" },
  { key: "proficient", label: "Đang tiến tới",   color: "#0ea5e9" },
  { key: "advanced",   label: "Dẫn đầu",         color: "#10b981" },
];

/* ── Stat card ── */
function StatCard({ value, label, sub, color }: {
  value: string; label: string; sub?: string; color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
      <div className="text-3xl font-extrabold mb-1" style={{ color: color ?? "#6366f1" }}>
        {value}
      </div>
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-3xl">
        📊
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-2">Chưa có dữ liệu cộng đồng</h3>
      <p className="text-slate-500 text-sm max-w-sm">
        Hãy là người đầu tiên đóng góp kết quả! Sau khi đánh giá xong, bạn có thể
        chia sẻ điểm ẩn danh để xây dựng benchmark chung.
      </p>
      <Link href="/assessment"
        className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                   text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all
                   shadow-md shadow-indigo-200">
        Bắt đầu đánh giá
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0
               111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75
               0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
        </svg>
      </Link>
    </div>
  );
}

/* ── Not configured state ── */
function NotConfigured() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-3xl">
        ⚙️
      </div>
      <h3 className="font-bold text-slate-800 text-lg mb-2">Chưa kết nối Google Sheets</h3>
      <p className="text-slate-500 text-sm max-w-sm">
        Dashboard này cần biến môi trường{" "}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">
          NEXT_PUBLIC_APPS_SCRIPT_URL
        </code>{" "}
        được cấu hình trên Vercel.
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!APPS_SCRIPT_URL) { setLoading(false); return; }
    fetchStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  /* ─── build chart data once stats loaded ─── */
  const radarData = stats?.avg
    ? DIMENSIONS.map((d) => ({
        dimension: d.label,
        community: stats.avg![d.id as DimensionId] ?? 0,
        fullMark: 4,
      }))
    : [];

  const pieData = MATURITY_CFG
    .map((m) => ({
      name: m.label,
      value: stats?.maturityBreakdown[m.key as keyof typeof stats.maturityBreakdown] ?? 0,
      color: m.color,
    }))
    .filter((d) => d.value > 0);

  const avgMaturity = stats?.avg ? getMaturity(stats.avg.total) : null;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 bg-nodes opacity-40 pointer-events-none"/>
      <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full
                      bg-gradient-to-br from-indigo-100 to-purple-100 opacity-25 blur-3xl
                      pointer-events-none animate-float-slow"/>

      <div className="relative z-10">

        {/* ── Header ── */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0
                       11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75
                       0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"/>
                </svg>
              </Link>
              <div>
                <h1 className="font-extrabold text-slate-900 text-base leading-tight">
                  Dashboard Cộng đồng
                </h1>
                <p className="text-xs text-slate-400">Tổng hợp kết quả HR AI Readiness</p>
              </div>
            </div>
            <Link href="/assessment"
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700
                         text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all
                         shadow-md shadow-indigo-200">
              Tham gia đánh giá →
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-8">

          {/* ── Loading ── */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-500 text-sm">
              <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600
                              rounded-full animate-spin"/>
              Đang tải dữ liệu cộng đồng...
            </div>
          )}

          {/* ── Not configured ── */}
          {!loading && !APPS_SCRIPT_URL && <NotConfigured/>}

          {/* ── No data yet ── */}
          {!loading && APPS_SCRIPT_URL && stats?.count === 0 && <EmptyState/>}

          {/* ── Dashboard ── */}
          {!loading && stats && stats.count > 0 && (
            <div className="space-y-6 animate-fade-in">

              {/* Hero stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                  value={stats.count.toString()}
                  label="Lượt đánh giá"
                  sub="trong cộng đồng"
                  color="#6366f1"
                />
                <StatCard
                  value={stats.avg?.total.toFixed(2) ?? "—"}
                  label="Điểm TB cộng đồng"
                  sub="thang 1–4"
                  color={avgMaturity?.color}
                />
                <StatCard
                  value={stats.top25?.toFixed(1) ?? "—"}
                  label="Ngưỡng Top 25%"
                  sub="điểm tổng"
                  color="#10b981"
                />
                <StatCard
                  value={
                    pieData.length > 0
                      ? pieData.reduce((a, b) => (a.value > b.value ? a : b)).name.split(" ")[0]
                      : "—"
                  }
                  label="Mức phổ biến nhất"
                  sub={pieData.length > 0
                    ? pieData.reduce((a, b) => (a.value > b.value ? a : b)).name
                    : ""}
                  color="#f59e0b"
                />
              </div>

              {/* Radar + Pie */}
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Community radar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Điểm Trung Bình Cộng Đồng
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">4 chiều đánh giá · thang 1–4</p>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0"/>
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fontSize: 11, fontWeight: 600, fill: "#475569" }}
                      />
                      <PolarRadiusAxis
                        domain={[0, 4]} tickCount={5}
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                      />
                      <Radar
                        name="Trung bình cộng đồng"
                        dataKey="community"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.18}
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#6366f1" }}
                      />
                      <Tooltip
                        formatter={(v: number) => [`${v.toFixed(2)} / 4.0`]}
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Maturity pie */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    Phân Bổ Mức Độ Trưởng Thành
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">Tỷ lệ % theo từng mức</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${Math.round((percent ?? 0) * 100)}%`
                        }
                        labelLine={false}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color}/>
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [`${v} người`]}
                        contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {MATURITY_CFG.map((m) => {
                      const n = stats.maturityBreakdown[m.key as keyof typeof stats.maturityBreakdown] ?? 0;
                      const pct = stats.count > 0 ? Math.round((n / stats.count) * 100) : 0;
                      return (
                        <div key={m.key} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: m.color }}/>
                          <span className="text-xs text-slate-600">{m.label}</span>
                          <span className="text-xs font-bold text-slate-400 ml-auto">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Score distribution bar chart */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm mb-1">
                  Phân Phối Điểm Tổng
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Số lượng người đạt từng dải điểm (1.0 – 4.0)
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.distribution} barCategoryGap="25%">
                    <XAxis
                      dataKey="range"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      axisLine={false} tickLine={false}
                    />
                    <Tooltip
                      formatter={(v: number) => [`${v} người`]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {stats.distribution.map((entry, i) => {
                        const midpoint = parseFloat(entry.range.split("-")[0]) + 0.25;
                        const m = getMaturity(midpoint);
                        return <Cell key={i} fill={m.color}/>;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-3">
                  {MATURITY_CFG.map((m) => (
                    <div key={m.key} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: m.color }}/>
                      <span className="text-xs text-slate-500">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Per-dimension avg bars */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 text-sm mb-1">
                  Điểm Trung Bình Theo Chiều
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  So sánh 4 chiều đánh giá trong toàn cộng đồng
                </p>
                <div className="space-y-4">
                  {DIMENSIONS.map((d) => {
                    const s = stats.avg?.[d.id as DimensionId] ?? 0;
                    const pct = Math.round(((s - 1) / 3) * 100);
                    const m = getMaturity(s);
                    return (
                      <div key={d.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                            <span>{d.icon}</span> {d.label}
                          </span>
                          <span className="text-sm font-bold" style={{ color: d.color }}>
                            {s.toFixed(2)}
                            <span className="text-slate-400 font-normal text-xs"> / 4.0</span>
                          </span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-3 rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, background: d.color }}
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

              {/* Disclaimer */}
              <div className="text-center text-xs text-slate-400 pb-4 space-y-1">
                <p>Dữ liệu tổng hợp ẩn danh · Không lưu thông tin cá nhân</p>
                <p>
                  Nguồn khung đánh giá:{" "}
                  <a href="https://www.aihr.com/blog/hr-trends/"
                    target="_blank" rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-600 underline underline-offset-2">
                    AIHR HR Trends 2026
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
