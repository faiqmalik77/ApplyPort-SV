"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fieldClass = (key) =>
    `mt-2 w-full rounded-xl border bg-[var(--background)]/80 px-4 py-3 text-[var(--foreground)] outline-none ring-0 transition focus:ring-2 ${
      errors[key]
        ? "border-[var(--accent)]/50 focus:border-[var(--accent)]/60 focus:ring-[var(--accent)]/20"
        : "border-[var(--border)] focus:border-[var(--accent)]/50 focus:ring-[var(--accent)]/20"
    }`;

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setServerMessage("");
        const next = {};
        if (!email.trim()) next.email = "Email is required.";
        else if (!emailOk(email)) next.email = "Enter a valid email address.";
        if (!password) next.password = "Password is required.";
        else if (password.length < 6)
          next.password = "Password must be at least 6 characters.";
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setLoading(true);
        fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Login failed.");
            setServerMessage(`Welcome back, ${data?.user?.name || "student"}!`);
            setPassword("");
            setErrors({});
          })
          .catch((error) => {
            setServerMessage(error.message || "Unable to login.");
          })
          .finally(() => setLoading(false));
      }}
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <p
          className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-3 text-sm text-[var(--accent-dim)]"
          role="alert"
        >
          Please fix the fields below and try again.
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((o) => ({ ...o, email: undefined }));
          }}
          className={fieldClass("email")}
          placeholder="you@university.edu"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-[var(--accent-dim)]">
            {errors.email}
          </p>
        )}
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
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((o) => ({ ...o, password: undefined }));
          }}
          className={fieldClass("password")}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-xs text-[var(--accent-dim)]">
            {errors.password}
          </p>
        )}
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] py-3.5 text-base font-semibold text-[var(--on-accent)] shadow-lg shadow-[var(--accent)]/25"
      >
        {loading ? "Logging in..." : "Log in"}
      </motion.button>
      {serverMessage && (
        <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-sm text-[var(--foreground)]">
          {serverMessage}
        </p>
      )}
    </form>
  );
}
