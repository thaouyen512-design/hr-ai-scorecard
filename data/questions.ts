import type { Dimension, AnswerOption, Question, DimensionId } from "@/types";

export const DIMENSIONS: Dimension[] = [
  {
    id: "fluency",
    label: "AI Fluency",
    sublabel: "Kỹ năng AI của team",
    icon: "🧠",
    color: "#6366f1",
    lightBg: "#eef2ff",
    description: "Mức độ HR team có thể sử dụng AI trong công việc hàng ngày.",
  },
  {
    id: "governance",
    label: "Governance & Ethics",
    sublabel: "Quản trị & Đạo đức AI",
    icon: "⚖️",
    color: "#0ea5e9",
    lightBg: "#f0f9ff",
    description: "Khung chính sách, giám sát và đạo đức AI trong tổ chức.",
  },
  {
    id: "techstack",
    label: "Tech Stack",
    sublabel: "Hạ tầng công nghệ HR",
    icon: "🛠️",
    color: "#10b981",
    lightBg: "#ecfdf5",
    description: "Mức độ sẵn sàng của công nghệ HR hiện tại để tích hợp AI.",
  },
  {
    id: "change",
    label: "Change Readiness",
    sublabel: "Sẵn sàng thay đổi",
    icon: "🚀",
    color: "#f59e0b",
    lightBg: "#fffbeb",
    description: "Cam kết của lãnh đạo và văn hóa tổ chức với chuyển đổi AI.",
  },
];

export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: 1, label: "Chưa có / Hoàn toàn không", sublabel: "Chưa bắt đầu" },
  { value: 2, label: "Đang lên kế hoạch / Rất ít", sublabel: "Giai đoạn thăm dò" },
  { value: 3, label: "Đang triển khai / Phần lớn", sublabel: "Đang thực hiện" },
  { value: 4, label: "Hoàn toàn có / Dẫn đầu ngành", sublabel: "Đạt chuẩn cao nhất" },
];

const makeQuestions = (dimId: DimensionId, texts: string[]): Question[] =>
  texts.map((text, i) => ({ id: `${dimId}_${i + 1}`, dimensionId: dimId, text }));

export const QUESTIONS: Question[] = [
  ...makeQuestions("fluency", [
    "HR team có sử dụng AI tools (ChatGPT, Copilot…) trong công việc hàng ngày không?",
    "Bao nhiêu % HR professionals đã được đào tạo về AI cơ bản?",
    "Team có thể dùng AI để viết JD, phân tích CV hoặc dữ liệu nhân sự không?",
    "Có người chuyên trách AI adoption trong HR team không?",
    "Team có chủ động theo dõi xu hướng AI trong HR (đọc báo, hội thảo) không?",
  ]),
  ...makeQuestions("governance", [
    "Tổ chức có AI usage policy (chính sách sử dụng AI) chính thức không?",
    "Có quy trình review kết quả AI trước khi dùng vào quyết định nhân sự không?",
    "Có quy trình kiểm tra bias trong AI outputs ảnh hưởng đến nhân viên không?",
    "Nhân viên có được thông báo khi AI được dùng trong quy trình HR không?",
    "Có risk assessment định kỳ cho các AI tools đang sử dụng trong HR không?",
  ]),
  ...makeQuestions("techstack", [
    "HRIS (phần mềm quản lý nhân sự) hiện tại có tích hợp AI features không?",
    "ATS (hệ thống tuyển dụng) có dùng AI để sàng lọc hoặc ranking CV không?",
    "Có platform LMS/learning để hỗ trợ reskilling nhân viên không?",
    "Dữ liệu HR có được chuẩn hóa và có cấu trúc để AI phân tích không?",
    "Ngân sách HR tech có phần được phân bổ riêng cho AI tools/projects không?",
  ]),
  ...makeQuestions("change", [
    "Ban lãnh đạo (C-suite) có ủng hộ và đầu tư vào việc đưa AI vào HR không?",
    "Nhân viên HR có thái độ tích cực (không sợ hãi) về AI không?",
    "Tổ chức có roadmap chuyển đổi AI cho HR trong 1–2 năm tới không?",
    "Đã có ít nhất 1 AI pilot project nào được thực hiện trong HR chưa?",
    "Có kênh/cơ chế để nhân viên chia sẻ lo ngại về AI ảnh hưởng công việc không?",
  ]),
];

export const QUESTIONS_BY_DIM: Record<DimensionId, Question[]> = {
  fluency: QUESTIONS.filter((q) => q.dimensionId === "fluency"),
  governance: QUESTIONS.filter((q) => q.dimensionId === "governance"),
  techstack: QUESTIONS.filter((q) => q.dimensionId === "techstack"),
  change: QUESTIONS.filter((q) => q.dimensionId === "change"),
};
