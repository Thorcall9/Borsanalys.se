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
  { id: "moat",       number: "II",  title: "Strategisk Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation",  number: "IV",  title: "Värdering" },
  { id: "growth",     number: "V",   title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",  title: "Riskprofil" },
  { id: "segments",   number: "VII", title: "Segmentanalys" },
  { id: "esg",        number: "VIII", title: "ESG & Regulatoriskt" },
  { id: "verdict",    number: "IX",  title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",   title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Dominerande marknadsposition — ~70% global marknadsandel inom live casino, svårreplikerat teknologiledartap",
    "Exceptionella EBITDA-marginaler kring 65-70% — strukturellt högre än i princip alla jämförbara spelbolag",
    "Skalbar B2B-plattform: operatörerna bär kundanskaffningskostnader, Evolution levererar innehåll och tech",
    "Kontinuerlig produktinnovation — Lightning-serien, Crazy Time, Deal or No Deal skapar fläktbas och högre GGR",
    "Stark balansräkning och hög kassaflödesgenerering möjliggör utdelningar och återköp",
  ],
  weaknesses: [
    "Exponering mot grå och svarta marknader — en del av intäkterna kommer från oreglerade jurisdiktioner",
    "Hög beroende av ett fåtal megaoperatörer (bet365, Flutter/FanDuel, DraftKings) för stor del av intäkterna",
    "Reglering av spel stramas åt i flera europeiska nyckelmarknader",
    "Kursen handlas till lägre multiplar än historiskt — marknaden prissätter in högre regulatorisk risk",
    "Tillväxttakten normaliseras från de mycket höga nivåerna post-pandemi",
  ],
  opportunities: [
    "USA: legal sports betting driver ökad efterfrågan på live casino-produkter",
    "Latinamerika: snabb regulatoryreglering av online casino skapar nya B2C-marknader för operatörerna",
    "Live casino-penetrationsgraden stiger kontinuerligt vs. RNG (slumpmässiga spel)",
    "First Mover-fördelar i nya reglerade marknader — Evolution är ofta först in",
    "AI och personalisering kan höja GGR per spelare och förlänga spelsessioner",
  ],
  threats: [
    "Regulatorisk tightening i Nederländerna, Sverige, Belgien och potentiellt fler marknader",
    "Koreansk exponering — myndigheterna har undersökt Evolutions relationer med koreanska operatörer",
    "Konkurrens från Pragmatic Play Live, Playtech och nischade live studio-aktörer",
    "Valutatryck: intäkter i EUR/GBP mot kostnadsbas i diverse östeuropeiska valutor",
    "Potentiell skärpning av spelansvarsregler som begränsar insatsgränser eller session­längder",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "SEK 1 200",
    change: "+50%",
    assumptions:
      "USA-marknaden accelererar, regulatorisk situation stabiliseras, marginaler håller 68%+.",
    requires: "Omsättningstillväxt 20%+ och P/E-expansion mot 25x.",
  },
  {
    type: "base",
    probability: "50%",
    price: "SEK 850",
    change: "+6%",
    assumptions:
      "Stabil tillväxt 12-15%, EBITDA-marginaler håller kring 65%, inga större regulatoriska bakslag.",
    requires: "Fortsatt bra USA-momentum och stabil europeisk marknad.",
  },
  {
    type: "bear",
    probability: "25%",
    price: "SEK 520",
    change: "-35%",
    assumptions:
      "Koreansk exponering leder till böter, Sverige och Nederländerna stramar åt kraftigt.",
    requires: "Tillväxten faller under 8% och marginaler pressas ned mot 58-60%.",
  },
];

const financialRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning (mdr EUR)" }, FY2022: { value: "1,34" }, FY2023: { value: "1,75" }, H1_2025: { value: "~1,0 (run rate)" } } },
  { cells: { metric: { value: "Omsättningstillväxt (%)" }, FY2022: { value: "+35%" }, FY2023: { value: "+31%", color: "green", arrow: "up" }, H1_2025: { value: "~12%", color: "green" } } },
  { cells: { metric: { value: "EBITDA-marginal (%)" }, FY2022: { value: "67%" }, FY2023: { value: "68%", color: "green", arrow: "up" }, H1_2025: { value: "~65%", color: "green" } } },
  { cells: { metric: { value: "Nettomarginal (%)" }, FY2022: { value: "48%" }, FY2023: { value: "50%" }, H1_2025: { value: "~46%" } } },
  { cells: { metric: { value: "EPS (EUR)" }, FY2022: { value: "4,2" }, FY2023: { value: "5,3" }, H1_2025: { value: "~5,5e" } } },
  { cells: { metric: { value: "Utdelning (SEK)" }, FY2022: { value: "18,5" }, FY2023: { value: "22,0" }, H1_2025: { value: "~25e" } } },
];

export default function EvolutionAnalysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 3,
      tillvaxtutsikter: 3,
      riskprofil: 3,
      aiObservationer: 4,
      esgMakro: 3,
    };
    const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;
    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="Evolution"
      subtitle="Nasdaq Stockholm · EVO"
      date="27 augusti 2025"
      dataSources="Halvårsrapport H1 2025, årsredovisning 2024, regulatoriska uttalanden"
      sections={sections}
      accentColor={ACCENT}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (aug 2025)" value="SEK 800" />
            <MetricCard label="P/E (forward)" value="~17x" />
            <MetricCard label="EBITDA-marginal" value="~65%" />
            <MetricCard label="Direktavkastning" value="~3,5%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Evolution är det svenska bolag som tystast byggde upp ett av börsens starkaste globala monopol. Bolaget levererar live casino-innehåll och teknologi till nätkasinon världen över — en B2B-modell som genererar intäkter utan att äga en enda kund direkt. Med ~70% global marknadsandel inom live casino och EBITDA-marginaler kring 65-68% är Evolution ett av Stockholmsbörsens mest lönsamma bolag.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Tillväxttakten har normaliserats från de exceptionella post-pandeminivåerna. Regulatorisk osäkerhet, framför allt kring bolagets exponering mot oreglerade marknader, har pressat värderingen. På 17x forward P/E handlas bolaget till en historisk bottennotering relativt sin lönsamhet.
          </p>
          <AlertBox type="info">
            Live casino-marknaden är strukturellt i tillväxt. Evolution är den dominerande aktören i ett winner-takes-most-segment med höga inträdeshinder. Regulatorisk risk är reell men hanteras löpande.
          </AlertBox>
        </section>

        {/* II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Evolutions moat är djup och mångdimensionell. Teknologiplattformen med låg latens och hög videokvalitet kräver enorma investeringar och år av tuning. Produktportföljen — Lightning Roulette, Crazy Time, Deal or No Deal — har blivit egna varumärken som spelare aktivt söker efter, vilket driver lojalitet hos operatörerna.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Switching costs är höga: en operatör som byter live casino-leverantör riskerar att tappa spelare som är vana vid specifika Evolution-titlar. Detta skapar ett självförstärkande ekosystem där intäkterna växer med marknadens tillväxt snarare än att behöva erövras.
          </p>
        </section>

        {/* III */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric",   header: "Nyckeltal" },
              { key: "FY2022",   header: "FY2022" },
              { key: "FY2023",   header: "FY2023" },
              { key: "H1_2025",  header: "H1 2025 (run rate)" },
            ]}
            rows={financialRows}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            Finansiellt är Evolution exceptionellt stabilt. Kapitalintensiteten är låg (investeringar primärt i studior och IT), fritt kassaflöde är starkt och balansräkningen har minimal skuldsättning. Hög utdelningsandel (~50%) och aktieåterköp ger direktavkastning kring 3-4%.
          </p>
        </section>

        {/* IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="P/E (forward)" value="~17x" />
            <MetricCard label="EV/EBITDA" value="~12x" />
            <MetricCard label="FCF-yield" value="~5%" />
            <MetricCard label="Direktavkastning" value="~3,5%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Evolution handlas till historiska bottennoteringar i relativa multiplar. På 17x forward P/E för ett bolag med 65%+ EBITDA-marginaler och dominerande marknadsposition är värderingen attraktiv om man tror att regulatorisk risk inte eskalerar kraftigt. Historiska multiplar har legat 30-40x P/E under tillväxtåren.
          </p>
        </section>

        {/* V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">USA — live casino på frammarsch</h3>
              <p className="text-sm text-[#2a2a2a]">Legal sports betting driver medvetenhet om online gambling. Live casino följer i spåren och Evolution är positionerat att ta ledarskapet i USA.</p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">Latinamerika — reglering öppnar marknader</h3>
              <p className="text-sm text-[#2a2a2a]">Brasilien, Colombia och Mexico reglerar online casino successivt. Evolution är tidigt ute med lokala studio-etableringar.</p>
            </div>
            <div className="border-l-4 border-[#16a34a] pl-4">
              <h3 className="text-sm font-bold text-[#16a34a] mb-1">Produktinnovation — nya speltitlar</h3>
              <p className="text-sm text-[#2a2a2a]">Varje ny blockbuster-titel (Lightning, Crazy Time) skapar ny GGR-tillväxt. Plattformen förstärks av kontinuerlig produktutveckling.</p>
            </div>
          </div>
        </section>

        {/* VI */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Den mest omedelbara risken är regulatorisk. Koreanska myndigheters undersökning av Evolutions relationer med lokala operatörer är den mest akuta osäkerhetsfaktorn. Europeisk reglering (Sverige, Nederländerna, Belgien) stramas åt successivt men är hanterbar. Bolagets strategi att aktivt röra sig mot reglerade marknader är rätt väg.
          </p>
        </section>

        {/* VII */}
        <section id="segments" data-section="segments" className="mb-16">
          <SectionHeader number="VII" title="Segmentanalys" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Evolution verkar i ett enda segment — live casino B2B — men kan delas upp geografiskt. Europa (primärt UK, Sverige, Belgien, Spanien) utgör kärnan. Asien är det mest lönsamma men mest regulatoriskt känsliga segmentet. Nordamerika är det snabbast växande segmentet med längst tillväxtbana.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Europa (~55%)</h3>
              <p className="text-sm text-[#2a2a2a]">Mogen marknad med stabil tillväxt. Regulatorypress pågår men marknaden är stor och Evolution är etablerad.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Asien (~25%)</h3>
              <p className="text-sm text-[#2a2a2a]">Höga marginaler men oreglerade marknader. Koreansk exponering är en osäkerhetsfaktor. Högt regulatorisk risk.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Nordamerika (~20%)</h3>
              <p className="text-sm text-[#2a2a2a]">Snabbast växande. USA i tidig fas — reglerat och stor potential. Kan bli den viktigaste marknaden på 5 år.</p>
            </div>
          </div>
        </section>

        {/* VIII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VIII" title="ESG & Regulatoriskt" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Spelbranschen möter systematisk ESG-granskning kring spelansvar. Evolution har investerat i ansvarsfullt spelande men sektorn som helhet möter utmaningar med institutionella investerare. Bolagets ESG-betyg förbättras successivt men är strukturellt lägre än vad de finansiella nyckeltalen motiverar.
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
            Evolution kombinerar en dominerande marknadsposition med exceptionell lönsamhet. På historiskt låga multiplar är värderingen attraktiv för investerare som kan hantera den regulatoriska osäkerheten. Den strukturella tillväxten i live casino-marknaden är intakt och USA är fortfarande i sin linda.
          </p>
          <AlertBox type="signal">
            <strong>KÖP — Bevakningspunkt SEK 800.</strong> Regulatorisk risk är prissatt men inte existentiell. Bevaka Koreansk myndighetsutveckling och USA-tillväxttakt som de viktigaste variablerna.
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
