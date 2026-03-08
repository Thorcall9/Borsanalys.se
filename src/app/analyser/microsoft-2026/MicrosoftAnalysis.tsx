"use client";

import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  SwotGrid,
  ScenarioCards,
  VerdictBox,
  AlertBox,
  RatingBox,
  Card,
} from "@/components/analysis";
import type { AnalysisSection, Scenario, TableColumn, TableRow } from "@/components/analysis";

const ACCENT = "#1a3c6e";

const sections: AnalysisSection[] = [
  { id: "overview", number: "I", title: "Översikt" },
  { id: "moat", number: "II", title: "Strategisk Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation", number: "IV", title: "Värdering" },
  { id: "growth", number: "V", title: "Tillväxtmotorer" },
  { id: "risk", number: "VI", title: "Riskprofil" },
  { id: "esg", number: "VII", title: "ESG & Makro" },
  { id: "ai-obs", number: "VIII", title: "AI-observationer" },
  { id: "verdict", number: "IX", title: "Investeringsbeslut" },
  { id: "scenarios", number: "X", title: "Scenarier" },
];

const incomeColumns: TableColumn[] = [
  { key: "metric", header: "Nyckeltal" },
  { key: "fy2024", header: "2024" },
  { key: "current", header: "Nuvarande" },
  { key: "e2026", header: "2026e" },
  { key: "e2027", header: "2027e" },
  { key: "trend", header: "Trend" },
];

const incomeRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning ($B)" }, fy2024: { value: "245" }, current: { value: "305" }, e2026: { value: "345" }, e2027: { value: "378" }, trend: { value: "+23% YoY", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "EBIT-marginal (%)" }, fy2024: { value: "44,6" }, current: { value: "47,1" }, e2026: { value: "48,0" }, e2027: { value: "48,5" }, trend: { value: "Expanding", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "EPS ($)" }, fy2024: { value: "11,86" }, current: { value: "16,04" }, e2026: { value: "17,80" }, e2027: { value: "19,01" }, trend: { value: "+35% YoY", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "Capex ($B)" }, fy2024: { value: "44,5" }, current: { value: "83" }, e2026: { value: "110" }, e2027: { value: "129" }, trend: { value: "Accelererar", color: "amber", arrow: "up" } } },
  { cells: { metric: { value: "FCF ($B)" }, fy2024: { value: "74" }, current: { value: "77" }, e2026: { value: "68" }, e2027: { value: "72" }, trend: { value: "Under press", color: "amber", arrow: "down" } } },
];

const swotData = {
  strengths: [
    "Azure: 23% tillväxt, #2 molnplattform",
    "M365 ekosystem: 300M+ användare",
    "Copilot: AI-monetarisering i hela stacken",
    "47,1% EBIT-marginal — branschledande",
    "Diversifierad intäktsbas (Cloud, Office, Gaming)",
  ],
  weaknesses: [
    "Capex 52% av OpCF vs historiskt 30–35%",
    "OpenAI-beroende: partner och potentiell konkurrent",
    "Copilot-adoption i tidigt skede",
    "Gaming-integration av Activision pågår",
  ],
  opportunities: [
    "Copilot: $30/user/month × 300M+ användare",
    "Security: $20B+ ARR och växande",
    "AI Agents: autonoma affärsprocesser",
    "Activision + Game Pass: recurring revenue",
  ],
  threats: [
    "Google Gemini disruption",
    "EU/USA-regulering av AI",
    "Capex-satsning som ej levererar ROI",
    "Cybersecurity-incidenter",
    "Makroekonomisk nedgång → IT-budget cuts",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "$560",
    change: "+43% från $392",
    assumptions: "Azure >30% tillväxt\nCopilot 20%+ adoption\nEPS $21–22",
    requires: "AI-adoption accelererar kraftigt, Copilot blir must-have, Azure tar marknadsandelar från AWS.",
  },
  {
    type: "base",
    probability: "55%",
    price: "$480",
    change: "+22% från $392",
    assumptions: "Azure 22–25% tillväxt\nCopilot gradvis adoption\nEPS in-line",
    requires: "Stabil molntillväxt, Copilot-revenue synlig i H2 2026, capex-investeringar börjar ge avkastning.",
  },
  {
    type: "bear",
    probability: "20%",
    price: "$310",
    change: "−21% från $392",
    assumptions: "Azure <18% tillväxt\nCapex delivers ej ROI\nP/E-kompression",
    requires: "AI-hype avtar, Copilot floppar, capex-utgifterna presserar FCF, regulatorisk motvind.",
  },
];

export default function MicrosoftAnalysis() {
  return (
    <AnalysisLayout
      companyName="MICROSOFT"
      subtitle="Aktieanalys · Mars 2026"
      date="2 mars 2026"
      dataSources="Data: FY2024–FY2027e"
      sections={sections}
      accentColor={ACCENT}
      theme="light"
    >
      {/* Header */}
      <div className="bg-[#0f0f0f] text-[#faf8f3] px-6 sm:px-12 py-10">
        <div className="text-[10px] tracking-[.15em] text-[#b5892a] uppercase mb-1">AKTIEANALYS</div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Microsoft Corporation</h1>
            <div className="text-sm text-[#a0a090] mt-1">NASDAQ: MSFT · S&P 500</div>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-bold text-[#b5892a]">$392</div>
            <div className="text-[11px] text-[#a0a090]">1 mars 2026</div>
            <span className="inline-block mt-1.5 bg-[#1a4a1a] text-[#80d080] text-[11px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide">
              ▲ KÖP
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Börsvärde", value: "$2,92T" },
            { label: "P/E", value: "24,5x" },
            { label: "EV/EBITDA", value: "19,6x" },
            { label: "EBIT-marginal", value: "47,1%" },
            { label: "Riktkurs", value: "$480" },
          ].map((kpi) => (
            <div key={kpi.label} className="border-l-2 border-[#b5892a] pl-2.5">
              <div className="text-[9px] text-[#808070] uppercase tracking-wide">{kpi.label}</div>
              <div className="font-serif text-base font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 pb-20 bg-[#faf8f3] text-[#0f0f0f]">
        {/* I. Overview */}
        <div data-section="overview" id="overview" className="pt-14">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            <MetricCard label="Börsvärde" value="$2,92T" />
            <MetricCard label="P/E (TTM)" value="24,5x" />
            <MetricCard label="EBIT-marginal" value="47,1%" />
            <MetricCard label="ROE" value="33,3%" />
            <MetricCard label="Anställda" value="228 000" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <Card title="Intelligent Cloud (Azure)">
              <p className="text-xs text-muted leading-relaxed">
                <strong>41% av omsättningen</strong>, +23% tillväxt. Azure är Microsofts snabbast växande segment och kärnan i AI-strategin. GPU-kluster, enterprise AI och OpenAI-partnerskap driver tillväxt.
              </p>
            </Card>
            <Card title="Productivity & Business">
              <p className="text-xs text-muted leading-relaxed">
                <strong>28% av omsättningen</strong>, +12% tillväxt. M365, LinkedIn, Dynamics 365. Copilot-monetarisering ($30/user/month) adresserar 300M+ användarbas.
              </p>
            </Card>
            <Card title="Personal Computing">
              <p className="text-xs text-muted leading-relaxed">
                <strong>31% av omsättningen</strong>, +8% tillväxt. Windows, Surface, Gaming (Activision Blizzard), Search/advertising.
              </p>
            </Card>
          </div>
          <RatingBox rating={5}><strong>5/5</strong> — Exceptionellt diversifierad plattform med starka moat i varje segment. Satya Nadellas ledarskap har transformerat bolaget.</RatingBox>
        </div>

        {/* II. Moat */}
        <div data-section="moat" id="moat" className="pt-14">
          <SectionHeader number="II" title="Strategisk Moat" />
          <SwotGrid data={swotData} title="SWOT-Analys" />
          <RatingBox rating={5}><strong>5/5</strong> — Enterprise switching costs, nätverkseffekter (M365/LinkedIn), IP och varumärke skapar en av techbranschens starkaste moats.</RatingBox>
        </div>

        {/* III. Financials */}
        <div data-section="financials" id="financials" className="pt-14">
          <SectionHeader number="III" title="Finansiell Analys" />
          <FinancialTable title="Resultaträkning — Nyckeltal" columns={incomeColumns} rows={incomeRows} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
            <MetricCard label="ROE" value="33,3%" />
            <MetricCard label="ROIC" value="25,6%" />
            <MetricCard label="ROA" value="18,0%" />
            <MetricCard label="FCF" value="$77B" trend="FCF-marginal under press p.g.a. capex" />
          </div>
          <div className="mt-4">
            <AlertBox type="info" icon="⚠️">
              <strong>Capex-varning:</strong> Capex 52% av operativt kassaflöde vs historiskt 30–35%. AI-infrastrukturinvesteringar ($83B nuvarande → $129B 2027e) måste generera ROI inom 2–3 år. FCF-marginal pressas.
            </AlertBox>
          </div>
          <RatingBox rating={4}><strong>4/5</strong> — Stark finansiell profil med branschledande marginaler. Avdrag för accelererande capex som ännu inte bevisad ROI.</RatingBox>
        </div>

        {/* IV. Valuation */}
        <div data-section="valuation" id="valuation" className="pt-14">
          <SectionHeader number="IV" title="Värdering & Jämförelse" />
          <FinancialTable
            title="Relativ Värdering vs Peers"
            columns={[
              { key: "company", header: "Bolag" },
              { key: "pe", header: "P/E" },
              { key: "evEbitda", header: "EV/EBITDA" },
              { key: "growth", header: "Tillväxt" },
              { key: "peg", header: "PEG" },
            ]}
            rows={[
              { cells: { company: { value: "Microsoft" }, pe: { value: "24,5x" }, evEbitda: { value: "19,6x" }, growth: { value: "+23%" }, peg: { value: "1,43x" } } },
              { cells: { company: { value: "Apple" }, pe: { value: "28,0x" }, evEbitda: { value: "22,0x" }, growth: { value: "+8%" }, peg: { value: "3,50x" } } },
              { cells: { company: { value: "Alphabet" }, pe: { value: "22,0x" }, evEbitda: { value: "17,5x" }, growth: { value: "+15%" }, peg: { value: "1,47x" } } },
              { cells: { company: { value: "Amazon" }, pe: { value: "35,0x" }, evEbitda: { value: "18,0x" }, growth: { value: "+20%" }, peg: { value: "1,75x" } } },
              { cells: { company: { value: "Meta" }, pe: { value: "20,0x" }, evEbitda: { value: "14,0x" }, growth: { value: "+18%" }, peg: { value: "1,11x" } } },
            ]}
          />
          <div className="mt-4">
            <AlertBox type="signal">
              PEG 1,43x — attraktivt för kvalitetstillväxt. Historisk P/E-kompression 35% från highs innebär att mycket negativt redan är prissatt.
            </AlertBox>
          </div>
          <RatingBox rating={4}><strong>4/5</strong> — Rimlig värdering relativt peers. PEG 1,43x är attraktivt för ett bolag med Microsofts kvalitetsprofil.</RatingBox>
        </div>

        {/* V. Growth */}
        <div data-section="growth" id="growth" className="pt-14">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { title: "Azure & AI Infrastructure", desc: "23% YoY tillväxt. GPU-kluster, enterprise AI-adoption, OpenAI-exklusivitet. Kapacitetsbrist = positiv signal." },
              { title: "Microsoft Copilot", desc: "$30/user/month × 300M+ M365-användare. Tidig adoption men accelererande. Potentiellt $50B+ ARR vid full penetration." },
              { title: "Security & Compliance", desc: "$20B+ ARR. Snabbast växande segmentet relativt. Regulatorisk medvind driver adoption." },
            ].map((item) => (
              <Card key={item.title} title={item.title}>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title="Activision Blizzard">
              <p className="text-xs text-muted leading-relaxed">
                Gaming och Game Pass-integration. Recurring revenue-modell. Call of Duty, World of Warcraft, Diablo — starka franchises.
              </p>
            </Card>
            <Card title="AI Agents (2026+)">
              <p className="text-xs text-muted leading-relaxed">
                Autonoma AI-agenter för affärsprocesser. Nästa fas efter Copilot. Potentiellt disruptiv men i tidigt skede.
              </p>
            </Card>
          </div>
        </div>

        {/* VI. Risk */}
        <div data-section="risk" id="risk" className="pt-14">
          <SectionHeader number="VI" title="Riskprofil" />
          <Card title="Riskmatris">
            <div className="space-y-2">
              <AlertBox type="risk">
                <strong>Capex overshooting (Finansiell risk)</strong> — Medel sannolikhet, Hög impact. Om AI-investeringarna ej ger ROI inom 2–3 år pressas FCF.
              </AlertBox>
              <AlertBox type="risk">
                <strong>Google Gemini (Teknikrisk)</strong> — AI-kapplöpning där konkurrenter kan stänga gapet.
              </AlertBox>
              <AlertBox type="info">
                <strong>OpenAI-relation (Partner/Konkurrent)</strong> — Komplext beroende som kan utvecklas negativt.
              </AlertBox>
              <AlertBox type="info">
                <strong>EU/USA-regulering</strong> — AI Act och antitrust kan begränsa expansion.
              </AlertBox>
            </div>
          </Card>
          <RatingBox rating={3}><strong>3/5 risk</strong> — Primär risk: FCF-press om AI Capex ej levererar. Bolagets diversifiering ger motståndskraft.</RatingBox>
        </div>

        {/* VII. ESG */}
        <div data-section="esg" id="esg" className="pt-14">
          <SectionHeader number="VII" title="ESG & Makroekonomiska Faktorer" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card title="Miljö">
              <p className="text-xs text-muted leading-relaxed">Carbon neutral by 2030. Vattenintensiva datacenter under granskning. Blackout-risker vid AI-expansion.</p>
            </Card>
            <Card title="Socialt">
              <p className="text-xs text-muted leading-relaxed">Starka employer rankings. AI Skills-program. 228K anställda globalt.</p>
            </Card>
            <Card title="Styrning">
              <p className="text-xs text-muted leading-relaxed">Välstrukturerat board. CEO-pay aligned med performance. Satya Nadella har stark track record sedan 2014.</p>
            </Card>
          </div>
        </div>

        {/* VIII. AI Observations */}
        <div data-section="ai-obs" id="ai-obs" className="pt-14">
          <SectionHeader number="VIII" title="AI-observationer & Mönsterigenkänning" />
          <Card title="AI Sentiment Analysis">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Sentiment</div>
                <div className="font-serif text-2xl font-bold text-success">BULLISH</div>
                <div className="text-xs text-muted">78/100</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Konsensus</div>
                <div className="font-serif text-xl font-bold">47/52</div>
                <div className="text-xs text-muted">köprek.</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Short Interest</div>
                <div className="font-serif text-xl font-bold">0,7%</div>
                <div className="text-xs text-muted">Mycket låg</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted mb-1">Call/Put</div>
                <div className="font-serif text-xl font-bold">1,8x</div>
                <div className="text-xs text-muted">Net bullish</div>
              </div>
            </div>
            <AlertBox type="signal">Azure capacity constraints = positiv signal — mer efterfrågan än kapacitet.</AlertBox>
            <AlertBox type="info" icon="📌">FCF-gap: Capex 52% av OpCF vs historiskt 30–35% — bevaka ROI.</AlertBox>
          </Card>
        </div>

        {/* IX. Verdict */}
        <div data-section="verdict" id="verdict" className="pt-14">
          <SectionHeader number="IX" title="Investeringsbeslut" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <FinancialTable
              title="Kvalitetscheck"
              columns={[{ key: "criteria", header: "Kriterium" }, { key: "result", header: "Resultat" }]}
              rows={[
                { cells: { criteria: { value: "Moat" }, result: { value: "✅ 5/5", color: "green" } } },
                { cells: { criteria: { value: "Tillväxt" }, result: { value: "✅ Azure 23%+", color: "green" } } },
                { cells: { criteria: { value: "Finansiell styrka" }, result: { value: "✅ 47% EBIT", color: "green" } } },
                { cells: { criteria: { value: "Ledning" }, result: { value: "✅ Nadella", color: "green" } } },
                { cells: { criteria: { value: "Värdering" }, result: { value: "✅ PEG 1,43x", color: "green" } } },
                { cells: { criteria: { value: "Capex-risk" }, result: { value: "⚠️ Hög", color: "amber" } } },
              ]}
            />
            <VerdictBox
              verdict="KÖP"
              target="Riktkurs: $480 (+22%)"
              description="Microsoft är ett av världens starkaste kvalitetsbolag. AI-strategin med Azure och Copilot positionerar bolaget för nästa decenniums tillväxt. Capex-risk finns men diversifiering ger trygghet."
              date="2 MARS 2026"
            />
          </div>
        </div>

        {/* X. Scenarios */}
        <div data-section="scenarios" id="scenarios" className="pt-14">
          <SectionHeader number="X" title="Scenarier: Bull · Base · Bear" />
          <ScenarioCards scenarios={scenarios} />
          <div className="mt-5 text-center text-xs text-muted">
            Sannolikhetsviktat målpris: <strong className="text-foreground">$482</strong>
          </div>
        </div>
      </div>
    </AnalysisLayout>
  );
}
