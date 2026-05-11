import Link from "next/link";
import { LayoutDashboard, FileStack, TrendingUp, Bell } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Dashboard",
};

const quick = [
  { label: "New application", href: "/applications/new", tone: "accent" },
  { label: "Search programs", href: "/programs", tone: "muted" },
  { label: "Mock interview", href: "/mock-interview", tone: "muted" },
];

export default function DashboardPage() {
  return (
    <div className="w-full py-8 sm:py-10 lg:py-12">
      <div className="mb-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          Overview of your activity — applications, updates, and shortcuts.
        </p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <FadeIn className="space-y-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Active apps", value: "3", icon: FileStack },
                { label: "In review", value: "1", icon: TrendingUp },
                { label: "Alerts", value: "2", icon: Bell },
              ].map((c) => (
                <div
                  key={c.label}
                  className="glass rounded-2xl p-5 transition hover:border-[var(--accent)]/30"
                >
                  <c.icon className="h-5 w-5 text-[var(--accent)]" />
                  <p className="mt-3 text-3xl font-bold">{c.value}</p>
                  <p className="text-sm text-[var(--muted)]">{c.label}</p>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-[var(--muted)]" />
                <h2 className="text-lg font-semibold">Recent updates</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li className="flex justify-between gap-4 border-b border-[var(--border)] pb-3">
                  <span>Document verified — MSc Data Science</span>
                  <span className="shrink-0 text-[var(--accent)]">Today</span>
                </li>
                <li className="flex justify-between gap-4 border-b border-[var(--border)] pb-3">
                  <span>Status changed to Under review</span>
                  <span className="shrink-0">2d ago</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>New offer matching your profile</span>
                  <span className="shrink-0 text-[var(--foreground)]">
                    See offers
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass sticky top-28 rounded-2xl p-6">
              <h2 className="font-semibold">Quick actions</h2>
              <div className="mt-4 flex flex-col gap-2">
                {quick.map((q) => (
                  <Link
                    key={q.href}
                    href={q.href}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      q.tone === "accent"
                        ? "bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-95"
                        : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-xs text-[var(--muted)]">
                Your overview updates as you submit applications and receive
                decisions.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
