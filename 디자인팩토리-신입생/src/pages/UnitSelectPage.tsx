import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Chip } from "../components/Chip";
import { Section } from "../components/Section";
import { SUBJECTS, unitsBySubject } from "../lib/catalog";
import type { SubjectId } from "../lib/types";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function UnitSelectPage() {
  const nav = useNavigate();
  const q = useQuery();
  const subjectId = (q.get("subject") ?? "math") as SubjectId;
  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0];
  const units = useMemo(() => unitsBySubject(subject.id), [subject.id]);

  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const selectedCount = selected.length;

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-500">단원 선택</div>
          <div className="mt-1 text-2xl font-extrabold tracking-tight">
            {subject.emoji} {subject.label}
          </div>
          <div className="mt-2 text-sm text-slate-600">
            풀지 않은 단원을 체크하면, 그 단원을 “미풀이”로 등록한 매물만 모아봐요.
          </div>
        </div>
        <Link
          to="/"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          과목 변경
        </Link>
      </div>

      <Section
        title="풀지 않은 단원(다중 선택)"
        description="체크박스 느낌의 칩 UI · 필요하면 더 많은 단원을 추가할 수 있어요."
        right={
          selectedCount ? (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700"
            >
              선택 해제
            </button>
          ) : null
        }
      >
        <div className="flex flex-wrap gap-2">
          {units.map((u) => (
            <Chip
              key={u.id}
              label={u.label}
              selected={selected.includes(u.id)}
              onClick={() => toggle(u.id)}
            />
          ))}
        </div>
      </Section>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="text-sm font-extrabold">다음 단계</div>
        <div className="mt-1 text-xs text-slate-500">
          선택한 단원으로 검색 결과 페이지로 이동합니다.
        </div>

        <button
          type="button"
          onClick={() => {
            const p = new URLSearchParams();
            p.set("subject", subject.id);
            p.set("units", selected.join(","));
            p.set("sort", "clean");
            nav(`/search?${p.toString()}`);
          }}
          className="mt-3 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white shadow-soft active:translate-y-[1px]"
        >
          {selectedCount ? `선택 완료 (${selectedCount}개) → 검색` : "단원 없이 검색"}
        </button>
      </div>
    </div>
  );
}


