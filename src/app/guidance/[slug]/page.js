import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { FadeIn } from "@/components/ui/FadeIn";
import { guidanceTopics } from "@/lib/site-data";

const bodies = {
  documents: `Keep a single “evidence folder” per intake cycle. Typical items: official transcripts (sealed or verified PDFs), degree certificates, passport biodata, CV, standardized test score reports, and financial statements where required.

Letters of recommendation should be requested early with clear deadlines. Name files predictably: LastName_Transcript_School.pdf. ApplyPort-SV accepts common formats such as PDF, JPG, and PNG; follow any size limits shown when you upload.`,

  timeline: `Work backwards from your earliest deadline. 12–18 months out: shortlist countries and tests. 9–12 months: sit IELTS/TOEFL/GRE if needed. 6–9 months: finalize university list and draft SOP. 3–6 months: submit applications and upload documents. After submission: monitor portals and respond to document requests within 48–72 hours when possible.`,

  finances: `Separate three buckets: application fees, tuition and living costs, and proof of funds for visa. Research merit scholarships, graduate assistantships, and external grants. Keep bank statements organized; some consulates require historical balance trends, not a single-day snapshot.`,

  visas: `Admission and visa processes are linked but distinct. After an offer, you will receive documents (e.g., I-20, CAS) to start a visa application. Requirements vary by country — use official government sources and your institution’s international office as the source of truth.`,
};

export function generateStaticParams() {
  return guidanceTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = guidanceTopics.find((x) => x.slug === slug);
  return { title: t ? t.title : "Guidance" };
}

export default async function GuidanceArticlePage({ params }) {
  const { slug } = await params;
  const topic = guidanceTopics.find((x) => x.slug === slug);
  if (!topic) notFound();

  const body = bodies[slug] ?? topic.excerpt;

  return (
    <PageShell
      title={topic.title}
      subtitle={topic.excerpt}
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/guidance", label: "Guidance" },
        { href: `/guidance/${slug}`, label: topic.title },
      ]}
      action={
        <Link
          href="/guidance"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← All topics
        </Link>
      }
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <FadeIn className="lg:col-span-2">
          <article className="glass rounded-2xl p-8 max-w-none">
            <div className="whitespace-pre-wrap text-[var(--muted)] leading-relaxed">
              {body}
            </div>
          </article>
        </FadeIn>
        <FadeIn delay={0.06}>
          <div className="glass sticky top-28 rounded-2xl p-6">
            <h3 className="font-semibold">Related</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {guidanceTopics
                .filter((x) => x.slug !== slug)
                .slice(0, 3)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/guidance/${x.slug}`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      {x.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
