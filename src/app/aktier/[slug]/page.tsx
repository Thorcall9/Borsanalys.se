import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getCompanyBySlug, getAllCompanies } from "@/lib/stocks";
import { analyses } from "@/lib/analyses";
import { formatDate, verdictColor } from "@/lib/utils";
import { fetchStockMetrics } from "@/lib/yahoo-finance";

// Revalidate page data once per day (86400 seconds)
export const revalidate = 86400;

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return {};
  return createMetadata({
    title: `${company.name} (${company.ticker}) – Aktieanalys`,
    description: company.description,
    path: `/aktier/${company.slug}`,
  });
}

function formatUpdatedAt(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export default async function AktieSida({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const relatedAnalyses = analyses.filter((a) =>
    company.analysisSlugs.includes(a.slug)
  );

  // Fetch live metrics from Yahoo Finance (cached 24h by Next.js)
  const live = await fetchStockMetrics(company.ticker);

  // Merge live data with static fallback from stocks.ts
  const metrics = {
    pe: live?.pe ?? company.metrics?.pe ?? null,
    marketCap: live?.marketCap ?? company.metrics?.marketCap ?? null,
    dividend: live?.dividend ?? company.metrics?.dividend ?? null,
    currency: live?.currency ?? company.metrics?.currency ?? null,
  };

  const hasMetrics = Object.values(metrics).some(Boolean);

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-8">
          <Link href="/aktier" className="hover:text-foreground transition-colors">
            Aktier
          </Link>
          <span className="mx-2">/</span>
          <span>{company.name}</span>
        </nav>

        {/* Company header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-serif">{company.name}</h1>
            <span className="text-sm font-mono text-muted bg-card border border-border px-2.5 py-1 rounded">
              {company.ticker}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-5">
            <span>{company.exchange}</span>
            <span>·</span>
            <span>{company.sector}</span>
            <span>·</span>
            <span>{company.country}</span>
          </div>
          <p className="text-base text-foreground/80 leading-relaxed max-w-2xl">
            {company.description}
          </p>
        </div>

        {/* Key metrics */}
        {hasMetrics && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-semibold">Nyckeltal</h2>
              {live?.updatedAt && (
                <span className="text-xs text-muted">
                  Uppdaterat: {formatUpdatedAt(live.updatedAt)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.pe && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted mb-1">P/E-tal</p>
                  <p className="text-xl font-semibold">{metrics.pe}</p>
                </div>
              )}
              {metrics.marketCap && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted mb-1">Börsvärde</p>
                  <p className="text-xl font-semibold">{metrics.marketCap}</p>
                </div>
              )}
              {metrics.dividend && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted mb-1">Direktavkastning</p>
                  <p className="text-xl font-semibold">{metrics.dividend}</p>
                </div>
              )}
              {metrics.currency && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted mb-1">Valuta</p>
                  <p className="text-xl font-semibold">{metrics.currency}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related analyses */}
        <div>
          <h2 className="text-lg font-serif font-semibold mb-4">
            Analyser om {company.name}
          </h2>
          {relatedAnalyses.length === 0 ? (
            <p className="text-muted">Inga analyser publicerade ännu.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAnalyses.map((analysis) => (
                <Link
                  key={analysis.slug}
                  href={`/analyser/${analysis.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-shadow transition-colors"
                >
                  <div className="h-1.5 bg-primary group-hover:bg-accent transition-colors" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-muted">
                        {formatDate(analysis.date)}
                      </span>
                      {analysis.verdict && (
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${verdictColor(analysis.verdict)}`}
                        >
                          {analysis.verdict}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                      {analysis.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed mb-3">
                      {analysis.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{analysis.author}</span>
                      {analysis.target && (
                        <span>
                          Riktkurs:{" "}
                          <span className="font-semibold text-foreground">
                            {analysis.target}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
