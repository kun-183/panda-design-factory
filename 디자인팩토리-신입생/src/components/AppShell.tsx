import { Link, NavLink, useLocation } from "react-router-dom";

function cx(...v: Array<string | false | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const showBottom = !loc.pathname.startsWith("/listing/");

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-soft">
              🐼
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">책 판다</div>
              <div className="text-xs text-slate-500">단원 기반 중고 문제집</div>
            </div>
          </Link>
          <Link
            to="/sell/new"
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-soft active:translate-y-[1px]"
          >
            판매 등록
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-screen-sm px-4 py-4 pb-24">{children}</main>

      {showBottom && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 px-2 py-2">
            <NavItem to="/" label="과목" />
            <NavItem to="/search" label="검색" />
            <NavItem to="/sell/new" label="등록" />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "mx-2 rounded-xl px-3 py-2 text-center text-sm font-semibold",
          isActive ? "bg-slate-900 text-white" : "text-slate-600"
        )
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}


