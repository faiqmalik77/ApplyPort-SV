import Link from "next/link";
import { Globe } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import ProgramsSearchClient from "@/components/programs/ProgramsSearchClient";
import { countries, searchPrograms } from "@/lib/site-data";

export const metadata = {
  title: "Search programs",
};

export default function ProgramsPage() {
  return (
    <PageShell
      title="Search programs"
      subtitle="Use filters to narrow programs by country, course name, university, level (Bachelor, Master, PHD), and intake — demo data, no server search."
    >
      <ProgramsSearchClient programs={searchPrograms} />

      <FadeIn className="mt-14">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Browse by country
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Quick links to country overviews; use the table above for detailed search.
        </p>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/programs/${c.slug}`}
                className="glass card-hover flex flex-col rounded-2xl p-5 transition"
              >
                <span className="text-3xl">{c.flag}</span>
                <h3 className="mt-3 font-semibold">{c.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                  {c.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                  <Globe className="h-4 w-4" aria-hidden />
                  Country page
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </FadeIn>
    </PageShell>
  );
}
