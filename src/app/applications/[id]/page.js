import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Application ${id}` };
}

export default async function ApplicationDetailPage({ params }) {
  const { id } = await params;
  if (!id || !String(id).startsWith("app-")) notFound();

  return (
    <PageShell
      title={`Application ${id}`}
      subtitle="Review your timeline, uploaded documents, and messages from the admissions team."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/applications", label: "Applications" },
        { href: `/applications/${id}`, label: id },
      ]}
      action={
        <Link
          href="/applications"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← All applications
        </Link>
      }
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <FadeIn className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold">Status pipeline</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-[var(--border)] pl-6">
              {[
                "Submitted",
                "Documents verified",
                "Under academic review",
                "Decision pending",
              ].map((s, i) => (
                <li key={s} className="relative">
                  <span className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full bg-[var(--accent)] ring-4 ring-[var(--background)]" />
                  <p className="font-medium">{s}</p>
                  <p className="text-xs text-[var(--muted)]">
                    Stage {i + 1} of your application pipeline
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold">Uploaded files</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li className="flex justify-between rounded-lg bg-[var(--surface)]/60 px-3 py-2">
                <span>transcript.pdf</span>
                <span className="font-medium text-neutral-700">Verified</span>
              </li>
              <li className="flex justify-between rounded-lg bg-[var(--surface)]/60 px-3 py-2">
                <span>passport.jpg</span>
                <span className="text-[var(--accent)]">Processing</span>
              </li>
            </ul>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="glass sticky top-28 rounded-2xl p-6">
            <h3 className="font-semibold">Actions</h3>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm hover:bg-[var(--surface)]"
              >
                Edit application
              </button>
              <button
                type="button"
                className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm hover:bg-[var(--surface)]"
              >
                Message office
              </button>
            </div>
            <p className="mt-6 text-xs text-[var(--muted)]">
              Need help? Visit Help and support for FAQs and contact options.
            </p>
          </div>
        </FadeIn>
      </div>
    </PageShell>
  );
}
