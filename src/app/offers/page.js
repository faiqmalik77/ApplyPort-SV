import Link from "next/link";
import { Gift, Calendar, ExternalLink } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Offers & scholarships",
};

const offers = [
  {
    title: "Merit scholarship — STEM",
    org: "Pacific North University",
    amount: "Up to $15,000 / year",
    deadline: "May 30, 2026",
    tag: "Merit",
  },
  {
    title: "Early-bird application waiver",
    org: "Highland Institute",
    amount: "Application fee waived",
    deadline: "Jun 15, 2026",
    tag: "Fee waiver",
  },
  {
    title: "Graduate assistant pool",
    org: "Aurora College",
    amount: "Competitive stipend",
    deadline: "Rolling",
    tag: "GA",
  },
];

export default function OffersPage() {
  return (
    <PageShell
      title="Offers dashboard"
      subtitle="Scholarships, fee waivers, and opportunities from institutions and partners."
      action={
        <span className="inline-flex w-full justify-center rounded-full border border-[var(--border)] px-4 py-2 text-center text-xs text-[var(--muted)] sm:w-auto sm:inline">
          Curated listings · updated regularly
        </span>
      }
    >
      <Stagger className="grid gap-5 lg:grid-cols-3">
        {offers.map((o) => (
          <StaggerItem key={o.title}>
            <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-start justify-between gap-2">
                <Gift className="h-8 w-8 text-[var(--accent)]" />
                <span className="rounded-full bg-[var(--violet-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--violet)]">
                  {o.tag}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{o.title}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{o.org}</p>
              <p className="mt-4 text-2xl font-bold text-[var(--foreground)]">
                {o.amount}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                <Calendar className="h-3.5 w-3.5" />
                Deadline: {o.deadline}
              </p>
              <Link
                href="/applications/new"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Apply through ApplyPort
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-12 text-center text-sm text-[var(--muted)]">
        Personalized offer alerts can be enabled from your account settings when
        available.
      </FadeIn>
    </PageShell>
  );
}
