export function Section({
  title,
  description,
  right,
  children
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-extrabold tracking-tight">{title}</div>
          {description ? (
            <div className="mt-1 text-xs text-slate-500">{description}</div>
          ) : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}


