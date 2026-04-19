import Link from "next/link";
import { LayoutGrid, Users, FileStack, Shield } from "lucide-react";
import { adminNav } from "@/lib/nav";

const icons = {
  "/admin": LayoutGrid,
  "/admin/users": Users,
  "/admin/applications": FileStack,
};

export default function AdminLayout({ children }) {
  return (
    <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:gap-10 lg:px-8 lg:py-14">
      <aside className="glass w-full shrink-0 rounded-2xl p-4 lg:sticky lg:top-24 lg:w-56 lg:self-start">
        <div className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-[var(--accent)]">
          <Shield className="h-4 w-4" />
          Admin
        </div>
        <nav className="mt-4 flex flex-col gap-1">
          {adminNav.map((item) => {
            const Icon = icons[item.href] ?? LayoutGrid;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="mt-6 block px-3 text-xs text-[var(--muted)] hover:text-[var(--accent)]"
        >
          ← Exit to site
        </Link>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
