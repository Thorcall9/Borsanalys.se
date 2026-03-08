import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { analyses } from "@/lib/analyses";
import { formatDate, verdictColor } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Analyser",
  description:
    "Alla aktieanalyser på Börsanalys.se — djupgående analyser med Bear, Base och Bull-scenarion.",
  path: "/analyser",
});

export default function Analyser() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Analyser</h1>
          <p className="text-muted">
            Djupgående aktieanalyser med detaljerade finansiella mått, värderingsmodeller
            och Bear/Base/Bull-scenarion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
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
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${verdictColor(analysis.verdict)}`}>
                      {analysis.verdict}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {analysis.title}
                </h2>

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
      </div>
    </section>
  );
}
