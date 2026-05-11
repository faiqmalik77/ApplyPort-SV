"use client";

import { useState } from "react";

export default function MockInterviewClient() {
  const [interviewDate, setInterviewDate] = useState("");
  const [requested, setRequested] = useState(false);

  const onSubmit = () => {
    if (!interviewDate) return;
    setRequested(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass rounded-3xl p-8 sm:p-10">
        <h2 className="text-3xl font-semibold">Mock Interview</h2>
        <p className="mt-4 text-lg italic text-[var(--muted)]">
          Note: If you have submitted your application, then you are eligible for the mock interview.
        </p>
        <p className="mt-8 text-2xl font-semibold underline">Schedule Mock Interview</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="text-2xl">Select Date:</label>
          <input
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            min="2026-01-01"
            max="2100-12-31"
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="mt-8 rounded-xl bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--on-accent)]"
        >
          Submit Request
        </button>

        {requested && (
          <p className="mt-4 text-sm text-[var(--muted)]">
            Request submitted. Your Zoom meeting link will appear in the portal on the interview day. Please install the Zoom app in advance.
          </p>
        )}
      </div>
    </div>
  );
}
