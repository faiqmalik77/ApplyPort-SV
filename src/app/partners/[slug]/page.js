import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { FadeIn } from "@/components/ui/FadeIn";
import { partnerInstitutions } from "@/lib/site-data";

export function generateStaticParams() {
  return partnerInstitutions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = partnerInstitutions.find((x) => x.slug === slug);
  return { title: p ? p.name : "Partner" };
}

export default async function PartnerDetailPage({ params }) {
  const { slug } = await params;
  const p = partnerInstitutions.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <PageShell
      title={p.name}
      subtitle={`${p.country} · ${p.focus}`}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/partners", label: "Partners" },
        { href: `/partners/${slug}`, label: p.name },
      ]}
      action={
        <Link
          href="/partners"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← All partners
        </Link>
      }
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <FadeIn className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-lg font-semibold">About this partner</h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              This partner institution lists strong programs in{" "}
              <strong className="text-[var(--foreground)]">{p.focus}</strong>.
              Use Search programs to explore intakes, deadlines, and entry
              requirements before you apply.
            </p>
            <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
              <li>Popular intakes: Fall / Spring (confirm on program page)</li>
              <li>English proficiency: institution-specific minimums</li>
              <li>Apply via ApplyPort-SV application workflow</li>
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="glass sticky top-28 rounded-2xl p-6">
            <h3 className="font-semibold">Quick links</h3>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/programs"
                className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm hover:bg-[var(--surface)]"
              >
                Search programs
              </Link>
              <Link
                href="/applications/new"
                className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--on-accent)]"
              >
                Start application
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--muted)]">
              Questions about this partner? Contact support from the Help center.
            </p>
          </div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
