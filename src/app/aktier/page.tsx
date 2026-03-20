import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getAllCompanies } from "@/lib/stocks";

export const metadata = createMetadata({
  title: "Aktier",
  description:
    "Aktiehubbar för alla bolag vi analyserat på Börsanalys.se — bolagsbeskrivningar, nyckeltal och djupgående analyser.",
  path: "/aktier",
});

export default function Aktier() {
  const companies = getAllCompanies();

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Aktier</h1>
          <p className="text-muted">
            Hub-sidor för varje bolag vi analyserat — bolagsbeskrivning, nyckeltal och
            alla relaterade analyser samlade på ett ställe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/aktier/${company.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-shadow transition-colors"
            >
              <div className="h-1.5 bg-primary group-hover:bg-accent transition-colors" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-lg font-semibold group-hover:text-primary transition-colors">
                    {company.name}
                  </span>
                  <span className="text-xs font-mono text-muted bg-card border border-border px-2 py-0.5 rounded">
                    {company.ticker}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted">{company.exchange}</span>
                  <span className="text-xs text-muted">·</span>
                  <span className="text-xs text-muted">{company.sector}</span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                  {company.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{company.country}</span>
                  <span>
                    {company.analysisSlugs.length}{" "}
                    {company.analysisSlugs.length === 1 ? "analys" : "analyser"} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
