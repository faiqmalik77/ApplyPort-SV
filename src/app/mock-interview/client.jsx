"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, RotateCcw } from "lucide-react";

const questions = [
  "Why this program, and why now?",
  "Describe a challenging project and your role.",
  "How will you fund your studies?",
  "What will you contribute to the cohort?",
];

export default function MockInterviewClient() {
  const [i, setI] = useState(0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass overflow-hidden rounded-3xl p-8 text-center sm:p-12">
        <Mic className="mx-auto h-14 w-14 text-[var(--accent)]" />
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-xl font-medium leading-relaxed sm:text-2xl"
          >
            {questions[i]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setI((x) => (x + 1) % questions.length)}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--on-accent)]"
          >
            Next question
          </button>
          <button
            type="button"
            onClick={() => setI(0)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
          <p className="mt-8 text-xs text-[var(--muted)]">
            Optional timer and recording depend on your browser and device
            permissions.
          </p>
      </div>
    </div>
  );
}
