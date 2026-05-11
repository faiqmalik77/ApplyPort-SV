import { FadeIn } from "@/components/ui/FadeIn";

export const metadata = {
  title: "Admin · Offers",
};

const curatedLists = [
  { type: "High-ranked", count: 12, note: "Universities with strong global rankings." },
  {
    type: "Pakistan-friendly intake",
    count: 9,
    note: "Institutions taking higher student volume from Pakistan.",
  },
  { type: "Low-fee options", count: 15, note: "Lower tuition pathways for budget-focused users." },
];

export default function AdminOffersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Offers curation</h1>
      <p className="mt-2 text-[var(--muted)]">
        Curate suggestions shown in Offers dashboard: ranking, Pakistan intake, and low-fee.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {curatedLists.map((item, index) => (
          <FadeIn key={item.type} delay={index * 0.05}>
            <div className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold">{item.type}</p>
              <p className="mt-1 text-2xl font-bold text-[var(--accent)]">{item.count}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.note}</p>
              <button
                type="button"
                className="mt-4 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold"
              >
                Update list
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
