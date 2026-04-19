import Link from "next/link";
import { Building2, MapPin } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Stagger, StaggerItem } from "@/components/ui/FadeIn";
import { partnerInstitutions } from "@/lib/site-data";

export const metadata = {
  title: "Partner institutions",
};

export default function PartnersPage() {
  return (
    <PageShell
      title="Partner institutions"
      subtitle="Universities and colleges that work with ApplyPort-SV. Open a profile for focus areas and next steps."
    >
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partnerInstitutions.map((p) => (
          <StaggerItem key={p.slug}>
            <Link
              href={`/partners/${p.slug}`}
              className="glass card-hover flex h-full flex-col rounded-2xl p-6"
            >
              <Building2 className="h-10 w-10 text-[var(--violet)]" />
              <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--muted)]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                {p.country}
              </p>
              <p className="mt-3 flex-1 text-sm text-[var(--muted)]">
                Focus: {p.focus}
              </p>
              <span className="mt-4 text-sm font-medium text-[var(--accent)]">
                View profile →
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </PageShell>
  );
}
