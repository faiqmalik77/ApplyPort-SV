import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Admin · Users",
};

const userRows = [
  { email: "student@edu.pk", role: "Student", status: "Active" },
  { email: "reviewer@applyport.org", role: "Admin", status: "Active" },
  { email: "ahmed.ali@student.edu.pk", role: "Student", status: "Suspended" },
];

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="mt-2 text-[var(--muted)]">
        List, search, and manage roles — nested admin route.
      </p>
      <FadeIn className="table-responsive mt-8">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--surface)]/80 text-[var(--muted)]">
            <tr>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {userRows.map((u) => (
              <tr
                key={u.email}
                className="border-t border-[var(--border)] bg-[var(--background)]/30"
              >
                <td className="px-5 py-3">{u.email}</td>
                <td className="px-5 py-3">{u.role}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      u.status === "Active"
                        ? "text-neutral-800"
                        : "text-neutral-500"
                    }
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </FadeIn>
    </div>
  );
}
