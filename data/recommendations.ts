import type { DimensionId, RecommendationSet } from "@/types";

export const RECOMMENDATIONS: Record<DimensionId, RecommendationSet> = {
  fluency: {
    low: [
      "📚 Bắt đầu với khóa học AI miễn phí: Google AI Essentials, Microsoft AI Skills Challenge",
      "🗓️ Tổ chức 'AI Demo Day' hàng tháng — mỗi người chia sẻ 1 use case AI họ thử nghiệm",
      "🎯 Chọn 1 AI tool đơn giản (ChatGPT, Copilot) và yêu cầu cả team dùng thử trong 30 ngày",
    ],
    mid: [
      "🏆 Tạo 'AI Champion' program — tìm 2–3 người trong team để dẫn dắt adoption",
      "📊 Đo lường số giờ tiết kiệm khi dùng AI và báo cáo kết quả với lãnh đạo hàng quý",
      "🔗 Tham gia cộng đồng HR AI (AIHR community, LinkedIn groups) để học từ peer",
    ],
    high: [
      "🌟 Tài liệu hóa AI playbook nội bộ cho HR — best practices, do's & don'ts",
      "👨‍🏫 Chuyển từ learner sang teacher: tổ chức AI training cho các phòng ban khác",
      "🚀 Đề xuất HR đại diện trong AI strategy committee của công ty ở cấp C-suite",
    ],
  },
  governance: {
    low: [
      "📋 Draft AI usage policy đơn giản (1–2 trang) — tham khảo mẫu từ SHRM hoặc AIHR",
      "👁️ Tạo checklist 'trước khi dùng AI trong quyết định nhân sự' cho toàn bộ HR team",
      "⚠️ Ưu tiên ngay: đảm bảo không tự động loại CV bằng AI mà không có human review",
    ],
    mid: [
      "🔍 Thực hiện AI audit lần đầu: review tất cả tools có AI component trong HR",
      "📢 Xây dựng quy trình thông báo minh bạch cho nhân viên về AI trong tuyển dụng/đánh giá",
      "🤝 Mời Legal và Compliance cùng HR xây dựng AI ethics framework cho tổ chức",
    ],
    high: [
      "🏅 Xem xét chứng chỉ ISO 42001 (AI Management System Standard) cho tổ chức",
      "📊 Thiết lập AI governance dashboard theo dõi compliance, fairness và risk KPIs",
      "🌐 Chia sẻ AI ethics framework ra ngoài — tăng employer brand và trust với ứng viên",
    ],
  },
  techstack: {
    low: [
      "💡 Audit HR tech stack hiện tại — liệt kê tất cả tools và AI capabilities có sẵn chưa khai thác",
      "🔌 Ưu tiên bật AI features trong tools đang có (thường miễn phí): HRIS, ATS, email",
      "💾 Dọn dẹp data HR: chuẩn hóa format, loại duplicates — AI chỉ tốt khi data sạch",
    ],
    mid: [
      "📊 Xây dựng business case cho 1 AI HR tool: ROI calculator + đề xuất pilot 3 tháng",
      "🗺️ Tạo HR tech roadmap 18 tháng với AI integration milestones và budget dự kiến",
      "🤖 Pilot ATS với AI screening CV — có thể tiết kiệm 60–70% thời gian sàng lọc ban đầu",
    ],
    high: [
      "🔮 Đánh giá các nền tảng AI HR end-to-end (Workday AI, SAP SuccessFactors, Rippling)",
      "📈 Xây dựng People Analytics capability: predictive attrition, skills gap forecasting",
      "🔗 Tích hợp HR data với business intelligence tools để HR ra quyết định dựa trên data",
    ],
  },
  change: {
    low: [
      "🎙️ Trình bày cho CEO/CHRO: AI không thay thế HR mà giải phóng HR để làm việc chiến lược hơn",
      "📰 Chia sẻ case studies công ty đối thủ đang dùng AI HR thành công — tạo FOMO tích cực",
      "🧘 Tổ chức 'AI anxiety' sessions — để nhân viên chia sẻ lo ngại trong môi trường an toàn",
    ],
    mid: [
      "🗺️ Draft AI transformation roadmap 12 tháng với milestones rõ và người chịu trách nhiệm",
      "🏆 Celebrate wins: chia sẻ story khi AI giúp HR làm được điều chưa từng làm được",
      "💬 Tạo Slack/Teams channel #hr-ai-ideas để nhân viên đề xuất use cases mới",
    ],
    high: [
      "📈 Thiết lập AI Transformation OKRs ở cấp HR department và báo cáo board hàng quý",
      "🌍 HR nên có ghế tại bàn AI governance của công ty — không chỉ implement mà co-design",
      "🎖️ Xây dựng 'AI-First HR' reputation để thu hút nhân tài và tăng employer brand",
    ],
  },
};

export function getRecs(dimId: DimensionId, score: number): string[] {
  const set = RECOMMENDATIONS[dimId];
  if (score < 2.0) return set.low;
  if (score < 3.0) return set.mid;
  return set.high;
}
