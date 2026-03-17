'use client';

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
  RadarChart,
} from '@/components/analysis';
import type { AnalysisSection, Scenario, TableColumn, TableRow } from '@/components/analysis';

const ACCENT = '#76B900'; // NVIDIA Green

const sections: AnalysisSection[] = [
  { id: 'overview', number: 'I', title: 'Översikt' },
  { id: 'moat', number: 'II', title: 'Strategisk Moat' },
  { id: 'financials', number: 'III', title: 'Finansiell Analys' },
  { id: 'valuation', number: 'IV', title: 'Värdering' },
  { id: 'growth', number: 'V', title: 'Tillväxtmotorer' },
  { id: 'risk', number: 'VI', title: 'Riskprofil' },
  { id: 'esg', number: 'VII', title: 'ESG & Makro' },
  { id: 'ai-obs', number: 'VIII', title: 'AI-observationer' },
  { id: 'verdict', number: 'IX', title: 'Investeringsbeslut' },
  { id: 'scenarios', number: 'X', title: 'Scenarier' },
];

const swotData = {
  strengths: [
    'CUDA-ekosystem: 20+ år av mjukvara skapar tech-branschens starkaste moat.',
    '73,6% bruttomarginal (Non-GAAP Q3 FY26) med mål på 75%.',
    'ROE >100%, ROIC >90% — extrem kapitaleffektivitet.',
    'Data Center dominans: ~90% av omsättningen, de facto monopol.',
    'Blackwell-arkitekturens snabba ramp, kannibaliserar sig själv kontrollerat.',
    'Rekordfritt kassaflöde på $22B i Q3 FY26.',
  ],
  weaknesses: [
    'Kina-exponering: H20-exportkontroller skapar strukturell risk.',
    'Hög kundkoncentration: ~50% av DC-intäkter från ett fåtal hyperscalers.',
    'Bruttomarginal under press vid komplexa systemövergångar (Hopper → Blackwell).',
    'Fabless-modell = 100% sårbarhet mot TSMC-störningar i Taiwan.',
    'Insynsägande svagt sjunkande (4,01% → 3,79%).',
  ],
  opportunities: [
    'Agentic AI: Ny massiv inferens-driven efterfrågecykel.',
    'Automotive & Robotics: Nya mångåriga tillväxtmotorer.',
    'Sovereign AI: Nationella stater bygger egen AI-infrastruktur.',
    'DGX Spark (desktop AI) öppnar en helt ny marknad.',
    'Kommande arkitekturer (Blackwell Ultra, Rubin) säkrar roadmap.',
    'Ethernet for AI: Möjlighet att ta över nätverksmarknaden.',
  ],
  threats: [
    'US exportkontroller: Eskaleringsrisk till nya produkter/regioner.',
    'Konkurrens: AMD (MI300X), Intel (Gaudi) och Custom ASIC (Google TPU, Amazon Trainium).',
    'Kina inhemsk konkurrens (Huawei Ascend).',
    'TSMC supply-chain sårbarhet p.g.a. geopolitisk risk i Taiwan.',
    'Regulatoriska antitrust-risker från EU och USA.',
    'En kraftig avmattning i AI-investeringar hos CSPs.',
  ],
};

const scenarios: Scenario[] = [
  {
    type: 'bull',
    probability: '25%',
    price: '$320',
    change: '+76%',
    assumptions: 'Agentic AI-inferenscykel exploderar, sovereign AI accelererar, exportkontroller lättas.',
    requires: 'EPS 2027e når $12-14 och marknaden tillämpar en P/E-multipel på 28-30x.',
  },
  {
    type: 'base',
    probability: '55%',
    price: '$230',
    change: '+26%',
    assumptions: 'Stabil Blackwell-ramp enligt guidance, Q4 FY26-mål nås, inga nya exportkontroll-eskaleringar.',
    requires: 'EPS 2026e når $8,24 och en P/E-multipel på 24-26x appliceras.',
  },
  {
    type: 'bear',
    probability: '20%',
    price: '$120',
    change: '-34%',
    assumptions: 'Eskalerade exportkontroller, CSP-investeringspaus, AMD/Custom ASIC tar >10% marknadsandel.',
    requires: 'EPS 2026e faller till $6–7 och P/E-multipeln komprimeras till 18-20x.',
  },
];

export default function NvidiaAnalysisPage() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 4,
      tillvaxtutsikter: 5,
      riskprofil: 3,
      esgMakro: 3,
      aiObservationer: 5,
    };
    const totaltPoang = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;

    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="NVIDIA"
      subtitle="Aktieanalys · FY2026"
      date="3 mars 2026"
      dataSources="Data: FY2024–FY2027e, CFO Commentaries Q1-Q3 FY2026"
      sections={sections}
      accentColor={ACCENT}
      theme="dark"
    >
      {/* Header */}
      <div className="bg-[#0f0f0f] text-[#faf8f3] px-6 sm:px-12 py-10">
        <div className="text-[10px] tracking-[.15em] text-[#76B900] uppercase mb-1">AKTIEANALYS</div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">NVIDIA Corporation</h1>
            <div className="text-sm text-[#a0a090] mt-1">NASDAQ: NVDA · S&P 500</div>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl font-bold text-[#76B900]">$182</div>
            <div className="text-[11px] text-[#a0a090]">3 mars 2026</div>
            <span className="inline-block mt-1.5 bg-[#1a4a1a] text-[#80d080] text-[11px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide">
              ▲ KÖP
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Börsvärde', value: '$4,43T' },
            { label: 'P/E (2026e)', value: '~22x' },
            { label: 'EPS-tillväxt', value: '+66% YoY' },
            { label: 'Nettomarginal', value: '55,6%' },
            { label: 'Riktkurs', value: '$230' },
          ].map((kpi) => (
            <div key={kpi.label} className="border-l-2 border-[#76B900] pl-2.5">
              <div className="text-[9px] text-[#808070] uppercase tracking-wide">{kpi.label}</div>
              <div className="font-serif text-base font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 pb-20 bg-[#0f0f0f] text-[#faf8f3]">
        {/* I. Overview */}
        <div data-section="overview" id="overview" className="pt-14">
          <SectionHeader number="I" title="Översikt" accentColor={ACCENT} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
            <MetricCard label="Börsvärde" value="$4,43T" />
            <MetricCard label="P/E (2026e)" value="~22x" />
            <MetricCard label="EPS-tillväxt" value="+66%" />
            <MetricCard label="Nettomarginal" value="55,6%" />
            <MetricCard label="ROE" value="101%" />
          </div>

          <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#76B900]">Affärsidé & Modell</h3>
          <p className="text-sm leading-relaxed text-[#b0b0b0] mb-4">
            NVIDIA designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA) och nätverkslösningar (NVLink, InfiniBand) för datacenters, gaming och autonoma fordon. Intäktsmodellen bygger på tre ben: (1) Hårdvaruförsäljning (system som HGX, DGX, GB200), (2) Mjukvaruplattformen CUDA som skapar en extremt stark inlåsningseffekt, och (3) Tjänster via DGX Cloud. Fabless-modellen, där tillverkning outsourcas till TSMC, ger extremt hög kapitaleffektivitet (ROIC &gt;90%).
          </p>

          <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#76B900]">Ledning & Ägarstruktur</h3>
          <p className="text-sm leading-relaxed text-[#b0b0b0] mb-2">
            <strong>Jensen Huang (VD & Medgrundare):</strong> Grundade NVIDIA 1993. En av tech-branschens mest framgångsrika visionärer. Hans beslut att satsa på CUDA (2006) och AI-acceleratorer (2012+) är fundamentet till dagens dominans. Insynsägandet ligger på 3,79%.
          </p>
          <p className="text-sm leading-relaxed text-[#b0b0b0] mb-4">
            <strong>Colette Kress (CFO):</strong> Erfaren teknisk CFO med gedigen track record inom finansiell kommunikation och kapitalallokering.
          </p>
          <RatingBox rating={5}><strong>5/5</strong> — Affärsmodellen är exceptionellt uthållig tack vare CUDA-ekosystemets inlåsning, fabless-modellens kapitaleffektivitet och Jensens visionära ledarskap, som är branschens starkaste.</RatingBox>
        </div>

        {/* II. Moat */}
        <div data-section="moat" id="moat" className="pt-14">
          <SectionHeader number="II" title="Strategisk Moat" accentColor={ACCENT} />
          <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#76B900]">Konkurrensfördelar</h3>
           <ul className="text-sm text-[#b0b0b0] space-y-2 mb-4 list-disc list-inside">
              <li><strong>CUDA-ekosystem:</strong> 20+ år av programvara, bibliotek och verktyg. Miljontals tränade ingenjörer. Närmast omöjligt att replikera på kort sikt.</li>
              <li><strong>Full-stack-strategi:</strong> Chip (Blackwell) + Interconnect (NVLink/InfiniBand) + System (DGX/HGX) + Mjukvara (CUDA) + Moln (DGX Cloud). Konkurrenter levererar delar, NVIDIA levererar hela stacken.</li>
              <li><strong>Nätverkseffekter:</strong> Fler modeller tränas på CUDA → fler verktyg utvecklas → fler ingenjörer lär sig plattformen → fler kunder väljer NVIDIA. En självförstärkande loop.</li>
              <li><strong>Supply-chain fördel:</strong> Exklusiva och prioriterade kapacitetsavtal hos TSMC.</li>
              <li><strong>Arkitekturöverlägsenhet:</strong> Blackwell-plattformen tar marknadsandelar från Hopper — NVIDIA kannibaliserar sig självt kontrollerat för att ligga steget före.</li>
          </ul>
          <SwotGrid data={swotData} title="SWOT-Analys" accentColor={ACCENT} />
          <RatingBox rating={5}><strong>5/5</strong> — NVIDIA:s moat är branschens starkaste. CUDA-ekosystemet, full-stack-strategin och nätverkseffekterna skapar en konkurrensvallgrav som är extremt svår att forcera. Geopolitiska risker är den primära osäkerheten.</RatingBox>
        </div>

        {/* III. Financials */}
        <div data-section="financials" id="financials" className="pt-14">
          <SectionHeader number="III" title="Finansiell Analys" accentColor={ACCENT} />
           <FinancialTable
            title="Resultaträkning (MUSD)"
            columns={[{ key: 'metric', header: 'Nyckeltal' }, { key: 'fy2024', header: 'FY2024' }, { key: 'fy2025', header: 'FY2025' }, { key: 'yoy', header: 'YoY' }]}
            rows={[
              { cells: { metric: { value: 'Omsättning' }, fy2024: { value: '130 497' }, fy2025: { value: '215 938' }, yoy: { value: '+65,5%', color: 'green' } } },
              { cells: { metric: { value: 'Bruttoresultat' }, fy2024: { value: '97 858' }, fy2025: { value: '153 463' }, yoy: { value: '+56,8%', color: 'green' } } },
              { cells: { metric: { value: 'EBIT' }, fy2024: { value: '81 453' }, fy2025: { value: '130 387' }, yoy: { value: '+60,1%', color: 'green' } } },
              { cells: { metric: { value: 'Nettoresultat' }, fy2024: { value: '72 880' }, fy2025: { value: '120 067' }, yoy: { value: '+64,7%', color: 'green' } } },
              { cells: { metric: { value: 'EPS (utspädd)' }, fy2024: { value: '$2,96' }, fy2025: { value: '$4,92' }, yoy: { value: '+66,2%', color: 'green' } } },
            ]}
            theme='dark'
          />
          <AlertBox type="warning" accentColor={ACCENT} theme='dark'>
            <strong>Marginalpress:</strong> Bruttomarginalen sjönk från 75% (FY24) till 71% (FY25) p.g.a. den komplexa systemövergången till Blackwell. Dock visar Q3 FY26 en återhämtning till 73,6%, med en guidning mot 75% för Q4.
          </AlertBox>
           <FinancialTable
            title="Nyckeltal & Balansräkning"
            columns={[{ key: 'metric', header: 'Nyckeltal' }, { key: 'fy2024', header: 'FY2024' }, { key: 'fy2025', header: 'FY2025' }, { key: 'q3fy26', header: 'Q3 FY26' }]}
            rows={[
              { cells: { metric: { value: 'ROE' }, fy2024: { value: '119%' }, fy2025: { value: '101%', color: 'amber' }, q3fy26: { value: '-' } } },
              { cells: { metric: { value: 'ROIC' }, fy2024: { value: '103%' }, fy2025: { value: '93,6%', color: 'amber' }, q3fy26: { value: '-' } } },
              { cells: { metric: { value: 'Nettokassa (MUSD)' }, fy2024: { value: '-' }, fy2025: { value: '-' }, q3fy26: { value: '60 600', color: 'green' } } },
              { cells: { metric: { value: 'Fritt Kassaflöde (MUSD)' }, fy2024: { value: '-' }, fy2025: { value: '-' }, q3fy26: { value: '22 000', color: 'green' } } },
              { cells: { metric: { value: 'Goodwill (MUSD)' }, fy2024: { value: '5 200' }, fy2025: { value: '20 800', color: 'amber' }, q3fy26: { value: '-' } } },
            ]}
            theme='dark'
          />
          <RatingBox rating={5}><strong>5/5</strong> — Den finansiella profilen är enastående: 55%+ nettomarginal, massiv kassageneration, stark nettokassa och ROE &gt;100%. Accelererande Capex och en tillfällig marginalpress är de enda punkterna att bevaka.</RatingBox>
        </div>

        {/* IV. Valuation */}
        <div data-section="valuation" id="valuation" className="pt-14">
          <SectionHeader number="IV" title="Värdering" accentColor={ACCENT} />
           <FinancialTable
            title="Värderingsmultiplar"
            columns={[{ key: 'metric', header: 'Multipel' }, { key: 'fy2025', header: 'FY2025' }, { key: 'current', header: 'Nuv.' }, { key: 'e2026', header: '2026e' }, { key: 'e2027', header: '2027e' }]}
            rows={[
              { cells: { metric: { value: 'P/E' }, fy2025: { value: '38,3x' }, current: { value: '37,0x' }, e2026: { value: '22,1x', color: 'green' }, e2027: { value: '16,8x', color: 'green' } } },
              { cells: { metric: { value: 'EV/EBIT' }, fy2025: { value: '34,9x' }, current: { value: '34,8x' }, e2026: { value: '-' }, e2027: { value: '-' } } },
              { cells: { metric: { value: 'P/S' }, fy2025: { value: '21,3x' }, current: { value: '20,7x' }, e2026: { value: '-' }, e2027: { value: '-' } } },
            ]}
            theme='dark'
          />
          <p className="text-sm leading-relaxed text-[#b0b0b0] mt-3 mb-4">
            NVIDIAs PEG-tal (P/E / EPS-tillväxt) är en nyckelindikator. Med ett P/E på 22x för 2026e och en EPS-tillväxt på +67% blir PEG-talet <strong>~0.33</strong>, vilket är extremt attraktivt och indikerar att aktien kan vara undervärderad trots den höga absoluta multipeln, om tillväxten håller i sig.
          </p>
          <AlertBox type="info" accentColor={ACCENT} theme='dark'>
            <strong>Värderingslogik:</strong> Värderingen är hög på absoluta tal men motiveras av den extrema tillväxten och kvaliteten. Ett P/E på 22x för 2026 är attraktivt. Aktien är inte 'billig' – man betalar ett premiumpris för ett exceptionellt bolag.
          </AlertBox>
          <RatingBox rating={4}><strong>4/5</strong> — Värderingen är hög men rättfärdigas av enastående tillväxt och kvalitet. Ett framåtblickande P/E på ~22x (2026e) och ett PEG-tal under 0.5 är mycket attraktivt.</RatingBox>
        </div>

        {/* V. Growth */}
        <div data-section="growth" id="growth" className="pt-14">
          <SectionHeader number="V" title="Tillväxtmotorer" accentColor={ACCENT} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <MetricCard label="Data Center (Q3 FY26)" value="$51,2B" trend="+66% YoY" />
            <MetricCard label="Networking (Q3 FY26)" value="$8,2B" trend="+162% YoY" />
            <MetricCard label="Automotive (Q1 FY26)" value="+72% YoY" trend="Ny tillväxtmotor" />
          </div>
          <p className="text-sm leading-relaxed text-[#b0b0b0] mb-4">
            Tillväxten drivs av en sekulär supercykel inom AI-infrastruktur. Tre parallella plattformsskiften driver efterfrågan: (1) accelererad beräkning, (2) kraftfulla AI-modeller (LLMs), och (3) framväxten av agentiska applikationer. Hyperscalers (Microsoft, Google, Amazon, Meta) och nu även nationella stater ('Sovereign AI') investerar hundratals miljarder dollar i datacenterkapacitet, där NVIDIA är den primära leverantören.
          </p>
          <RatingBox rating={5}><strong>5/5</strong> — NVIDIA befinner sig i epicentrum av den största teknikomställningen på decennier. Utsikterna för fortsatt tvåsiffrig tillväxt under flera år är mycket starka.</RatingBox>
        </div>
        
        {/* Other sections... */}

        <div data-section="verdict" id="verdict" className="pt-14">
          <SectionHeader number="IX" title="Sammanfattning & Investeringsbeslut" accentColor={ACCENT} />

          <div className="bg-[#1a1a1a] rounded p-5 mb-5">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div className="text-[10px] text-[#76B900] tracking-widest uppercase mb-1">Investeringsrekommendation</div>
                <div className="font-serif text-4xl font-bold text-[#76B900]">▲ KÖP</div>
                <div className="text-sm text-[#a0a090] mt-1">Med 24–36 månaders horisont</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#76B900] tracking-widest uppercase">Målpris (Base)</div>
                <div className="font-serif text-4xl font-bold">$230</div>
                <div className="text-xs text-[#80d080]">+26% potential från $182</div>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-widest mt-6 mb-3 pl-2 border-l-[3px] border-[#76B900]">Samlade scores & Poängdiagram</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-5">
            <div>
              <RadarChart scores={analysisData.scores} isDarkMode={true} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-[#333]">
                <span className="text-sm font-bold">Total poäng:</span>
                <span className="text-xl font-bold font-serif text-[#76B900]">{analysisData.totaltPoang} / {analysisData.maxPoang}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#333] mb-3">
                <span className="text-sm font-bold">Viktat betyg:</span>
                <span className="text-xl font-bold font-serif text-[#76B900]">{analysisData.rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="pt-2 space-y-1">
                {Object.entries(analysisData.scores).map(([key, value]) => {
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-[#999] w-32 flex-shrink-0">{label}</span>
                      <div className="flex-grow bg-[#333] rounded h-2.5 overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${(value / 5) * 100}%`, backgroundColor: ACCENT }} />
                      </div>
                      <span className="text-xs font-bold text-[#76B900] font-serif w-8 text-right">{value}/5</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#76B900]">Motivering</h3>
          <p className="text-sm leading-relaxed text-[#b0b0b0] mb-3">
            NVIDIA är ett av de starkaste kvalitetsbolagen på marknaden. AI-supercykeln, CUDA-ekosystemets oövervinnerliga vallgrav och Blackwell-arkitekturens dominans skapar en sällsynt kombination av extremt hög tillväxt och exceptionell lönsamhet. Den primära risken är geopolitisk och relaterad till exportkontroller, men denna risk är nu delvis känd och prissatt av marknaden. Värderingen är hög, men det attraktiva PEG-talet (ca 0.33) signalerar att aktien är rimligt prissatt givet den explosiva vinsttillväxten.
          </p>
          <AlertBox type="signal" accentColor={ACCENT} theme='dark'>
            <strong>Slutsats: KÖP.</strong> NVIDIA är ett generationsbolag som leder en teknisk revolution. Bolaget uppfyller alla kriterier för ett långsiktigt kärninnehav. Potentialen för en flerdubbling av vinsten under de kommande åren gör dagens värdering attraktiv för en investerare med en horisont på 2-3 år eller längre.
          </AlertBox>
        </div>

        {/* X. Scenarios */}
        <div data-section="scenarios" id="scenarios" className="pt-14">
          <SectionHeader number="X" title="Scenarier" accentColor={ACCENT} />
          <ScenarioCards scenarios={scenarios} isDarkMode={true} />
        </div>

      </div>
    </AnalysisLayout>
  );
}
