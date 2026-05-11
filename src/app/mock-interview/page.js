import PageShell from "@/components/layout/PageShell";
import MockInterviewClient from "./client";

export const metadata = {
  title: "Mock interview",
};

export default function MockInterviewPage() {
  return (
    <PageShell
      title="Mock interview"
      subtitle="Schedule your mock interview request. Portal will show your Zoom link on interview day."
    >
      <MockInterviewClient />
    </PageShell>
  );
}
