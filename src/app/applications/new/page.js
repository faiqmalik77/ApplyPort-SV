import PageShell from "@/components/layout/PageShell";
import ApplicationWizard from "./wizard";

export const metadata = {
  title: "New application",
};

export default function NewApplicationPage() {
  return (
    <PageShell
      title="Create application"
      subtitle="Complete each step and upload supporting documents in PDF, JPG, or PNG where requested."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/applications", label: "Applications" },
        { href: "/applications/new", label: "New" },
      ]}
    >
      <ApplicationWizard />
    </PageShell>
  );
}
