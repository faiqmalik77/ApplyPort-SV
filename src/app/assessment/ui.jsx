"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ClipboardCheck } from "lucide-react";

export default function AssessmentClient() {
  const [focus, setFocus] = useState("Computer Science");
  const [draft, setDraft] = useState("");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--accent)]" />
          <h2 className="text-lg font-semibold">SOP assistant</h2>
        </div>
        <label className="mt-4 block text-sm text-[var(--muted)]">
          Program focus
        </label>
        <input
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
        />
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste bullets: background, goals, why this school..."
          rows={8}
          className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
        />
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)] py-3 text-sm font-semibold text-[var(--on-accent)]"
        >
          Generate structured draft
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-[var(--muted)]" />
          <h2 className="text-lg font-semibold">Profile assessment</h2>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Request a review against typical program expectations. Output will summarize
          strengths, gaps, and next steps tailored to your target programs.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
          <li className="rounded-lg bg-[var(--surface)]/60 px-3 py-2">
            Academic fit overview
          </li>
          <li className="rounded-lg bg-[var(--surface)]/60 px-3 py-2">
            Evidence quality — LORs, projects
          </li>
          <li className="rounded-lg bg-[var(--surface)]/60 px-3 py-2">
            Narrative clarity — SOP alignment
          </li>
        </ul>
        <button
          type="button"
          className="mt-6 w-full rounded-xl border border-[var(--border)] py-3 text-sm font-semibold hover:bg-[var(--surface)]"
        >
          Request assessment
        </button>
      </motion.div>
    </div>
  );
}
