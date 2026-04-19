"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--background)] to-[var(--surface-2)] p-8 sm:p-12 lg:p-16"
      >
        <div className="pointer-events-none absolute inset-0 shimmer opacity-40" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start your application journey today
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Create an account, explore programs, and keep every document and status
            in one secure workspace built for international admissions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/dashboard"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-6 py-3.5 text-base font-semibold text-[var(--on-accent)] transition hover:opacity-90 sm:w-auto"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/help"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[var(--border)] px-6 py-3.5 text-base font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] sm:w-auto"
            >
              Help & documentation
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-neutral-300/40 blur-3xl" />
      </motion.div>
    </section>
  );
}
