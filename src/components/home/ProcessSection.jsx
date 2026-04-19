"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  {
    n: "01",
    title: "Register & verify",
    body: "Create an account with email and password. Sessions stay secure.",
  },
  {
    n: "02",
    title: "Search & shortlist",
    body: "Browse programs by destination and field. Save what fits your profile.",
  },
  {
    n: "03",
    title: "Apply & upload",
    body: "Complete forms, attach transcripts and IDs in supported formats.",
  },
  {
    n: "04",
    title: "Track & prepare",
    body: "Watch status updates and use SOP + mock tools while you wait.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A clear path from{" "}
            <span className="text-[var(--muted)]">interest</span> to submission
          </h2>
          <p className="mt-4 max-w-xl text-[var(--muted)]">
            Designed to reduce back-and-forth with consultants by keeping workflow
            transparent and on-platform.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.06}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6">
                <span className="font-mono text-4xl font-bold text-neutral-200">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.body}
                </p>
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent)]/5 blur-2xl" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
