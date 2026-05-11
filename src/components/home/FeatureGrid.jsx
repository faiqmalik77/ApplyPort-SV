"use client";

import Link from "next/link";
import {
  Search,
  FileText,
  LineChart,
  PenLine,
  Mic,
  BookOpen,
  Building2,
  Gift,
} from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";

const features = [
  {
    icon: Search,
    title: "Search & discovery",
    desc: "Filter by country, university, and field. Sort results to match your goals.",
    href: "/programs",
  },
  {
    icon: FileText,
    title: "Application management",
    desc: "Create applications, validate required fields, and upload PDFs and images.",
    href: "/applications/new",
  },
  {
    icon: LineChart,
    title: "Status tracking",
    desc: "Pending, accepted, or rejected — see every application in one place.",
    href: "/applications",
  },
  {
    icon: PenLine,
    title: "SOP & assessment",
    desc: "Draft stronger statements and request profile feedback.",
    href: "/assessment",
  },
  {
    icon: Mic,
    title: "Mock interview",
    desc: "Practice questions and structured feedback for interview day.",
    href: "/mock-interview",
  },
  {
    icon: BookOpen,
    title: "Guidance hub",
    desc: "Tips, timelines, and resources for the full admission journey.",
    href: "/guidance",
  },
  {
    icon: Building2,
    title: "Partner institutions",
    desc: "Explore universities officially connected with ApplyPort-SV.",
    href: "/partners",
  },
  {
    icon: Gift,
    title: "Offers dashboard",
    desc: "Scholarships and opportunities updated for enrolled explorers.",
    href: "/offers",
  },
];

export default function FeatureGrid() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Everything in{" "}
            <span className="text-[var(--foreground)]">one</span> workspace
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
            Authentication, program search, applications, SOP support,
            mock interviews, guidance, partner schools, offers, and admin tools —
            in one place.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <Link
                href={f.href}
                className="glass card-hover flex h-full flex-col rounded-2xl p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {f.desc}
                </p>
                <span className="mt-4 text-sm font-medium text-[var(--accent)]">
                  Explore →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
