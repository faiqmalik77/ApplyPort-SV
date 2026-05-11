import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Admin · Interviews",
};

const requests = [
  {
    id: "mi-2041",
    student: "student@edu.pk",
    date: "2026-06-08",
    applicationId: "app-1024",
    status: "Pending link",
  },
  {
    id: "mi-2042",
    student: "other@edu.pk",
    date: "2026-06-14",
    applicationId: "app-1025",
    status: "Link shared",
  },
];

export default function AdminInterviewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Mock interview requests</h1>
      <p className="mt-2 text-[var(--muted)]">
        Review submitted dates and publish Zoom links in the student portal.
      </p>

      <FadeIn className="mt-6 space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="glass flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs text-[var(--accent)]">{request.id}</p>
              <p className="mt-1 text-sm">{request.student}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Application: {request.applicationId} · Requested date: {request.date}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs">
                {request.status}
              </span>
              <button
                type="button"
                className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-[var(--on-accent)]"
              >
                Add Zoom link
              </button>
            </div>
          </div>
        ))}
      </FadeIn>
    </div>
  );
}
