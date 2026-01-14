function cx(...v: Array<string | false | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function Chip({
  label,
  selected,
  onClick
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-2 text-sm font-semibold transition active:translate-y-[1px]",
        selected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700"
      )}
    >
      {label}
    </button>
  );
}


