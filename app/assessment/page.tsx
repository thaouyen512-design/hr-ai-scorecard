"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DIMENSIONS, QUESTIONS_BY_DIM, ANSWER_OPTIONS } from "@/data/questions";
import type { DimensionId, AssessmentAnswers } from "@/types";

const TOTAL_QUESTIONS = 20;

/* Score value → bar color label */
const VALUE_COLORS: Record<number, string> = {
  1: "bg-red-400",
  2: "bg-amber-400",
  3: "bg-sky-400",
  4: "bg-emerald-400",
};

export default function AssessmentPage() {
  const router = useRouter();
  const [dimIdx, setDimIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    fluency: [], governance: [], techstack: [], change: [],
  });
  const [selected, setSelected] = useState<number | null>(null);

  const dim = DIMENSIONS[dimIdx];
  const questions = QUESTIONS_BY_DIM[dim.id as DimensionId];
  const question = questions[qIdx];
  const doneCount = dimIdx * 5 + qIdx;
  const progress = Math.round((doneCount / TOTAL_QUESTIONS) * 100);
  const isLast = dimIdx === 3 && qIdx === 4;

  function handleNext() {
    if (selected === null) return;
    const newAnswers = { ...answers };
    newAnswers[dim.id as DimensionId] = [...answers[dim.id as DimensionId], selected];

    if (qIdx < 4) {
      setAnswers(newAnswers);
      setQIdx(qIdx + 1);
      setSelected(null);
    } else if (dimIdx < 3) {
      setAnswers(newAnswers);
      setDimIdx(dimIdx + 1);
      setQIdx(0);
      setSelected(null);
    } else {
      const params = new URLSearchParams({
        fluency: newAnswers.fluency.join(","),
        governance: newAnswers.governance.join(","),
        techstack: newAnswers.techstack.join(","),
        change: newAnswers.change.join(","),
      });
      router.push(`/results?${params.toString()}`);
    }
  }

  function handlePrev() {
    if (qIdx > 0) {
      const newAnswers = { ...answers };
      const arr = [...newAnswers[dim.id as DimensionId]];
      const prev = arr.pop();
      newAnswers[dim.id as DimensionId] = arr;
      setAnswers(newAnswers);
      setQIdx(qIdx - 1);
      setSelected(prev ?? null);
    } else if (dimIdx > 0) {
      const prevDim = DIMENSIONS[dimIdx - 1];
      const newAnswers = { ...answers };
      const arr = [...newAnswers[prevDim.id as DimensionId]];
      const prev = arr.pop();
      newAnswers[prevDim.id as DimensionId] = arr;
      setAnswers(newAnswers);
      setDimIdx(dimIdx - 1);
      setQIdx(4);
      setSelected(prev ?? null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">

      {/* Subtle background dots */}
      <div className="fixed inset-0 bg-nodes opacity-40 pointer-events-none"/>

      {/* Ambient color blob matching current dimension */}
      <div
        className="fixed top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full
                    opacity-10 blur-3xl pointer-events-none transition-all duration-700"
        style={{ background: dim.color }}
      />

      {/* ── Sticky progress header ── */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200
                      px-4 py-4 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto">

          {/* Back link + progress fraction */}
          <div className="flex items-center justify-between mb-3">
            <Link href="/"
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600
                         text-sm transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0
                     11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75
                     0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"/>
              </svg>
              Trang chủ
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-500">
                {doneCount + 1}
              </span>
              <span className="text-slate-300 text-sm">/</span>
              <span className="text-sm text-slate-400">{TOTAL_QUESTIONS}</span>
              <span className="ml-2 text-sm font-bold" style={{ color: dim.color }}>
                {progress}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: dim.color }}
            />
          </div>

          {/* Dimension stepper */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.id}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5
                            rounded-full text-xs font-semibold transition-all duration-300
                            ${i < dimIdx
                              ? "bg-emerald-100 text-emerald-700"
                              : i === dimIdx
                              ? "text-white shadow-sm"
                              : "bg-slate-100 text-slate-400"}`}
                style={i === dimIdx ? { background: d.color } : {}}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
                {i < dimIdx && (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7 L6 10 L11 4" stroke="#10b981"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Question area ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full animate-slide-in" key={`${dimIdx}-${qIdx}`}>

          {/* Dimension banner */}
          <div
            className="flex items-center gap-4 mb-6 p-5 rounded-2xl border"
            style={{
              background: dim.lightBg,
              borderColor: `${dim.color}33`,
            }}
          >
            <span className="text-4xl leading-none">{dim.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-base">{dim.label}</div>
              <div className="text-slate-500 text-sm mt-0.5">{dim.description}</div>
            </div>
            <div
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: dim.color }}
            >
              {qIdx + 1} / 5
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-7 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full
                           text-xs font-bold text-white"
                style={{ background: dim.color }}
              >
                Q{doneCount + 1}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {dim.sublabel}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-800 leading-relaxed mb-7">
              {question.text}
            </h2>

            <div className="space-y-3">
              {ANSWER_OPTIONS.map((opt) => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all
                                duration-200 hover:-translate-y-0.5 hover:shadow-sm
                                ${isSelected
                                  ? "border-transparent shadow-md"
                                  : "border-slate-200 bg-white hover:border-slate-300"}`}
                    style={isSelected
                      ? { background: dim.lightBg, borderColor: dim.color, boxShadow: `0 4px 16px ${dim.color}22` }
                      : {}}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Value badge with color indicator */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full
                                      text-sm font-bold transition-all
                                      ${isSelected ? "text-white" : "bg-slate-100 text-slate-500"}`}
                          style={isSelected ? { background: dim.color } : {}}
                        >
                          {opt.value}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${VALUE_COLORS[opt.value]}`}/>
                      </div>

                      <div className="flex-1">
                        <div
                          className={`text-sm font-semibold ${isSelected ? "text-slate-900" : "text-slate-700"}`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{opt.sublabel}</div>
                      </div>

                      {/* Checkmark */}
                      {isSelected && (
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill={dim.color} opacity="0.15"/>
                          <path d="M6 10 L9 13 L14 7" stroke={dim.color}
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={doneCount === 0}
              className="px-5 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600
                         font-semibold text-sm hover:bg-white hover:border-slate-300
                         transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0
                     11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75
                     0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"/>
              </svg>
              Trước
            </button>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white
                         transition-all disabled:opacity-40 disabled:pointer-events-none
                         hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
              style={{
                background: dim.color,
                boxShadow: selected !== null ? `0 4px 14px ${dim.color}40` : undefined,
              }}
            >
              {isLast
                ? (<><span>Xem kết quả</span><span>🎉</span></>)
                : (<><span>Câu tiếp theo</span>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75
                           0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5
                           5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
                    </svg>
                  </>)
              }
            </button>
          </div>

          {/* Hint text */}
          {selected === null && (
            <p className="text-center text-slate-400 text-xs mt-4">
              Hãy chọn một đáp án để tiếp tục
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
