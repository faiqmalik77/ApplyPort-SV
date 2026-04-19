"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[min(500px,80vw)] w-[min(900px,120%)] max-w-none -translate-x-1/2 rounded-full bg-[var(--surface-2)] blur-[80px]" />
        <div className="absolute right-0 top-32 h-48 w-48 rounded-full bg-neutral-200/60 blur-[64px] sm:h-64 sm:w-64" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-1.5 text-xs font-medium text-[var(--muted)] backdrop-blur-sm"
        >
          <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
          Secure sign-in · Encrypted data · Trusted by students worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-[clamp(1.75rem,5vw,3.75rem)] font-bold leading-[1.12] tracking-tight sm:mt-8"
        >
          Your{" "}
          <span className="bg-gradient-to-r from-[var(--foreground)] to-[var(--muted)] bg-clip-text text-transparent">
            international admission
          </span>{" "}
          command center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
        >
          Search programs worldwide, submit polished applications, upload documents,
          and track every status update — with SOP help, mock interviews, and
          guidance built in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <Link
            href="/auth/register"
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-6 py-3.5 text-base font-semibold text-[var(--on-accent)] shadow-lg shadow-black/10 transition hover:scale-[1.01] hover:opacity-95 sm:w-auto"
          >
            Create free account
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/programs"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-base font-medium text-[var(--foreground)] transition hover:border-[var(--foreground)]/20 hover:bg-[var(--surface-2)] sm:w-auto"
          >
            <PlayCircle className="h-5 w-5 text-[var(--accent)]" />
            Explore programs
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {[
            { k: "Global reach", v: "Search programs across major study destinations" },
            {
              k: "All in one place",
              v: "Apply, upload documents, and track status without juggling tools",
            },
            { k: "24/7", v: "Check your applications whenever it suits you" },
          ].map((item, i) => (
            <div
              key={item.k}
              className="glass card-hover rounded-2xl p-5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-2xl font-bold text-[var(--accent)]">{item.k}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
