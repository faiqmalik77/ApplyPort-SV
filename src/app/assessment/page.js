import Link from "next/link";
import { BookOpen } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import AssessmentClient from "./ui";

export const metadata = {
  title: "SOP & assessment",
};

export default function AssessmentPage() {
  return (
    <PageShell
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/assessment", label: "SOP & assessment" },
      ]}
      title="SOP & profile assessment"
      subtitle="Download SOP and research proposal templates, follow the guidance, then request an assessment after you have submitted an application."
      action={
        <Link
          href="/guidance"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40 hover:bg-[var(--surface)]"
        >
          <BookOpen className="h-4 w-4 text-[var(--accent)]" aria-hidden />
          Guidance hub
        </Link>
      }
    >
      <AssessmentClient />
    </PageShell>
  );
}
