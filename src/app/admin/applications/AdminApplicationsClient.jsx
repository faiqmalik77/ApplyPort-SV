"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { APPLICATION_STATUS_ORDER as STATUS_OPTIONS } from "@/lib/application-demo";

const INITIAL_ROWS = [
  {
    id: "app-1024",
    student: "student@edu.pk",
    status: "Under review",
    docs: "6/7 uploaded",
    course: "MSc Computer Science · University of Manchester",
    interview: "Requested · 2026-06-08",
  },
  {
    id: "app-1025",
    student: "other@edu.pk",
    status: "Pending documents",
    docs: "4/7 uploaded",
    course: "BSc IT · Coventry University",
    interview: "Not requested",
  },
];

const selectClass =
  "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 sm:max-w-xs";

const btnPrimary =
  "min-h-11 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:max-w-xs";

export default function AdminApplicationsClient() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [pending, setPending] = useState(() =>
    Object.fromEntries(INITIAL_ROWS.map((r) => [r.id, r.status]))
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/applications")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load admin applications.");
        return data;
      })
      .then((data) => {
        if (!Array.isArray(data?.items) || data.items.length === 0) return;
        const mapped = data.items.map((item) => ({
          id: item.id,
          student: "student@applyport.dev",
          status: item.status,
          docs: "Pending review",
          course: `${item.program} · ${item.uni}`,
          interview: "Not requested",
        }));
        setRows(mapped);
        setPending(Object.fromEntries(mapped.map((r) => [r.id, r.status])));
      })
      .catch((error) => {
        setRows([]);
        setMessage(error.message || "Unable to load admin applications.");
      });
  }, []);

  const byStatus = useMemo(() => {
    const m = {};
    for (const s of STATUS_OPTIONS) m[s] = 0;
    for (const r of rows) {
      m[r.status] = (m[r.status] || 0) + 1;
    }
    return m;
  }, [rows]);

  async function submitStatus(id) {
    const next = pending[id];
    if (!next) return;
    setMessage("");
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to update status.");
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: data.status } : r)));
      setMessage(`Status updated for ${id}.`);
    } catch (error) {
      setMessage(error.message || "Unable to update status.");
    }
  }

  return (
    <div className="max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--background)]/95 p-4 shadow-sm sm:p-6">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Applications
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        Verify documents, validate selected course, and process interview eligibility.
      </p>

      <FadeIn className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-sm leading-relaxed text-[var(--muted)] sm:px-5 sm:py-4">
        <p className="font-semibold text-[var(--foreground)]">Status yahan se (admin)</p>
        <p className="mt-1.5">
          Pehle dropdown se naya status chunein, phir{" "}
          <strong className="text-[var(--foreground)]">Submit</strong> dabayein taake save ho
          (demo — refresh par reset). Production mein Submit par API se DB update hoga.
        </p>
      </FadeIn>

      <FadeIn className="mt-6">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Summary</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <span
              key={s}
              className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-1.5 text-xs text-[var(--muted)] shadow-sm"
            >
              <span className="max-w-[10rem] truncate sm:max-w-none">{s}</span>
              <span className="ml-1.5 font-semibold tabular-nums text-[var(--foreground)]">
                {byStatus[s] || 0}
              </span>
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mt-8 space-y-4">
        {message && (
          <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 text-sm text-[var(--foreground)]">
            {message}
          </p>
        )}
        {rows.map((r) => {
          const selected = pending[r.id] ?? r.status;
          const unchanged = selected === r.status;
          return (
            <div
              key={r.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-4 shadow-sm sm:flex sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-5"
            >
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-[var(--accent)] sm:text-sm">{r.id}</p>
                <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl">
                  {r.course}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{r.student}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">Documents: {r.docs}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">Mock interview: {r.interview}</p>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  Saved status:{" "}
                  <span className="font-semibold text-[var(--foreground)]">{r.status}</span>
                  {!unchanged && (
                    <span className="ml-2 text-[var(--accent)]">(unsaved change in dropdown)</span>
                  )}
                </p>
              </div>
              <div className="mt-4 flex w-full min-w-[200px] flex-col gap-2 sm:mt-0 sm:w-auto sm:max-w-xs sm:items-stretch">
                <label
                  className="text-xs font-medium text-[var(--foreground)]"
                  htmlFor={`status-${r.id}`}
                >
                  Application status
                </label>
                <select
                  id={`status-${r.id}`}
                  value={selected}
                  onChange={(e) =>
                    setPending((prev) => ({ ...prev, [r.id]: e.target.value }))
                  }
                  className={selectClass}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => submitStatus(r.id)}
                  disabled={unchanged}
                  className={btnPrimary}
                >
                  Submit
                </button>
                <Link
                  href={`/applications/${r.id}`}
                  className="text-center text-sm font-medium text-[var(--accent)] underline-offset-2 transition hover:text-[var(--accent-dim)] hover:underline sm:text-right"
                >
                  Open as student view
                </Link>
              </div>
            </div>
          );
        })}
      </FadeIn>
    </div>
  );
}
