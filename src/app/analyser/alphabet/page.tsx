"use client";

import Image from "next/image"
import { useMemo } from 'react';
import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  SwotGrid,
  ScenarioCards,
  AlertBox,
  RatingBox,
  RadarChart
} from "@/components/analysis";
import type { AnalysisSection, Scenario } from "@/components/analysis";

const ACCENT = "#1a3c6e";

const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",    title: "Översikt" },
  { id: "moat",       number: "II",   title: "Strategisk Moat" },
  { id: "financials", number: "III",  title: "Finansiell analys" },
  { id: "valuation",  number: "IV",   title: "Värdering" },
  { id: "growth",     number: "V",    title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",   title: "Riskprofil" },
  { id: "esg",        number: "VII",  title: "ESG & Makro" },
  { id: "ai-obs",     number: "VIII", title: "AI-observationer" },
  { id: "verdict",    number: "IX",   title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",    title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Dominans inom sök och annonsering — ~90% global marknadsandel",
    "Full-stack AI-ledarskap: Gemini 2.5, TPU Ironwood (gen. 7), DeepMind",
    "Massiva nätverkseffekter — 7 produkter med över 2 miljarder användare",
    "GCP-marginal 20,7% (Q2 2025) — snabb lönsamhetsexpansion",
    "Exceptionell balansräkning: $95Mdr nettokassa, nästintill skuldfri",
  ],
  weaknesses: [
    "~75% av intäkterna från annonsering — koncentrationsrisk",
    "Google Cloud är #3 bakom AWS och Azure",
    "CapEx exploderar: ~$85Mdr 2025, pressar FCF kortsiktigt",
    "Other Bets (inkl. Waymo) genererar operativa förluster >$1Mdr/kvartal",
    "Dual-class aktiestruktur begränsar minoritetsägares inflytande",
  ],
  opportunities: [
    "AI Overview Ads: bevisad monetarisering av generativ sökning",
    "GCP: målsättning $100Mdr ARR — 32% tillväxt i Q2 2025",
    "Waymo: ~450 000 betalda resor/vecka, potentiellt $100Mdr+ värde",
    "YouTube Subscriptions: 270M+ betalande prenumeranter",
    "Gemini 2.5 Pro: topprankad modell driver Cloud-efterfrågan",
  ],
  threats: [
    "Microsoft/OpenAI hotar sökbeteendet med Bing + ChatGPT Search",
    "EU Digital Markets Act — begränsar Google Play och ekosystemet",
    "DOJ antitrust: eventuella beteendemässiga krav kvarstår",
    "FCF-kompression 2025–2026 pga massivt CapEx",
    "Energibehov från AI-datacenter — ESG-risk och kostnadsrisk",
  ],
};

const scenarios: Scenario[] = [
    {
      type: "bull",
      probability: "25%",
      price: "$420",
      change: "+37%",
      assumptions: "GCP-tillväxt &gt;40%, AI Overview Ads RPM lyfter, Waymo spin-off värderas till $100Mdr+.",
      requires: "Fortsatt AI-ledarskap, framgångsrik monetarisering av Gemini och en gynnsam regulatorisk miljö.",
    },
    {
      type: "base",
      probability: "50%",
      price: "$360",
      change: "+17%",
      assumptions: "GCP-tillväxt ~30-35%, stabil söktillväxt, FCF återhämtar sig under 2026.",
      requires: "Lyckad CapEx ROI, fortsatt marknadsdominans inom sök, och stabila annonsintäkter.",
    },
    {
      type: "bear",
      probability: "25%",
      price: "$220",
      change: "-28%",
      assumptions: "DOJ inför strukturella åtgärder, AI-disruption av sök från OpenAI, CapEx ger ej ROI.",
      requires: "En kombination av regulatoriska bakslag och en misslyckad AI-strategi.",
    },
  ];

const PUBLISHED = true;

export default function AlphabetAnalysis() {
  if (!PUBLISHED) return null;

  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 4,
      tillvaxtutsikter: 5,
      riskprofil: 3,
      esgMakro: 4,
      aiObservationer: 5,
    };
    const totaltPoang = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;

    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="ALPHABET"
      subtitle="Aktieanalys · Mars 2026"
      date="10 mars 2026"
      dataSources="Data: FY2024, TTM Q2 2025, Q3 2025"
      sections={sections}
      accentColor={ACCENT}
      theme="light"
    >
      {/* Header */}
      <div className="bg-[#0f0f0f] text-[#faf8f3] px-6 sm:px-12 py-10">
        <div className="text-[10px] tracking-[.15em] text-[#b5892a] uppercase mb-1">AKTIEANALYS</div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Alphabet Inc.</h1>
            <div className="text-sm text-[#a0a090] mt-1">NASDAQ: GOOGL · S&P 500</div>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-bold text-[#b5892a]">$307</div>
            <div className="text-[11px] text-[#a0a090]">10 mars 2026</div>
            <span className="inline-block mt-1.5 bg-[#1a4a1a] text-[#80d080] text-[11px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide">
              ▲ KÖP
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Börsvärde", value: "$3,9T" },
            { label: "P/E (TTM)", value: "~28x" },
            { label: "EBIT-marginal", value: "~33%" },
            { label: "Cloud-tillväxt", value: "+32% (Q2 2025)" },
            { label: "Riktkurs", value: "$360" },
          ].map((kpi) => (
            <div key={kpi.label} className="border-l-2 border-[#b5892a] pl-2.5">
              <div className="text-[9px] text-[#808070] uppercase tracking-wide">{kpi.label}</div>
              <div className="font-serif text-base font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full">
        <Image
          src="/alphabet_analys_hero.png"
          alt="Alphabet aktieanalys 2026"
          width={1600}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="px-6 sm:px-12 pb-20 bg-[#faf8f3] text-[#0f0f0f]">

        {/* I. Overview */}
        <div data-section="overview" id="overview" className="pt-14">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            <MetricCard label="Börsvärde" value="$3,9T" />
            <MetricCard label="P/E (TTM)" value="~28x" />
            <MetricCard label="EBIT-marginal" value="~33%" />
            <MetricCard label="Nettokassa" value="$95Mdr" />
            <MetricCard label="Anställda" value="~187 000" />
          </div>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsidé & Mission</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Alphabet Inc., moderbolaget till Google, är en ledande global aktör inom teknik och kommunikationstjänster. Bolagets mission är att organisera världens information och göra den universellt tillgänglig och användbar. Sedan 2016 drivs denna mission av en genomgripande strategi att vara ett <strong>"AI-first company"</strong>.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsmodell & Segment</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Alphabet verkar via tre primära segment: <strong>Google Services</strong> (Search, YouTube, Android, Ads), <strong>Google Cloud</strong> (GCP, Vertex AI, Workspace) och <strong>Other Bets</strong> (Waymo, Calico, Wing).
          </p>

          <RatingBox rating={5}><strong>5/5</strong> — Affärsmodellen har visat extrem uthållighet, byggd på marknadsdominans med sju produkter och över 2 miljarder användare var. Den pågående AI-transformationen bekräftar ledningens proaktiva långsiktiga fokus.</RatingBox>
        </div>

        {/* II. Strategisk Moat */}
        <div data-section="moat" id="moat" className="pt-14">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Nätverkseffekter är Alphabets starkaste försvarslinje. Android är världens mest populära operativsystem med över 3 miljarder aktiva enheter. Sju produkter har var och en över 2 miljarder användare. Denna massiva användarbas genererar en oöverträffad mängd data — den mest kritiska råvaran för att träna och förfina AI-modeller som Gemini.
          </p>
          <SwotGrid data={swotData} title="SWOT-Analys" />
          <RatingBox rating={5}><strong>5/5</strong> — Alphabets konkurrensfördelar — nätverkseffekter, full-stack AI-ledarskap (TPUs + DeepMind + Gemini) och global infrastruktur — skapar en oöverträffad moat.</RatingBox>
        </div>

        {/* III. Finansiell analys */}
        <div data-section="financials" id="financials" className="pt-14">
          <SectionHeader number="III" title="Finansiell Analys" />
          <FinancialTable
            title="Resultaträkning"
            columns={[
              { key: "metric",      header: "Nyckeltal" },
              { key: "fy2022",      header: "FY2022" },
              { key: "fy2023",      header: "FY2023" },
              { key: "fy2024",      header: "FY2024" },
              { key: "ttm",         header: "TTM Q2 2025" },
              { key: "e2026",       header: "2026e" },
            ]}
            rows={[
              { cells: { metric: { value: "Omsättning ($Mdr)"  }, fy2022: { value: "282,8" }, fy2023: { value: "307,4" }, fy2024: { value: "350,0" }, ttm: { value: "~360,5" }, e2026: { value: "~455", color: "green" } } },
              { cells: { metric: { value: "EBIT ($Mdr)"         }, fy2022: { value: "74,8"  }, fy2023: { value: "84,3"  }, fy2024: { value: "112,4" }, ttm: { value: "~118,5"}, e2026: { value: "~152"               } } },
              { cells: { metric: { value: "Utspädd EPS ($)"     }, fy2022: { value: "$4,56" }, fy2023: { value: "$5,80" }, fy2024: { value: "$8,04" }, ttm: { value: "$9,48" }, e2026: { value: "~$11,24", color: "green" } } },
            ]}
          />
          <AlertBox type="risk">
            <strong>OBS: Strategisk FCF-kompression:</strong> FCF-marginalen sjunker pga aggressiv CapEx (~$85Mdr 2025). Detta är en medveten strategisk "bränning" för att köpa framtida marknadsandelar i AI-infrastruktur.
          </AlertBox>
          <RatingBox rating={5}><strong>5/5</strong> — Balansräkningen är extremt solid med $95Mdr i nettokassa. FCF-genereringen är robust trots strategisk komprimering från historiskt höga CapEx.</RatingBox>
        </div>

        {/* IV. Värdering */}
        <div data-section="valuation" id="valuation" className="pt-14">
          <SectionHeader number="IV" title="Värdering & Jämförelse" />
          <FinancialTable
            title="Värderingsmultiplar"
            columns={[
              { key: "metric",  header: "Multipel" },
              { key: "current", header: "Nuv. (mars 2026)" },
              { key: "hist5",   header: "Historiskt snitt (5 år)" },
              { key: "comment", header: "Kommentar" },
            ]}
            rows={[
              { cells: { metric: { value: "P/E (TTM)"         }, current: { value: "~28x"  }, hist5: { value: "~23x"  }, comment: { value: "Liten premie, motiverad av AI-momentum"    } } },
              { cells: { metric: { value: "Forward P/E 2026e" }, current: { value: "~27x"  }, hist5: { value: "–"     }, comment: { value: "Analytikerkonsensus 23x — vi tillämpar premie" } } },
            ]}
          />
          <RatingBox rating={4}><strong>4/5</strong> — Rimligt värderat i förhållande till hög kvalitet och tillväxtpotential. Rabatten mot Microsoft är betydande och ger en säkerhetsmarginal.</RatingBox>
        </div>

        {/* V. Tillväxtmotorer */}
        <div data-section="growth" id="growth" className="pt-14">
          <SectionHeader number="V" title="Tillväxtmotorer & Triggers" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            GCP är bolagets snabbaste tillväxtmotor med målet att nå $100Mdr ARR. Tillväxten var 32% i Q2 2025 och GCP:s rörelsemarginal steg till 20,7%. Search växte +12% FY2024 och +15% i Q3 2025 trots konkurrensen. YouTube har 270M+ betalande prenumeranter och leder i streaming watch time. Waymo genomför ~450 000 betalda resor/vecka och kan bli en signifikant värdedrivare.
          </p>
          <RatingBox rating={5}><strong>5/5</strong> — Tillväxtmotorerna är starka och diversifierade. GCP:s snabba och lönsamma tillväxt är den viktigaste katalysatorn på medellång sikt.</RatingBox>
        </div>

        {/* VI. Riskprofil */}
        <div data-section="risk" id="risk" className="pt-14">
          <SectionHeader number="VI" title="Riskprofil" />
          <AlertBox type="risk">
            <strong>OBS: DOJ Antitrust:</strong> En domstol fastslog i augusti 2024 att Google brutit mot antitrustlagar. Strukturell uppdelning undveks, men beteendemässiga krav kvarstår. Regulatorisk klarhet är en positiv katalysator när den väl kommer.
          </AlertBox>
          <RatingBox rating={3}><strong>3/5 risk</strong> — Finansiell risk är låg. Strukturell regulatorisk risk är förhöjd men hanterbar.</RatingBox>
        </div>

        {/* VII. ESG & Makro */}
        <div data-section="esg" id="esg" className="pt-14">
          <SectionHeader number="VII" title="ESG & Makroekonomiska Faktorer" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Alphabet har ett ambitiöst hållbarhetsarbete med målet om net-zero till 2030 (MSCI ESG-rating: AAA). Den duala aktiestrukturen ger grundarna 52,1% av röstmakten, vilket möjliggör långsiktiga beslut men minskar minoritetsägares inflytande.
          </p>
          <RatingBox rating={4}><strong>4/5</strong> — Stark ESG-profil och proaktiv hantering av miljörisker. Styrningsstrukturen är en punkt att bevaka.</RatingBox>
        </div>

        {/* VIII. AI-observationer */}
        <div data-section="ai-obs" id="ai-obs" className="pt-14">
          <SectionHeader number="VIII" title="AI-observationer & Avvikande mönster" />
          <AlertBox type="info">
            <strong>Tips: EPS-estimaten kan vara konservativa.</strong> Analytikernas 2026e EPS ~$11,24 förutsätter blygsam tillväxt. Om GCP levererar &gt;40% tillväxt finns upprevideringsrisk mot $13–14 EPS, vilket ger ett målpris på $415–450 vid 32x P/E.
          </AlertBox>
          <RatingBox rating={5}><strong>5/5</strong> — Sentimentet har skiftat till positivt. Marknaden ser nu Alphabet som en AI-vinnare. Sök har visat sig mer resilient än väntat.</RatingBox>
        </div>

        {/* IX. Investeringsbeslut */}
        <div data-section="verdict" id="verdict" className="pt-14">
          <SectionHeader number="IX" title="Sammanfattning & Investeringsbeslut" />
          <div className="bg-[#0f0f0f] text-[#faf8f3] rounded p-5 mb-5">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div className="text-[10px] text-[#b5892a] tracking-widest uppercase mb-1">Investeringsrekommendation</div>
                <div className="font-serif text-4xl font-bold text-[#80e080]">▲ KÖP</div>
                <div className="text-sm text-[#a0a090] mt-1">Med 12–18 månaders horisont</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#b5892a] tracking-widest uppercase">Målpris</div>
                <div className="font-serif text-4xl font-bold">$360</div>
                <div className="text-xs text-[#80e080]">+17% potential från $307</div>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-3 pl-2 border-l-[3px] border-[#b5892a]">Samlade scores & Poängdiagram</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
            <div>
              <RadarChart scores={analysisData.scores} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
                    <span className="text-sm font-bold">Total poäng:</span>
                    <span className="text-xl font-bold font-serif text-[#1a3c6e]">{analysisData.totaltPoang} / {analysisData.maxPoang}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#e8e4da] mb-3">
                    <span className="text-sm font-bold">Viktat betyg:</span>
                    <span className="text-xl font-bold font-serif text-[#1a3c6e]">{analysisData.rating.toFixed(1)} / 5.0</span>
                </div>
                <div className="pt-2 space-y-1">
                    {Object.entries(analysisData.scores).map(([key, value]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={key} className="flex items-center gap-3">
                                <span className="text-xs text-[#5a5a4a] w-32 flex-shrink-0">{label}</span>
                                <div className="flex-grow bg-[#e8e4da] rounded h-2.5 overflow-hidden">
                                    <div className="h-full rounded" style={{ width: `${(value / 5) * 100}%`, backgroundColor: ACCENT }} />
                                </div>
                                <span className="text-xs font-bold text-[#1a3c6e] font-serif w-8 text-right">{value}/5</span>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>

          <AlertBox type="signal">
            <strong>Slutsats: KÖP</strong> — Alphabet kombinerar ett av teknikhistoriens starkaste sökmonopol med en snabbväxande och alltmer lönsam Cloud-affär och världsledande AI-kapacitet. Aktien är attraktivt värderad med betydande optionalitet.
          </AlertBox>
        </div>

        {/* X. Scenarier */}
        <div data-section="scenarios" id="scenarios" className="pt-14">
          <SectionHeader number="X" title="Scenarier: Bull, Base & Bear Case" />
          <ScenarioCards scenarios={scenarios} />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            Sannolikhetsviktat förväntat värde: <strong>$340</strong>, vilket är något under bascase-målpriset på $360, och reflekterar den kvarstående regulatoriska risken.
          </p>
        </div>
      </div>
    </AnalysisLayout>
  );
}
