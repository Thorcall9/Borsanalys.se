import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getGuideBySlug, getAllGuides } from "@/lib/guides";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guider/${guide.slug}`,
    type: "article",
    publishedTime: guide.publishedDate,
    author: "Börsanalys.se",
  });
}

const categoryColor: Record<string, string> = {
  Värdering: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Analys: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Utdelning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Grundläggande: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export default async function GuideSida({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const allGuides = getAllGuides().filter((g) => g.slug !== guide.slug);

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main content */}
          <article>
            {/* Breadcrumb */}
            <nav className="text-sm text-muted mb-8">
              <Link href="/guider" className="hover:text-foreground transition-colors">
                Börsguider
              </Link>
              <span className="mx-2">/</span>
              <span>{guide.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    categoryColor[guide.category] ?? "bg-card border border-border text-muted"
                  }`}
                >
                  {guide.category}
                </span>
                <span className="text-xs text-muted">{guide.readTime} läsning</span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted">
                  Uppdaterad {formatDate(guide.publishedDate)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{guide.title}</h1>
              <p className="text-base text-foreground/80 leading-relaxed">
                {guide.description}
              </p>
            </header>

            {/* Key takeaways */}
            <div className="bg-card border border-border rounded-xl p-5 mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted mb-3">
                Viktiga punkter
              </h2>
              <ul className="space-y-2">
                {guide.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {guide.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-serif font-semibold mb-4">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="text-foreground/80 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Related guides */}
            {allGuides.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border">
                <h2 className="text-lg font-serif font-semibold mb-6">Fler guider</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {allGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/guider/${g.slug}`}
                      className="group block bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
                    >
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          categoryColor[g.category] ?? "bg-card border border-border text-muted"
                        }`}
                      >
                        {g.category}
                      </span>
                      <p className="mt-2 text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                        {g.title}
                      </p>
                      <p className="mt-1 text-xs text-muted">{g.readTime} läsning</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-4">Fler guider</h3>
                <ul className="space-y-3">
                  {allGuides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guider/${g.slug}`}
                        className="text-sm text-foreground/80 hover:text-primary transition-colors leading-snug block"
                      >
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold mb-2">Djupgående analyser</h3>
                <p className="text-xs text-muted mb-3">
                  Tillämpa det du lärt dig på verkliga bolag.
                </p>
                <Link
                  href="/analyser"
                  className="text-sm text-primary hover:underline"
                >
                  Se alla analyser →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
