import Link from “next/link”;
import { getFeaturedAnalyses } from “@/lib/analyses”;
import { formatDate, verdictColor } from “@/lib/utils”;

const valueProps = [
{
title: “Spara tid”,
description: “Få marknadsförståelse snabbt med koncisa, datadrivna analyser.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
),
},
{
title: “Detaljerade finansiella mått”,
description: “Intäkter, marginaler, kassaflöden, värderingsmultiplar och scenarioanalyser.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>
),
},
{
title: “AI + manuell granskning”,
description: “AI-assisterade analyser som alltid kvalitetsgranskas manuellt.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.002 0A48.848 48.848 0 0112 21c-2.773 0-5.491-.235-8.135-.687l-.002 0c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5" />
</svg>
),
},
{
title: “Konkreta investeringsbeslut”,
description: “Bull, base och bear-scenarion med tydliga riktkurser.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>
),
},
{
title: “Effektiv research”,
description: “Allt du behöver för att fatta välgrundade investeringsbeslut på ett ställe.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
),
},
{
title: “Kvalitetssäkring”,
description: “Rigorös granskning av data och slutsatser i varje analys.”,
icon: (
<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
</svg>
),
},
];

export default function Home() {
const featured = getFeaturedAnalyses(4);

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
<div className="flex flex-col sm:flex-row gap-3 justify-center">
<Link
href="/analyser"
className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors shadow-md"
>
Läs senaste analysen
</Link>
<Link
href="/om-oss"
className="px-8 py-3 bg-white/15 hover:bg-white/25 text-white rounded-lg font-medium transition-colors border border-white/30"
>
Om oss
</Link>
</div>
</div>
</section>

```
  {/* Featured Analyses */}
  <section className="py-16 md:py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">
          Senaste analyserna
        </h2>
        <p className="text-muted">
          Djupgående aktieanalyser med Bear, Base och Bull-scenarion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((analysis) => (
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
              <h3 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                {analysis.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {analysis.excerpt}
              </p>
              {analysis.target && (
                <div className="text-xs text-muted">
                  Riktkurs: <span className="font-semibold text-foreground">{analysis.target}</span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/analyser"
          className="text-primary hover:text-primary-light font-medium text-sm transition-colors"
        >
          Visa alla analyser &rarr;
        </Link>
      </div>
    </div>
  </section>

  {/* Value Propositions */}
  <section className="py-16 md:py-20 bg-section-alt">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-serif mb-3">
          Varför Börsanalys.se?
        </h2>
        <p className="text-muted">
          Vi kombinerar AI med manuell granskning för att ge dig bästa möjliga analysunderlag.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {valueProps.map((prop) => (
          <div
            key={prop.title}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-primary mb-4">{prop.icon}</div>
            <h3 className="font-semibold mb-2">{prop.title}</h3>
            <p className="text-sm text-muted leading-relaxed">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Newsletter */}
  <section className="py-16 md:py-20">
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-[#1a3c6e] rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
          Fa nya analyser direkt i inkorgen
        </h2>
        <p className="text-sm text-white/80 mb-8 max-w-md mx-auto">
          Prenumerera gratis och fa ett mejl nar vi publicerar nya aktieanalyser. Inga spam.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          action="/api/newsletter"
          method="POST"
        >
          <label htmlFor="home-newsletter-email" className="sr-only">E-postadress</label>
          <input
            type="email"
            id="home-newsletter-email"
            name="email"
            required
            maxLength={254}
            placeholder="din@email.se"
            className="flex-1 px-4 py-3 rounded-xl bg-white text-[#1a1a1a] text-sm focus:outline-none focus:ring-2 focus:ring-[#b5892a]"
          />
          <button
            type="submit"
            className="bg-[#b5892a] hover:bg-[#c8a040] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Prenumerera gratis
          </button>
        </form>
        <p className="text-xs text-white/50 mt-4">
          Avprenumerera nar som helst.
        </p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="py-16 md:py-20 bg-section-alt">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-serif mb-4">
        Redo att borja investera smartare?
      </h2>
      <p className="text-muted mb-8 max-w-lg mx-auto">
        Utforska vara senaste analyser och verktyg for att ta kontroll over dina investeringar.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/analyser"
          className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
        >
          Utforska analyser
        </Link>
        <Link
          href="/verktyg/rantakalkylator"
          className="px-8 py-3 bg-card border border-border hover:border-primary/30 rounded-lg font-medium transition-colors"
        >
          Prova kalkylatorerna
        </Link>
      </div>
    </div>
  </section>
</>
```

);
}
