import { Link } from "react-router-dom";
import type { Listing } from "../lib/types";
import { formatPriceWon, formatRelative } from "../lib/format";
import { subjectLabel } from "../lib/catalog";

export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft active:translate-y-[1px]"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {cover ? (
          <img
            src={cover}
            alt={`${listing.title} 표지`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate text-sm font-extrabold">{listing.title}</div>
          <div className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-extrabold text-emerald-700">
            깔끔 {listing.ai.conditionScore}
          </div>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
            {subjectLabel(listing.subjectId)}
          </span>
          <span className="truncate">{listing.publisher}</span>
          <span>·</span>
          <span>{formatRelative(listing.createdAt)}</span>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div className="text-base font-extrabold">{formatPriceWon(listing.price)}</div>
          <div className="text-xs font-semibold text-slate-500">{listing.region}</div>
        </div>
      </div>
    </Link>
  );
}


