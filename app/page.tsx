import Link from "next/link";

/* ── Inline SVG Icons ── */
const IconFluency = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <circle cx="24" cy="24" r="20" fill="#eef2ff"/>
    <path d="M16 30 C16 22 20 16 24 14 C28 16 32 22 32 30"
      stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="32" r="3" fill="#6366f1"/>
    <circle cx="18" cy="20" r="2" fill="#a5b4fc"/>
    <circle cx="30" cy="20" r="2" fill="#a5b4fc"/>
    <path d="M20 36 L28 36" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 24 L16 24M32 24 L36 24" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconGovernance = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <circle cx="24" cy="24" r="20" fill="#f0f9ff"/>
    <path d="M24 12 L34 17 L34 24 C34 29.5 29.5 34.5 24 36 C18.5 34.5 14 29.5 14 24 L14 17 Z"
      fill="#bae6fd" stroke="#0ea5e9" strokeWidth="1.5"/>
    <path d="M20 24 L23 27 L28 21" stroke="#0ea5e9" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconTechStack = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <circle cx="24" cy="24" r="20" fill="#ecfdf5"/>
    <rect x="14" y="20" width="20" height="12" rx="3" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5"/>
    <rect x="14" y="16" width="20" height="5" rx="2" fill="#6ee7b7" stroke="#10b981" strokeWidth="1.5"/>
    <circle cx="18" cy="29" r="1.5" fill="#10b981"/>
    <circle cx="22" cy="29" r="1.5" fill="#10b981"/>
    <path d="M26 29 L30 29" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 15 L21 12M27 15 L27 12" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconChange = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <circle cx="24" cy="24" r="20" fill="#fffbeb"/>
    <path d="M17 30 C17 24 20 20 24 18 C28 20 31 24 31 30"
      fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5"/>
    <path d="M24 18 L24 14" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 20 L17 18M29 20 L31 18" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="20" y="29" width="8" height="4" rx="2" fill="#fbbf24"/>
  </svg>
);

/* ── Hero SVG Illustration ── */
const HeroIllustration = () => (
  <svg viewBox="0 0 480 420" className="w-full max-w-lg" fill="none">
    <defs>
      <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6366f1" floodOpacity="0.12"/>
      </filter>
    </defs>

    {/* Background circles */}
    <circle cx="240" cy="210" r="190" fill="#eef2ff" opacity="0.5"/>
    <circle cx="240" cy="210" r="140" fill="#e0e7ff" opacity="0.35"/>

    {/* Floating card: AI Score */}
    <g transform="translate(28,55)">
      <rect width="115" height="62" rx="14" fill="white" filter="url(#card-shadow)"/>
      <rect x="12" y="12" width="38" height="6" rx="3" fill="#e0e7ff"/>
      <text x="12" y="42" fontFamily="Inter,system-ui,sans-serif"
        fontWeight="800" fontSize="24" fill="#6366f1">3.7</text>
      <text x="12" y="54" fontFamily="Inter,system-ui,sans-serif"
        fontSize="9" fill="#94a3b8">AI Score</text>
      <circle cx="96" cy="20" r="9" fill="#eef2ff"/>
      <path d="M93 21 L96 17 L99 21 L96 25 Z" fill="#6366f1"/>
    </g>

    {/* Floating card: Governance */}
    <g transform="translate(332,44)">
      <rect width="120" height="62" rx="14" fill="white" filter="url(#card-shadow)"/>
      <rect x="12" y="12" width="50" height="6" rx="3" fill="#e0f2fe"/>
      <text x="12" y="40" fontFamily="Inter,system-ui,sans-serif"
        fontWeight="700" fontSize="13" fill="#0ea5e9">Governance</text>
      <text x="12" y="54" fontFamily="Inter,system-ui,sans-serif"
        fontSize="9" fill="#94a3b8">✓ Compliant</text>
    </g>

    {/* Floating card: Tech Stack */}
    <g transform="translate(18,288)">
      <rect width="120" height="56" rx="14" fill="white" filter="url(#card-shadow)"/>
      <rect x="12" y="12" width="42" height="6" rx="3" fill="#d1fae5"/>
      <text x="12" y="38" fontFamily="Inter,system-ui,sans-serif"
        fontWeight="700" fontSize="13" fill="#10b981">Tech Stack</text>
      <text x="12" y="50" fontFamily="Inter,system-ui,sans-serif"
        fontSize="9" fill="#94a3b8">3 tools active</text>
    </g>

    {/* Floating card: Change */}
    <g transform="translate(334,298)">
      <rect width="118" height="56" rx="14" fill="white" filter="url(#card-shadow)"/>
      <rect x="12" y="12" width="46" height="6" rx="3" fill="#fef3c7"/>
      <text x="12" y="38" fontFamily="Inter,system-ui,sans-serif"
        fontWeight="700" fontSize="13" fill="#f59e0b">Readiness</text>
      <text x="12" y="50" fontFamily="Inter,system-ui,sans-serif"
        fontSize="9" fill="#94a3b8">↑ Improving</text>
    </g>

    {/* Connector dashed lines */}
    <line x1="143" y1="100" x2="196" y2="155" stroke="#6366f1"
      strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35"/>
    <line x1="332" y1="86" x2="290" y2="152" stroke="#0ea5e9"
      strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35"/>
    <line x1="138" y1="308" x2="196" y2="272" stroke="#10b981"
      strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35"/>
    <line x1="334" y1="316" x2="292" y2="275" stroke="#f59e0b"
      strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35"/>

    {/* Laptop base */}
    <rect x="145" y="248" width="190" height="13" rx="6" fill="#cbd5e1"/>
    <rect x="155" y="238" width="170" height="3" rx="1.5" fill="#e2e8f0"/>

    {/* Laptop screen */}
    <rect x="155" y="153" width="170" height="90" rx="8" fill="#1e293b"/>
    <rect x="162" y="160" width="156" height="76" rx="5" fill="#0f172a"/>

    {/* Screen content */}
    <rect x="168" y="168" width="58" height="6" rx="3" fill="#6366f1" opacity="0.85"/>
    <rect x="168" y="178" width="88" height="4" rx="2" fill="#334155"/>
    <rect x="168" y="186" width="68" height="4" rx="2" fill="#334155"/>

    {/* Mini bar chart */}
    <rect x="245" y="196" width="9" height="20" rx="2" fill="#6366f1" opacity="0.9"/>
    <rect x="257" y="190" width="9" height="26" rx="2" fill="#0ea5e9" opacity="0.9"/>
    <rect x="269" y="184" width="9" height="32" rx="2" fill="#10b981" opacity="0.9"/>
    <rect x="281" y="194" width="9" height="22" rx="2" fill="#f59e0b" opacity="0.9"/>

    {/* Person body */}
    <rect x="206" y="194" width="68" height="57" rx="14" fill="#6366f1"/>
    {/* Person head */}
    <circle cx="240" cy="181" r="22" fill="#fcd5b0"/>
    {/* Hair */}
    <path d="M218 177 C218 161 262 161 262 177" fill="#475569"/>
    {/* Eyes */}
    <circle cx="233" cy="182" r="2.5" fill="#92400e"/>
    <circle cx="247" cy="182" r="2.5" fill="#92400e"/>
    {/* Smile */}
    <path d="M234 190 Q240 195 246 190" stroke="#92400e"
      strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Collar */}
    <path d="M220 214 L240 224 L260 214" stroke="#4f46e5" strokeWidth="2" fill="none"/>

    {/* Decorative dots */}
    <circle cx="108" cy="163" r="5" fill="#6366f1" opacity="0.25"/>
    <circle cx="88"  cy="198" r="3" fill="#0ea5e9" opacity="0.3"/>
    <circle cx="372" cy="168" r="4" fill="#10b981" opacity="0.3"/>
    <circle cx="392" cy="208" r="3" fill="#f59e0b" opacity="0.3"/>
    <circle cx="362" cy="252" r="5" fill="#8b5cf6" opacity="0.22"/>
    <circle cx="118" cy="258" r="4" fill="#ec4899" opacity="0.22"/>
    <circle cx="200" cy="130" r="3" fill="#6366f1" opacity="0.2"/>
    <circle cx="280" cy="130" r="3" fill="#0ea5e9" opacity="0.2"/>
  </svg>
);

/* ── Stats ── */
const STATS = [
  { value: "55%", label: "công ty tăng ngân sách HR tech" },
  { value: "35%", label: "HR professionals dùng được AI" },
  { value: "4 chiều", label: "đánh giá toàn diện" },
  { value: "20 câu", label: "hỏi chuyên sâu" },
];

/* ── Dimensions ── */
const DIMS = [
  {
    icon: <IconFluency/>,
    en: "AI Fluency",
    vi: "Kỹ năng AI của Team",
    desc: "Đo lường khả năng HR professionals hiểu và sử dụng AI trong công việc hàng ngày.",
    card: "border-indigo-200 from-indigo-50",
    tag:  "bg-indigo-100 text-indigo-700",
  },
  {
    icon: <IconGovernance/>,
    en: "AI Governance",
    vi: "Quản trị & Đạo đức AI",
    desc: "Kiểm tra policy, quy trình kiểm soát bias và tính minh bạch khi dùng AI trong HR.",
    card: "border-sky-200 from-sky-50",
    tag:  "bg-sky-100 text-sky-700",
  },
  {
    icon: <IconTechStack/>,
    en: "Tech Stack",
    vi: "Hạ tầng Công nghệ",
    desc: "Đánh giá mức độ tích hợp AI trong HRIS, ATS và toàn bộ hệ thống HR hiện có.",
    card: "border-emerald-200 from-emerald-50",
    tag:  "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <IconChange/>,
    en: "Change Readiness",
    vi: "Sẵn sàng Thay đổi",
    desc: "Đo lường sự ủng hộ lãnh đạo, thái độ nhân viên và lộ trình chuyển đổi AI.",
    card: "border-amber-200 from-amber-50",
    tag:  "bg-amber-100 text-amber-700",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">

      {/* Dot-grid background */}
      <div className="fixed inset-0 bg-nodes opacity-50 pointer-events-none"/>

      {/* Ambient blobs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full
                      bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30 blur-3xl
                      animate-float-slow pointer-events-none"/>
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full
                      bg-gradient-to-br from-sky-100 to-emerald-100 opacity-25 blur-3xl
                      animate-float pointer-events-none"/>

      <div className="relative z-10">

        {/* Header badge */}
        <header className="flex justify-center pt-10 pb-4 px-4">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white
                          px-4 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-indigo-200">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse-soft inline-block"/>
            HR AI Readiness Scorecard · AIHR Trends 2026
          </div>
        </header>

        {/* Hero: 2-column */}
        <section className="max-w-6xl mx-auto px-6 pt-8 pb-16
                            flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left text */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
              Tổ chức của bạn{" "}
              <span className="text-gradient">sẵn sàng AI</span>
              <br/>đến mức nào?
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Đánh giá mức độ sẵn sàng AI trong HR qua <strong className="text-slate-700">4 chiều chiến lược</strong> và
              nhận lộ trình cải thiện cụ thể — chỉ trong <strong className="text-slate-700">5 phút</strong>.
            </p>

            <ul className="text-slate-600 text-sm space-y-2.5 mb-8 max-w-sm mx-auto lg:mx-0">
              {[
                "20 câu hỏi chuyên sâu, phân tích theo chiều",
                "Điểm số 1–4 với benchmark ngành",
                "Gợi ý cải thiện cụ thể theo kết quả",
                "Miễn phí · Không cần đăng ký",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center
                                   justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-indigo-600" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6 L5 8.5 L9.5 3.5" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold px-8 py-4 rounded-xl
                         shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300
                         transition-all duration-200 hover:scale-105 text-base group"
            >
              Bắt đầu đánh giá ngay
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0
                     111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75
                     0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
              </svg>
            </Link>
          </div>

          {/* Right: SVG illustration */}
          <div className="flex-1 flex justify-center animate-fade-in-delay">
            <HeroIllustration/>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-8">
          <div className="max-w-5xl mx-auto px-6
                          grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.value}>
                <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-indigo-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dimension cards */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
              Khung đánh giá
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">4 Chiều Chiến Lược</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Mỗi chiều phản ánh một khía cạnh quan trọng trong hành trình chuyển đổi AI của tổ chức HR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIMS.map((d) => (
              <div
                key={d.en}
                className={`rounded-2xl border p-6 bg-gradient-to-br ${d.card} to-white
                            transition-all duration-300 hover:-translate-y-1.5
                            hover:shadow-xl hover:shadow-slate-100`}
              >
                <div className="mb-4">{d.icon}</div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                                  ${d.tag} mb-3 inline-block`}>
                  {d.en}
                </span>
                <h3 className="font-bold text-slate-800 text-base mb-2">{d.vi}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
              Cách thức
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-12">Chỉ 3 bước đơn giản</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Trả lời 20 câu hỏi",
                  desc: "Chia thành 4 chiều, mỗi chiều 5 câu — thang điểm 1–4 rõ ràng." },
                { step: "02", title: "Nhận điểm số ngay",
                  desc: "Radar chart, điểm từng chiều và so sánh với benchmark ngành." },
                { step: "03", title: "Lộ trình cải thiện",
                  desc: "Gợi ý hành động cụ thể phù hợp với mức độ hiện tại của bạn." },
              ].map((item) => (
                <div key={item.step}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center
                                  justify-center font-extrabold text-lg mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Sẵn sàng khám phá mức độ AI của tổ chức?
            </h2>
            <p className="text-slate-500 mb-8">Miễn phí · 5 phút · Nhận kết quả ngay lập tức</p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold px-10 py-4 rounded-xl
                         shadow-lg shadow-indigo-200 transition-all duration-200
                         hover:scale-105 text-base group"
            >
              Bắt đầu đánh giá miễn phí
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0
                     111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75
                     0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 py-6 text-center text-slate-400 text-sm">
          Dựa trên dữ liệu từ AIHR HR Trends 2026 · Hỗ trợ HR professionals Việt Nam
        </footer>

      </div>
    </main>
  );
}
