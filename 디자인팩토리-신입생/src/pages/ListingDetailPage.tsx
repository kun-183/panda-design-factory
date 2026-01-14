import { Link, useParams } from "react-router-dom";
import { Gallery } from "../components/Gallery";
import { Section } from "../components/Section";
import { SUBJECTS, UNITS, subjectLabel } from "../lib/catalog";
import { formatPriceWon } from "../lib/format";
import { MOCK_LISTINGS } from "../lib/mock";

export function ListingDetailPage() {
  const { id } = useParams();
  const listing = MOCK_LISTINGS.find((x) => x.id === id);

  if (!listing) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="text-lg font-extrabold">매물을 찾을 수 없어요</div>
        <div className="mt-2 text-sm text-slate-600">검색으로 돌아가서 다시 선택해 주세요.</div>
        <Link
          to="/search"
          className="mt-3 inline-block rounded-2xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-white"
        >
          검색으로 이동
        </Link>
      </div>
    );
  }

  const unitLabelMap = new Map(UNITS.map((u) => [u.id, u.label] as const));
  const unsolvedLabels = listing.unsolvedUnitIds.map((u) => unitLabelMap.get(u) ?? u);
  const subject = SUBJECTS.find((s) => s.id === listing.subjectId);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-500">문제집 상세</div>
          <div className="mt-1 text-2xl font-extrabold tracking-tight">{listing.title}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
              {subject ? `${subject.emoji} ${subject.label}` : subjectLabel(listing.subjectId)}
            </span>
            <span>{listing.publisher}</span>
            <span>·</span>
            <span>{listing.region}</span>
          </div>
        </div>
        <Link
          to="/search"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          목록
        </Link>
      </div>

      <Section title="사진" description="여러 장 업로드를 가정한 갤러리 UI입니다.">
        <Gallery images={listing.images} />
      </Section>

      <Section title="AI 분석 결과" description="(선택사항) 추후 실제 이미지 분석 모델로 대체됩니다.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-500">상태 점수</div>
              <div className="mt-1 text-3xl font-extrabold tracking-tight">
                {listing.ai.conditionScore}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-500">풀이 비율</div>
              <div className="mt-1 text-lg font-extrabold">
                {Math.round(listing.ai.solvedRatio * 100)}%
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.ai.notes.map((n) => (
              <span
                key={n}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section title="풀지 않은 단원" description="구매자가 가장 보고 싶은 핵심 정보!">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          {unsolvedLabels.length ? (
            <div className="flex flex-wrap gap-2">
              {unsolvedLabels.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-blue-50 px-3 py-2 text-sm font-extrabold text-blue-700"
                >
                  {l}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-sm font-semibold text-slate-600">
              등록된 미풀이 단원이 없어요.
            </div>
          )}
        </div>
      </Section>

      <Section title="가격" description="가격 + 거래 희망 지역을 한눈에.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex items-end justify-between">
            <div className="text-3xl font-extrabold tracking-tight">
              {formatPriceWon(listing.price)}
            </div>
            <div className="text-sm font-semibold text-slate-500">{listing.region}</div>
          </div>
        </div>
      </Section>

      <Section title="판매자 정보" description="프로필/거래 수/지역 등(목데이터)">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-extrabold">{listing.seller.nickname}</div>
              <div className="mt-1 text-xs text-slate-500">
                평점 {listing.seller.rating.toFixed(1)} · 거래 {listing.seller.deals}회 ·{" "}
                {listing.seller.region}
              </div>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700">
              메시지(예정)
            </div>
          </div>
        </div>
      </Section>

      <Section title="거래 방법" description="직거래/택배 중 가능한 방법을 표시합니다.">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex flex-wrap gap-2">
            {listing.dealMethods.includes("direct") ? (
              <span className="rounded-full bg-slate-900 px-3 py-2 text-sm font-extrabold text-white">
                직거래
              </span>
            ) : null}
            {listing.dealMethods.includes("delivery") ? (
              <span className="rounded-full bg-slate-900 px-3 py-2 text-sm font-extrabold text-white">
                택배
              </span>
            ) : null}
          </div>
        </div>
      </Section>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <div className="text-sm font-extrabold">다음 단계(2~3단계)</div>
        <div className="mt-1 text-xs text-slate-500">
          실제 서비스에서는 “연락하기/찜하기/결제(택배)”가 여기에 들어가요.
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-800"
          >
            찜(예정)
          </button>
          <button
            type="button"
            className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-soft"
          >
            연락하기(예정)
          </button>
        </div>
      </div>
    </div>
  );
}


