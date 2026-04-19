import Link from "next/link";
import { LifeBuoy, Book, MessageCircle } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Help & support",
};

const cards = [
  {
    href: "/help/faq",
    icon: Book,
    title: "FAQ",
    desc: "Answers to common questions about accounts, applications, and uploads.",
  },
  {
    href: "/help/contact",
    icon: MessageCircle,
    title: "Contact support",
    desc: "Reach the team for technical issues or account help.",
  },
  {
    href: "/guidance",
    icon: LifeBuoy,
    title: "Guidance library",
    desc: "Timelines, documents, funding, and visa basics.",
  },
];

export default function HelpPage() {
  return (
    <PageShell
      title="Help & support"
      subtitle="Guides, FAQs, and ways to reach the ApplyPort-SV support team."
    >
      <Stagger className="grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <StaggerItem key={c.href}>
            <Link
              href={c.href}
              className="glass card-hover flex h-full flex-col rounded-2xl p-6"
            >
              <c.icon className="h-9 w-9 text-[var(--accent)]" />
              <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{c.desc}</p>
              <span className="mt-4 text-sm font-medium text-[var(--accent)]">
                Open →
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8">
        <h3 className="font-semibold">Clear error messages</h3>
        <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          If something goes wrong — missing fields, sign-in problems, or uploads —
          ApplyPort-SV shows straightforward messages so you know what to fix. Start
          here for guides, or contact support below.
        </p>
      </FadeIn>
    </PageShell>
  );
}
