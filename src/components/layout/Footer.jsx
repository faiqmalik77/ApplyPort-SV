import Link from "next/link";
import { Sparkles, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/programs", label: "Search programs" },
    { href: "/applications/new", label: "New application" },
    { href: "/tracking", label: "Application tracking" },
    { href: "/offers", label: "Scholarships & offers" },
  ],
  Resources: [
    { href: "/guidance", label: "Guidance hub" },
    { href: "/mock-interview", label: "Mock interview" },
    { href: "/assessment", label: "SOP & assessment" },
    { href: "/help/faq", label: "FAQ" },
  ],
  Company: [
    { href: "/partners", label: "Partner institutions" },
    { href: "/help/contact", label: "Contact" },
    { href: "/help", label: "Help center" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="text-center sm:col-span-2 sm:text-left lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 sm:justify-start"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--on-accent)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold">
                ApplyPort<span className="text-[var(--muted)]">-SV</span>
              </span>
            </Link>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:mx-0">
              One platform to search global programs, submit applications, track
              status, and prepare with SOP tools and mock interviews — built for
              students, secured for peace of mind.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-[var(--muted)]">
              <span className="flex items-center justify-center gap-2 sm:justify-start">
                <Mail className="h-4 w-4 shrink-0 text-[var(--foreground)]" />
                support@applyport-sv.edu
              </span>
              <span className="flex items-start justify-center gap-2 sm:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground)]" />
                <span className="text-left">
                  University of Education Lahore
                </span>
              </span>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-center sm:text-left">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                {title}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-center text-xs text-[var(--muted)] sm:text-left">
            © {new Date().getFullYear()} ApplyPort-SV. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--muted)]">
            <span className="cursor-default hover:text-[var(--foreground)]">
              Privacy
            </span>
            <span className="cursor-default hover:text-[var(--foreground)]">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
