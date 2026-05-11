import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";

export const metadata = {
  title: "Admin",
};

export default function AdminOverviewPage() {
  const commissionRows = [
    {
      studentName: "Ali Raza",
      universityName: "LaSalle College",
      offerLetter: "Received",
      studentStatus: "Fee submitted",
      totalCommission: "$1,200",
    },
    {
      studentName: "Hina Tariq",
      universityName: "Troy University",
      offerLetter: "Pending",
      studentStatus: "Interview complete",
      totalCommission: "$0",
    },
    {
      studentName: "Umer Khan",
      universityName: "Coventry University",
      offerLetter: "Received",
      studentStatus: "Visa in process",
      totalCommission: "$1,500",
    },
    {
      studentName: "Sara Ahmed",
      universityName: "Munich Applied Sciences",
      offerLetter: "Received",
      studentStatus: "Enrolled",
      totalCommission: "$1,050",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Overview</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Manage applications, courses, mock interviews, offers, and users in one place.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { label: "Application requests", value: "312", hint: "Pending + in review" },
          { label: "Mock interview requests", value: "86", hint: "Date requests pending" },
          { label: "Courses in catalog", value: "124", hint: "Available to students" },
        ].map((c, i) => (
          <FadeIn key={c.label} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6">
              <p className="text-3xl font-bold text-[var(--accent)]">{c.value}</p>
              <p className="mt-1 font-medium">{c.label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{c.hint}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/admin/applications", label: "Review applications" },
          { href: "/admin/assessment", label: "Review assessment requests" },
          { href: "/admin/courses", label: "Manage courses" },
          { href: "/admin/interviews", label: "Handle interview requests" },
          { href: "/admin/commission", label: "Track commission records" },
          { href: "/admin/offers", label: "Curate offers dashboard" },
          { href: "/admin/users", label: "Manage users & roles" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 px-4 py-3 text-sm font-medium transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <FadeIn className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Commission</h2>
            <p className="text-sm text-[var(--muted)]">
              Student-wise commission records for offer and enrollment tracking.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2">
            <p className="text-xs text-[var(--muted)]">Total Commission</p>
            <p className="text-lg font-semibold text-[var(--accent)]">$3,750</p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--surface)]/70 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">Sr no.</th>
                <th className="px-3 py-2 font-medium">Student name</th>
                <th className="px-3 py-2 font-medium">University name</th>
                <th className="px-3 py-2 font-medium">Offer letter</th>
                <th className="px-3 py-2 font-medium">Student status</th>
                <th className="px-3 py-2 font-medium">Total Commission</th>
              </tr>
            </thead>
            <tbody>
              {commissionRows.map((row, index) => (
                <tr key={`${row.studentName}-${row.universityName}`} className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.studentName}</td>
                  <td className="px-3 py-2">{row.universityName}</td>
                  <td className="px-3 py-2">{row.offerLetter}</td>
                  <td className="px-3 py-2">{row.studentStatus}</td>
                  <td className="px-3 py-2 font-medium">{row.totalCommission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
      <FadeIn className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-6 text-sm text-[var(--muted)] leading-relaxed">
        Frontend-only demo: admin can curate courses and offers, then students use
        those options in the Create Application flow.
      </FadeIn>
    </div>
  );
}
