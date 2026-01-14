import type { Subject } from "../lib/types";

export function SubjectGrid({
  subjects,
  onPick
}: {
  subjects: Subject[];
  onPick: (subjectId: Subject["id"]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {subjects.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onPick(s.id)}
          className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-soft transition active:translate-y-[1px]"
        >
          <div className="flex items-start justify-between">
            <div className="text-2xl">{s.emoji}</div>
            <div className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
              선택
            </div>
          </div>
          <div className="mt-3 text-base font-extrabold tracking-tight">
            {s.label}
          </div>
          <div className="mt-1 text-xs text-slate-500">{s.tagline}</div>
        </button>
      ))}
    </div>
  );
}


