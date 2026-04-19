import PageShell from "@/components/layout/PageShell";
import AssessmentClient from "./ui";

export const metadata = {
  title: "SOP & assessment",
};

export default function AssessmentPage() {
  return (
    <PageShell
      title="SOP & profile assessment"
      subtitle="Draft your statement of purpose and request structured feedback on your profile."
    >
      <AssessmentClient />
    </PageShell>
  );
}
