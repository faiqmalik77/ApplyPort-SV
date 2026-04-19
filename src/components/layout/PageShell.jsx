import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export default function PageShell({
  title,
  subtitle,
  breadcrumbs = [],
  children,
  action,
}) {
  return (
    <div className="mx-auto min-w-0 max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <FadeIn>
        {breadcrumbs.length > 0 && (
          <nav className="mb-5 flex flex-wrap items-center gap-1 break-words text-xs text-[var(--muted)] sm:mb-6 sm:text-sm">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-4 w-4 opacity-50" aria-hidden />
                )}
                {i < breadcrumbs.length - 1 ? (
                  <Link
                    href={b.href}
                    className="hover:text-[var(--accent)] transition"
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-[var(--foreground)]">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className="w-full shrink-0 sm:w-auto sm:max-w-md">{action}</div>
          )}
        </div>
      </FadeIn>
      <div className="mt-10">{children}</div>
    </div>
  );
}
