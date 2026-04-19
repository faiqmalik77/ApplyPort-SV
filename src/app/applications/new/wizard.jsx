"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function ApplicationWizard() {
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="flex gap-2 text-sm font-medium">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={`rounded-full px-4 py-2 transition ${
              step === s
                ? "bg-[var(--accent)] text-[var(--on-accent)]"
                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Step {s}
          </button>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 glass rounded-2xl p-8"
      >
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Full legal name"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
              />
              <input
                placeholder="Passport number"
                className="rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Academic profile</h3>
            <textarea
              placeholder="Education history, GPA, tests (IELTS/TOEFL/GRE)..."
              rows={5}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
            />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents</h3>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] py-14 transition hover:border-[var(--accent)]/40">
              <Upload className="h-10 w-10 text-[var(--accent)]" />
              <p className="mt-3 text-sm text-[var(--muted)]">
                Drop files or click — PDF, JPG, or PNG (per-document limits apply)
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]"
            >
              Submit application
            </button>
          )}
          <Link
            href="/applications"
            className="rounded-xl px-5 py-2.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Cancel
          </Link>
        </div>
      </motion.div>
    </>
  );
}
