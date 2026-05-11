import Link from "next/link";
import { Building2, Users, Wallet } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Offers & scholarships",
};

const highRankUniversities = [
  {
    university: "University of Toronto (Canada)",
    highlight: "High global ranking + strong CS and business pathways.",
    feeRange: "Approx. CAD 45k-60k / year",
  },
  {
    university: "University of Manchester (UK)",
    highlight: "High-ranked research environment and wide course options.",
    feeRange: "Approx. GBP 28k-42k / year",
  },
  {
    university: "Monash University (Australia)",
    highlight: "Top-ranked with excellent support for international students.",
    feeRange: "Approx. AUD 38k-55k / year",
  },
];

const pakistaniFriendlyUniversities = [
  {
    university: "Coventry University (UK)",
    reason: "Historically active in South Asian recruitment and support offices.",
    seatsTrend: "High intake from Pakistan in recent cycles (advisory trend).",
  },
  {
    university: "University of Central Lancashire (UK)",
    reason: "Popular among Pakistani applicants for business and health programs.",
    seatsTrend: "Consistent admission volume from Pakistan.",
  },
  {
    university: "LaSalle College (Canada)",
    reason: "Career-focused programs with frequent international intakes.",
    seatsTrend: "Regular placements for Pakistani students through consultants.",
  },
];

const lowFeeOptions = [
  {
    university: "Berlin Tech Institute (Germany)",
    note: "Low tuition model with semester contribution only (program dependent).",
    estimate: "Lower-cost study path among EU options.",
  },
  {
    university: "Munich Applied Sciences (Germany)",
    note: "Public-system fee profile is usually lower than UK/US private routes.",
    estimate: "Low-to-moderate total tuition burden.",
  },
  {
    university: "Selected UK regional universities",
    note: "Often offer reduced tuition bands and early payment discounts.",
    estimate: "Moderate fee options with scholarship chances.",
  },
];

export default function OffersPage() {
  return (
    <PageShell
      title="Offers dashboard"
      subtitle="Smart suggestions for high-ranked universities, Pakistan-friendly intake, and low-fee study options."
      action={
        <span className="inline-flex w-full justify-center rounded-full border border-[var(--border)] px-4 py-2 text-center text-xs text-[var(--muted)] sm:w-auto sm:inline">
          Frontend-only advisory list
        </span>
      }
    >
      <FadeIn className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-4 text-sm text-[var(--muted)]">
        Admin can maintain this list from dashboard in later backend phase. User
        selects a suitable option and then submits application from the application flow.
      </FadeIn>

      <h2 className="mb-4 text-xl font-semibold">High-ranked suggestions</h2>
      <Stagger className="grid gap-5 lg:grid-cols-3">
        {highRankUniversities.map((u) => (
          <StaggerItem key={u.university}>
            <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-start justify-between gap-2">
                <Building2 className="h-8 w-8 text-[var(--accent)]" />
                <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
                  High rank
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{u.university}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{u.highlight}</p>
              <p className="mt-3 text-sm font-medium">{u.feeRange}</p>
              <Link
                href="/applications/new"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Apply from Create Application
              </Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <h2 className="mb-4 mt-12 text-xl font-semibold">
        Universities taking more students from Pakistan
      </h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {pakistaniFriendlyUniversities.map((u) => (
          <FadeIn key={u.university} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[var(--accent)]" />
              <p className="font-semibold">{u.university}</p>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{u.reason}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{u.seatsTrend}</p>
          </FadeIn>
        ))}
      </div>

      <h2 className="mb-4 mt-12 text-xl font-semibold">Low-fee options</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {lowFeeOptions.map((u) => (
          <FadeIn key={u.university} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[var(--accent)]" />
              <p className="font-semibold">{u.university}</p>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{u.note}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{u.estimate}</p>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-10 text-center text-sm text-[var(--muted)]">
        Suggestions are informational and can be refined by admin rules later.
      </FadeIn>
    </PageShell>
  );
}
