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
  ProgressBar,
  Timeline,
  Card,
} from "@/components/analysis";
import type { AnalysisSection, Scenario, TableColumn, TableRow } from "@/components/analysis";
import NvidiaCharts from "./NvidiaCharts";

const ACCENT = "#76B900";

const sections: AnalysisSection[] = [
  { id: "overview", number: "I", title: "Företagsöversikt" },
  { id: "strategy", number: "II", title: "Strategisk analys & Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation", number: "IV", title: "Värdering & Jämförelse" },
  { id: "growth", number: "V", title: "Tillväxtmotorer" },
  { id: "risk", number: "VI", title: "Riskprofil" },
  { id: "esg", number: "VII", title: "ESG & Makro" },
  { id: "ai-obs", number: "VIII", title: "AI-obs & CFO-analys" },
  { id: "verdict", number: "IX", title: "Investeringsbeslut" },
  { id: "scenarios", number: "X", title: "Bull / Base / Bear" },
];

const incomeColumns: TableColumn[] = [
  { key: "metric", header: "Nyckeltal" },
  { key: "fy2024", header: "FY2024" },
  { key: "fy2025", header: "FY2025" },
  { key: "yoy", header: "YoY %" },
  { key: "e2026", header: "2026e" },
  { key: "e2027", header: "2027e" },
  { key: "trend", header: "Trend" },
];

const incomeRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning" }, fy2024: { value: "130 497" }, fy2025: { value: "215 938" }, yoy: { value: "+65,5%", color: "green" }, e2026: { value: "362 878" }, e2027: { value: "470 709" }, trend: { value: "Exceptionell", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "Bruttoresultat" }, fy2024: { value: "97 858" }, fy2025: { value: "153 463" }, yoy: { value: "+56,8%", color: "green" }, e2026: { value: "—" }, e2027: { value: "—" }, trend: { value: "Stark", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "EBIT" }, fy2024: { value: "81 453" }, fy2025: { value: "130 387" }, yoy: { value: "+60,1%", color: "green" }, e2026: { value: "239 148" }, e2027: { value: "310 884" }, trend: { value: "Stark", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "Nettoresultat" }, fy2024: { value: "72 880" }, fy2025: { value: "120 067" }, yoy: { value: "+64,7%", color: "green" }, e2026: { value: "199 926" }, e2027: { value: "257 725" }, trend: { value: "Exceptionell", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "EPS (utspädd)" }, fy2024: { value: "2,96" }, fy2025: { value: "4,92" }, yoy: { value: "+66,2%", color: "green" }, e2026: { value: "8,24" }, e2027: { value: "10,88" }, trend: { value: "Accelererar", color: "green", arrow: "up" } } },
  { cells: { metric: { value: "R&D" }, fy2024: { value: "12 914" }, fy2025: { value: "18 497" }, yoy: { value: "+43,2%", color: "amber" }, e2026: { value: "26 660" }, e2027: { value: "32 561" }, trend: { value: "Ökar (positivt)", color: "amber", arrow: "up" } } },
];

const swotData = {
  strengths: [
    "CUDA-ekosystem, starkaste moat i tech",
    "73,6% bruttomarginal (Non-GAAP Q3)",
    "ROE 101%, ROIC 93% — extrem kapitaleffektivitet",
    "Data Center dominans: ~90% av omsättningen",
    "Blackwell-arkitekturens snabba ramp",
    "Rekordfritt kassaflöde varje kvartal",
  ],
  weaknesses: [
    "Kina-exponering (H20 = strukturell $8B/kv risk)",
    "Kundkoncentration: ~50% av DC-rev från CSPs",
    "Bruttomarginal under press vid systemövergångar",
    "Fabless-modell = sårbarhet mot TSMC-störningar",
    "Insynsägande svagt sjunkande",
  ],
  opportunities: [
    "Agentic AI = ny, massiv inferenscykel",
    "Automotive/robotics: mångårig tillväxtmotor",
    "Sovereign AI: länder bygger egna AI-infrastrukturer",
    "DGX Spark (desktop AI) öppnar ny marknad",
    "Blackwell Ultra → Rubin-arkitektur pipeline",
    "Ethernet for AI: ny nätverksmarknad",
  ],
  threats: [
    "US exportkontroller (H20-ban, eskalering risk)",
    "AMD MI300X, Intel Gaudi — växande alternativ",
    "Custom ASIC (Google TPU, Amazon Trainium)",
    "Kina inhemsk konkurrens (Huawei Ascend)",
    "TSMC supply-chain sårbarhet (geopolitik Taiwan)",
    "Regulatoriska antitrust-risker (EU/USA)",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "35%",
    price: "$320",
    change: "+76% från ~$182",
    assumptions: "EPS 2027e: $12–14 (accelererad tillväxt)\nP/E-multipel: 28–30x (AI-premie håller)\nGross margin >76% (Blackwell Ultra-skaleffekter)",
    requires: "Agentic AI-inferenscykel exploderar, sovereign AI-investeringar accelererar, exportkontrollerna lättas/hanteras, Rubin-arkitekturen tar Blackwell-stafetten sömlöst.",
  },
  {
    type: "base",
    probability: "45%",
    price: "$230",
    change: "+26% från ~$182",
    assumptions: "EPS 2026e: $8,24 (konsensus)\nP/E-multipel: 24–26x\nGross margin 74–76% (mid-70s guidance)",
    requires: "Stabil Blackwell-ramp per guidance, Q4 $65B-målsättning nås, bruttomarginal recovery till ~75% bekräftas, inga nya exportkontrolleskaleringar.",
  },
  {
    type: "bear",
    probability: "20%",
    price: "$120",
    change: "−34% från ~$182",
    assumptions: "EPS 2026e: $6–7 (nedsideavvikelse)\nP/E-multipel: 18–20x (multipelkompression)\nGross margin <70%",
    requires: "Eskalerade exportkontroller inkluderar Blackwell, CSP-investeringspaus, AMD/Custom ASIC tar 10%+ marknadsandel, TSMC supply-störning.",
  },
];

export default function NvidiaAnalysis() {
  return (
    <AnalysisLayout
      companyName="NVIDIA"
      subtitle="Finansiell Analys · FY2026"
      date="3 mars 2026"
      dataSources="Data: FY2024–FY2027e · Källa: CFO Commentaries Q1–Q3 FY2026"
      sections={sections}
      accentColor={ACCENT}
      theme="dark"
    >
      {/* Header */}
      <div className="bg-[#1c2b00] border-b-2 border-[#76B90080] px-6 sm:px-12 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#76B90024] to-transparent pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-[#76B90033] border border-[#76B90080] rounded-full px-3.5 py-1 text-[11px] font-mono text-[#76B900] tracking-wider mb-4">
            <span className="w-1.5 h-1.5 bg-[#76B900] rounded-full animate-pulse" />
            AKTIV ANALYS &middot; NVDA &middot; NASDAQ
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl uppercase tracking-[6px] font-bold text-white mb-2">
            NVIDIA CORPORATION
          </h1>
          <p className="text-sm text-white/60 mb-8">
            Fullständig finansiell analys — Räkenskapsår FY2025–FY2026 &middot; Q1–Q3 FY2026
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Börsvärde", value: "$4,43T", trend: "→ Nuvarande" },
              { label: "Omsättning FY25", value: "$216B", trend: "↑ +66% YoY" },
              { label: "EPS FY25", value: "$4,92", trend: "↑ +66% YoY" },
              { label: "Nettomarginal", value: "55,6%", trend: "→ Best-in-class" },
              { label: "Q3 FY26 Rev.", value: "$57B", trend: "↑ +62% YoY" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-[#76B9001F] border border-[#76B90066] rounded-xl p-4">
                <div className="text-[10px] font-mono text-[#76B900CC] tracking-wider uppercase mb-1.5">{kpi.label}</div>
                <div className="font-serif text-xl font-bold text-white">{kpi.value}</div>
                <div className="text-[11px] font-mono text-[#76B900]">{kpi.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-12 pb-20">
        {/* I. Overview */}
        <div data-section="overview" id="overview" className="pt-14">
          <SectionHeader number="I" title="Företagsöversikt" accentColor="#76B900" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <MetricCard label="Börskurs (approx.)" value="~$182" trend="Börsvärde $4,43 biljoner USD" valueColor="text-[#76B900]" />
            <MetricCard label="Ticker / Börs" value="NVDA" trend="NASDAQ · S&P 500 / NDX" valueColor="text-white" />
            <MetricCard label="Anställda" value="42 000" trend="↑ +17% från 36 000 (FY24)" valueColor="text-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Card title="Affärsidé & Affärsmodell">
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-3">
                <strong className="text-white">NVIDIA</strong> designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA/ekosystem) och nätverkslösningar för datacenters, gaming och autonoma fordon.
              </p>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Intäktsmodellen bygger på tre ben: <strong className="text-white">(1) Hårdvaruförsäljning</strong> (GPU-system som HGX, DGX, GB200/GB300 Blackwell), <strong className="text-white">(2) Mjukvara & plattform</strong> (CUDA-ekosystem som skapar inlåsning), samt <strong className="text-white">(3) Tjänster & moln</strong> (DGX Cloud). Fabless-modellen innebär att tillverkning outsourcas till TSMC.
              </p>
            </Card>
            <Card title="Ledning & Ägarstruktur">
              <h4 className="text-sm text-white font-medium mb-1">Jensen Huang — VD & Medgrundare</h4>
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-3">
                Medgrundade NVIDIA 1993. En av techbranschens mest framgångsrika VD:ar med 30+ år av konsekventa strategiska vägval.
              </p>
              <h4 className="text-sm text-white font-medium mb-1">Colette Kress — CFO</h4>
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-4">
                Erfaren teknisk CFO med gedigen track record inom finansiell kommunikation och kapitalallokering.
              </p>
              <ProgressBar label="Insynsägande" value="3,79%" percentage={38} />
              <ProgressBar label="Institutionellt ägande (est.)" value=">65%" percentage={65} />
            </Card>
          </div>
          <RatingBox rating={5}><strong>5/5</strong> — Affärsmodellen är exceptionellt uthållig tack vare CUDA-ekosystemets inlåsningseffekt, fabless-modellens kapitaleffektivitet och Jensens visionära ledarskap.</RatingBox>
        </div>

        {/* II. Strategic Analysis */}
        <div data-section="strategy" id="strategy" className="pt-14">
          <SectionHeader number="II" title="Strategisk Analys & Moat" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Card title="Marknadsstorlek & Drivkrafter">
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-2">
                AI-infrastrukturinvesteringarna driver en sekulär supercykel. Tre parallella plattformsskiften: <strong className="text-white">accelererad beräkning, kraftfulla AI-modeller och agentiska applikationer</strong>.
              </p>
              <ul className="space-y-1.5 mt-3">
                {["TAM för AI-acceleratorer: $500B+ till 2028", "Networking +162% YoY i Q3 FY26", "Automotive +72% YoY (Q1 FY26)", "Agentic AI kräver inferens-kapacitet: ny efterfrågekälla"].map((item, i) => (
                  <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">{item}</li>
                ))}
              </ul>
            </Card>
            <Card title="Konkurrensfördelar (Moat)">
              <ul className="space-y-2">
                {[
                  { label: "CUDA-ekosystem:", text: "20+ år av programvara. Miljontals tränade ingenjörer. Omöjligt att replikera kort sikt" },
                  { label: "Full-stack-strategi:", text: "Chip + Interconnect + System + Mjukvara + Moln" },
                  { label: "Nätverkseffekter:", text: "Fler modeller → fler verktyg → fler ingenjörer → fler kunder" },
                  { label: "Supply-chain fördel:", text: "Exklusiva TSMC-kapacitetsavtal" },
                  { label: "Arkitekturöverlägsenhet:", text: "Blackwell tar andelar från Hopper — kontrollerad kannibalisering" },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">
                    <strong className="text-white">{item.label}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <SwotGrid data={swotData} title="SWOT-Analys" />
          <RatingBox rating={5}><strong>5/5</strong> — NVIDIA:s moat är branschens starkaste. CUDA-ekosystemet, full-stack-strategin och nätverkseffekterna skapar en konkurrenswall som är extremt svår att bryta ner.</RatingBox>
        </div>

        {/* III. Financials */}
        <div data-section="financials" id="financials" className="pt-14">
          <SectionHeader number="III" title="Finansiell Analys" accentColor="#76B900" />
          <NvidiaCharts />
          <div className="mt-5">
            <FinancialTable title="Resultaträkning — YoY-analys (MUSD)" columns={incomeColumns} rows={incomeRows} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
            <MetricCard label="ROE FY25" value="101%" trend="↓ från 119% (FY24)" valueColor="text-[#76B900]" />
            <MetricCard label="ROIC FY25" value="93,6%" trend="↓ från 103% (FY24)" valueColor="text-[#76B900]" />
            <MetricCard label="Nettoskuld" value="Neg." trend="Kassa $60,6B (Q3 FY26)" valueColor="text-[#76B900]" />
            <MetricCard label="Fritt Kassaflöde" value="$22B" trend="Q3 FY26 FCF" valueColor="text-[#76B900]" />
          </div>
          <RatingBox rating={5}><strong>5/5</strong> — Enastående finansiell profil: 55%+ nettomarginal, massiv kassageneration, nettokassa och ROE &gt;100%.</RatingBox>
        </div>

        {/* IV. Valuation */}
        <div data-section="valuation" id="valuation" className="pt-14">
          <SectionHeader number="IV" title="Värdering & Jämförelse" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Card title="DCF-Resonemang (Indikativt)">
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-2">
                Med 2026e EPS på $8,24 och ett motiverat P/E på 25–30x ger ett indikativt värdeintervall på <strong className="text-white">$206–247 per aktie</strong>.
              </p>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Bear case P/E 18x: ~$148. Bull case P/E 35x: ~$288. Multiplarna sjunker snabbt mot attraktiva nivåer om tillväxten håller.
              </p>
              <AlertBox type="signal">
                P/E 2026e = 22x för ett bolag med 60%+ EPS-tillväxt innebär ett PEG-tal under 0,4 — strukturellt attraktivt.
              </AlertBox>
            </Card>
            <Card title="Relativ Värdering">
              <p className="text-xs text-[#9a9a9a] leading-relaxed mb-2">
                NVIDIA handlas till <strong className="text-white">P/E 37x (NTM)</strong> vs. sektormultipel ~20x — premie motiverad av unik AI-exponering.
              </p>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Jämförbart med MSFT (~30x), AAPL (~28x) men med 3–5× högre tillväxttakt. Vs AMD (~25x) är premien 30–40% — motiverad av ROIC-differensen och CUDA-moaten.
              </p>
              <AlertBox type="info" icon="📌">
                Värderingen är &quot;rättvis för ett fantastiskt bolag&quot; snarare än &quot;billig&quot;. Nedsida vid multipelkompression om tillväxt bromsar.
              </AlertBox>
            </Card>
          </div>
          <RatingBox rating={4}><strong>4/5</strong> — Värderingen är hög på absoluta tal men motiveras av kvaliteten. Forward 2026e P/E ~22x är attraktivt givet EPS-tillväxten.</RatingBox>
        </div>

        {/* V. Growth */}
        <div data-section="growth" id="growth" className="pt-14">
          <SectionHeader number="V" title="Tillväxtmotorer & Triggers" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              { title: "Data Center — Primär Motor", value: "$51,2B", sub: "Q3 FY26 · REKORD · +66% YoY", items: ["Blackwell Ultra = ledande arkitektur", "Cloud service providers: ~50% av DC-rev", "LLMs, Recommendation engines, Agentic AI"] },
              { title: "Networking — Explosiv Tillväxt", value: "+162%", sub: "YoY Q3 FY26 · $8,2B · REKORD", items: ["NVLink compute fabric för GB200/GB300", "XDR InfiniBand-produkter", "Ethernet for AI — nya kunder"] },
              { title: "Automotive & Pro Viz", value: "+72%", sub: "Automotive YoY Q1 FY26", items: ["Självkörande plattformar rampar", "Pro Viz +56% YoY (Q3 FY26)", "NVIDIA DRIVE-plattform"] },
            ].map((item) => (
              <Card key={item.title} title={item.title}>
                <div className="text-center my-3">
                  <div className="font-serif text-4xl font-bold text-[#76B900]">{item.value}</div>
                  <div className="text-[11px] font-mono text-[#5a5a5a]">{item.sub}</div>
                </div>
                <ul className="space-y-1.5">
                  {item.items.map((li, i) => (
                    <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">{li}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title="Teknologiska Katalysatorer">
              <Timeline items={[
                { date: "Nu — Q1 FY26", text: "Blackwell-arkitektur rampas som 'fastest ramp in company history'. H20-exportkontroll skapar $4,5B engångskostnad." },
                { date: "Q2–Q3 FY26", text: "Blackwell Ultra lanseras som 'leading architecture across all customer categories'. NVLink-omsättning exploderar till $8,2B." },
                { date: "Q4 FY26 Outlook", text: "Guidance $65B (+14% QoQ). Gross margin guidat till 75,0% — bekräftar recovery." },
                { date: "FY27+ Estimat", text: "Rubin-arkitektur i pipeline. Agentic AI-inferens som ny supercykel. Automotive mångdubblas." },
              ]} />
            </Card>
            <Card title="Kapitalallokering — Aktieåterköp">
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Styrelsen godkände ytterligare <strong className="text-white">$60B återköpsmandat</strong> (aug 2025). FY26 Q1–Q3: ~$36,3B återköpt. Aggressiv kapitalretur signalerar tilltro till framtida kassaflöden.
              </p>
            </Card>
          </div>
        </div>

        {/* VI. Risk */}
        <div data-section="risk" id="risk" className="pt-14">
          <SectionHeader number="VI" title="Riskprofil" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title="Kritiska Risker">
              <AlertBox type="risk" icon="🚨">
                <strong>Exportkontroller (HÖG PRIORITET)</strong><br />
                US-regeringen krävde licensiering för H20-export till Kina. Direkt intäktsförlust ~$8B/kv. Eskaleringsrisk till andra produkter.
              </AlertBox>
              <AlertBox type="risk">
                <strong>Kundkoncentration (MEDEL)</strong><br />
                ~50% av Data Center-intäkter från stora CSPs. Om en hyperscaler pausar = omedelbar intäktseffekt.
              </AlertBox>
              <AlertBox type="risk">
                <strong>TSMC-sårbarhet (MEDEL-HÖG)</strong><br />
                100% fabless → fullständigt beroende av TSMC. Geopolitisk Taiwan-risk.
              </AlertBox>
              <AlertBox type="risk">
                <strong>Marginalpress vid arkitekturovergång (MEDEL)</strong><br />
                Hopper→Blackwell tryckte ner bruttomarginal med ~4pp. Kan upprepas.
              </AlertBox>
            </Card>
            <Card title="Riskscore & Indikatorer">
              <ProgressBar label="Geopolitisk/Exportrisk" value="HÖG — 9/10" percentage={90} color="red" />
              <ProgressBar label="Konkurrensrisk (AMD/Custom ASIC)" value="MEDEL — 5/10" percentage={50} color="amber" />
              <ProgressBar label="Supply-chain/TSMC-risk" value="MEDEL — 6/10" percentage={60} color="amber" />
              <ProgressBar label="Regulatorisk/Antitrustrisk" value="MEDEL — 5/10" percentage={50} color="amber" />
              <ProgressBar label="Finansiell/Balansräkningsrisk" value="LÅG — 2/10" percentage={20} color="green" />
              <ProgressBar label="AI-efterfrågan cyklisk-risk" value="MEDEL — 5/10" percentage={50} color="amber" />
              <div className="mt-4 text-xs text-[#9a9a9a]">
                Risk-score: <strong className="text-white">5,3/10</strong> aggregerat. Finansiell risk låg — geopolitik dominerar.
              </div>
            </Card>
          </div>
        </div>

        {/* VII. ESG */}
        <div data-section="esg" id="esg" className="pt-14">
          <SectionHeader number="VII" title="ESG & Makroekonomiska Faktorer" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card title="Miljö (E)">
              <ul className="space-y-1.5">
                {["AI-datacenter energiintensiva — kunder under klimatpress", "Blackwell bättre prestanda/watt vs föregångare", "Fabless → lägre direkt avtryck, men indirekt via TSMC massivt", "EU AI Act & energikrav kan påverka tillväxttakt"].map((item, i) => (
                  <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">{item}</li>
                ))}
              </ul>
            </Card>
            <Card title="Socialt (S)">
              <ul className="space-y-1.5">
                {["42 000 anställda (+17% YoY)", "SBC ~$4,6B/kv — positivt för retention", "AI:s samhällspåverkan är en ESG-fråga", "Insynsägande sjunker marginellt — bevaka"].map((item, i) => (
                  <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">{item}</li>
                ))}
              </ul>
            </Card>
            <Card title="Styrning (G)">
              <ul className="space-y-1.5">
                {["Jensens starka ägarandel ger alignement", "$60B återköpsmandat — aktionärsvänlig", "Transparent rapportering: H20-charges redovisas separat", "Board-composition okänd i detalj"].map((item, i) => (
                  <li key={i} className="text-xs text-[#9a9a9a] leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-[#76B900]">{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* VIII. AI Observations */}
        <div data-section="ai-obs" id="ai-obs" className="pt-14">
          <SectionHeader number="VIII" title="AI-Observationer & CFO-ordsanalys" accentColor="#76B900" />
          <Card title="Kvantitativa Avvikelser & Varningssignaler" className="mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <AlertBox type="signal">
                  <strong>Positiv anomali: Networking-explosion</strong><br />
                  Networking +162% YoY (Q3) — NVLink-fabric driver systembundna affärer, låser in kunder i hela infrastrukturen.
                </AlertBox>
                <AlertBox type="signal">
                  <strong>Positiv: FCF Q3 = $22B</strong><br />
                  Trots massiva investeringar genererar NVIDIA $22B FCF/kvartal — exceptionell kapitalmaskin.
                </AlertBox>
                <AlertBox type="signal">
                  <strong>Positiv: Bruttomarginal-recovery</strong><br />
                  Non-GAAP: Q1=71,3% → Q2=72,7% → Q3=73,6% → Q4 guidat 75,0%. Trend bekräftar Blackwell-systemens kostnadsskala förbättras.
                </AlertBox>
              </div>
              <div>
                <AlertBox type="risk">
                  <strong>Varning: ROE/ROIC sjunker trots rekordvinster</strong><br />
                  ROE 119% → 101%. ROIC 103% → 94%. Eget kapital växer snabbare än nettoresultat.
                </AlertBox>
                <AlertBox type="risk">
                  <strong>Varning: Goodwill +301% YoY</strong><br />
                  $5,2B → $20,8B. Indikerar förvärvsaktivitet — bevaka nedskrivningsrisk.
                </AlertBox>
                <AlertBox type="info" icon="📌">
                  <strong>Bevaka: Capex +488%</strong><br />
                  $3,2B → $19B. Multi-year cloud service agreements ($26B i Q3) är drivaren. Avkastningen mäts i framtida licensintäkter.
                </AlertBox>
              </div>
            </div>
          </Card>
        </div>

        {/* IX. Verdict */}
        <div data-section="verdict" id="verdict" className="pt-14">
          <SectionHeader number="IX" title="Sammanfattning & Investeringsbeslut" accentColor="#76B900" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <FinancialTable
              title="Kriteriecheck — Kvalitetsbolag"
              columns={[{ key: "criteria", header: "Kriterium" }, { key: "result", header: "Resultat" }]}
              rows={[
                { cells: { criteria: { value: "Uthållig affärsmodell" }, result: { value: "✅ Ja", color: "green" } } },
                { cells: { criteria: { value: "Starka konkurrensfördelar" }, result: { value: "✅ Exceptionell (CUDA)", color: "green" } } },
                { cells: { criteria: { value: "Konsistent lönsamhet" }, result: { value: "✅ 55%+ nettomarginal", color: "green" } } },
                { cells: { criteria: { value: "Stark balansräkning" }, result: { value: "✅ Nettokassa $60,6B", color: "green" } } },
                { cells: { criteria: { value: "Tillväxt 5–10 år" }, result: { value: "✅ AI-supercykel", color: "green" } } },
                { cells: { criteria: { value: "Förtroendeingivande ledning" }, result: { value: "✅ Jensen Huang", color: "green" } } },
                { cells: { criteria: { value: "Rimlig värdering" }, result: { value: "⚠️ Premiumprissatt", color: "amber" } } },
                { cells: { criteria: { value: "Hanterbara risker" }, result: { value: "⚠️ Exportkontroller", color: "amber" } } },
                { cells: { criteria: { value: "Ägbarhet 5–10 år" }, result: { value: "✅ Starkt Ja", color: "green" } } },
              ]}
            />
            <VerdictBox
              verdict="KÖP"
              target="Målpris: $230–250 (12 mån)"
              description="NVIDIA är ett av de starkaste kvalitetsbolagen i börskurshistorien. AI-supercykeln, CUDA-ekosystemets moat och Blackwell-arkitekturens dominans skapar en ovanlig kombination av hög tillväxt och extrem lönsamhet."
              date="3 MARS 2026"
              accentColor="#76B900"
            />
          </div>
        </div>

        {/* X. Scenarios */}
        <div data-section="scenarios" id="scenarios" className="pt-14">
          <SectionHeader number="X" title="Scenarier: Bull · Base · Bear" accentColor="#76B900" />
          <ScenarioCards scenarios={scenarios} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <Card title="Signaler att Bevaka">
              <Timeline items={[
                { date: "RISK-SIGNAL: Gross Margin", text: "Om bruttomarginal stannar under 73% i Q4 trots guidance 75% — ifrågasätt Blackwell-kostnadsstrukturen" },
                { date: "RISK-SIGNAL: Exportkontroller", text: "Om Blackwell/GB200 inkluderas i exportrestriktioner — bear case-trigger" },
                { date: "POSITIV-SIGNAL: Q4 FY26", text: "Om Q4-intäkter slår $65B och gross margin 75%+ — bekräftar base/bull" },
                { date: "POSITIV-SIGNAL: Agentic AI", text: "Konkreta kunder för inferens-workloads i Q4/Q1 FY27 = bull case-acceleration" },
              ]} />
            </Card>
            <FinancialTable
              title="Sammanfattande Scorecard"
              columns={[{ key: "area", header: "Område" }, { key: "score", header: "Score" }]}
              rows={[
                { cells: { area: { value: "Affärsmodellskvalitet" }, score: { value: "⭐⭐⭐⭐⭐ 5/5", color: "green" } } },
                { cells: { area: { value: "Konkurrensfördelar" }, score: { value: "⭐⭐⭐⭐⭐ 5/5", color: "green" } } },
                { cells: { area: { value: "Finansiell styrka" }, score: { value: "⭐⭐⭐⭐⭐ 5/5", color: "green" } } },
                { cells: { area: { value: "Värdering" }, score: { value: "⭐⭐⭐⭐ 4/5", color: "amber" } } },
                { cells: { area: { value: "Riskprofil" }, score: { value: "⭐⭐⭐ 3/5", color: "amber" } } },
                { cells: { area: { value: "CFO-ton" }, score: { value: "⭐⭐⭐⭐⭐ 5/5", color: "green" } } },
                { cells: { area: { value: "Tillväxtutsikter" }, score: { value: "⭐⭐⭐⭐⭐ 5/5", color: "green" } } },
                { cells: { area: { value: "TOTALT" }, score: { value: "32/35 = 4,6/5", color: "green" } } },
              ]}
            />
          </div>
        </div>
      </div>
    </AnalysisLayout>
  );
}
