import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { getDemoApplication } from "@/lib/application-demo";
import { getApplicationById } from "@/lib/server/applications";
import ApplicationStudentView from "./ApplicationStudentView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: `Application ${id}` };
}

export default async function ApplicationDetailPage({ params }) {
  const { id } = await params;
  if (!id || !String(id).startsWith("app-")) notFound();

  let app = null;
  try {
    app = await getApplicationById(id);
  } catch {
    app = null;
  }
  if (!app) app = getDemoApplication(id);
  if (!app) notFound();

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
      <ApplicationStudentView
        applicationId={id}
        status={app.status}
        documents={app.documents}
      />
    </PageShell>
  );
}
