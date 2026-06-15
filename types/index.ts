export type DimensionId = "fluency" | "governance" | "techstack" | "change";

export interface Dimension {
  id: DimensionId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  lightBg: string;
  description: string;
}

export interface AnswerOption {
  value: 1 | 2 | 3 | 4;
  label: string;
  sublabel: string;
}

export interface Question {
  id: string;
  dimensionId: DimensionId;
  text: string;
}

// Score per dimension: average of 5 answers → 1.0–4.0
export type DimensionScore = Record<DimensionId, number>;

export interface ScoreResult {
  dimensions: DimensionScore;
  total: number; // average of 4 dimensions, 1.0–4.0
}

export type MaturityLevel = "beginner" | "developing" | "proficient" | "advanced";

export interface MaturityInfo {
  level: MaturityLevel;
  labelEn: string;
  labelVi: string;
  color: string;
  bg: string;
  description: string;
}

export interface Recommendation {
  text: string;
}

export type RecommendationSet = {
  low: string[];   // score < 2.0
  mid: string[];   // 2.0 ≤ score < 3.0
  high: string[];  // score ≥ 3.0
};

export interface AssessmentAnswers {
  fluency: number[];
  governance: number[];
  techstack: number[];
  change: number[];
}
