import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { FadeIn } from "@/components/ui/FadeIn";
import { countries } from "@/lib/site-data";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }) {
  const { country: slug } = await params;
  const c = countries.find((x) => x.slug === slug);
  return { title: c ? `Programs · ${c.name}` : "Programs" };
}

const featuredPrograms = [
  { name: "MSc Computer Science", uni: "Sample University A", field: "CS" },
  { name: "MBA Innovation", uni: "Sample University B", field: "Business" },
  { name: "MEng Electrical", uni: "Sample University C", field: "Engineering" },
];

export default async function CountryProgramsPage({ params }) {
  const { country: slug } = await params;
  const c = countries.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <PageShell
      title={`${c.flag} ${c.name}`}
      subtitle={c.blurb}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/programs", label: "Programs" },
        { href: `/programs/${slug}`, label: c.name },
      ]}
      action={
        <Link
          href="/programs"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← All countries
        </Link>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {featuredPrograms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.05}>
              <div className="glass flex flex-col gap-2 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {p.uni} · {p.field}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]/40"
                >
                  Add to list
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="glass sticky top-28 rounded-2xl p-6">
            <h3 className="font-semibold">Filters</h3>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>University name (search)</li>
              <li>Field of study</li>
              <li>Intake term</li>
              <li>Language of instruction</li>
            </ul>
            <p className="mt-6 text-xs text-[var(--muted)]">
              Refine results using the filters you need most.
            </p>
          </div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
