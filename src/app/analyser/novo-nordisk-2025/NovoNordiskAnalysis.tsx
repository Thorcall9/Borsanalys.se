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
  ScoreBreakdown,
} from "@/components/analysis";
import type { AnalysisSection, Scenario, TableRow } from "@/components/analysis";

// ── SECTIONS ──────────────────────────────────────────────────────────────────
const sections: AnalysisSection[] = [
  { id: "overview",    number: "I",    title: "Företagsöversikt" },
  { id: "moat",        number: "II",   title: "Strategisk Moat" },
  { id: "financials",  number: "III",  title: "Finansiell Analys" },
  { id: "valuation",   number: "IV",   title: "Värdering" },
  { id: "growth",      number: "V",    title: "Tillväxtmotorer" },
  { id: "risk",        number: "VI",   title: "Riskprofil" },
  { id: "esg",         number: "VII",  title: "ESG & Makro" },
  { id: "ai",          number: "VIII", title: "AI-observationer" },
  { id: "verdict",     number: "IX",   title: "Investeringsbeslut" },
  { id: "scenarios",   number: "X",    title: "Scenarier" },
];

// ── SWOT ──────────────────────────────────────────────────────────────────────
const swotData = {
  strengths: [
    "Global marknadsledare inom GLP-1 (59,6% branded volymandel fetma)",
    "Semaglutide -- världens mest sålda läkemedelsmolekyl",
    "Unik ägarstruktur via Novo Nordisk Foundation -- långsiktigt tänkande",
    "Exceptionell lönsamhet: ROE ~61%, ROIC ~38%",
    "Starka kassaflöden (~DKK 119 Mdr operativt 2025)",
  ],
  weaknesses: [
    "Hög koncentrationsrisk -- semaglutide utgör merparten av omsättningen",
    "Fallande bruttomarginal 2025 (84,7% till 81,0%) p.g.a. Catalent-förvärv",
    "Nytt ledarskap (Doustdar) med begränsat track record som VD",
    "Negativt rörelsekapital och stigande skuldsättning efter Catalent-affären",
  ],
  opportunities: [
    "CagriSema (22,7% viktnedgång) -- potentiellt blockbuster i FDA-ansökan",
    "Wegovy-piller -- öppnar för >100 Mn patienter som ej vill injicera",
    "WHO-stöd för GLP-1 breddar global tillgång",
    "Zenagamtide (amycretin) i fas 3 -- nästa generations GLP-1/amylin",
    "Fetma-marknaden ~1 miljard potentiella patienter globalt",
  ],
  threats: [
    "MFN-avtal (Most Favoured Nations) pressar US-priser",
    "Exclusivitetsförlust semaglutide i vissa marknader (Ozempic 2026 EU)",
    "Eli Lilly/tirzepatide (Mounjaro/Zepbound) intensifierar konkurrensen",
    "Medicaid-nedskärningar minskar täckning för fetmaläkemedel",
    "Politisk/regulatorisk prispress (IRA/Inflation Reduction Act)",
  ],
};

// ── SCENARIOS ─────────────────────────────────────────────────────────────────
const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "DKK 450+",
    change: "+91%",
    assumptions:
      "CagriSema godkänt 2026, Wegovy-piller tar 20%+ marknadsandel, MFN-avtal begränsas av domstol, Zenagamtide fas 3 stark data. Omsättning ~DKK 370+ Mdr 2027, EBIT-marginal 46%+.",
    requires: "P/E re-rating till 18-20x när pipeline-momentum bevisas.",
  },
  {
    type: "base",
    probability: "50%",
    price: "DKK 340-380",
    change: "+44-61%",
    assumptions:
      "Volymtillväxt kompenserar prissänkningar, CagriSema godkänd men gradvis uptake, International Operations driver tillväxt, stabil pipeline-progression. Omsättning ~DKK 332 Mdr 2027.",
    requires: "P/E normaliseras mot 14-16x. Direktavkastning ~4,8% ger kursstöd.",
  },
  {
    type: "bear",
    probability: "25%",
    price: "DKK 160-200",
    change: "-15-32%",
    assumptions:
      "MFN pressar US-intäkter kraftigt, Eli Lilly tar dominant ställning, CagriSema FDA-reject, patent-generika slår hårdare. Omsättning <DKK 280 Mdr 2027.",
    requires: "P/E kontraherar till 8-9x vid svag guidning.",
  },
];

// ── FINANCIAL TABLE: Nyckeltal ────────────────────────────────────────────────
const financialRows: TableRow[] = [
  {
    cells: {
      metric:  { value: "Omsättning (MDKK)" },
      FY2021:  { value: "140 800" },
      FY2022:  { value: "177 000" },
      FY2023:  { value: "232 300" },
      FY2024:  { value: "290 400" },
      FY2025:  { value: "309 064" },
      FY2026e: { value: "311 300" },
      FY2027e: { value: "332 200" },
    },
  },
  {
    cells: {
      metric:  { value: "EBIT (MDKK)" },
      FY2021:  { value: "58 644" },
      FY2022:  { value: "74 809" },
      FY2023:  { value: "102 574" },
      FY2024:  { value: "128 339" },
      FY2025:  { value: "127 658" },
      FY2026e: { value: "128 291" },
      FY2027e: { value: "139 663" },
    },
  },
  {
    cells: {
      metric:  { value: "EPS (DKK)" },
      FY2021:  { value: "10,40" },
      FY2022:  { value: "12,26" },
      FY2023:  { value: "18,67" },
      FY2024:  { value: "22,67" },
      FY2025:  { value: "23,05" },
      FY2026e: { value: "22,6", color: "red", arrow: "down" },
      FY2027e: { value: "23,8", color: "green", arrow: "up" },
    },
  },
  {
    cells: {
      metric:  { value: "EBIT-marginal (%)" },
      FY2021:  { value: "41,7%" },
      FY2022:  { value: "42,3%" },
      FY2023:  { value: "44,2%" },
      FY2024:  { value: "44,2%" },
      FY2025:  { value: "41,3%", color: "red", arrow: "down" },
      FY2026e: { value: "41,2%" },
      FY2027e: { value: "42,1%", color: "green", arrow: "up" },
    },
  },
  {
    cells: {
      metric:  { value: "Bruttomarginal (%)" },
      FY2021:  { value: "83,2%" },
      FY2022:  { value: "83,9%" },
      FY2023:  { value: "84,6%" },
      FY2024:  { value: "84,7%" },
      FY2025:  { value: "81,0%", color: "red", arrow: "down" },
      FY2026e: { value: "--" },
      FY2027e: { value: "--" },
    },
  },
  {
    cells: {
      metric:  { value: "Nettomarginal (%)" },
      FY2021:  { value: "33,9%" },
      FY2022:  { value: "31,4%" },
      FY2023:  { value: "36,0%" },
      FY2024:  { value: "34,8%" },
      FY2025:  { value: "33,1%", color: "red", arrow: "down" },
      FY2026e: { value: "--" },
      FY2027e: { value: "--" },
    },
  },
  {
    cells: {
      metric:  { value: "ROE (%)" },
      FY2021:  { value: "--" },
      FY2022:  { value: "--" },
      FY2023:  { value: "--" },
      FY2024:  { value: "80,8%" },
      FY2025:  { value: "60,7%", color: "red", arrow: "down" },
      FY2026e: { value: "--" },
      FY2027e: { value: "--" },
    },
  },
  {
    cells: {
      metric:  { value: "Utdelning (DKK)" },
      FY2021:  { value: "5,20" },
      FY2022:  { value: "6,20" },
      FY2023:  { value: "9,40" },
      FY2024:  { value: "11,40" },
      FY2025:  { value: "11,70" },
      FY2026e: { value: "11,4" },
      FY2027e: { value: "12,1", color: "green", arrow: "up" },
    },
  },
  {
    cells: {
      metric:  { value: "Direktavkastning (%)" },
      FY2021:  { value: "--" },
      FY2022:  { value: "--" },
      FY2023:  { value: "--" },
      FY2024:  { value: "1,8%" },
      FY2025:  { value: "3,6%" },
      FY2026e: { value: "~4,8%", color: "green" },
      FY2027e: { value: "~5,1%", color: "green" },
    },
  },
];

// ── VALUATION MULTIPLES TABLE ─────────────────────────────────────────────────
const valuationRows: TableRow[] = [
  {
    cells: {
      metric:  { value: "P/E (Pris/Vinst)" },
      FY2024:  { value: "27,5x" },
      FY2025:  { value: "14,1x" },
      now:     { value: "10,2x", color: "green" },
      FY2026e: { value: "10,4x" },
      sector:  { value: "~22x" },
    },
  },
  {
    cells: {
      metric:  { value: "EV/EBIT" },
      FY2024:  { value: "20,5x" },
      FY2025:  { value: "11,5x" },
      now:     { value: "12,1x", color: "green" },
      FY2026e: { value: "~9x" },
      sector:  { value: "~18x" },
    },
  },
  {
    cells: {
      metric:  { value: "P/S (Pris/Omsätt.)" },
      FY2024:  { value: "9,6x" },
      FY2025:  { value: "4,7x" },
      now:     { value: "3,4x", color: "green" },
      FY2026e: { value: "~3,4x" },
      sector:  { value: "~5x" },
    },
  },
  {
    cells: {
      metric:  { value: "PEG (P/E/Tillväxt)" },
      FY2024:  { value: "--" },
      FY2025:  { value: "--" },
      now:     { value: "~1,1x", color: "green" },
      FY2026e: { value: "1,1x" },
      sector:  { value: "~1,5-2x" },
    },
  },
  {
    cells: {
      metric:  { value: "Direktavkastning" },
      FY2024:  { value: "1,8%" },
      FY2025:  { value: "3,6%" },
      now:     { value: "~5,0%", color: "green" },
      FY2026e: { value: "~4,8%" },
      sector:  { value: "~2,5%" },
    },
  },
];

// ── CASHFLOW TABLE ────────────────────────────────────────────────────────────
const cashflowRows: TableRow[] = [
  {
    cells: {
      metric: { value: "Op. kassaflöde" },
      value:  { value: "DKK 115 Mdr", color: "green" },
      note:   { value: "Starkt trots omstrukturering" },
    },
  },
  {
    cells: {
      metric: { value: "Capex 2025" },
      value:  { value: "DKK 90 Mdr", color: "amber" },
      note:   { value: "Catalent + expansionsinvesteringar" },
    },
  },
  {
    cells: {
      metric: { value: "Fritt kassaflöde 2025" },
      value:  { value: "DKK 28 Mdr", color: "green" },
      note:   { value: "vs. -15 Mdr 2024 (Catalent belastade)" },
    },
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function NovoNordiskAnalysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 4,
      vardering: 4,
      tillvaxtutsikter: 4,
      riskprofil: 2,
      esgMakro: 4,
      aiObservationer: 3,
    };
    const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const maxPoang = 40;
    return { scores, totaltPoang, maxPoang };
  }, []);

  return (
    <AnalysisLayout
      companyName="Novo Nordisk"
      subtitle="Nasdaq Copenhagen / NYSE -- NOVO-B.CO / NVO -- ISIN: DK0060534915"
      date="23 mars 2026"
      dataSources="Årsrapport 2025, Q4 2025-rapport, Börsdata, S&P Pro-estimat"
      sections={sections}
      accentColor="#C8102E"
      ticker="NOVO-B.CO"
      exchange="CPH / NYSE"
      recommendation="KOP"
      targetPrice="DKK 340-380"
      staticPE="~10,4x"
      staticEPS="23,05 DKK"
      staticDividendYield="~4,8%"
      staticMarketCap="~DKK 1 050 Mdr"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* ── I. FÖRETAGSÖVERSIKT ──────────────────────────────────────── */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Företagsöversikt" />
          <ScoreBreakdown scores={analysisData.scores} accentColor="#C8102E">
            <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
              <span className="text-sm font-bold">Rekommendation:</span>
              <span className="text-xl font-bold font-serif text-green-700">KÖP</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
              <span className="text-sm font-bold">Målpris (12 mån):</span>
              <span className="text-xl font-bold font-serif text-[#1a3c6e]">DKK 340-380</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold">Uppsida (base case):</span>
              <span className="text-xl font-bold font-serif text-green-700">+44-61%</span>
            </div>
          </ScoreBreakdown>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Börskurs (mars 2026)" value="~DKK 236" trend="-48% under 2025" />
            <MetricCard label="Börsvärde" value="~DKK 1 050 Mdr" trend="-62% från topp" />
            <MetricCard label="P/E 2026e" value="~10,4x" trend="Historiskt lågt" />
            <MetricCard label="Direktavkastning 2026e" value="~4,8%" />
          </div>

          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Novo Nordisk grundades 1923 i Danmark och är idag världens ledande läkemedelsbolag inom diabetes och fetma.
            Bolaget har en unik struktur där moderbolaget <strong>Novo Holdings A/S</strong> -- helägt
            av den icke-vinstdrivande <strong>Novo Nordisk Foundation</strong> -- kontrollerar
            röstmajoriteten. Detta ger ett ovanligt långsiktigt perspektiv som är sällsynt i börsvärlden.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Bolaget är noterat på Nasdaq Köpenhamn (NOVO-B) och NYSE (NVO) och har 68 794 anställda (2025).
            Aktiekursen föll med <strong className="text-red-700">-48%</strong> under 2025, från DKK 624 till DKK 325,
            vilket öppnat ett historiskt köptillfälle.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Novo Nordisk tjänar pengar på <strong>patentskyddade receptbelagda läkemedel</strong>.
            När en läkare skriver ut ett recept på Ozempic eller Wegovy säljs dessa med extremt höga marginaler
            (bruttomarginal ~81%). Patienter behöver ta medicinen kontinuerligt, vilket skapar
            <strong> återkommande intäkter</strong> -- ungefär som en prenumeration.
            GLP-1-klassen dominerar portföljen: Ozempic (diabetes), Wegovy (fetma) och Rybelsus (oral diabetes)
            utgör merparten av DKK 309 miljarder i omsättning 2025.
          </p>
          <AlertBox type="info">
            Köprekommendationen bygger på riskjusterad analys. Marknaden prisar in MFN-prispress,
            CagriSema-besvikelse och ökad konkurrens med hög sannolikhet -- vi bedömer att dessa risker
            är reella men delvis överdrivna. P/E ~10x är historiskt exceptionellt för ett bolag med
            denna kvalitetsprofil och pipeline. Läs riskanalysen (sektion VI) noggrant.
          </AlertBox>
        </section>

        {/* ── II. STRATEGISK MOAT ──────────────────────────────────────── */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <SwotGrid data={swotData} title="SWOT-analys" />
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a3c6e]">
              Competitive Moat -- Bedömning
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Immateriella tillgångar", rating: "5/5", desc: "Patentportfölj 2026-2032. Ozempic/Wegovy/Rybelsus patentskydd i EU/USA." },
                { title: "Switching costs", rating: "4/5", desc: "Läkare och patienter byter sällan väl fungerande behandling. Lojalitet är extremt hög." },
                { title: "Kostnadsfördel", rating: "4/5", desc: "Massiv vertikal integration: Catalent-fabrikerna ger lägre tillverkningskostnad per enhet." },
                { title: "Skalfördelar", rating: "5/5", desc: "DKK 309 Mdr omsättning + global distribution ger maktposition gentemot betalare." },
                { title: "Varumärke", rating: "5/5", desc: "Ozempic är ett av världens mest kända läkemedel 2024-2025. Pop-kultur-fenomen." },
                { title: "Nätverkseffekter", rating: "3/5", desc: "Real-world data, läkarrelationer och patientprogram skapar värde som växer med skalan." },
              ].map(({ title, rating, desc }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-foreground">{title}</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">{rating}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── III. FINANSIELL ANALYS ────────────────────────────────────── */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell Analys" />
          <FinancialTable
            title="Nyckeltal -- historik & estimat (alla belopp MDKK om ej annat anges)"
            columns={[
              { key: "metric",  header: "Nyckeltal" },
              { key: "FY2021",  header: "2021" },
              { key: "FY2022",  header: "2022" },
              { key: "FY2023",  header: "2023" },
              { key: "FY2024",  header: "2024" },
              { key: "FY2025",  header: "2025" },
              { key: "FY2026e", header: "2026e" },
              { key: "FY2027e", header: "2027e" },
            ]}
            rows={financialRows}
          />

          <div className="mt-6">
            <FinancialTable
              title="Kassaflöde & kapitalallokering 2025"
              columns={[
                { key: "metric", header: "Post" },
                { key: "value",  header: "Belopp" },
                { key: "note",   header: "Kommentar" },
              ]}
              rows={cashflowRows}
            />
          </div>

          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Det operativa kassaflödet uppgick till <strong>DKK 115 365 Mn</strong> (2025) --
            ett starkt resultat trots att bolaget är mitt i en global omstrukturering. Fritt kassaflöde förbättrades
            dramatiskt till DKK 28,3 Mdr jämfört med negativt DKK 14,7 Mdr 2024 (Catalent-förvärvet DKK 82 Mdr belastade 2024).
          </p>
          <AlertBox type="info">
            Bruttomarginal föll till 81% 2025, främst drivet av Catalent-integreringen. Dock är
            detta fortfarande exceptionellt för pharma-sektorn och förväntas stabiliseras 2026-2027.
          </AlertBox>
        </section>

        {/* ── IV. VÄRDERING ────────────────────────────────────────────── */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="P/E (nuläge)" value="10,2x" trend="Historiskt lågt" />
            <MetricCard label="EV/EBIT" value="12,1x" trend="Under sektorsnitt ~18x" />
            <MetricCard label="PEG" value="~1,1x" trend="Attraktiv" valueColor="text-green-700" />
            <MetricCard label="Direktavkastning" value="~5,0%" trend="Dubbelt sektorsnitt" valueColor="text-green-700" />
          </div>

          <FinancialTable
            title="Värderingsmultiplar -- Nuläge vs. historik vs. sektor"
            columns={[
              { key: "metric",  header: "Multipel" },
              { key: "FY2024",  header: "2024" },
              { key: "FY2025",  header: "2025" },
              { key: "now",     header: "Nuläge" },
              { key: "FY2026e", header: "2026e" },
              { key: "sector",  header: "Sektor snitt" },
            ]}
            rows={valuationRows}
          />

          <AlertBox type="signal">
            Novo Nordisk handlas till ~50% rabatt mot sin egen historik och ~50% rabatt mot pharma-sektorn
            på P/E-basis. PEG-talet på 1,1x indikerar att marknaden inte prisar in framtida tillväxt alls.
            Med ett riktkurs på DKK 340-380 (12 mån, base case) är uppsidan ~44-61% från nuläget (~DKK 236).
            Betyg: 4/5 -- Attraktiv värdering.
          </AlertBox>
        </section>

        {/* ── V. TILLVÄXTMOTORER ───────────────────────────────────────── */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#C8102E] pl-4">
              <h3 className="text-sm font-bold text-[#C8102E] mb-1">CagriSema -- FDA-ansökan inlämnad</h3>
              <p className="text-sm text-[#2a2a2a]">
                22,7% viktnedgång i fas 3. Potentiellt godkänd 2026. En ny blockbuster som kan lägga till
                DKK 20-40 Mdr i topplinjen.
              </p>
            </div>
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Wegovy-piller (oral semaglutide 25mg)</h3>
              <p className="text-sm text-[#2a2a2a]">
                FDA-godkänd jan 2026. Öppnar för 100+ Mn patienter i USA som föredrar tabletter.
                16,6% viktnedgång -- jämförbar med injektionen.
              </p>
            </div>
            <div className="border-l-4 border-[#7c3aed] pl-4">
              <h3 className="text-sm font-bold text-[#7c3aed] mb-1">Zenagamtide (amycretin) -- fas 3 2026</h3>
              <p className="text-sm text-[#2a2a2a]">
                GLP-1 + amylin-agonist. Fas 2 visade 14,5% viktnedgång på 36 veckor.
                Nästa generation efter CagriSema.
              </p>
            </div>
            <div className="border-l-4 border-[#16a34a] pl-4">
              <h3 className="text-sm font-bold text-[#16a34a] mb-1">Internationell expansion</h3>
              <p className="text-sm text-[#2a2a2a]">
                APAC +19% CER, EUCAN +16% CER. Obesity-penetration globalt fortfarande låg.
                Stor runway i Europa och Asien.
              </p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">MASH (leversjukdom) via Akero</h3>
              <p className="text-sm text-[#2a2a2a]">
                Förvärvet av Akero Therapeutics ger ett fas 3-program i MASH -- stor marknad med
                ingen nuvarande standardbehandling.
              </p>
            </div>
            <div className="border-l-4 border-[#0d9488] pl-4">
              <h3 className="text-sm font-bold text-[#0d9488] mb-1">AI & digital acceleration i R&D</h3>
              <p className="text-sm text-[#2a2a2a]">
                Bolaget använder AI för att accelerera pipeline-beslut och integrera tillverkning
                i tidig läkemedelsutveckling.
              </p>
            </div>
          </div>
        </section>

        {/* ── VI. RISKPROFIL ───────────────────────────────────────────── */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <AlertBox type="risk">
            Risknivå: HOG (score 2/5 inverterat). Novo Nordisk är ett exceptionellt bolag med en hög
            inneboende riskprofil just nu. Det är viktigt att hålla isär bolagskvalitet och investeringsrisk.
          </AlertBox>
          <div className="space-y-3 mt-4">
            {[
              { risk: "MFN-prisstyrning USA", level: "HOG", levelColor: "text-red-700 bg-red-50 border-red-200", desc: "Most Favoured Nations-avtalet pressar US-realiserade priser för Wegovy/Ozempic. Kan reducera US-intäkter med 10-20% om fullt genomfört." },
              { risk: "Patent-expiration semaglutide", level: "HOG", levelColor: "text-red-700 bg-red-50 border-red-200", desc: "Ozempic (EU 2026), Rybelsus (EU 2026). Generisk konkurrens i internationella marknader börjar urholka priser. USA-patent håller längre." },
              { risk: "Eli Lilly / Tirzepatide konkurrens", level: "MEDEL", levelColor: "text-amber-700 bg-amber-50 border-amber-200", desc: "Mounjaro/Zepbound vinner marknadsandelar. Novo tappade 3,6 pp diabetes-marknadsandel 2025. Risk att tappet fortsätter." },
              { risk: "Pipeline-miss", level: "MEDEL", levelColor: "text-amber-700 bg-amber-50 border-amber-200", desc: "CagriSema mötte höga förväntningar. Framtida studier kan visa sämre data. Zenagamtide fas 3 är osäker." },
              { risk: "Valutarisk (USD/DKK)", level: "LAG/MEDEL", levelColor: "text-yellow-700 bg-yellow-50 border-yellow-200", desc: "~55% av omsättningen i USD. Bolaget hedgar aktivt men valutarörelser påverkar rapporterade siffror." },
              { risk: "ESG/Compliance", level: "LAG", levelColor: "text-yellow-700 bg-yellow-50 border-yellow-200", desc: "Illegala compounding products (Ozempic-kopior) skapar safety-risker och regulatoriska utmaningar." },
            ].map(({ risk, level, levelColor, desc }) => (
              <div key={risk} className="flex gap-4 items-start p-4 bg-card border border-border rounded-xl">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border shrink-0 ${levelColor}`}>
                  {level}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{risk}</h4>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VII. ESG & MAKRO ─────────────────────────────────────────── */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VII" title="ESG & Makro" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Miljo (E)", score: "3/5", scoreColor: "text-amber-600 bg-amber-50 border-amber-200", body: "GHG-utsläpp ökade +19% 2025 till 2 690 kt CO2e -- primärt drivet av Catalent-förvärvet. Plast per patient sjunker (-5%). Stora kapitalinvesteringar i fabriker ökar avtryck kortsiktigt." },
              { label: "Socialt (S)", score: "5/5", scoreColor: "text-green-700 bg-green-50 border-green-200", body: "45,6 miljoner patienter nåddes. Utökat tillgångsprogram. NovoCare-apoteksnätverk i USA. Diversitets- och inkluderingsarbete. Triple bottom line är inbyggt i kultur." },
              { label: "Styrning (G)", score: "4/5", scoreColor: "text-blue-700 bg-blue-50 border-blue-200", body: "Stiftelseägande ger exceptionellt långsiktigt perspektiv. Ny styrelse 2025. Robust compliance-kultur. Bolagsstyrning kompliceras av A/B-aktiestruktur men balanseras av stiftelsens mandat." },
            ].map(({ label, score, scoreColor, body }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-bold text-foreground">{label}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${scoreColor}`}>{score}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VIII. AI-OBSERVATIONER ────────────────────────────────────── */}
        <section id="ai" data-section="ai" className="mb-16">
          <SectionHeader number="VIII" title="AI-observationer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Sentimentanalys", body: "Sentimentet har skiftat från extremt negativt (CagriSema-besvikelse Q4 2024) till försiktigt positivt i Q1 2026 efter Wegovy-piller-godkännandet. Insiderhandel: inga nämvärda insider-köp registrerade -- neutralt signal." },
              { title: "Dataavvikelse", body: "Stark divergens: EPS 2025 ökade +1,7% men aktien föll -48%. Förklaras av multi-kontraktion (P/E gick från ~40x till ~14x). Denna komprimering skapar nu en historisk möjlighet om fundamenta stabiliseras." },
              { title: "Varningssignal", body: "Sänkt utdelningstillväxt (21% till 2,6% YoY) och stopp i aktieåterköp (DKK 20 Mdr till 1,4 Mdr) indikerar att ledningen prioriterar balansräkningens stabilisering. Inte alarmerande men värt att bevaka." },
              { title: "Strukturell observation", body: "Omsättningstillväxt förväntas falla 2026 (konsensus -5% till -13% CER). Egna estimat pekar mot att volymer kompenserar prissänkningar och att 2026e ~DKK 311 Mdr är mer realistiskt än bear-case. 2027 recovery ser trovärdig ut." },
            ].map(({ title, body }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-5">
                <h4 className="text-sm font-bold text-foreground mb-2">{title}</h4>
                <p className="text-xs text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── IX. INVESTERINGSBESLUT ───────────────────────────────────── */}
        <section id="verdict" data-section="verdict" className="mb-16">
          <SectionHeader number="IX" title="Investeringsbeslut" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                <strong>Är Novo Nordisk ett kvalitetsbolag?</strong> Ja, utan tvekan.
                Bolaget uppfyller alla kriterier för world-class pharma: dominans i sin marknad, exceptionell lönsamhet,
                stark kassaflödesgenerering och en djup pipeline.
              </p>
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                <strong>Är det rimligt värderat?</strong> P/E ~10x är anmärkningsvärt lågt
                för ett bolag med dessa fundamenta. Det reflekterar en pandemi av pessimism kring MFN, patent-loss och
                konkurrens -- risker som är reella men inprisade och delvis överdrivna.
              </p>
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                <strong>Kan man hålla det 5-10 år?</strong> Ja. Fetma-marknaden är strukturell.
                WHO erkänner GLP-1. Pipeline är djup. Stiftelseägaren garanterar stabilitet.
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold font-serif text-green-700 mb-2">KOP</div>
              <div className="text-xs text-muted mb-3">Rekommendation</div>
              <div className="text-2xl font-bold font-serif text-[#1a3c6e] mb-1">DKK 340-380</div>
              <div className="text-xs text-muted mb-4">Riktkurs (12 mån, base case)</div>
              <div className="text-sm text-[#2a2a2a] mb-3">
                ~+44-61% från nuläget (~DKK 236) + ~4,8% direktavkastning
              </div>
              <div className="text-xs text-muted">
                Poängsumma: <strong className="text-amber-600">{analysisData.totaltPoang}/{analysisData.maxPoang} ({(analysisData.totaltPoang / analysisData.maxPoang * 100).toFixed(1)}%)</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ── X. SCENARIER ─────────────────────────────────────────────── */}
        <section id="scenarios" data-section="scenarios" className="mb-16">
          <SectionHeader number="X" title="Scenarier" />
          <ScenarioCards scenarios={scenarios} />

          <div className="mt-6 bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> Denna analys är framtagen av börsanalys.se
              för informationsändamål och utgör inte finansiell rådgivning. Historisk avkastning garanterar inte
              framtida avkastning. Investering i aktier innebär alltid risk. Alla estimat är förknippade med
              osäkerhet. Konsultera alltid en licensierad finansiell rådgivare innan investeringsbeslut.
            </p>
          </div>
        </section>

      </div>
    </AnalysisLayout>
  );
}
