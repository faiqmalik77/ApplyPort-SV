"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { mainNav } from "@/lib/nav";

function NavLink({ href, label, onClick }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative whitespace-nowrap px-2 py-2 text-xs font-medium transition-colors sm:px-2.5 lg:px-3 ${
        active
          ? "text-[var(--accent)]"
          : "text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {label}
      {active && (
        <span className="absolute inset-0 -z-10 rounded-lg bg-[var(--accent-muted)] ring-1 ring-[var(--foreground)]/10" />
      )}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-[var(--border)] bg-[var(--background)]/95 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md"
          : "border-[var(--border)]/60 bg-[var(--background)]/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex min-h-[3.5rem] max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:gap-4 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2"
          onClick={close}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--on-accent)] shadow-md sm:h-10 sm:w-10">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-[var(--foreground)] sm:text-base">
            ApplyPort
            <span className="text-[var(--muted)]">-SV</span>
          </span>
        </Link>

        <nav className="hidden max-w-xl flex-1 flex-wrap items-center justify-center gap-0.5 lg:flex xl:max-w-4xl">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-1.5 sm:flex sm:gap-2">
          <Link
            href="/auth/login"
            className="rounded-lg px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)] sm:text-sm"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-3 py-2 text-xs font-semibold text-[var(--on-accent)] shadow-md transition hover:opacity-95 sm:px-4 sm:text-sm"
          >
            Get started
          </Link>
          <Link
            href="/dashboard"
            className="hidden rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] md:inline-block sm:text-sm"
          >
            Dashboard
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--surface)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
          >
            <div className="flex max-h-[min(75vh,520px)] flex-col gap-0.5 overflow-y-auto overscroll-contain px-4 py-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--foreground)] active:bg-[var(--surface)]"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-2 border-[var(--border)]" />
              <Link
                href="/auth/login"
                onClick={close}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[var(--muted)]"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                onClick={close}
                className="rounded-lg bg-[var(--accent)] px-3 py-3 text-center text-sm font-semibold text-[var(--on-accent)]"
              >
                Get started
              </Link>
              <Link
                href="/dashboard"
                onClick={close}
                className="rounded-lg border border-[var(--border)] px-3 py-3 text-center text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={close}
                className="rounded-lg px-3 py-3 text-sm text-[var(--muted)]"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
