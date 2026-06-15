import Link from "next/link";
import { DIMENSIONS } from "@/data/questions";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-indigo-200 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/20">
          <span>📊</span> Dựa trên 11 Xu Hướng HR 2026 · AIHR
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
          HR AI Readiness
          <br />
          <span className="text-indigo-300">Scorecard</span>
        </h1>

        <p className="text-indigo-200 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
          Đánh giá mức độ sẵn sàng AI của HR team trong{" "}
          <strong className="text-white">5 phút</strong>. Nhận điểm số theo thang{" "}
          <strong className="text-white">1–4</strong> và lộ trình cải thiện cụ thể.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-indigo-200 mb-10">
          {["20 câu hỏi", "4 chiều đánh giá", "Thang điểm 1–4", "Lộ trình cải thiện"].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className="text-green-400">✓</span> {s}
            </div>
          ))}
        </div>

        {/* Dimension cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {DIMENSIONS.map((d) => (
            <div
              key={d.id}
              className="bg-white/10 border border-white/20 rounded-xl p-4 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl mb-1">{d.icon}</div>
              <div className="text-white text-xs font-semibold">{d.label}</div>
              <div className="text-indigo-300 text-xs">{d.sublabel}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            Bắt đầu đánh giá →
          </Link>
        </div>

        <p className="text-indigo-400 text-xs">
          Miễn phí · Không cần đăng ký · Kết quả ngay lập tức
        </p>
      </div>
    </main>
  );
}
