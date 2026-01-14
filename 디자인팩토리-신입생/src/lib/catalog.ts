import type { Subject, Unit } from "./types";

export const SUBJECTS: Subject[] = [
  { id: "math", label: "수학", emoji: "📐", tagline: "미적/기하/확통 포함" },
  { id: "korean", label: "국어", emoji: "📘", tagline: "문학/비문학/언매" },
  { id: "english", label: "영어", emoji: "📗", tagline: "구문/독해/모의고사" },
  { id: "science", label: "과학탐구", emoji: "🔬", tagline: "물1/화1/생1/지1" },
  { id: "society", label: "사회탐구", emoji: "🧭", tagline: "사문/생윤/정법 등" },
  { id: "history", label: "한국사", emoji: "🏛️", tagline: "개념+기출" },
  { id: "second-language", label: "제2외국어/한문", emoji: "🈶", tagline: "선택 과목" }
];

// 단원은 데모용으로만 구성(확장 전제)
export const UNITS: Unit[] = [
  // 수학
  { id: "math-exp-log", subjectId: "math", label: "지수/로그" },
  { id: "math-trig", subjectId: "math", label: "삼각함수" },
  { id: "math-limit", subjectId: "math", label: "극한/연속" },
  { id: "math-derivative", subjectId: "math", label: "미분" },
  { id: "math-integral", subjectId: "math", label: "적분" },
  { id: "math-prob", subjectId: "math", label: "확률" },
  // 국어
  { id: "kor-literature", subjectId: "korean", label: "문학" },
  { id: "kor-nonfiction", subjectId: "korean", label: "독서(비문학)" },
  { id: "kor-language", subjectId: "korean", label: "문법/언매" },
  // 영어
  { id: "eng-reading", subjectId: "english", label: "독해" },
  { id: "eng-grammar", subjectId: "english", label: "어법/어휘" },
  { id: "eng-mock", subjectId: "english", label: "모의고사" },
  // 과탐(지구과학1만 예시 포함)
  { id: "sci-earth-universe", subjectId: "science", label: "지구과학1 - 우주" },
  { id: "sci-earth-geology", subjectId: "science", label: "지구과학1 - 지질" },
  { id: "sci-bio-genetics", subjectId: "science", label: "생명과학1 - 유전" },
  // 사탐
  { id: "soc-ethics", subjectId: "society", label: "생활과 윤리" },
  { id: "soc-society", subjectId: "society", label: "사회·문화" },
  { id: "soc-law", subjectId: "society", label: "정치와 법" }
];

export function unitsBySubject(subjectId: Subject["id"]) {
  return UNITS.filter((u) => u.subjectId === subjectId);
}

export function subjectLabel(subjectId: Subject["id"]) {
  return SUBJECTS.find((s) => s.id === subjectId)?.label ?? "과목";
}


