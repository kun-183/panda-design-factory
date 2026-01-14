import { useNavigate } from "react-router-dom";
import { SUBJECTS } from "../lib/catalog";
import { SubjectGrid } from "../components/SubjectGrid";
import { Section } from "../components/Section";

export function HomePage() {
  const nav = useNavigate();

  return (
    <div>
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-5 text-white shadow-soft">
        <div className="text-xs font-semibold text-white/80">중고 문제집 거래</div>
        <div className="mt-1 text-2xl font-extrabold tracking-tight">
          단원만 골라서,
          <br />
          딱 맞게 사고팔기
        </div>
        <div className="mt-3 text-sm text-white/80">
          “풀지 않은 단원” 기준으로 필터링해 상세설명 탐색 시간을 줄여요.
        </div>
      </div>

      <Section
        title="과목 선택"
        description="먼저 과목을 고르면, 단원 체크 → 검색 결과로 바로 이동합니다."
      >
        <SubjectGrid
          subjects={SUBJECTS}
          onPick={(subjectId) =>
            nav(`/units?subject=${encodeURIComponent(subjectId)}`)
          }
        />
      </Section>
    </div>
  );
}


