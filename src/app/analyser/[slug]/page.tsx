import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getAnalysisBySlug, analyses } from "@/lib/analyses";
import { formatDate, verdictColor } from "@/lib/utils";

export async function generateStaticParams() {
  return analyses.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const analysis = getAnalysisBySlug(slug);
  if (!analysis) return {};

  return createMetadata({
    title: analysis.title,
    description: analysis.excerpt,
    path: `/analyser/${slug}`,
    type: "article",
    publishedTime: analysis.date,
    author: analysis.author,
  });
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const analysis = getAnalysisBySlug(slug);

  if (!analysis) {
    notFound();
  }

  return (
    <article className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted">{formatDate(analysis.date)}</span>
            {analysis.verdict && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${verdictColor(analysis.verdict)}`}>
                {analysis.verdict}
              </span>
            )}
            {analysis.target && (
              <span className="text-sm text-muted">
                Riktkurs: <span className="font-semibold text-foreground">{analysis.target}</span>
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-serif leading-tight mb-3">
            {analysis.title}
          </h1>
          <p className="text-muted">Av {analysis.author}</p>
        </header>

        <div className="bg-section-alt border border-border rounded-xl p-8 text-center">
          <p className="text-muted mb-2">
            Fullständig analys med interaktiva diagram och scenarioanalys kommer i fas 2.
          </p>
          <p className="text-sm text-muted">
            Här kommer det kompletta analysinnehållet med Chart.js-diagram,
            SWOT-analys, värderingstabeller och Bull/Base/Bear-scenarion att renderas.
          </p>
        </div>
      </div>
    </article>
  );
}
