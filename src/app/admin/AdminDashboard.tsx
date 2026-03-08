"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-muted hover:text-foreground"
          >
            Logga ut
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <DashboardCard title="Analyser" value="9" subtitle="publicerade" />
          <DashboardCard title="Kontaktmeddelanden" value="—" subtitle="TODO: databas" />
          <DashboardCard title="Prenumeranter" value="—" subtitle="TODO: databas" />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-serif text-lg mb-4">Publicerade analyser</h2>
          <div className="space-y-3">
            {[
              { title: "Microsoft 2026", slug: "microsoft-2026", date: "2026-03-02", type: "Dedikerad sida" },
              { title: "NVIDIA FY2026", slug: "nvidia-fy2026", date: "2026-03-03", type: "Dedikerad sida" },
              { title: "Novo Nordisk 2025", slug: "novo-nordisk-2025", date: "2025-10-20", type: "Placeholder" },
              { title: "Alphabet 2025", slug: "alphabet-2025", date: "2025-10-13", type: "Placeholder" },
              { title: "Investor Q2 2025", slug: "investor-2025-q2", date: "2025-10-07", type: "Placeholder" },
              { title: "Volvo Q2 2025", slug: "volvo-2025-q2", date: "2025-10-07", type: "Placeholder" },
              { title: "New Wave 2025", slug: "new-wave-2025", date: "2025-09-28", type: "Placeholder" },
              { title: "Freetrailer 2025", slug: "freetrailer-2025", date: "2025-09-18", type: "Placeholder" },
              { title: "Evolution 2025", slug: "evolution-2025", date: "2025-08-27", type: "Placeholder" },
            ].map((a) => (
              <div key={a.slug} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <Link href={`/analyser/${a.slug}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {a.title}
                  </Link>
                  <span className="text-xs text-muted ml-2">{a.date}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${a.type === "Dedikerad sida" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>
                  {a.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-serif text-lg mb-4">Snabblänkar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/analyser" className="px-4 py-3 bg-section-alt rounded-lg text-sm hover:bg-card-hover transition-colors">
              Visa analyser &rarr;
            </Link>
            <Link href="/verktyg/rantakalkylator" className="px-4 py-3 bg-section-alt rounded-lg text-sm hover:bg-card-hover transition-colors">
              Ränta-på-ränta kalkylator &rarr;
            </Link>
            <Link href="/kontakt" className="px-4 py-3 bg-section-alt rounded-lg text-sm hover:bg-card-hover transition-colors">
              Kontaktformulär &rarr;
            </Link>
            <Link href="/" className="px-4 py-3 bg-section-alt rounded-lg text-sm hover:bg-card-hover transition-colors">
              Visa hemsidan &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 text-center">
      <div className="text-xs text-muted uppercase tracking-wider mb-1">{title}</div>
      <div className="font-serif text-3xl font-bold">{value}</div>
      <div className="text-xs text-muted">{subtitle}</div>
    </div>
  );
}
