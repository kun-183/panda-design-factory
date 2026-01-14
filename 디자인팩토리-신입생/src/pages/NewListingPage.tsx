import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Chip } from "../components/Chip";
import { Section } from "../components/Section";
import { SUBJECTS, unitsBySubject } from "../lib/catalog";
import type { DealMethod, SubjectId } from "../lib/types";

type UploadPreview = { id: string; url: string; name: string };

export function NewListingPage() {
  const nav = useNavigate();

  const [subjectId, setSubjectId] = useState<SubjectId>("math");
  const units = useMemo(() => unitsBySubject(subjectId), [subjectId]);
  const [unsolved, setUnsolved] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [price, setPrice] = useState<number>(12000);
  const [region, setRegion] = useState("");
  const [dealMethods, setDealMethods] = useState<DealMethod[]>(["direct"]);
  const [uploads, setUploads] = useState<UploadPreview[]>([]);

  function toggleUnsolved(id: string) {
    setUnsolved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleDeal(m: DealMethod) {
    setDealMethods((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const next: UploadPreview[] = [];
    for (const f of Array.from(files)) {
      const url = URL.createObjectURL(f);
      next.push({ id: `${f.name}-${f.size}-${f.lastModified}`, url, name: f.name });
    }
    setUploads((prev) => [...prev, ...next].slice(0, 6));
  }

  const canSubmit =
    title.trim().length >= 2 &&
    publisher.trim().length >= 2 &&
    price > 0 &&
    region.trim().length >= 2 &&
    dealMethods.length > 0;

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-500">판매자 · 문제집 등록</div>
          <div className="mt-1 text-2xl font-extrabold tracking-tight">문제집 등록하기</div>
          <div className="mt-2 text-sm text-slate-600">
            1단계(UI)에서는 등록 폼 UX를 완성하고, 저장/업로드는 2단계에서 연동합니다.
          </div>
        </div>
        <Link
          to="/search"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          검색
        </Link>
      </div>

      <Section
        title="사진 업로드"
        description="여러 장 업로드(최대 6장). 3단계에서 AI 분석으로 풀이 상태를 자동 추정합니다."
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <label className="block">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
              <div className="text-sm font-extrabold">사진 추가</div>
              <div className="mt-1 text-xs text-slate-500">JPG/PNG · 여러 장 선택 가능</div>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>

          {uploads.length ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {uploads.map((u) => (
                <div key={u.id} className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                  <img src={u.url} alt={u.name} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 text-xs text-slate-500">아직 업로드한 사진이 없어요.</div>
          )}
        </div>
      </Section>

      <Section title="과목" description="구매자 검색 필터와 동일한 분류를 사용합니다.">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <Chip
              key={s.id}
              label={`${s.emoji} ${s.label}`}
              selected={subjectId === s.id}
              onClick={() => {
                setSubjectId(s.id);
                setUnsolved([]);
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="문제집 정보" description="문제집명/출판사를 입력하세요.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <label className="block">
            <div className="text-xs font-semibold text-slate-500">문제집명</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 지구과학1 개념 완성"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
            />
          </label>
          <label className="mt-3 block">
            <div className="text-xs font-semibold text-slate-500">출판사</div>
            <input
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="예: 별과학"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
            />
          </label>
        </div>
      </Section>

      <Section
        title="풀지 않은 단원(다중 선택)"
        description="구매자가 ‘상세설명’ 대신 바로 확인할 수 있도록 핵심 정보를 구조화합니다."
      >
        <div className="flex flex-wrap gap-2">
          {units.map((u) => (
            <Chip
              key={u.id}
              label={u.label}
              selected={unsolved.includes(u.id)}
              onClick={() => toggleUnsolved(u.id)}
            />
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-500">
          선택된 미풀이 단원: {unsolved.length ? `${unsolved.length}개` : "없음"}
        </div>
      </Section>

      <Section title="가격/지역/거래" description="직거래/택배 옵션을 선택하세요.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <label className="block">
            <div className="text-xs font-semibold text-slate-500">가격(원)</div>
            <input
              type="number"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
            />
          </label>
          <label className="mt-3 block">
            <div className="text-xs font-semibold text-slate-500">거래 희망 지역</div>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예: 서울 강남구"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
            />
          </label>
          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-500">거래 방법</div>
            <div className="mt-2 flex gap-2">
              <Chip label="직거래" selected={dealMethods.includes("direct")} onClick={() => toggleDeal("direct")} />
              <Chip label="택배" selected={dealMethods.includes("delivery")} onClick={() => toggleDeal("delivery")} />
            </div>
          </div>
        </div>
      </Section>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="text-sm font-extrabold">등록 미리보기</div>
        <div className="mt-1 text-xs text-slate-500">
          실제 저장 대신, 등록 후 검색 결과로 이동(데모)합니다.
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => {
            const p = new URLSearchParams();
            p.set("subject", subjectId);
            p.set("units", unsolved.join(","));
            p.set("sort", "new");
            nav(`/search?${p.toString()}`);
          }}
          className={[
            "mt-3 w-full rounded-2xl px-4 py-3 text-sm font-extrabold shadow-soft",
            canSubmit
              ? "bg-slate-900 text-white active:translate-y-[1px]"
              : "cursor-not-allowed bg-slate-200 text-slate-500"
          ].join(" ")}
        >
          등록(데모) → 검색 결과로 이동
        </button>

        <div className="mt-2 text-xs text-slate-500">
          2단계에서 이미지 업로드/DB 저장, 3단계에서 AI 상태 분석을 붙일 수 있어요.
        </div>
      </div>
    </div>
  );
}


