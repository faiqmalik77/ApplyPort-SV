import PageShell from "@/components/layout/PageShell";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Application tracking",
};

const events = [
  { t: "Apr 18 · 09:12", msg: "Email reminder — outstanding LOR" },
  { t: "Apr 14 · 16:40", msg: "Status → Under review" },
  { t: "Apr 08 · 11:02", msg: "Documents received" },
  { t: "Apr 05 · 08:56", msg: "Application submitted" },
];

export default function TrackingPage() {
  return (
    <PageShell
      title="Application tracking"
      subtitle="See a clear history of status changes and notifications for your applications."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn>
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Live activity</h2>
            <ul className="mt-6 space-y-4">
              {events.map((e, i) => (
                <li
                  key={e.t}
                  className="flex gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                >
                  <span className="shrink-0 font-mono text-xs text-[var(--muted)]">
                    {e.t}
                  </span>
                  <span className="text-sm">{e.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold">What you will see</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
              <li>Clear labels for pending, accepted, and rejected outcomes</li>
              <li>Email alerts when you enable notifications in your account</li>
              <li>The same applications as on Your applications — always in sync</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
