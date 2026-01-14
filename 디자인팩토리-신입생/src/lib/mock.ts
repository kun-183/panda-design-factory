import type { Listing } from "./types";

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "bp-1001",
    subjectId: "math",
    title: "수학 기출 4점 집중 (2025)",
    publisher: "가나출판",
    price: 12000,
    region: "서울 강남구",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    images: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1200&q=80"
    ],
    unsolvedUnitIds: ["math-exp-log", "math-integral"],
    seller: { id: "u-1", nickname: "강남곰", rating: 4.8, deals: 31, region: "서울 강남구" },
    dealMethods: ["direct", "delivery"],
    ai: {
      conditionScore: 91,
      solvedRatio: 0.62,
      notes: ["필기 적음", "모서리 약간 사용감", "찢김 없음"]
    }
  },
  {
    id: "bp-1002",
    subjectId: "science",
    title: "지구과학1 개념 완성 (우주 파트 거의 새책)",
    publisher: "별과학",
    price: 9000,
    region: "대전 서구",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    images: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80"
    ],
    unsolvedUnitIds: ["sci-earth-universe"],
    seller: { id: "u-2", nickname: "대전별", rating: 4.6, deals: 14, region: "대전 서구" },
    dealMethods: ["direct"],
    ai: {
      conditionScore: 96,
      solvedRatio: 0.22,
      notes: ["표지 깨끗", "형광펜 거의 없음", "스캔/낙서 흔적 없음"]
    }
  },
  {
    id: "bp-1003",
    subjectId: "korean",
    title: "국어 독서 비문학 300제",
    publisher: "문장연구소",
    price: 7000,
    region: "부산 해운대구",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    images: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80"
    ],
    unsolvedUnitIds: ["kor-nonfiction"],
    seller: { id: "u-3", nickname: "해운대펭", rating: 4.2, deals: 7, region: "부산 해운대구" },
    dealMethods: ["delivery"],
    ai: {
      conditionScore: 78,
      solvedRatio: 0.84,
      notes: ["필기 많음", "페이지 접힘 일부", "본문 상태 양호"]
    }
  }
];


