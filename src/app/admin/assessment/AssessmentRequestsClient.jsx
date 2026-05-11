"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

const INITIAL_REQUESTS = [
  {
    id: "AR-1021",
    studentName: "Ali Raza",
    universityName: "LaSalle College",
    requestType: "SOP",
    submittedOn: "Apr 25, 2026",
    status: "Pending review",
  },
  {
    id: "AR-1022",
    studentName: "Hina Tariq",
    universityName: "Troy University",
    requestType: "Research Proposal",
    submittedOn: "Apr 24, 2026",
    status: "In progress",
  },
  {
    id: "AR-1023",
    studentName: "Umer Khan",
    universityName: "Coventry University",
    requestType: "SOP",
    submittedOn: "Apr 23, 2026",
    status: "Pending review",
  },
  {
    id: "AR-1024",
    studentName: "Sara Ahmed",
    universityName: "Munich Applied Sciences",
    requestType: "Research Proposal",
    submittedOn: "Apr 22, 2026",
    status: "Completed",
  },
];

function typeBadgeClass(type) {
  if (type === "Research Proposal") {
    return "border-violet-500/40 bg-violet-500/15 text-violet-300";
  }
  return "border-sky-500/40 bg-sky-500/15 text-sky-300";
}

function statusBadgeClass(status) {
  if (status === "Completed") {
    return "border-emerald-500/40 bg-emerald-500/15 text-emerald-300";
  }
  if (status === "In progress") {
    return "border-amber-500/40 bg-amber-500/15 text-amber-300";
  }
  return "border-rose-500/40 bg-rose-500/15 text-rose-300";
}

export default function AssessmentRequestsClient() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const totalRequests = requests.length;
  const pendingCount = useMemo(
    () => requests.filter((item) => item.status === "Pending review").length,
    [requests]
  );
  const researchCount = useMemo(
    () => requests.filter((item) => item.requestType === "Research Proposal").length,
    [requests]
  );

  function setStatus(id, nextStatus) {
    setRequests((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
    );
  }

  function handleReview(row) {
    if (row.status === "Pending review") {
      setStatus(row.id, "In progress");
    }
  }

  function handleMarkDone(row) {
    if (row.status === "Completed") return;
    setStatus(row.id, "Completed");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Assessment Requests</h1>
      <p className="mt-2 text-[var(--muted)]">
        Students ki submitted SOP aur Research Proposal requests yahan review ke liye show hoti
        hain.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total requests", value: totalRequests },
          { label: "Pending review", value: pendingCount },
          { label: "Research proposals", value: researchCount },
        ].map((item) => (
          <FadeIn key={item.label}>
            <div className="glass rounded-2xl p-5">
              <p className="text-2xl font-bold text-[var(--accent)]">{item.value}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--surface)]/70 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Request ID</th>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">University</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Submitted on</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((row) => (
              <tr key={row.id} className="border-t border-[var(--border)]">
                <td className="px-4 py-3 font-medium">{row.id}</td>
                <td className="px-4 py-3">{row.studentName}</td>
                <td className="px-4 py-3">{row.universityName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${typeBadgeClass(row.requestType)}`}
                  >
                    {row.requestType}
                  </span>
                </td>
                <td className="px-4 py-3">{row.submittedOn}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${statusBadgeClass(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReview(row)}
                      disabled={row.status !== "Pending review"}
                      title={
                        row.status === "Pending review"
                          ? "Status: Pending review → In progress"
                          : row.status === "In progress"
                            ? "Pehle se review under progress"
                            : "Completed — change nahi"
                      }
                      className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Review
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarkDone(row)}
                      disabled={row.status === "Completed"}
                      title="Status → Completed"
                      className="rounded-md border border-emerald-500/40 px-2.5 py-1 text-xs text-emerald-300 hover:border-emerald-500/70 hover:text-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Mark done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeIn>

      <p className="mt-4 max-w-2xl text-xs text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Abhi (demo):</strong> status isi table ke
        buttons se change hota hai — refresh par wapas default data aa jayega. Baad mein yahi
        flow API + database se jodna: har request ki <code className="text-[var(--accent)]">id</code>{" "}
        par PATCH/POST se status update, phir list refetch.
      </p>
    </div>
  );
}
