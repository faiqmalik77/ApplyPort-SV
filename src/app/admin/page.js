import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Admin",
};

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Overview</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Manage users, programs, and application statuses across ApplyPort-SV.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Registered users", value: "1,248", hint: "All time" },
          { label: "Open applications", value: "312", hint: "In review" },
          { label: "System alerts", value: "0", hint: "Healthy" },
        ].map((c, i) => (
          <FadeIn key={c.label} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6">
              <p className="text-3xl font-bold text-[var(--accent)]">{c.value}</p>
              <p className="mt-1 font-medium">{c.label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{c.hint}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 text-sm text-[var(--muted)] leading-relaxed">
        Admin tools are restricted to authorized staff. Always sign out on shared
        devices.
      </FadeIn>
    </div>
  );
}
