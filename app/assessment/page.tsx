"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DIMENSIONS, QUESTIONS_BY_DIM, ANSWER_OPTIONS } from "@/data/questions";
import type { DimensionId, AssessmentAnswers } from "@/types";

const TOTAL_QUESTIONS = 20;

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
      // Done — encode answers and navigate to results
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
      const removed = [...newAnswers[dim.id as DimensionId]];
      const prevVal = removed.pop();
      newAnswers[dim.id as DimensionId] = removed;
      setAnswers(newAnswers);
      setQIdx(qIdx - 1);
      setSelected(prevVal ?? null);
    } else if (dimIdx > 0) {
      const prevDim = DIMENSIONS[dimIdx - 1];
      const newAnswers = { ...answers };
      const removed = [...newAnswers[prevDim.id as DimensionId]];
      const prevVal = removed.pop();
      newAnswers[prevDim.id as DimensionId] = removed;
      setAnswers(newAnswers);
      setDimIdx(dimIdx - 1);
      setQIdx(4);
      setSelected(prevVal ?? null);
    }
  }

  const isLast = dimIdx === 3 && qIdx === 4;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-500">
              Câu {doneCount + 1} / {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm font-bold" style={{ color: dim.color }}>
              {progress}% hoàn thành
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: dim.color }}
            />
          </div>
          {/* Dimension tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.id}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  i === dimIdx
                    ? "text-white"
                    : i < dimIdx
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-400"
                }`}
                style={i === dimIdx ? { background: d.color } : {}}
              >
                {d.icon} {d.label}
                {i < dimIdx ? " ✓" : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-slide-in" key={`${dimIdx}-${qIdx}`}>
          {/* Dimension banner */}
          <div
            className="flex items-center gap-3 mb-6 p-4 rounded-2xl"
            style={{ background: dim.lightBg }}
          >
            <span className="text-3xl">{dim.icon}</span>
            <div>
              <div className="font-bold text-slate-800 text-sm">{dim.label}</div>
              <div className="text-slate-500 text-xs">{dim.description}</div>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Câu {qIdx + 1} / 5
            </div>
            <h2 className="text-lg font-semibold text-slate-800 leading-relaxed mb-6">
              {question.text}
            </h2>

            <div className="space-y-2.5">
              {ANSWER_OPTIONS.map((opt) => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {opt.value}
                      </span>
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            isSelected ? "text-indigo-800" : "text-slate-700"
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{opt.sublabel}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={doneCount === 0}
              className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Trước
            </button>
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40 disabled:pointer-events-none hover:opacity-90"
              style={{ background: dim.color }}
            >
              {isLast ? "Xem kết quả 🎉" : "Câu tiếp theo →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
