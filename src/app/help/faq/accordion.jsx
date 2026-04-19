"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I reset my password?",
    a: "Use Forgot password on the login page. You will receive reset instructions at your registered email.",
  },
  {
    q: "Which file types are supported for uploads?",
    a: "We accept PDF, JPG, and PNG for most uploads. Maximum file sizes are shown next to each upload field.",
  },
  {
    q: "Can I edit an application after submitting?",
    a: "Yes, when the university allows changes in their portal — the Edit option appears on your Applications list whenever it is available.",
  },
  {
    q: "Who can see my documents?",
    a: "Only you and authorized staff can access your documents. Everything is sent over a secure connection and protected by role-based access.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="glass overflow-hidden rounded-2xl">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-[var(--muted)] transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-[var(--border)] px-6 py-4 text-sm leading-relaxed text-[var(--muted)]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
