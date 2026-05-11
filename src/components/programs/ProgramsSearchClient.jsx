"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const LEVELS = ["Bachelor", "Master", "PHD"];

function uniqueSorted(values) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export default function ProgramsSearchClient({ programs }) {
  const [country, setCountry] = useState("");
  const [courseQuery, setCourseQuery] = useState("");
  const [university, setUniversity] = useState("");
  const [level, setLevel] = useState("");
  const [intake, setIntake] = useState("");

  const countryOptions = useMemo(
    () => uniqueSorted(programs.map((p) => p.country)),
    [programs],
  );
  const universityOptions = useMemo(() => {
    const list = programs.filter((p) => !country || p.country === country);
    return uniqueSorted(list.map((p) => p.university));
  }, [programs, country]);
  const intakeOptions = useMemo(
    () => uniqueSorted(programs.flatMap((p) => p.intakes || [])),
    [programs],
  );

  const filtered = useMemo(() => {
    const q = courseQuery.trim().toLowerCase();
    return programs.filter((p) => {
      if (country && p.country !== country) return false;
      if (university && p.university !== university) return false;
      if (level && p.level !== level) return false;
      if (intake && !(p.intakes || []).includes(intake)) return false;
      if (q && !p.course.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [programs, country, university, level, intake, courseQuery]);

  const clearFilters = () => {
    setCountry("");
    setCourseQuery("");
    setUniversity("");
    setLevel("");
    setIntake("");
  };

  const selectClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--muted)]">
              Country
            </label>
            <select
              className={`${selectClass} mt-1.5`}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setUniversity("");
              }}
            >
              <option value="">All countries</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--muted)]">
              Course
            </label>
            <input
              type="search"
              placeholder="Course name"
              className={`${selectClass} mt-1.5`}
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
            />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--muted)]">
              University
            </label>
            <select
              className={`${selectClass} mt-1.5`}
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="">All universities</option>
              {universityOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--muted)]">
              Program level
            </label>
            <select
              className={`${selectClass} mt-1.5`}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">All levels</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--muted)]">
              Intake
            </label>
            <select
              className={`${selectClass} mt-1.5`}
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
            >
              <option value="">All intakes</option>
              {intakeOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
          <p className="text-sm text-[var(--muted)]">
            Showing{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {filtered.length}
            </span>{" "}
            of {programs.length} programs
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border-2 border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/10"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="table-responsive overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#1b4f86] text-white">
              <th className="px-4 py-3 font-semibold">S.N.</th>
              <th className="px-4 py-3 font-semibold">Country</th>
              <th className="px-4 py-3 font-semibold">University</th>
              <th className="px-4 py-3 font-semibold">Level</th>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Tuition fee</th>
              <th className="px-4 py-3 font-semibold">Application fee</th>
              <th className="px-4 py-3 font-semibold">Intake</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-10 text-center text-[var(--muted)]"
                >
                  No programs match your filters. Try clearing filters or changing
                  search terms.
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-t border-[var(--border)] odd:bg-[var(--surface)]/40"
                >
                  <td className="px-4 py-3 text-[var(--muted)]">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{p.country}</td>
                  <td className="px-4 py-3 text-[var(--foreground)]">{p.university}</td>
                  <td className="px-4 py-3">{p.level}</td>
                  <td className="px-4 py-3">
                    <Link
                      href="/applications/new"
                      className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                    >
                      {p.course}
                    </Link>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-[var(--foreground)]">
                    <span className="text-xs leading-snug sm:text-sm">
                      {p.tuitionFee || "—"}
                    </span>
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-[var(--foreground)]">
                    <span className="text-xs leading-snug sm:text-sm">
                      {p.applicationFee || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(p.intakes || []).map((m) => (
                        <span
                          key={m}
                          className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
