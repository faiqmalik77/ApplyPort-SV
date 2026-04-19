import PageShell from "@/components/layout/PageShell";
import MockInterviewClient from "./client";

export const metadata = {
  title: "Mock interview",
};

export default function MockInterviewPage() {
  return (
    <PageShell
      title="Mock interview"
      subtitle="Practice common interview questions and build confidence before your real interview."
    >
      <MockInterviewClient />
    </PageShell>
  );
}
