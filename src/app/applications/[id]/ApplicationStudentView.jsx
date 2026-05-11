"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { APPLICATION_STATUS_ORDER } from "@/lib/application-demo";

function pipelineDotClass({ isDone, isCurrent, isRejectedCurrent }) {
  if (isRejectedCurrent) return "bg-rose-600 ring-4 ring-[var(--background)]";
  if (isDone) return "bg-emerald-600 ring-4 ring-[var(--background)]";
  if (isCurrent) return "bg-[var(--accent)] ring-4 ring-[var(--background)]";
  return "border-2 border-[var(--border)] bg-[var(--background)] ring-4 ring-[var(--background)]";
}

export default function ApplicationStudentView({ applicationId, status, documents }) {
  const [submitNote, setSubmitNote] = useState("");

  const currentIdx = APPLICATION_STATUS_ORDER.indexOf(status);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;

  function handleSubmit() {
    setSubmitNote(
      "Demo: yahan se aap updated documents ya jawab submit karoge. Admissions team status /admin/applications se update karti hai."
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <FadeIn className="lg:col-span-2 space-y-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Ye flow kaise manage hota hai</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Aap <strong className="text-[var(--foreground)]">wizard</strong> se application bhejte ho.
            Neeche wala <strong className="text-[var(--foreground)]">status pipeline</strong> staff dwara
            set kiye gaye steps dikhata hai (database / API). Aap khud stage change nahi karte —{" "}
            <strong className="text-[var(--foreground)]">/admin/applications</strong> par team status
            update karti hai; yahan wohi value read ho kar dikhegi.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold text-[var(--foreground)]">Status pipeline</h2>
            <p className="font-mono text-xs text-[var(--accent)]">{applicationId}</p>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Current: <span className="font-semibold text-[var(--foreground)]">{status}</span>
          </p>
          <ol className="mt-4 space-y-4 border-l-2 border-[var(--border)] pl-6">
            {APPLICATION_STATUS_ORDER.map((label, i) => {
              const isRejectedCurrent = status === "Rejected" && label === "Rejected" && i === safeIdx;
              const isDone = i < safeIdx;
              const isCurrent = i === safeIdx;
              const isTodo = i > safeIdx;

              return (
                <li key={label} className="relative">
                  <span
                    className={`absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full ${pipelineDotClass({
                      isDone,
                      isCurrent,
                      isRejectedCurrent,
                    })}`}
                  />
                  <p
                    className={`font-medium ${
                      isTodo ? "text-[var(--muted)]" : "text-[var(--foreground)]"
                    } ${isRejectedCurrent ? "text-rose-700" : ""}`}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Step {i + 1} of {APPLICATION_STATUS_ORDER.length}
                    {isDone && " · completed"}
                    {isCurrent && " · current"}
                    {isTodo && " · not started"}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-5 shadow-sm sm:p-6">
          <h2 className="font-semibold text-[var(--foreground)]">Uploaded files</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Har file ka apna verification state — admin / system alag se update karta hai.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {documents.map((doc) => (
              <li
                key={doc.name}
                className="flex justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)]/80 px-3 py-2"
              >
                <span className="text-[var(--foreground)]">{doc.name}</span>
                <span
                  className={
                    doc.fileStatus === "Verified"
                      ? "shrink-0 font-medium text-emerald-700"
                      : doc.fileStatus === "Processing"
                        ? "shrink-0 font-medium text-[var(--accent)]"
                        : "shrink-0 text-[var(--muted)]"
                  }
                >
                  {doc.fileStatus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="sticky top-28 rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-5 shadow-sm sm:p-6">
          <h3 className="font-semibold text-[var(--foreground)]">Actions</h3>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface)]"
            >
              Edit application
            </button>
            <button
              type="button"
              className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface)]"
            >
              Message office
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-95"
            >
              Submit
            </button>
          </div>
          {submitNote && (
            <p className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
              {submitNote}
            </p>
          )}
          <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
            Need help? Visit Help and support for FAQs and contact options.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
