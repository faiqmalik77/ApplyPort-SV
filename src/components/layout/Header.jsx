"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/auth/login";
    }
  };

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
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
            <Image
              src="/logo.png"
              alt="ApplyPort-SV logo"
              width={44}
              height={44}
              quality={100}
              unoptimized
              className="h-10 w-10 object-contain"
              priority
            />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-[var(--foreground)] sm:text-base">
            ApplyPort
            <span className="text-[var(--muted)]">-SV</span>
          </span>
        </Link>

        <div className="hidden shrink-0 items-center gap-1.5 sm:flex sm:gap-2">
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:text-[var(--foreground)] sm:text-sm"
            >
              Log out
            </button>
          ) : (
            <>
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
            </>
          )}
          <Link
            href="/dashboard"
            className="hidden rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] md:inline-block sm:text-sm"
          >
            Dashboard
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="hidden rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)] md:inline-block sm:text-sm"
            >
              Admin
            </Link>
          )}
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
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    close();
                    logout();
                  }}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-[var(--muted)]"
                >
                  Log out
                </button>
              ) : (
                <>
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
                </>
              )}
              <Link
                href="/dashboard"
                onClick={close}
                className="rounded-lg border border-[var(--border)] px-3 py-3 text-center text-sm font-medium"
              >
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={close}
                  className="rounded-lg px-3 py-3 text-sm text-[var(--muted)]"
                >
                  Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
