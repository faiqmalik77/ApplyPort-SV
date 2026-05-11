"use client";

import Link from "next/link";
import { useState } from "react";
import { slugifyUniversity } from "@/lib/admin-courses";

const inputClass =
  "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15";

const btnPrimary =
  "min-h-11 shrink-0 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-base font-semibold text-[var(--on-accent)] transition hover:opacity-95 active:opacity-90 sm:self-auto";

function toTitleCase(value) {
  return value
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function CountryUniversitiesClient({
  countrySlug,
  countryName,
  initialUniversities,
}) {
  const [items, setItems] = useState(initialUniversities);
  const [draft, setDraft] = useState("");

  function addUniversity() {
    const name = toTitleCase(draft);
    if (!name) return;
    if (items.some((item) => item.toLowerCase() === name.toLowerCase())) return;
    setItems((prev) => [...prev, name]);
    setDraft("");
  }

  return (
    <div className="max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--background)]/95 p-4 shadow-sm sm:p-6">
      <Link
        href="/admin/courses"
        className="text-sm text-[var(--muted)] underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
      >
        ← Countries
      </Link>

      <h1 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:mt-6 sm:text-4xl">
        {countryName}
      </h1>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch sm:gap-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addUniversity();
          }}
          placeholder="Add new university"
          className={`flex-1 ${inputClass}`}
        />
        <button type="button" onClick={addUniversity} className={btnPrimary}>
          Add
        </button>
      </div>

      <ul className="mt-8 space-y-3 sm:mt-10">
        {items.map((name) => (
          <li key={name}>
            <Link
              href={`/admin/courses/${countrySlug}/${slugifyUniversity(name)}`}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-3.5 shadow-sm transition hover:border-[var(--accent)]/40 hover:bg-[var(--surface)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="block font-serif text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent-dim)] sm:text-2xl">
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
