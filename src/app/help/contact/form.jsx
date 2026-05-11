"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const fieldBorder = (key) =>
    errors[key]
      ? "border-[var(--accent)]/50 focus:border-[var(--accent)]/60"
      : "border-[var(--border)] focus:border-[var(--accent)]/50";

  if (sent) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center text-[var(--muted)]"
      >
        Thank you. Our team will respond as soon as possible. (Demo — no message was
        sent.)
      </motion.p>
    );
  }

  return (
    <form
      className="glass space-y-4 rounded-2xl p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const next = {};
        if (subject.trim().length < 3)
          next.subject = "Subject should be at least 3 characters.";
        if (message.trim().length < 10)
          next.message = "Please write at least 10 characters in your message.";
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setSent(true);
      }}
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <p
          className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-3 text-sm text-[var(--accent-dim)]"
          role="alert"
        >
          Please fix the highlighted fields.
        </p>
      )}
      <div>
        <label htmlFor="contact-subject" className="text-sm text-[var(--muted)]">
          Subject
        </label>
        <input
          id="contact-subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (errors.subject) setErrors((o) => ({ ...o, subject: undefined }));
          }}
          className={`mt-2 w-full rounded-xl border bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${fieldBorder("subject")}`}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-err" : undefined}
        />
        {errors.subject && (
          <p id="subject-err" className="mt-1 text-xs text-[var(--accent-dim)]">
            {errors.subject}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm text-[var(--muted)]">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((o) => ({ ...o, message: undefined }));
          }}
          rows={5}
          className={`mt-2 w-full rounded-xl border bg-[var(--background)]/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${fieldBorder("message")}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className="mt-1 text-xs text-[var(--accent-dim)]">
            {errors.message}
          </p>
        )}
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
