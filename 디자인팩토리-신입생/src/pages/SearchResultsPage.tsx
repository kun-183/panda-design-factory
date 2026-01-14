import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Chip } from "../components/Chip";
import { ListingCard } from "../components/ListingCard";
import { Section } from "../components/Section";
import { SUBJECTS, UNITS, subjectLabel, unitsBySubject } from "../lib/catalog";
import { clamp } from "../lib/format";
import { MOCK_LISTINGS } from "../lib/mock";
import { parseSearchState, toSearchParams, type SearchSort } from "../lib/queryState";
import type { Listing, SubjectId } from "../lib/types";

function sortLabel(s: SearchSort) {
  if (s === "clean") return "깔끔한 순";
  if (s === "price") return "가격 낮은 순";
  return "최신 등록순";
}

function applyFilters(list: Listing[], subjectId?: SubjectId, unitIds?: string[]) {
  let out = [...list];
  if (subjectId) out = out.filter((x) => x.subjectId === subjectId);
  if (unitIds?.length) {
    out = out.filter((x) => unitIds.every((u) => x.unsolvedUnitIds.includes(u)));
  }
  return out;
}

function applySort(list: Listing[], sort: SearchSort) {
  const out = [...list];
  if (sort === "clean") out.sort((a, b) => b.ai.conditionScore - a.ai.conditionScore);
  if (sort === "price") out.sort((a, b) => a.price - b.price);
  if (sort === "new") out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return out;
}

export function SearchResultsPage() {
  const loc = useLocation();
  const nav = useNavigate();
  const state = useMemo(() => parseSearchState(loc.search), [loc.search]);

  const unitsForSubject = useMemo(() => {
    if (!state.subjectId) return [];
    return unitsBySubject(state.subjectId);
  }, [state.subjectId]);

  const results = useMemo(() => {
    const filtered = applyFilters(MOCK_LISTINGS, state.subjectId, state.unitIds);
    return applySort(filtered, state.sort);
  }, [state.subjectId, state.unitIds, state.sort]);

  const subject = SUBJECTS.find((s) => s.id === state.subjectId);
  const selectedUnitLabels = useMemo(() => {
    const map = new Map(UNITS.map((u) => [u.id, u.label] as const));
    return state.unitIds.map((id) => map.get(id) ?? id);
  }, [state.unitIds]);

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-500">검색 필터</div>
            <div className="mt-1 text-lg font-extrabold tracking-tight">
              {subject ? `${subject.emoji} ${subject.label}` : "전체 과목"}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                to="/"
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700"
              >
                과목 다시 고르기
              </Link>
              {state.subjectId ? (
                <Link
                  to={`/units?subject=${encodeURIComponent(state.subjectId)}`}
                  className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700"
                >
                  단원 체크하기
                </Link>
              ) : null}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">정렬</div>
            <div className="mt-1 text-sm font-extrabold">{sortLabel(state.sort)}</div>
          </div>
        </div>

        {selectedUnitLabels.length ? (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <div className="text-xs font-semibold text-slate-500">선택 단원</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedUnitLabels.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <Section
        title="정렬 옵션"
        description="AI 상태 점수(깔끔함), 가격, 최신순으로 빠르게 정리합니다."
      >
        <div className="flex flex-wrap gap-2">
          {(["clean", "price", "new"] as const).map((s) => (
            <Chip
              key={s}
              label={sortLabel(s)}
              selected={state.sort === s}
              onClick={() => {
                const next = { ...state, sort: s };
                nav(`/search?${toSearchParams(next).toString()}`);
              }}
            />
          ))}
        </div>
      </Section>

      {state.subjectId ? (
        <Section title="단원 빠른 토글" description="검색 결과에서 단원을 바로 켜고 끌 수 있어요.">
          <div className="flex flex-wrap gap-2">
            {unitsForSubject.map((u) => {
              const on = state.unitIds.includes(u.id);
              return (
                <Chip
                  key={u.id}
                  label={u.label}
                  selected={on}
                  onClick={() => {
                    const unitIds = on
                      ? state.unitIds.filter((x) => x !== u.id)
                      : [...state.unitIds, u.id];
                    nav(`/search?${toSearchParams({ ...state, unitIds }).toString()}`);
                  }}
                />
              );
            })}
          </div>
        </Section>
      ) : null}

      <Section
        title={`검색 결과 (${results.length}개)`}
        description={
          results.length
            ? "카드를 눌러 상세 페이지에서 AI 분석/미풀이 단원을 확인하세요."
            : "조건에 맞는 매물이 없어요. 단원을 줄이거나 과목을 바꿔보세요."
        }
        right={
          <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700">
            데모 데이터 {clamp(results.length, 0, 99)}개
          </div>
        }
      >
        <div className="space-y-3">
          {results.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </Section>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="text-sm font-extrabold">판매자라면?</div>
        <div className="mt-1 text-xs text-slate-500">
          문제집 등록 페이지에서 과목/단원/사진을 넣어 등록 흐름을 확인할 수 있어요.
        </div>
        <Link
          to="/sell/new"
          className="mt-3 block w-full rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-soft active:translate-y-[1px]"
        >
          문제집 등록하러 가기
        </Link>
        <div className="mt-2 text-xs text-slate-500">
          현재는 프론트 UI만 구현되어 있으며, 저장은 목데이터로 대체됩니다.
        </div>
      </div>
    </div>
  );
}


