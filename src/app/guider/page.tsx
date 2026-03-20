import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getAllGuides } from "@/lib/guides";

export const metadata = createMetadata({
  title: "Börsguider",
  description:
    "Lär dig grunderna i aktieanalys och värdering — tydliga guider om P/E-tal, EV/EBIT, DCF, intrinsic value och mer.",
  path: "/guider",
});

const categoryColor: Record<string, string> = {
  Värdering: "bg-blue-500/10 text-blue-400",
  Analys: "bg-emerald-500/10 text-emerald-400",
  Grundläggande: "bg-amber-500/10 text-amber-400",
};

export default function Guider() {
  const guides = getAllGuides();

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Börsguider</h1>
          <p className="text-muted">
            Tydliga förklaringar av de viktigaste begreppen inom aktieanalys och
            värdering — från P/E-tal till DCF-modeller.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guider/${guide.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-shadow transition-colors"
            >
              <div className="h-1.5 bg-primary group-hover:bg-accent transition-colors" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded ${
                      categoryColor[guide.category] ?? "bg-card border border-border text-muted"
                    }`}
                  >
                    {guide.category}
                  </span>
                  <span className="text-xs text-muted">{guide.readTime}</span>
                </div>

                <h2 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {guide.title}
                </h2>

                <p className="text-sm text-muted leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
