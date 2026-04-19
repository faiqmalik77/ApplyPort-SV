"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-[var(--foreground)] outline-none ring-0 transition focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20"
          placeholder="you@university.edu"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--muted)]"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/80 px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] py-3.5 text-base font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--accent)]/25"
      >
        Log in
      </motion.button>
      <p className="text-center text-xs text-[var(--muted)]">
        If your email or password is incorrect, you will see an error message.
      </p>
    </form>
  );
}
