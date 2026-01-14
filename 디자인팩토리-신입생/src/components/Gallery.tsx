import { useMemo, useState } from "react";

export function Gallery({ images }: { images: string[] }) {
  const safe = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);
  const main = safe[active];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
        {main ? (
          <img
            src={main}
            alt="문제집 사진"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      {safe.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {safe.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={[
                "h-16 w-16 shrink-0 overflow-hidden rounded-xl border",
                i === active ? "border-slate-900" : "border-slate-200"
              ].join(" ")}
            >
              <img
                src={src}
                alt={`문제집 미리보기 ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}


