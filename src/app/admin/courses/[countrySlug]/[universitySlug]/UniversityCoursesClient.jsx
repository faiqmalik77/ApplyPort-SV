"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-base text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15";

const inputSmClass =
  "min-h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15";

const textareaClass =
  "w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm leading-relaxed text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15";

const btnPrimary =
  "min-h-11 shrink-0 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-base font-semibold text-[var(--on-accent)] transition hover:opacity-95 active:opacity-90 sm:self-auto";

const labelBlock = "block text-sm font-medium text-[var(--foreground)]";

const sectionLabel = "text-sm font-semibold text-[var(--foreground)]";

function toTitleCase(value) {
  return value
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function RequirementCard({ title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-sm">
      <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </div>
      <div className="bg-[var(--background)] px-4 py-4">{children}</div>
    </div>
  );
}

function legacyEnglishFieldsToText(c) {
  const rows = [];
  if (c.englishPteOverall || c.englishPteMinBand) {
    rows.push(
      `PTE — Overall: ${c.englishPteOverall || "—"}, no bands less than: ${c.englishPteMinBand || "—"}`
    );
  }
  if (c.englishToeflOverall || c.englishToeflMinBand) {
    rows.push(
      `TOEFL iBT — Overall: ${c.englishToeflOverall || "—"}, no bands less than: ${c.englishToeflMinBand || "—"}`
    );
  }
  if (c.englishIeltsOverall || c.englishIeltsMinBand) {
    rows.push(
      `IELTS — Overall: ${c.englishIeltsOverall || "—"}, no band less than: ${c.englishIeltsMinBand || "—"}`
    );
  }
  return rows.join("\n");
}

function normalizeCourseFromServer(c) {
  const legacy = legacyEnglishFieldsToText(c).trim();
  const direct = (c.englishProficiency && String(c.englishProficiency).trim()) || "";
  const englishProficiency = direct || legacy;

  return {
    id: c.id,
    name: c.name,
    level: c.level,
    intakes: c.intakes ?? "",
    tuitionFee: c.tuitionFee ?? "",
    applicationFee: c.applicationFee ?? "",
    entryRequirements: c.entryRequirements ?? c.moreInformation ?? "",
    englishProficiency,
    otherDetails: c.otherDetails ?? "",
  };
}

export default function UniversityCoursesClient({
  countrySlug,
  countryName,
  universityName,
  initialCourses,
}) {
  const [items, setItems] = useState(() => initialCourses.map(normalizeCourseFromServer));
  const [draftName, setDraftName] = useState("");
  const [draftLevel, setDraftLevel] = useState("Bachelor");
  const [draftIntakes, setDraftIntakes] = useState("");
  const [draftTuitionFee, setDraftTuitionFee] = useState("");
  const [draftApplicationFee, setDraftApplicationFee] = useState("");
  const [draftEntryRequirements, setDraftEntryRequirements] = useState("");
  const [draftEnglishProficiency, setDraftEnglishProficiency] = useState("");
  const [draftOtherDetails, setDraftOtherDetails] = useState("");

  function patchCourse(courseId, partial) {
    setItems((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...partial } : c))
    );
  }

  function addCourse() {
    const name = toTitleCase(draftName);
    if (!name) return;
    const id = `local-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        name,
        level: draftLevel,
        intakes: draftIntakes.trim() || "-",
        tuitionFee: draftTuitionFee.trim(),
        applicationFee: draftApplicationFee.trim(),
        entryRequirements: draftEntryRequirements.trim(),
        englishProficiency: draftEnglishProficiency.trim(),
        otherDetails: draftOtherDetails.trim(),
      },
    ]);
    setDraftName("");
    setDraftLevel("Bachelor");
    setDraftIntakes("");
    setDraftTuitionFee("");
    setDraftApplicationFee("");
    setDraftEntryRequirements("");
    setDraftEnglishProficiency("");
    setDraftOtherDetails("");
  }

  return (
    <div className="max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--background)]/95 p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--muted)]">
        <Link
          href="/admin/courses"
          className="underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
        >
          ← Countries
        </Link>
        <Link
          href={`/admin/courses/${countrySlug}`}
          className="underline-offset-4 transition hover:text-[var(--accent)] hover:underline"
        >
          ← {countryName}
        </Link>
      </div>

      <h1 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:mt-6 sm:text-4xl">
        {universityName}
      </h1>

      <div className="mt-8 space-y-3 sm:mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addCourse();
            }}
            placeholder="Add new course"
            className={`flex-1 ${inputClass}`}
          />
          <button type="button" onClick={addCourse} className={btnPrimary}>
            Add
          </button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <select
            value={draftLevel}
            onChange={(e) => setDraftLevel(e.target.value)}
            className="min-h-11 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]/60 focus:ring-2 focus:ring-[var(--accent)]/15 sm:w-40"
          >
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PHD">PHD</option>
          </select>
          <input
            value={draftIntakes}
            onChange={(e) => setDraftIntakes(e.target.value)}
            placeholder="Intakes (e.g. Jan, Sep)"
            className={`flex-1 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="draft-tuition-fee" className={labelBlock}>
            Tuition fee
          </label>
          <input
            id="draft-tuition-fee"
            type="text"
            value={draftTuitionFee}
            onChange={(e) => setDraftTuitionFee(e.target.value)}
            placeholder="e.g. GBP 15,000 / year, or per-credit rate"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="draft-application-fee" className={labelBlock}>
            Application fee
          </label>
          <input
            id="draft-application-fee"
            type="text"
            value={draftApplicationFee}
            onChange={(e) => setDraftApplicationFee(e.target.value)}
            placeholder="e.g. GBP 50 (non-refundable), or waived"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div className="pt-2">
          <p className={sectionLabel}>More information</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
            Entry, English proficiency, and other course notes — each section below matches the
            cards on your saved courses.
          </p>
          <div className="mt-3 space-y-4">
            <RequirementCard title="Entry Requirements">
              <textarea
                value={draftEntryRequirements}
                onChange={(e) => setDraftEntryRequirements(e.target.value)}
                placeholder="Academic entry requirements for this course"
                rows={4}
                className={textareaClass}
              />
            </RequirementCard>
            <RequirementCard title="English Proficiency Test Requirements">
              <textarea
                value={draftEnglishProficiency}
                onChange={(e) => setDraftEnglishProficiency(e.target.value)}
                placeholder=""
                rows={5}
                className={textareaClass}
              />
            </RequirementCard>
            <RequirementCard title="Other details">
              <textarea
                value={draftOtherDetails}
                onChange={(e) => setDraftOtherDetails(e.target.value)}
                placeholder=""
                rows={5}
                className={textareaClass}
              />
            </RequirementCard>
          </div>
        </div>
      </div>

      <ul className="mt-10 space-y-6 sm:mt-12">
        {items.map((course) => (
          <li
            key={course.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-4 shadow-sm sm:p-5"
          >
            <h2 className="font-serif text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              {course.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{course.level}</p>
            {course.intakes && course.intakes !== "-" && (
              <p className="mt-0.5 text-sm text-[var(--muted)]">Intakes: {course.intakes}</p>
            )}

            <div className="mt-4">
              <label className={sectionLabel} htmlFor={`tuition-${course.id}`}>
                Tuition fee
              </label>
              <p className="mt-0.5 text-xs text-[var(--muted)]">
                Annual, per term, or currency — whatever you publish for this course.
              </p>
              <input
                id={`tuition-${course.id}`}
                type="text"
                value={course.tuitionFee ?? ""}
                onChange={(e) => patchCourse(course.id, { tuitionFee: e.target.value })}
                placeholder="e.g. GBP 15,000 / year"
                className={`mt-2 ${inputSmClass}`}
              />
            </div>

            <div className="mt-4">
              <label className={sectionLabel} htmlFor={`application-fee-${course.id}`}>
                Application fee
              </label>
              <p className="mt-0.5 text-xs text-[var(--muted)]">
                One-time or per-intake application charge for this course.
              </p>
              <input
                id={`application-fee-${course.id}`}
                type="text"
                value={course.applicationFee ?? ""}
                onChange={(e) => patchCourse(course.id, { applicationFee: e.target.value })}
                placeholder="e.g. USD 50"
                className={`mt-2 ${inputSmClass}`}
              />
            </div>

            <div className="mt-5 border-t border-[var(--border)] pt-5">
              <p className={sectionLabel}>More information</p>
              <div className="mt-3 space-y-4">
                <RequirementCard title="Entry Requirements">
                  <textarea
                    value={course.entryRequirements ?? ""}
                    onChange={(e) =>
                      patchCourse(course.id, { entryRequirements: e.target.value })
                    }
                    placeholder="Academic entry requirements for this course"
                    rows={4}
                    className={textareaClass}
                  />
                </RequirementCard>
                <RequirementCard title="English Proficiency Test Requirements">
                  <textarea
                    value={course.englishProficiency ?? ""}
                    onChange={(e) =>
                      patchCourse(course.id, { englishProficiency: e.target.value })
                    }
                    placeholder=""
                    rows={5}
                    className={textareaClass}
                  />
                </RequirementCard>
                <RequirementCard title="Other details">
                  <textarea
                    value={course.otherDetails ?? ""}
                    onChange={(e) => patchCourse(course.id, { otherDetails: e.target.value })}
                    placeholder=""
                    rows={5}
                    className={textareaClass}
                  />
                </RequirementCard>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
