"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Search Programs", href: "/programs" },
  { label: "Create Applications", href: "/applications/new" },
  { label: "Yours Applications", href: "/applications" },
  { label: "SOP & Assessment Request", href: "/assessment" },
  { label: "Mock Interview", href: "/mock-interview" },
  { label: "Partner Institutes", href: "/partners" },
  { label: "Offers Dashboard", href: "/offers" },
  { label: "Help", href: "/help" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-[#0f3768] bg-gradient-to-b from-[#1b4f86] to-[#123e6f] p-4 shadow-[0_16px_30px_rgba(15,55,104,0.35)] lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-[280px] lg:overflow-y-auto lg:rounded-none">
      <Link
        href="/"
        className="mb-4 flex flex-col items-center rounded-xl border border-white/15 bg-white/95 px-3 py-3 shadow-sm transition hover:bg-white"
      >
        <span className="relative block h-[88px] w-full max-w-[220px]">
          <Image
            src="/logo.png"
            alt="ApplyPort-SV"
            fill
            className="object-contain object-center"
            sizes="220px"
            priority
            unoptimized
          />
        </span>
      </Link>
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition ${
                active
                  ? "border-[#9ec8ff] bg-gradient-to-b from-[#4f8fd5] to-[#2e69ab]"
                  : "border-[#2f6aab] bg-gradient-to-b from-[#2f75bc] to-[#205893] hover:from-[#367fc8] hover:to-[#265f9a]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
