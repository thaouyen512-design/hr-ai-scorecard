import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR AI Readiness Scorecard",
  description:
    "Đánh giá mức độ sẵn sàng AI của HR team theo 4 chiều: AI Fluency, Governance, Tech Stack và Change Readiness.",
  openGraph: {
    title: "HR AI Readiness Scorecard",
    description: "Đánh giá HR team của bạn sẵn sàng cho AI đến đâu — 20 câu hỏi, kết quả ngay lập tức.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}
