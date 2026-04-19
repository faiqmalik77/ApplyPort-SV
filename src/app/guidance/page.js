import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { guidanceTopics } from "@/lib/site-data";

export const metadata = {
  title: "Guidance",
};

export default function GuidancePage() {
  return (
    <PageShell
      title="Guidance hub"
      subtitle="Instructions, timelines, and tips for every stage of your admission journey."
    >
      <Stagger className="grid gap-5 md:grid-cols-2">
        {guidanceTopics.map((t) => (
          <StaggerItem key={t.slug}>
            <Link
              href={`/guidance/${t.slug}`}
              className="glass card-hover flex h-full flex-col rounded-2xl p-6"
            >
              <BookOpen className="h-8 w-8 text-[var(--accent)]" />
              <h2 className="mt-4 text-xl font-semibold">{t.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {t.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                Read guide
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8 text-center text-sm text-[var(--muted)] leading-relaxed">
        Open any topic for a focused guide. Bookmark pages you revisit often during
        your intake cycle.
      </FadeIn>
    </PageShell>
  );
}
