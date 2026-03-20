import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getAllGuides } from "@/lib/guides";

export const metadata = createMetadata({
  title: "Börsguider",
  description:
    "Lär dig grunderna i aktieanalys och värdering — tydliga guider om P/E-tal, EV/EBIT, DCF, intrinsic value och mer.",
  path: "/guider",
});

const categoryStyle: Record<string, { badge: string; bar: string }> = {
  Värdering: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    bar: "bg-blue-500",
  },
  Analys: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  Utdelning: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500",
  },
  Grundläggande: {
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    bar: "bg-violet-500",
  },
};

const fallbackStyle = {
  badge: "bg-card border border-border text-muted",
  bar: "bg-primary",
};

export default function Guider() {
  const guides = getAllGuides();

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
            Utbildning
          </p>
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Börsguider</h1>
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed">
            Lär dig grunderna i aktieanalys, värdering och hur du bygger en
            vinnande portfölj. Våra guider är skrivna för att göra dig till en
            bättre investerare.
          </p>
        </div>

        {/* Guide cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {guides.map((guide) => {
            const style = categoryStyle[guide.category] ?? fallbackStyle;
            return (
              <Link
                key={guide.slug}
                href={`/guider/${guide.slug}`}
                className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200"
              >
                {/* Colored top bar */}
                <div className={`h-1.5 ${style.bar} group-hover:opacity-80 transition-opacity`} />

                <div className="flex flex-col flex-1 p-5">
                  {/* Category badge */}
                  <span
                    className={`self-start text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded mb-3 ${style.badge}`}
                  >
                    {guide.category}
                  </span>

                  {/* Title */}
                  <h2 className="font-serif text-[1.05rem] font-semibold leading-snug mb-3 group-hover:text-primary transition-colors flex-1">
                    {guide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {guide.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="text-xs font-mono uppercase tracking-wide text-muted">
                      {guide.readTime} läsning
                    </span>
                    <span className="text-xs font-medium text-primary group-hover:underline">
                      Läs guide →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-section-alt border border-border rounded-xl p-8 text-center">
          <h2 className="font-serif text-xl font-semibold mb-2">
            Saknar du en guide?
          </h2>
          <p className="text-sm text-muted mb-5 max-w-md mx-auto">
            Vi fyller på med nya guider varje vecka. Kontakta oss om det är
            något speciellt ämne du vill att vi ska förklara.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors"
          >
            Kontakta oss
          </Link>
        </div>
      </div>
    </div>
  );
}
