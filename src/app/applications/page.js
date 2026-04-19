import Link from "next/link";
import { PlusCircle } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata = {
  title: "Your applications",
};

const rows = [
  {
    id: "app-1024",
    program: "MSc Data Science",
    uni: "Pacific North University",
    status: "Under review",
    updated: "Apr 12, 2026",
  },
  {
    id: "app-1025",
    program: "MBA",
    uni: "Highland Institute",
    status: "Pending documents",
    updated: "Apr 10, 2026",
  },
  {
    id: "app-1020",
    program: "BSc CS",
    uni: "Aurora College",
    status: "Accepted",
    updated: "Mar 28, 2026",
  },
];

const statusStyle = {
  "Under review": "bg-neutral-200 text-neutral-900",
  "Pending documents": "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
  Accepted: "bg-neutral-900 text-[var(--on-accent)]",
};

export default function ApplicationsPage() {
  return (
    <PageShell
      title="Your applications"
      subtitle="Every application in one list — track status from submission to decision."
      action={
        <Link
          href="/applications/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dim)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)] shadow-md shadow-black/10 sm:w-auto"
        >
          <PlusCircle className="h-4 w-4 shrink-0" />
          New application
        </Link>
      }
    >
      <div className="table-responsive">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface)]/80 text-[var(--muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Program</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">
                Institution
              </th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">
                Updated
              </th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-[var(--border)] bg-[var(--background)]/40 transition hover:bg-[var(--surface)]/40"
              >
                <td className="px-5 py-4">
                  <p className="font-medium">{r.program}</p>
                  <p className="text-[var(--muted)] sm:hidden">{r.uni}</p>
                </td>
                <td className="hidden px-5 py-4 text-[var(--muted)] sm:table-cell">
                  {r.uni}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[r.status]}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="hidden px-5 py-4 text-[var(--muted)] md:table-cell">
                  {r.updated}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/applications/${r.id}`}
                    className="font-medium text-[var(--accent)] hover:underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </PageShell>
  );
}
