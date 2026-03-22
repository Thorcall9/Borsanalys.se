"use client";

import Link from "next/link";
import { analyses } from "@/lib/analyses";
import { guides } from "@/lib/guides";
import { verdictColor } from "@/lib/utils";
import StockTicker from "@/components/StockTicker";
import { MakroWidget } from "@/app/marknad/page";

const popularStocks = [
  { name: "NVIDIA", ticker: "NVDA", slug: "nvidia-fy2026" },
  { name: "Investor", ticker: "INVE B", slug: "investor" },
  { name: "Microsoft", ticker: "MSFT", slug: "microsoft-2026" },
  { name: "Evolution", ticker: "EVO", slug: "evolution-2025" },
  { name: "Apple", ticker: "AAPL", slug: null },
  { name: "Tesla", ticker: "TSLA", slug: null },
  { name: "Volvo", ticker: "VOLV B", slug: "volvo-2026" },
  { name: "Alphabet", ticker: "GOOGL", slug: "alphabet" },
];

const featuredGuides = guides.slice(0, 3);

const whyUs = [
  {
    title: "AI-Driven Precision",
    description:
      "Våra modeller analyserar tusentals datapunkter för att hitta mönster och trender.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.848 48.848 0 0112 21c-2.773 0-5.491-.235-8.135-.687c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "Oberoende Analys",
    description:
      "Vi är helt oberoende och har inga kopplingar till de bolag vi analyserar.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Global Räckvidd",
    description:
      "Vi analyserar bolag på alla stora världsmarknader för att ge dig en bred vy.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

function getInitial(title: string): string {
  const words = title.trim().split(/\s+/);
  return words[0]?.[0]?.toUpperCase() ?? "?";
}

const avatarColors = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-cyan-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-orange-600",
  "bg-pink-600",
];

function getAvatarColor(index: number): string {
  return avatarColors[index % avatarColors.length];
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-[#4a85d6] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-6">
            AI-driven aktieanalys för
            <br />
            smartare investeringar
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
            Detaljerade analyser med finansiella mått, värderingsmodeller och
            scenarioanalyser — allt för att hjälpa dig fatta bättre
            investeringsbeslut.
          </p>

          {/* Search bar */}
          <div className="max-w-lg mx-auto mb-8">
            <button
              onClick={() => window.dispatchEvent(new Event("openSearch"))}
              className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-colors text-left"
            >
              <svg className="w-5 h-5 text-white/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-white/60 text-sm flex-1">Sök efter företag eller guider...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 border border-white/20 rounded text-xs text-white/50 font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/analyser"
              className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors shadow-md"
            >
              Utforska analyser
            </Link>
            <Link
              href="/verktyg/rantakalkylator"
              className="px-8 py-3 bg-white/15 hover:bg-white/25 text-white rounded-lg font-medium transition-colors border border-white/30"
            >
              Våra verktyg
            </Link>
          </div>
        </div>
      </section>

      <StockTicker />

      {/* ANALYSER – Senaste analyserna */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">ANALYSER</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif mb-1">Senaste analyserna</h2>
                <p className="text-muted text-sm">Djupgående aktieanalyser med Bear, Base och Bull-scenarion.</p>
              </div>
              <Link
                href="/analyser"
                className="text-primary hover:text-primary-light font-medium text-sm transition-colors whitespace-nowrap shrink-0"
              >
                Visa alla analyser →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyses.map((analysis, i) => (
              <Link
                key={analysis.slug}
                href={`/analyser/${analysis.slug}`}
                className="group flex items-start gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/25 transition-all"
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-lg ${getAvatarColor(i)} text-white font-bold text-lg flex items-center justify-center shrink-0`}>
                  {getInitial(analysis.title)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    {analysis.ticker && (
                      <span className="text-xs font-mono text-muted">{analysis.ticker}</span>
                    )}
                    {analysis.verdict && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${verdictColor(analysis.verdict)}`}>
                        {analysis.verdict}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {analysis.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-2">
                    {analysis.excerpt}
                  </p>
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    Läs analys →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AKTIER – Populära aktier */}
      <section className="py-12 bg-section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">AKTIER</p>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-serif mb-1">Populära aktier</h2>
              <p className="text-muted text-sm">Håll koll på de mest bevakade bolagen på marknaden.</p>
            </div>
            <Link
              href="/aktier"
              className="text-primary hover:text-primary-light font-medium text-sm transition-colors whitespace-nowrap shrink-0"
            >
              Alla aktier →
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {popularStocks.map((stock) => (
              <Link
                key={stock.ticker}
                href={stock.slug ? `/analyser/${stock.slug}` : "/aktier"}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <span className="font-medium text-sm group-hover:text-primary transition-colors">{stock.name}</span>
                <span className="text-xs text-muted font-mono">{stock.ticker}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MakroWidget />

      {/* UTBILDNING – Börsguider */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">UTBILDNING</p>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif mb-1">Börsguider</h2>
              <p className="text-muted text-sm">Lär dig grunderna i aktieanalys och värdering.</p>
            </div>
            <Link
              href="/guider"
              className="text-primary hover:text-primary-light font-medium text-sm transition-colors whitespace-nowrap shrink-0"
            >
              Visa alla guider →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guider/${guide.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/25 transition-all"
              >
                <h3 className="font-serif font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {guide.description}
                </p>
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Läs guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VARFÖR OSS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">VARFÖR OSS?</p>
            <h2 className="text-2xl md:text-3xl font-serif mb-3">Varför Börsanalys.se?</h2>
            <p className="text-muted text-sm">
              Vi kombinerar AI med manuell granskning för att ge dig bästa möjliga analysunderlag.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow text-center"
              >
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">
            Redo att börja investera smartare?
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto text-sm">
            Utforska våra senaste analyser och verktyg för att ta kontroll över dina investeringar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/analyser"
              className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
            >
              Se analyser
            </Link>
            <Link
              href="/kontakt"
              className="px-8 py-3 bg-card border border-border hover:border-primary/30 rounded-lg font-medium transition-colors"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
