"use client";

import { useMemo } from "react";
import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  SwotGrid,
  ScenarioCards,
  AlertBox,
  RadarChart,
} from "@/components/analysis";
import type { AnalysisSection, Scenario, TableRow } from "@/components/analysis";

const ACCENT = "#1a3c6e";

const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",   title: "Översikt" },
  { id: "moat",       number: "II",  title: "Affärsmodell & Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation",  number: "IV",  title: "Värdering" },
  { id: "growth",     number: "V",   title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",  title: "Riskprofil" },
  { id: "markets",    number: "VII", title: "Marknader" },
  { id: "esg",        number: "VIII", title: "ESG & Ägarstruktur" },
  { id: "verdict",    number: "IX",  title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",   title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Unik affärsmodell — gratis uthyrning för kunder finansierad av reklam skapar stark pull mot återförsäljare",
    "Etablerade partnerskap med IKEA, Bauhaus och K-Rauta — välkända ankarpartners ger trovärdighet",
    "Nätverkseffekter: fler trailer-punkter attraherar fler annonsörer, som finansierar fler trailer-punkter",
    "Asset-light modell — trailers ägs av Freetrailer, men det löpande underhållet är begränsat",
    "Stark kundlojalitet — konsumenter kopplar Freetrailer-upplevelsen positivt till partnerbutiken",
  ],
  weaknesses: [
    "Liten omsättning — bolaget är fortfarande i tidig tillväxtfas och ännu inte lönsamt",
    "Hög beroende av ett fåtal stora partnerkedjor för majoriteten av intäkterna",
    "Annonsintäkter konjunkturkänsliga — vid recession skärs reklambudgetar snabbt",
    "Kapitalintensiv expansion — varje ny marknad kräver investeringar i trailer-flotta och infrastruktur",
    "Begränsad pricing power gentemot stora återförsäljare (IKEA etc.) som är starka förhandlingsparter",
  ],
  opportunities: [
    "Expansion till Tyskland och övriga DACH-regionen — mångdubbelt större marknad än Norden",
    "Utökad annonsformat — digitala skärmar på trailers, QR-koder och riktad reklam ökar CPM",
    "Nya vertikaler: byggvaruhus, sportkedjor, elektronikhandlare är naturliga expansionskandidater",
    "Delningsekonomi-trend: konsumenter söker i ökande grad access (hyra) framför ownership",
    "Hållbarhetsvinkeln — gemensam användning av trailers minskar antalet privatägda, stärker ESG-profil",
  ],
  threats: [
    "Konkurrenter kan kopiera affärsmodellen om den bevisar sig skalbar — inga starka IP-barriärer",
    "Stora återförsäljare (IKEA) kan välja att driva egna trailer-tjänster utan tredjepartspartner",
    "Reklambranschens skift mot digital annonsering minskar attraktivitet av fysiska annonsplatser",
    "Ekonomisk nedgång minskar hushållens DIY-investeringar (köksprojekt, trädgård) som driver trailer-behovet",
    "Kapitalbrist: som litet bolag kan finansieringen av expansion bli en flaskhals",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "20%",
    price: "SEK 35",
    change: "+75%",
    assumptions:
      "Snabb expansion i Tyskland, nya stora partnerkedjor, lönsamhet uppnås 2026.",
    requires: "Annonsintäkt per trailer stiger, tyska marknaden rullas ut utan stora fördröjningar.",
  },
  {
    type: "base",
    probability: "50%",
    price: "SEK 20",
    change: "+0%",
    assumptions:
      "Norden mognar stabilt, tysk expansion går långsamt men framgångsrikt, lönsamhet nås 2027.",
    requires: "Inga större partnerförluster, stabil annonsmarknad.",
  },
  {
    type: "bear",
    probability: "30%",
    price: "SEK 8",
    change: "-60%",
    assumptions:
      "Expansionen kräver mer kapital än väntat, recession pressar annonsbudgetar, IKEA väljer intern lösning.",
    requires: "Ny emission med utspädning och tillväxten bromsar under förväntningarna.",
  },
];

const financialRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning (mSEK)" }, FY2022: { value: "~25" }, FY2023: { value: "~35" }, H1_2025: { value: "~25 (H1)" } } },
  { cells: { metric: { value: "Tillväxt (%)" }, FY2022: { value: "+40%" }, FY2023: { value: "+40%", color: "green" }, H1_2025: { value: "~30%", color: "green" } } },
  { cells: { metric: { value: "EBITDA (mSEK)" }, FY2022: { value: "-8" }, FY2023: { value: "-5", color: "amber" }, H1_2025: { value: "~-3 (H1)" } } },
  { cells: { metric: { value: "Trailer-punkter (#)" }, FY2022: { value: "~1 500" }, FY2023: { value: "~2 000" }, H1_2025: { value: "~2 500" } } },
  { cells: { metric: { value: "Aktiva partnerkedjor (#)" }, FY2022: { value: "~8" }, FY2023: { value: "~10" }, H1_2025: { value: "~12" } } },
];

export default function FreetrailerAnalysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 4,
      strategiskMoat: 3,
      finansiellKvalitet: 2,
      vardering: 2,
      tillvaxtutsikter: 4,
      riskprofil: 2,
      aiObservationer: 4,
      esgMakro: 4,
    };
    const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;
    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="Freetrailer"
      subtitle="Nasdaq First North · FREET"
      date="18 september 2025"
      dataSources="Halvårsrapport H1 2025, bolagets IR-material, pressmeddelanden"
      sections={sections}
      accentColor={ACCENT}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (sep 2025)" value="SEK 20" />
            <MetricCard label="Börsvärde" value="~200 mSEK" />
            <MetricCard label="Trailer-punkter" value="~2 500" />
            <MetricCard label="Status" value="Tillväxtfas" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Freetrailer är en dansk plattformsaktör med en enkel men smart affärsidé: låna ut trailers gratis till konsumenter via stora återförsäljare (IKEA, Bauhaus, K-Rauta), och finansiera det hela med reklam. Konsumenten får gratis transport, butiken lockar mer trafik och Freetrailer tjänar sina intäkter från varumärkena som annonserar på trailerkanonen.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Bolaget är i tidig tillväxtfas och ännu inte lönsamt. Investeringstesen bygger på att affärsmodellen bevisar sin skalbarhet utanför Norden — primärt i Tyskland — och att annonsintäkterna per trailer stiger i takt med att plattformen mognar.
          </p>
          <AlertBox type="risk">
            Freetrailer är ett spekulativt case med hög risk. Liten omsättning, negativt kassaflöde och hög beroende av kapitalmarknadens välvilja. Passa endast för investerare som tål hög volatilitet och eventuell totalförlust.
          </AlertBox>
        </section>

        {/* II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Affärsmodell & Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Affärsmodellen är trestegad: (1) Freetrailer investerar i trailer-flotta och placerar den hos partnerkedjor. (2) Konsumenten lånar gratis, registrerar sig digitalt och exponeras för reklam. (3) Annonsörer betalar för exponering mot en väldefinierad köpstark målgrupp (nyinflyttade, renovationsintresserade).
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Nätverkseffekten är tydlig: fler trailer-punkter ger fler uthyrningar, fler uthyrningar ger bättre data och trovärdighet till annonsörerna, vilket attraherar fler annonsörer och finansierar ytterligare expansion. Moaten är dock ännu ej bevisad i stor skala.
          </p>
        </section>

        {/* III */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric",  header: "Nyckeltal" },
              { key: "FY2022",  header: "FY2022" },
              { key: "FY2023",  header: "FY2023" },
              { key: "H1_2025", header: "H1 2025" },
            ]}
            rows={financialRows}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            Omsättningen växer starkt men från en liten bas. Bolaget bränner fortfarande kassa i tillväxtinvesteringar. Den viktigaste finansiella metriken att bevaka är rörelsen mot EBITDA-neutralitet — som förväntas uppnås när trailer-nätverket når en kritisk massa.
          </p>
        </section>

        {/* IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Traditionella multiplar (P/E, EV/EBIT) är inte meningsfulla för ett förlustbolag i tillväxtfas. Freetrailer värderas istället på P/S (~5x omsättning) och potentiellt framtida intäkter om tyska marknaden öppnas. Värderingen är spekulativ och återspeglar marknadens förtroende för affärsmodellens skalbarhet.
          </p>
          <AlertBox type="info">
            Vid en lyckad tysk expansion och lönsamhet 2027 kan ett motiverat EV/EBITDA på 15-20x av en normaliserad EBITDA ge ett börsvärde på 500–800 mSEK — mot nuvarande ~200 mSEK. Det är bull-caset.
          </AlertBox>
        </section>

        {/* V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Tyskt marknadsöppnande</h3>
              <p className="text-sm text-[#2a2a2a]">Tyskland har 4× Nordens befolkning och en etablerad IKEA/Bauhaus-kultur. En lyckad tysketablering är den enskilt viktigaste värdedrivaren i aktien.</p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">Digitala annonsformat</h3>
              <p className="text-sm text-[#2a2a2a]">Digitala skärmar och QR-koder på trailers möjliggör riktad annonsering och mätbarhet — det höjer annons-CPM och attraherar fler varumärken.</p>
            </div>
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Fler partnerkedjor</h3>
              <p className="text-sm text-[#2a2a2a]">Sportkedja, elektronikhandel och möbelhandel är naturliga nästa steg. Varje ny kedja adderar trailer-punkter och uthyrnings­volym.</p>
            </div>
          </div>
        </section>

        {/* VI */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />
        </section>

        {/* VII */}
        <section id="markets" data-section="markets" className="mb-16">
          <SectionHeader number="VII" title="Marknader" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Norden (mogen)</h3>
              <p className="text-sm text-[#2a2a2a]">Sverige, Danmark, Norge, Finland. Etablerade partnerskapen med IKEA och Bauhaus. Stabil intäktsbas, begränsad marginalexpansion.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">DACH (expansion)</h3>
              <p className="text-sm text-[#2a2a2a]">Primärt Tyskland. Testfas pågår 2025. Avgörande för aktiens långsiktiga potential. Tidslinje: full utrullning 2026-2027.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Övrig Europa (framtid)</h3>
              <p className="text-sm text-[#2a2a2a]">Benelux, Polen och övriga Centraleuropa är potentiella marknaderna bortom DACH. Längre tidslinje, beroende av kapitaltillgång.</p>
            </div>
          </div>
        </section>

        {/* VIII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VIII" title="ESG & Ägarstruktur" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Freetrailers affärsmodell har en inbyggd hållbarhetsdimension: gemensam användning av trailers minskar behovet av privatägda trailers och relaterade utsläpp. Bolaget är litet och ESG-rapporteringen är begränsad, men affärsmodellen är i linje med delningsekonomi-trenden. Ägarstrukturen domineras av grundare och tidiga institutionella investerare.
          </p>
        </section>

        {/* IX */}
        <section id="verdict" data-section="verdict" className="mb-16">
          <SectionHeader number="IX" title="Investeringsbeslut" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
            <RadarChart scores={analysisData.scores} />
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
                <span className="text-sm font-bold">Total poäng:</span>
                <span className="text-xl font-bold font-serif text-[#1a3c6e]">{analysisData.totaltPoang} / {analysisData.maxPoang}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
                <span className="text-sm font-bold">Viktat betyg:</span>
                <span className="text-xl font-bold font-serif text-[#1a3c6e]">{analysisData.rating.toFixed(1)} / 5.0</span>

              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Freetrailer är ett intressant men spekulativt case. Affärsmodellen är smart och nätverkseffekterna är reella. Tesen kräver att den tyska expansionen lyckas och att bolaget når lönsamhet utan för stor utspädning. För risktoleranta investerare är det en intressant optionalitet.
          </p>
          <AlertBox type="risk">
            <strong>BEVAKA — hög risk, spekulativt.</strong> Inte lämpat för kapital man inte tål att förlora. Följ tyskt marknadsöppnande och lönsamhetsutveckling som de viktigaste bevakningspunkterna.
          </AlertBox>
        </section>

        {/* X */}
        <section id="scenarios" data-section="scenarios" className="mb-16">
          <SectionHeader number="X" title="Scenarier" />
          <ScenarioCards scenarios={scenarios} />
        </section>
      </div>
    </AnalysisLayout>
  );
}
