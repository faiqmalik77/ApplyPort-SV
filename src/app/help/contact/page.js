import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import ContactForm from "./form";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact support"
      subtitle="Send us a message — we aim to reply within one business day."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/help", label: "Help" },
        { href: "/help/contact", label: "Contact" },
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
      <div className="mx-auto max-w-xl">
        <ContactForm />
      </div>
    </PageShell>
  );
}
