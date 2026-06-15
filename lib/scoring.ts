import type { AssessmentAnswers, ScoreResult, MaturityInfo, DimensionId } from "@/types";

export function calcScores(answers: AssessmentAnswers): ScoreResult {
  const dimensionIds: DimensionId[] = ["fluency", "governance", "techstack", "change"];
  const dimensions = {} as Record<DimensionId, number>;

  for (const id of dimensionIds) {
    const ans = answers[id];
    dimensions[id] = ans.length
      ? parseFloat((ans.reduce((a, b) => a + b, 0) / ans.length).toFixed(2))
      : 1;
  }

  const total = parseFloat(
    (Object.values(dimensions).reduce((a, b) => a + b, 0) / dimensionIds.length).toFixed(2)
  );

  return { dimensions, total };
}

export function getMaturity(score: number): MaturityInfo {
  if (score < 1.75)
    return {
      level: "beginner",
      labelEn: "Beginner",
      labelVi: "Chưa bắt đầu",
      color: "#ef4444",
      bg: "#fef2f2",
      description: "Tổ chức mới bắt đầu hành trình AI trong HR. Cần nền tảng cơ bản.",
    };
  if (score < 2.5)
    return {
      level: "developing",
      labelEn: "Developing",
      labelVi: "Đang phát triển",
      color: "#f59e0b",
      bg: "#fffbeb",
      description: "Đang thăm dò và bắt đầu triển khai AI. Cần tăng tốc có hệ thống.",
    };
  if (score < 3.25)
    return {
      level: "proficient",
      labelEn: "Proficient",
      labelVi: "Đang tiến tới",
      color: "#0ea5e9",
      bg: "#f0f9ff",
      description: "Đang triển khai AI có hệ thống. Tập trung vào scale và governance.",
    };
  return {
    level: "advanced",
    labelEn: "Advanced",
    labelVi: "Dẫn đầu",
    color: "#10b981",
    bg: "#ecfdf5",
    description: "HR đang ở nhóm dẫn đầu về AI readiness. Tiếp tục đổi mới và chia sẻ.",
  };
}

export function scoreToPercent(score: number): number {
  return Math.round(((score - 1) / 3) * 100);
}
