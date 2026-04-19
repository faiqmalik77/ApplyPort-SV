import Link from "next/link";
import { Filter, Globe } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { countries } from "@/lib/site-data";

export const metadata = {
  title: "Search programs",
};

export default function ProgramsPage() {
  return (
    <PageShell
      title="Search programs"
      subtitle="Browse by destination. Pick a country to explore featured programs and refine results with filters."
      action={
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)] sm:w-auto sm:text-sm">
          <Filter className="h-4 w-4 shrink-0 text-[var(--foreground)]" />
          Smart filters · country, field & more
        </span>
      }
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => (
          <StaggerItem key={c.slug}>
            <Link
              href={`/programs/${c.slug}`}
              className="glass card-hover flex flex-col rounded-2xl p-6"
            >
              <span className="text-4xl">{c.flag}</span>
              <h2 className="mt-4 text-xl font-semibold">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {c.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                <Globe className="h-4 w-4" />
                View programs
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8 text-center text-sm text-[var(--muted)] leading-relaxed">
        Tip: combine country, university, and field filters to narrow programs that
        match your goals and timeline.
      </FadeIn>
    </PageShell>
  );
}
