export type SubjectId =
  | "math"
  | "korean"
  | "english"
  | "science"
  | "society"
  | "history"
  | "second-language";

export type Subject = {
  id: SubjectId;
  label: string;
  emoji: string;
  tagline: string;
};

export type Unit = {
  id: string;
  subjectId: SubjectId;
  label: string;
};

export type DealMethod = "direct" | "delivery";

export type Seller = {
  id: string;
  nickname: string;
  rating: number; // 0~5
  deals: number;
  region: string;
};

export type AiAnalysis = {
  conditionScore: number; // 0~100 "깔끔한 순" 기준
  solvedRatio: number; // 0~1
  notes: string[];
};

export type Listing = {
  id: string;
  subjectId: SubjectId;
  title: string; // 문제집명
  publisher: string;
  price: number;
  region: string;
  createdAt: string; // ISO
  images: string[];
  unsolvedUnitIds: string[];
  seller: Seller;
  dealMethods: DealMethod[];
  ai: AiAnalysis;
};


