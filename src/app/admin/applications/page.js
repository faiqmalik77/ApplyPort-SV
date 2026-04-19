import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Admin · Applications",
};

const rows = [
  { id: "app-1024", student: "student@edu.pk", status: "Under review" },
  { id: "app-1025", student: "other@edu.pk", status: "Pending documents" },
];

export default function AdminApplicationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
      <p className="mt-2 text-[var(--muted)]">
        Verify documents, leave notes, and update statuses as decisions are made.
      </p>
      <FadeIn className="mt-8 space-y-3">
        {rows.map((r) => (
          <div
            key={r.id}
            className="glass flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-sm text-[var(--accent)]">{r.id}</p>
              <p className="text-sm text-[var(--muted)]">{r.student}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs">
                {r.status}
              </span>
              <Link
                href={`/applications/${r.id}`}
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Open as student view
              </Link>
            </div>
          </div>
        ))}
      </FadeIn>
    </div>
  );
}
