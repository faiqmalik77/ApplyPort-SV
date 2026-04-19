"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center text-[var(--muted)]"
      >
        Thank you. Our team will respond as soon as possible.
      </motion.p>
    );
  }

  return (
    <form
      className="glass space-y-4 rounded-2xl p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label className="text-sm text-[var(--muted)]">Subject</label>
        <input
          required
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
        />
      </div>
      <div>
        <label className="text-sm text-[var(--muted)]">Message</label>
        <textarea
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/50"
        />
      </div>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.99 }}
        className="w-full rounded-xl bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--on-accent)]"
      >
        Send message
      </motion.button>
    </form>
  );
}
