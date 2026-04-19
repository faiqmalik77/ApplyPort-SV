import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import FaqAccordion from "./accordion";

export const metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <PageShell
      title="Frequently asked questions"
      subtitle="Quick answers — nested under Help."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/help", label: "Help" },
        { href: "/help/faq", label: "FAQ" },
      ]}
      action={
        <Link
          href="/help"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← Help home
        </Link>
      }
    >
      <FaqAccordion />
    </PageShell>
  );
}
