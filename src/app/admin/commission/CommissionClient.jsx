"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

const initialRows = [
  {
    id: "1",
    studentName: "Ali Raza",
    universityName: "LaSalle College",
    offerLetter: "Received",
    commissionStatus: "Received",
    totalCommission: "$1,200",
  },
  {
    id: "2",
    studentName: "Hina Tariq",
    universityName: "Troy University",
    offerLetter: "Received",
    commissionStatus: "Not received yet",
    totalCommission: "$0",
  },
  {
    id: "3",
    studentName: "Umer Khan",
    universityName: "Coventry University",
    offerLetter: "Received",
    commissionStatus: "Received",
    totalCommission: "$1,500",
  },
  {
    id: "4",
    studentName: "Sara Ahmed",
    universityName: "Munich Applied Sciences",
    offerLetter: "Received",
    commissionStatus: "Received",
    totalCommission: "$1,050",
  },
];

const emptyForm = {
  studentName: "",
  universityName: "",
  commissionStatus: "Not received yet",
  totalCommission: "",
};

function formatCommission(value) {
  const numberValue = Number(String(value).replace(/[^\d.]/g, "")) || 0;
  return `$${numberValue.toLocaleString("en-US")}`;
}

function parseCommission(value) {
  return Number(String(value).replace(/[^\d.]/g, "")) || 0;
}

function badgeClass(offerLetter) {
  if (offerLetter === "Received") {
    return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  }
  if (offerLetter === "Pending") {
    return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  }
  return "bg-slate-500/15 text-slate-300 border-slate-500/30";
}

function commissionStatusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized === "received") {
    return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  }
  return "bg-amber-500/15 text-amber-300 border-amber-500/30";
}

export default function CommissionClient() {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [studentFilter, setStudentFilter] = useState("all");
  const [studentFilterInput, setStudentFilterInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const studentOptions = useMemo(() => {
    const unique = new Map();
    rows.forEach((row) => {
      if (!unique.has(row.studentName)) {
        unique.set(row.studentName, row.universityName);
      }
    });
    return Array.from(unique.entries()).map(([studentName, universityName]) => ({
      studentName,
      universityName,
    }));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchSearch =
        !query ||
        row.studentName.toLowerCase().includes(query) ||
        row.universityName.toLowerCase().includes(query);
      const matchStudent = studentFilter === "all" || row.studentName === studentFilter;
      const matchOfferLetter = row.offerLetter === "Received";
      return matchSearch && matchStudent && matchOfferLetter;
    });
  }, [rows, search, studentFilter]);

  const totalCommission = useMemo(() => {
    const total = filteredRows.reduce((sum, row) => sum + parseCommission(row.totalCommission), 0);
    return formatCommission(total);
  }, [filteredRows]);

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(row) {
    setEditingId(row.id);
    setForm({
      studentName: row.studentName,
      universityName: row.universityName,
      offerLetter: row.offerLetter,
      commissionStatus: row.commissionStatus,
      totalCommission: String(parseCommission(row.totalCommission)),
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const studentName = form.studentName.trim();
    const universityName = form.universityName.trim();
    if (!studentName || !universityName) return;
    const commissionAmount = parseCommission(form.totalCommission);

    const nextRow = {
      id: editingId ?? `${Date.now()}`,
      studentName,
      universityName,
      offerLetter: "Received",
      commissionStatus: form.commissionStatus,
      totalCommission: formatCommission(commissionAmount),
    };

    if (editingId) {
      setRows((prev) => prev.map((row) => (row.id === editingId ? nextRow : row)));
    } else {
      setRows((prev) => [nextRow, ...prev]);
    }
    closeModal();
  }

  function handleDelete(id) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  function resetFilters() {
    setSearch("");
    setStudentFilter("all");
    setStudentFilterInput("");
  }

  function handleStudentSelect(value) {
    const selected = studentOptions.find((item) => item.studentName === value);
    if (!selected) {
      setForm((prev) => ({ ...prev, studentName: "", universityName: "" }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      studentName: selected.studentName,
      universityName: selected.universityName,
    }));
  }

  function handleStudentFilterInput(value) {
    setStudentFilterInput(value);
    if (!value.trim()) {
      setStudentFilter("all");
      return;
    }
    const selected = studentOptions.find((item) => item.studentName === value);
    setStudentFilter(selected ? selected.studentName : "all");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Commission</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Keep a complete student-wise record of commission details.
      </p>

      <FadeIn className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold">Commission records</h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2">
            <p className="text-xs text-[var(--muted)]">Filtered total commission</p>
            <p className="text-lg font-semibold text-[var(--accent)]">{totalCommission}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search student or university"
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)] sm:max-w-sm"
          />
          <input
            value={studentFilterInput}
            onChange={(event) => handleStudentFilterInput(event.target.value)}
            placeholder="Filter by student (type name)"
            list="student-filter-options"
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <datalist id="student-filter-options">
            {studentOptions.map((option) => (
              <option key={option.studentName} value={option.studentName} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={openAddModal}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Add record
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Reset filters
          </button>
        </div>

        <div className="mt-5 hidden overflow-x-auto rounded-xl border border-[var(--border)] md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-[var(--surface)]/70 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">Sr no.</th>
                <th className="px-3 py-2 font-medium">Student name</th>
                <th className="px-3 py-2 font-medium">University name</th>
                <th className="px-3 py-2 font-medium">Offer letter</th>
                <th className="px-3 py-2 font-medium">Commission status</th>
                <th className="px-3 py-2 font-medium">Total Commission</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={row.id} className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.studentName}</td>
                  <td className="px-3 py-2">{row.universityName}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${badgeClass(row.offerLetter)}`}>
                      {row.offerLetter}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${commissionStatusClass(row.commissionStatus)}`}>
                      {row.commissionStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-medium">{row.totalCommission}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(row)}
                        className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="rounded-md border border-red-500/40 px-2.5 py-1 text-xs text-red-300 hover:border-red-500/70 hover:text-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredRows.length && (
                <tr className="border-t border-[var(--border)]">
                  <td colSpan={7} className="px-3 py-6 text-center text-[var(--muted)]">
                    No records found for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 md:hidden">
          {filteredRows.map((row) => (
            <div key={row.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-4">
              <p className="font-semibold">{row.studentName}</p>
              <p className="text-sm text-[var(--muted)]">{row.universityName}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className={`inline-flex rounded-full border px-2 py-0.5 ${badgeClass(row.offerLetter)}`}>
                  {row.offerLetter}
                </span>
                <span className={`inline-flex rounded-full border px-2 py-0.5 ${commissionStatusClass(row.commissionStatus)}`}>
                  {row.commissionStatus}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium">Commission: {row.totalCommission}</p>
              <button
                type="button"
                onClick={() => openEditModal(row)}
                className="mt-3 rounded-md border border-[var(--border)] px-2.5 py-1 text-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Edit record
              </button>
              <button
                type="button"
                onClick={() => handleDelete(row.id)}
                className="mt-2 rounded-md border border-red-500/40 px-2.5 py-1 text-xs text-red-300 hover:border-red-500/70 hover:text-red-200"
              >
                Delete record
              </button>
            </div>
          ))}
          {!filteredRows.length && (
            <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-4 text-sm text-[var(--muted)]">
              No records found for current filters.
            </p>
          )}
        </div>
      </FadeIn>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-2xl border border-sky-200 bg-white p-5 shadow-2xl sm:p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit commission record" : "Add commission record"}
            </h3>
            {editingId && (
              <p className="mt-1 text-xs text-slate-600">
                Admin sirf commission status aur total commission amount update kar sakta hai.
              </p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {editingId ? (
                <>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm sm:col-span-2">
                    <p className="font-medium text-slate-900">{form.studentName || "Student"}</p>
                    <p className="text-slate-600">{form.universityName || "University"}</p>
                  </div>
                  <select
                    value={form.commissionStatus}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, commissionStatus: event.target.value }))
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
                  >
                    <option value="Received">Commission: Received</option>
                    <option value="Not received yet">Commission: Not received yet</option>
                  </select>
                  <input
                    value={form.totalCommission}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, totalCommission: event.target.value }))
                    }
                    type="text"
                    inputMode="numeric"
                    placeholder="Total commission (e.g. 1200)"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
                  />
                </>
              ) : (
                <>
                  <input
                    value={form.studentName}
                    onChange={(event) => handleStudentSelect(event.target.value)}
                    list="student-modal-options"
                    placeholder="Select student (name & university auto-fill)"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 sm:col-span-2"
                  />
                  <datalist id="student-modal-options">
                    {studentOptions.map((option) => (
                      <option key={option.studentName} value={option.studentName} />
                    ))}
                  </datalist>
                  <input
                    value={form.studentName}
                    placeholder="Student name"
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                  />
                  <input
                    value={form.universityName}
                    placeholder="University name"
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                  />
                  <input
                    value="Offer letter: Received"
                    disabled
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:opacity-70"
                  />
                  <select
                    value={form.commissionStatus}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, commissionStatus: event.target.value }))
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
                  >
                    <option value="Received">Commission: Received</option>
                    <option value="Not received yet">Commission: Not received yet</option>
                  </select>
                  <input
                    value={form.totalCommission}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, totalCommission: event.target.value }))
                    }
                    type="text"
                    inputMode="numeric"
                    placeholder="Total commission (e.g. 1200)"
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500"
                  />
                </>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-sky-400 hover:text-sky-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                {editingId ? "Update record" : "Save record"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
