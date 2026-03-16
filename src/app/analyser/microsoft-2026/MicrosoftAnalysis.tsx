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
  RatingBox,
  RadarChart,
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
      assumptions: "Azure &gt;30% tillväxt\nCopilot 20%+ adoption\nEPS $21–22",
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
      assumptions: "Azure &lt;18% tillväxt\nCapex delivers ej ROI\nP/E-kompression",
      requires: "AI-hype avtar, Copilot floppar, capex-utgifterna presserar FCF, regulatorisk motvind.",
    },
  ];

export default function MicrosoftAnalysis() {
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
      {/* Hero image */}
      <div className="w-full">
        <img
          src="/microsoft_analys_hero.png"
          alt="Microsoft aktieanalys 2026"
          className="w-full object-cover"
        />
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

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsidé</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft är ett av världens ledande teknikbolag med missionen att "empower every person and every organization on the planet to achieve more." Bolaget erbjuder ett brett ekosystem av mjukvaruprodukter, molntjänster, hårdvara och AI-lösningar till konsumenter, företag och offentlig sektor globalt.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsmodell & Intäktsmodell</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft verkar via tre segment: <strong>Intelligent Cloud</strong> (Azure, Server, GitHub), <strong>Productivity & Business Processes</strong> (Office 365, LinkedIn, Dynamics) och <strong>More Personal Computing</strong> (Windows, Xbox, Surface). Intäktsmodellen är primärt prenumerationsbaserad (SaaS), vilket skapar hög stabilitet och prediktabilitet.
          </p>

          <FinancialTable
            title="Segment — Omsättning & Tillväxt"
            columns={[
              { key: "segment", header: "Segment" },
              { key: "revenue", header: "Omsättning (MUSD)" },
              { key: "share", header: "Andel" },
              { key: "growth", header: "Tillväxt YoY" },
            ]}
            rows={[
              { cells: { segment: { value: "Intelligent Cloud (Azure)" }, revenue: { value: "~125 000" }, share: { value: "~41%" }, growth: { value: "+23%", color: "green" } } },
              { cells: { segment: { value: "Productivity & Business" }, revenue: { value: "~85 000" }, share: { value: "~28%" }, growth: { value: "+12%", color: "green" } } },
              { cells: { segment: { value: "More Personal Computing" }, revenue: { value: "~95 000" }, share: { value: "~31%" }, growth: { value: "+8%", color: "green" } } },
              { cells: { segment: { value: "Totalt" }, revenue: { value: "305 453" }, share: { value: "100%" }, growth: { value: "+8,4%", color: "green" } } },
            ]}
          />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Ledning & Styrelse</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
            <strong>Satya Nadella (VD sedan 2014)</strong> — En av teknikvärldens mest transformativa ledare. Under Nadella har Microsoft gått från ett Windows-fokuserat bolag till en cloud-first och AI-first organisation. Aktiekursen har stigit 10x under hans ledning.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            <strong>Amy Hood (CFO)</strong> — Respekterad för disciplinerad kapitalallokering och transparent finansiell kommunikation.
          </p>
          <RatingBox rating={5}><strong>5/5</strong> — Exceptionellt uthållig affärsmodell med en av teknikvärldens skickligaste ledare. Prenumerationsmodellen ger hög förutsägbarhet och återkommande intäkter.</RatingBox>
        </div>

        {/* II. Moat */}
        <div data-section="moat" id="moat" className="pt-14">
          <SectionHeader number="II" title="Strategisk Moat" />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Marknadsstorlek & Tillväxtpotential</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft verkar i flera av världens snabbast växande marknadssegment. Cloud computing TAM estimeras till $1 000Mdr+ år 2030. AI-marknaden estimeras växa från $200Mdr (2024) till $1 800Mdr (2030) med CAGR ~40%. Enterprise SaaS TAM överstiger $500Mdr. Microsoft är positionerat i kärnan av samtliga dessa megatrender.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Konkurrensfördelar (Moat)</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
            <strong>🔒 Inlåsning & Switching costs:</strong> Office 365, Active Directory och Teams är inbäddade i miljoner organisationers arbetsflöden. Att byta kräver enorma kostnader i tid, pengar och risk.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
            <strong>🌐 Nätverkseffekter:</strong> Teams (300M+ dagliga användare), LinkedIn (1Mdr+ användare), GitHub (100M+ utvecklare) skapar starka nätverkseffekter.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
            <strong>🏷 Varumärke & Förtroende:</strong> Ett av världens mest pålitliga varumärken inom enterprise. CIOs väljer Microsoft delvis av institutionellt förtroende.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
            <strong>💡 Immateriella tillgångar:</strong> Patent, AI-forskning via OpenAI, Azure-infrastruktur och GitHub-kodbas är nästintill omöjliga att replikera.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            <strong>📦 Bundelstrategi:</strong> Microsoft 365 E5 buntar Office, Teams, säkerhet och Copilot — svårt för point-solutions att konkurrera.
          </p>
          <SwotGrid data={swotData} title="SWOT-Analys" />
          <RatingBox rating={5}><strong>5/5</strong> — Microsoft har en av tekniksektorns bredaste ekonomiska vallgravar — switching costs, nätverkseffekter, IP och varumärke kombinerat.</RatingBox>
        </div>

        {/* III. Financials */}
        <div data-section="financials" id="financials" className="pt-14">
          <SectionHeader number="III" title="Finansiell Analys" />

          <FinancialTable
            title="Resultaträkning"
            columns={[
              { key: "metric", header: "Nyckeltal" },
              { key: "fy2024", header: "2024" },
              { key: "fy2025", header: "2025" },
              { key: "current", header: "Nuv." },
              { key: "e2026", header: "2026e" },
              { key: "e2027", header: "2027e" },
            ]}
            rows={[
              { cells: { metric: { value: "Omsättning (MUSD)" }, fy2024: { value: "245 122" }, fy2025: { value: "281 724" }, current: { value: "305 453" }, e2026: { value: "327 580" }, e2027: { value: "378 139" } } },
              { cells: { metric: { value: "Omsättningstillväxt" }, fy2024: { value: "–" }, fy2025: { value: "+14,9%" }, current: { value: "+8,4%" }, e2026: { value: "+7,2%" }, e2027: { value: "+15,4%", color: "green" } } },
              { cells: { metric: { value: "EBIT (MUSD)" }, fy2024: { value: "109 433" }, fy2025: { value: "128 528" }, current: { value: "142 559" }, e2026: { value: "151 758" }, e2027: { value: "173 795" } } },
              { cells: { metric: { value: "EBIT-marginal" }, fy2024: { value: "44,6%" }, fy2025: { value: "45,6%" }, current: { value: "47,1%" }, e2026: { value: "46,3%" }, e2027: { value: "46,0%" } } },
              { cells: { metric: { value: "Nettomarginal" }, fy2024: { value: "36,0%" }, fy2025: { value: "36,2%" }, current: { value: "39,0%" }, e2026: { value: "–" }, e2027: { value: "–" } } },
              { cells: { metric: { value: "EPS (USD)" }, fy2024: { value: "$11,86" }, fy2025: { value: "$13,70" }, current: { value: "$16,04" }, e2026: { value: "$16,47" }, e2027: { value: "$19,01", color: "green" } } },
              { cells: { metric: { value: "EPS-tillväxt" }, fy2024: { value: "–" }, fy2025: { value: "+15,5%" }, current: { value: "+17,1%" }, e2026: { value: "+2,7%" }, e2027: { value: "+15,4%", color: "green" } } },
            ]}
          />

          <FinancialTable
            title="Balansräkning"
            columns={[
              { key: "metric", header: "Post (MUSD)" },
              { key: "fy2024", header: "2024" },
              { key: "fy2025", header: "2025" },
              { key: "current", header: "Nuv." },
            ]}
            rows={[
              { cells: { metric: { value: "Totala tillgångar" }, fy2024: { value: "512 163" }, fy2025: { value: "619 003" }, current: { value: "665 302" } } },
              { cells: { metric: { value: "Eget kapital" }, fy2024: { value: "268 477" }, fy2025: { value: "343 479" }, current: { value: "390 875" } } },
              { cells: { metric: { value: "Långfristiga skulder" }, fy2024: { value: "58 185" }, fy2025: { value: "57 589" }, current: { value: "52 770" } } },
              { cells: { metric: { value: "Kortfristiga skulder" }, fy2024: { value: "10 273" }, fy2025: { value: "5 424" }, current: { value: "5 520" } } },
              { cells: { metric: { value: "Skuld/EK" }, fy2024: { value: "0,26x" }, fy2025: { value: "0,18x" }, current: { value: "0,15x", color: "green" } } },
              { cells: { metric: { value: "Goodwill (netto)" }, fy2024: { value: "119 220" }, fy2025: { value: "119 509" }, current: { value: "119 622" } } },
            ]}
          />

          <FinancialTable
            title="Kassaflöde"
            columns={[
              { key: "metric", header: "Kassaflöde (MUSD)" },
              { key: "fy2024", header: "2024" },
              { key: "fy2025", header: "2025" },
              { key: "current", header: "Nuv." },
              { key: "e2026", header: "2026e" },
              { key: "e2027", header: "2027e" },
            ]}
            rows={[
              { cells: { metric: { value: "Operativt KF" }, fy2024: { value: "118 548" }, fy2025: { value: "136 162" }, current: { value: "160 506" }, e2026: { value: "171 706" }, e2027: { value: "201 650" } } },
              { cells: { metric: { value: "Capex" }, fy2024: { value: "44 477" }, fy2025: { value: "64 551" }, current: { value: "83 094" }, e2026: { value: "107 433" }, e2027: { value: "129 164", color: "amber" } } },
              { cells: { metric: { value: "FCF" }, fy2024: { value: "74 071" }, fy2025: { value: "71 611" }, current: { value: "77 412" }, e2026: { value: "64 273", color: "amber" }, e2027: { value: "72 486" } } },
              { cells: { metric: { value: "FCF-marginal" }, fy2024: { value: "30,2%" }, fy2025: { value: "25,4%" }, current: { value: "25,3%" }, e2026: { value: "19,6%", color: "amber" }, e2027: { value: "19,2%", color: "amber" } } },
              { cells: { metric: { value: "Aktieåterköp" }, fy2024: { value: "17 254" }, fy2025: { value: "18 420" }, current: { value: "22 392" }, e2026: { value: "21 258" }, e2027: { value: "21 214" } } },
            ]}
          />

          <AlertBox type="risk">
            <strong>⚠️ Capex-trend:</strong> Capex stiger kraftigt: $44,5B (2024) → $83B (nuv.) → $129B (2027e). FCF pressas trots stigande operativt kassaflöde. AI-infrastrukturinvesteringar är primär drivkraft. Nyckeltal att följa: om Azure-tillväxten kompenserar Capex-ökningen.
          </AlertBox>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            <MetricCard label="ROE" value="33,3%" trend="Hög kapitaleffektivitet" />
            <MetricCard label="ROIC" value="25,6%" trend="Klart &gt; WACC (~9%)" />
            <MetricCard label="ROA" value="18,0%" trend="Exceptionellt för skalan" />
            <MetricCard label="Bruttomarginal" value="68,6%" trend="World-class" />
          </div>

          <RatingBox rating={5}><strong>5/5</strong> — Exceptionell finansiell profil. Inga förlustår, stigande marginaler, nettoskuldfri balansräkning och konsistent kapitalavkastning som överstiger WACC med bred marginal.</RatingBox>
        </div>

        {/* IV. Valuation */}
        <div data-section="valuation" id="valuation" className="pt-14">
          <SectionHeader number="IV" title="Värdering & Jämförelse" />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Värderingsmultiplar — Historik & Estimat</h3>
          <FinancialTable
            title=""
            columns={[
              { key: "metric", header: "Multipel" },
              { key: "fy2024", header: "2024" },
              { key: "fy2025", header: "2025" },
              { key: "current", header: "Nuv." },
              { key: "e2026", header: "2026e" },
              { key: "e2027", header: "2027e" },
              { key: "vs", header: "Vs. historik" },
            ]}
            rows={[
              { cells: { metric: { value: "P/E" }, fy2024: { value: "37,9x" }, fy2025: { value: "36,5x" }, current: { value: "24,5x" }, e2026: { value: "23,8x" }, e2027: { value: "20,7x" }, vs: { value: "−35% (compression)", color: "green" } } },
              { cells: { metric: { value: "EV/EBIT" }, fy2024: { value: "30,5x" }, fy2025: { value: "28,8x" }, current: { value: "25,4x" }, e2026: { value: "–" }, e2027: { value: "–" }, vs: { value: "−17%", color: "green" } } },
              { cells: { metric: { value: "EV/EBITDA" }, fy2024: { value: "25,4x" }, fy2025: { value: "22,8x" }, current: { value: "19,6x" }, e2026: { value: "–" }, e2027: { value: "–" }, vs: { value: "−23%", color: "green" } } },
              { cells: { metric: { value: "P/S" }, fy2024: { value: "13,6x" }, fy2025: { value: "13,2x" }, current: { value: "9,6x" }, e2026: { value: "–" }, e2027: { value: "–" }, vs: { value: "−29%", color: "green" } } },
              { cells: { metric: { value: "P/B" }, fy2024: { value: "12,4x" }, fy2025: { value: "10,8x" }, current: { value: "7,5x" }, e2026: { value: "–" }, e2027: { value: "–" }, vs: { value: "−40%", color: "green" } } },
              { cells: { metric: { value: "Earnings Yield" }, fy2024: { value: "2,6%" }, fy2025: { value: "2,7%" }, current: { value: "4,1%" }, e2026: { value: "–" }, e2027: { value: "–" }, vs: { value: "+55%", color: "green" } } },
            ]}
          />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">PEG-analys</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            PEG = P/E ÷ EPS-tillväxt = 24,5 ÷ 17,1% ≈ <strong>1,43x</strong>. En PEG under 1,5x för ett bolag med Microsofts kvalitet och moat är historiskt sett attraktivt. Framåtblickande PEG (2027e) = 20,7 ÷ 15,4% ≈ <strong>1,34x</strong> — ännu mer attraktivt.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Relativ värdering — Tech Megacap Peers</h3>
          <FinancialTable
            title=""
            columns={[
              { key: "company", header: "Bolag" },
              { key: "pe", header: "P/E (nuv.)" },
              { key: "evEbitda", header: "EV/EBITDA" },
              { key: "fcfYield", header: "FCF Yield" },
              { key: "growth", header: "EPS-tillväxt YoY" },
              { key: "margin", header: "EBIT-marginal" },
            ]}
            rows={[
              { cells: { company: { value: "Microsoft (MSFT)" }, pe: { value: "24,5x" }, evEbitda: { value: "19,6x" }, fcfYield: { value: "2,7%" }, growth: { value: "+17,1%", color: "green" }, margin: { value: "47,1%", color: "green" } } },
              { cells: { company: { value: "Alphabet (GOOGL)" }, pe: { value: "28,6x" }, evEbitda: { value: "24,5x" }, fcfYield: { value: "1,65%" }, growth: { value: "+34,2%" }, margin: { value: "31,7%" } } },
              { cells: { company: { value: "Meta (META)" }, pe: { value: "27,1x" }, evEbitda: { value: "16,4x" }, fcfYield: { value: "2,41%" }, growth: { value: "−2,5%", color: "amber" }, margin: { value: "41,3%" } } },
              { cells: { company: { value: "Amazon (AMZN)" }, pe: { value: "28,8x" }, evEbitda: { value: "16,4x" }, fcfYield: { value: "0,31%" }, growth: { value: "+28,8%" }, margin: { value: "12,3%" } } },
              { cells: { company: { value: "Nvidia (NVDA)" }, pe: { value: "35,9x" }, evEbitda: { value: "34,0x" }, fcfYield: { value: "1,80%" }, growth: { value: "+66,0%", color: "green" }, margin: { value: "65,0%", color: "green" } } },
            ]}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-3 mb-4">
            Microsoft handlas till lägre P/E än Nvidia (35,9x) men med premie mot Amazon (28,8x), Meta (27,1x) och Alphabet (28,6x). Givet Microsofts signifikant högre marginaler (47,1%) och bredare moat är värderingen på 24,5x P/E attraktiv. Nuvarande MSFT-multiplar är de lägsta på 4+ år.
          </p>

          <RatingBox rating={4}><strong>4/5</strong> — Inte billig i absoluta termer men attraktiv relativt kvalitet, tillväxt och historisk värdering. PEG 1,43x med 47% EBIT-marginal är svårfunnet bland megacap-bolag.</RatingBox>
        </div>

        {/* V. Growth */}
        <div data-section="growth" id="growth" className="pt-14">
          <SectionHeader number="V" title="Tillväxtmotorer & Triggers" />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">1. Azure & AI-infrastruktur — Den primära motorn</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Azure växer med ~23% YoY och accelererar drivet av AI-efterfrågan. Microsoft har investerat aggressivt i GPU-kluster och datacenter ($83Mdr Capex nuv.). Azure AI Studio och Azure OpenAI Service positionerar bolaget i kärnan av enterprise AI-adoption. Analytiker estimerar att Azure når $100Mdr+ i kvartalsintäkter (ARR) inom 12–18 månader.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">2. Microsoft Copilot — Monetisering av AI</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Copilot för Microsoft 365 (prissatt till $30/användare/mån) är den mest konkreta AI-monetariseringsmöjligheten i enterprise. Med ~300M+ M365-användare globalt, om 10–20% adopterar Copilot innebär det $10–20Mdr i annual revenue tillskott. Early signals är positiva men adoptionen tar tid i enterprise.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">3. Security & Compliance — Underskattad motor</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft Security är ett $20Mdr+ ARR-bolag. I en värld av ökande cyberhot väljer CIOs consolidated security-platform. Microsofts integrerade säkerhetserbjudande (Sentinel, Defender, Purview) har starka cross-sell-möjligheter i befintlig kundbas.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">4. Activision Blizzard — Gaming-optionalitet</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Förvärvet av Activision (2023, $68,7Mdr) ger Microsoft Call of Duty, World of Warcraft och ~10 000 spelutvecklare. Game Pass Ultimate och Azure-integration skapar synergieffekter på 3–5 års sikt.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">5. AI Agents — Nästa tillväxtfas (2026+)</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Autonoma AI-agenter (Microsoft Copilot Studio, Power Automate med AI) representerar nästa S-kurva. Agenter som slutför komplexa arbetsuppgifter autonomt = dramatisk produktivitetsvinst = betalningsvilja. Marknaden är minimal i dag men kan bli signifikant 2026–2030.
          </p>
          <RatingBox rating={5}><strong>5/5</strong> — Microsofts tillväxtmotorer är diversifierade och positionerade i de viktigaste tekniktrenderna. AI-adoption (Azure, Copilot) är den primära värdedrivaren på kort till medellång sikt.</RatingBox>
        </div>

        {/* VI. Risk */}
        <div data-section="risk" id="risk" className="pt-14">
          <SectionHeader number="VI" title="Riskprofil" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <MetricCard label="Risknivå" value="Medel" trend="För ett megacap-bolag" />
            <MetricCard label="Risk-score" value="3/5" trend="5 = Högst risk" />
          </div>

          <FinancialTable
            title="Riskmatris"
            columns={[
              { key: "risk", header: "Risk" },
              { key: "category", header: "Kategori" },
              { key: "probability", header: "Sannolikhet" },
              { key: "impact", header: "Påverkan" },
            ]}
            rows={[
              { cells: { risk: { value: "Capex overshooting" }, category: { value: "Finansiell" }, probability: { value: "Medel" }, impact: { value: "Hög", color: "amber" } } },
              { cells: { risk: { value: "Google Gemini disruption" }, category: { value: "Teknologisk" }, probability: { value: "Medel" }, impact: { value: "Medel" } } },
              { cells: { risk: { value: "OpenAI-relation" }, category: { value: "Partner/Konkurrent" }, probability: { value: "Låg–Medel" }, impact: { value: "Hög", color: "amber" } } },
              { cells: { risk: { value: "EU/USA Reglering" }, category: { value: "Regulatorisk" }, probability: { value: "Hög", color: "amber" }, impact: { value: "Medel" } } },
              { cells: { risk: { value: "Cybersäkerhetsincident" }, category: { value: "Operationell" }, probability: { value: "Medel" }, impact: { value: "Hög", color: "amber" } } },
              { cells: { risk: { value: "Konjunkturavmattning" }, category: { value: "Makro" }, probability: { value: "Medel" }, impact: { value: "Medel" } } },
              { cells: { risk: { value: "Kina-geopolitik" }, category: { value: "Geopolitisk" }, probability: { value: "Medel" }, impact: { value: "Medel" } } },
              { cells: { risk: { value: "Valutarisker" }, category: { value: "Finansiell" }, probability: { value: "Hög", color: "amber" }, impact: { value: "Låg" } } },
            ]}
          />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Primärrisk: Capex vs. ROI</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Den enskilt största risken är om AI-Capex-investeringarna ($83–129Mdr/år) ger tillräcklig avkastning. Om Azure AI-efterfrågan inte växer i takt med infrastrukturbygget riskerar FCF att pressas utan motsvarande intäktstillväxt. Bolaget klarar detta finansiellt men aktievärderingen kan utmanas om marknaden tappar tro på AI ROI.
          </p>

          <AlertBox type="risk">
            <strong>ESG-risker att bevaka:</strong> Energiförbrukning datacenter · Vattenbrist (kylning) · Cybersäkerhetssårbarheter · Kina-exponering · AI-bias & etik
          </AlertBox>

          <RatingBox rating={3}><strong>3/5 risk</strong> — Primär risk är FCF-press om AI Capex ej levererar ROI. Bolagets diversifiering och starka balansräkning ger god motståndskraft mot de flesta scenarion.</RatingBox>
        </div>

        {/* VII. ESG */}
        <div data-section="esg" id="esg" className="pt-14">
          <SectionHeader number="VII" title="ESG & Makroekonomiska Faktorer" />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Miljö (E)</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft har ambitiösa klimatmål: <strong>koldioxidnegativt till 2030</strong> och målet att ta bort all historisk CO₂ till 2050. Utmaningen är att AI-datacenter kräver enorma mängder el och vatten. Microsoft har ingått PPA-avtal för förnybar energi och investerar i kärnkraft (Three Mile Island reaktivering). ESG-ratingarna är höga — MSCI AAA, Sustainalytics low risk.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Socialt (S)</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Microsoft rankas konsekvent högt på arbetsgivarindex. Initiativ som AI Skills for All och globala partnerskapsprogram för digital kompetens visar samhällsansvar. LinkedIn skapar ekonomiska möjligheter för hundratals miljoner användare globalt.
          </p>

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Styrning (G)</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Styrelsestrukturen är välskött med erfarna oberoende ledamöter. VD-lönestrukturen är tungt viktat mot aktiekursprestanda vilket skapar alignment med aktieägare. Ägarstyrningstransparens är hög via kvartalsvisa rapporter och detaljerade 10-K-filingar.
          </p>
          <RatingBox rating={4}><strong>4/5</strong> — Microsoft är en ESG-ledare med ambitiösa mål och hög transparens. Energiförbrukningen i datacenter är den primära ESG-risken att bevaka.</RatingBox>
        </div>

        {/* VIII. AI Observations */}
        <div data-section="ai-obs" id="ai-obs" className="pt-14">
          <SectionHeader number="VIII" title="AI-observationer & Avvikande mönster" />

          <div className="bg-[#0f1a0f] rounded p-4 mb-4 font-mono">
            <div className="text-[#40d040] text-[10px] tracking-widest mb-2">◈ AI-ANALYSMODUL AKTIVERAD · MICROSOFT CORP. · 1 MARS 2025</div>
            <div className="text-[#80e080] text-xs leading-loose">► Sentimentanalys: BULLISH (78/100) | Nyhetsflöde senaste 90 dagar: Netto positivt</div>
            <div className="text-[#80e080] text-xs leading-loose">► Insider-aktivitet: Inga signifikanta köp — inga alarmerande säljmönster</div>
            <div className="text-[#80e080] text-xs leading-loose">► Analytikerkonsensus: 47 av 52 analytiker = KÖP | Mediantarget $480</div>
            <div className="text-[#80e080] text-xs leading-loose">► Short-ränta: 0,7% (extremt låg — ingen signifikant shortsäljning)</div>
            <div className="text-[#80e080] text-xs leading-loose">► Options-flow: Netto bullish (call/put ratio 1,8 senaste månaden)</div>
          </div>

          <AlertBox type="info">
            <strong>Avvikande signal:</strong> Analytikernas EPS-estimat för 2026 ($16,47) verkar konservativa. Microsoft har slagit EPS-estimat 15 kvartal i rad. Om detta mönster håller finns upprevideringsrisk mot $17,50–18,00.
          </AlertBox>
          <RatingBox rating={5}><strong>5/5</strong> — Alla kvantitativa och alternativa datapunkter pekar mot en fortsatt stark trend. Det konservativa EPS-estimatet för 2026 utgör en potentiell positiv överraskning.</RatingBox>
        </div>

        {/* IX. Verdict */}
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
                <div className="font-serif text-4xl font-bold">$480</div>
                <div className="text-xs text-[#80e080]">+22% potential från $392</div>
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

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Motivering</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-3">
            Microsoft uppfyller i praktiken alla kriterier för ett <strong>tier-1 kvalitetsbolag</strong>. Kombinationen av: (1) bredaste economic moat i tech, (2) positionering i centrum av AI-megatrenden, (3) exceptionella marginaler (47% EBIT) som ökar, (4) konsistent EPS-tillväxt på 15–17%, och (5) en värdering som är de lägsta på 4 år (P/E 24,5x) skapar ett attraktivt riskjusterat ingångsläge.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            <strong>Målpris $480</strong> baseras på 25x P/E × $19,01 (2027e EPS) diskonterat tillbaka ~18 månader. Bull case $560 förutsätter EPS-upprevidering till $21+ pga Copilot-acceleration. Bear case $310 förutsätter Azure-besvikelse och P/E-kompression till 20x.
          </p>

          <AlertBox type="signal">
            <strong>✅ Slutsats: KÖP</strong> — Microsoft är ett av marknadens bästa långsiktiga kvalitetsinnehav. Bolaget uppfyller samtliga kriterier för ett bolag man kan äga i 5–10 år. AI är inte en kortlivad trend för Microsoft — det är en fundamental omstrukturering av alla bolagets affärsenheter.
          </AlertBox>
        </div>

        {/* X. Scenarios */}
        <div data-section="scenarios" id="scenarios" className="pt-14">
          <SectionHeader number="X" title="Scenarier: Bull, Base & Bear Case" />

          <ScenarioCards scenarios={scenarios} />

          <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-3 pl-2 border-l-[3px] border-[#b5892a]">Sannolikhetsfördelning</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Probability-weighted expected value: (0,25 × $560) + (0,55 × $480) + (0,20 × $310) = <strong>$482</strong> — bekräftar målpris på $480 som rimligt och konservativt.
          </p>
        </div>
      </div>
    </AnalysisLayout>
  );
}
