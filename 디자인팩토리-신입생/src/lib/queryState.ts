import type { SubjectId } from "./types";

export type SearchSort = "clean" | "price" | "new";

export type SearchState = {
  subjectId?: SubjectId;
  unitIds: string[];
  sort: SearchSort;
};

export function parseSearchState(search: string): SearchState {
  const p = new URLSearchParams(search);
  const subjectId = (p.get("subject") ?? undefined) as SubjectId | undefined;
  const unitIds = (p.get("units") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const sort = (p.get("sort") ?? "clean") as SearchSort;
  return { subjectId, unitIds, sort };
}

export function toSearchParams(state: SearchState) {
  const p = new URLSearchParams();
  if (state.subjectId) p.set("subject", state.subjectId);
  if (state.unitIds.length) p.set("units", state.unitIds.join(","));
  p.set("sort", state.sort);
  return p;
}


