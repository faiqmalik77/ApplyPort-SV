"use client";

import { useRef, useState } from "react";
import { FileText, Download, Circle, Paperclip } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { countries } from "@/lib/site-data";

function UnderlineField({ id, label, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-6">
      <label
        htmlFor={id}
        className="shrink-0 text-sm font-medium text-[var(--foreground)] sm:min-w-[148px]"
      >
        {label}
      </label>
      <input
        id={id}
        className="min-w-0 flex-1 border-0 border-b border-[var(--border)] bg-transparent py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
        {...inputProps}
      />
    </div>
  );
}

export default function AssessmentClient() {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function onFilesChange(e) {
    const list = e.target.files ? Array.from(e.target.files) : [];
    setFiles(list);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fileCount = files.length;

  return (
    <Stagger className="grid gap-8 lg:grid-cols-2">
      <StaggerItem>
        <div className="glass card-hover rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
            SOP & Research Proposal Guidance
          </h2>

          <p className="mt-6 text-sm font-bold text-[var(--foreground)]">
            Content (ye text use karo):
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
            This section provides guidance and sample templates to help students
            write a strong Statement of Purpose (SOP) and Research Proposal.
            Students are advised to follow the structure and guidelines while
            preparing their documents.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-[var(--foreground)]" aria-hidden />
            <p className="text-sm font-bold text-[var(--foreground)]">
              Templates (buttons ya links):
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Download className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
              <a
                href="/templates/sop-template.txt"
                download
                className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Download SOP Template
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Download className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
              <a
                href="/templates/research-proposal-template.txt"
                download
                className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Download Research Proposal Template
              </a>
            </li>
          </ul>

          <hr className="my-10 border-[var(--border)]" />

          <h2 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
            SOP Request
          </h2>
          <h3 className="mt-5 text-sm font-bold text-[var(--foreground)]">
            Request SOP Assessment
          </h3>
          <p className="mt-3 text-sm italic leading-relaxed text-[var(--muted)]">
            *Note: Students can request SOP assessment only after submitting an
            application through the system.*
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-3 text-sm font-bold text-[var(--accent)] transition hover:bg-[var(--accent)]/15"
          >
            <Circle className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2.5} aria-hidden />
            Request SOP Assessment
          </button>

          <hr className="my-10 border-[var(--border)]" />

          <h2 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
            Research Proposal Request
          </h2>
          <h3 className="mt-5 text-sm font-bold text-[var(--foreground)]">
            Request Research Proposal Assessment
          </h3>
          <p className="mt-3 text-sm italic leading-relaxed text-[var(--muted)]">
            *Note: Students can request research proposal assessment only after submitting an
            application through the system.*
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-3 text-sm font-bold text-[var(--accent)] transition hover:bg-[var(--accent)]/15"
          >
            <Circle className="h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={2.5} aria-hidden />
            Request Research Proposal Assessment
          </button>
        </div>
      </StaggerItem>

      <StaggerItem>
        <FadeIn>
          <form
            onSubmit={handleSubmit}
            className="glass card-hover flex h-full flex-col rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-[var(--foreground)] sm:text-xl">
              Assessment request
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Submit this form to send your profile assessment request{" "}
              <span className="font-medium text-[var(--foreground)]">
                directly to the admin
              </span>{" "}
              team for review.
            </p>

            <div className="mt-8 flex flex-col gap-8">
              <UnderlineField id="ar-name" name="name" label="Name:" autoComplete="name" />
              <UnderlineField
                id="ar-passport"
                name="passport"
                label="Passport No:"
                autoComplete="off"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-6">
                <label
                  htmlFor="ar-country"
                  className="shrink-0 text-sm font-medium text-[var(--foreground)] sm:min-w-[148px]"
                >
                  Select Country:
                </label>
                <select
                  id="ar-country"
                  name="country"
                  defaultValue=""
                  className="min-w-0 flex-1 cursor-pointer border-0 border-b border-[var(--border)] bg-transparent py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {countries.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <UnderlineField
                id="ar-course"
                name="course"
                label="Course Name:"
                autoComplete="off"
              />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <span className="shrink-0 text-sm font-medium text-[var(--foreground)] sm:min-w-[148px]">
                  Upload documents:
                </span>
                <div className="min-w-0 flex-1">
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={onFilesChange}
                    aria-label="Upload documents"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-md border border-sky-300/80 bg-sky-100 px-3 py-2 text-sm font-medium text-sky-900 transition hover:bg-sky-200/90 dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-sky-100 dark:hover:bg-sky-500/30"
                  >
                    <Paperclip className="h-4 w-4 shrink-0" aria-hidden />
                    Uploaded files ({fileCount})
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full rounded-xl bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent)] py-3 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-95"
            >
              Submit request
            </button>

            {submitted ? (
              <p
                className="mt-4 text-center text-sm text-[var(--muted)]"
                role="status"
              >
                Thanks — your assessment request would be sent to admin. (Demo:
                connect an API route to store or email this payload.)
              </p>
            ) : null}
          </form>
        </FadeIn>
      </StaggerItem>
    </Stagger>
  );
}
