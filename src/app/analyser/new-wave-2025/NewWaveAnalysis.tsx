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

const ACCENT = "#1a5276";

const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",   title: "Översikt" },
  { id: "moat",       number: "II",  title: "Strategisk Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation",  number: "IV",  title: "Värdering" },
  { id: "growth",     number: "V",   title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",  title: "Riskprofil" },
  { id: "segments",   number: "VII", title: "Segmentanalys" },
  { id: "esg",        number: "VIII", title: "ESG & Ägarstruktur" },
  { id: "verdict",    number: "IX",  title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",   title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Diversifierad varumärkesportfölj — Cutter & Buck, Craft, Clique, Jobman, Toppoint minskar enskild varumärkesrisk",
    "Stark ställning inom profilkläder och workwear — konjunkturstabila segment med återkommande B2B-kunder",
    "Ägarlett bolag (Torsten Jansson) med långsiktig strategi och insiderägande",
    "Internationell expansion via förvärv och organisk tillväxt i Europa och Nordamerika",
    "Låg direktavkastning men historik av stigande utdelningar och aktieåterköp",
  ],
  weaknesses: [
    "Fragmenterad portfölj försvårar synergier och varumärkesbyggande",
    "Lägre marginaler än premiumvarumärken — konkurrens från fast fashion pressar prissättning",
    "Exponering mot detaljhandeln som strukturellt krymper i Europa",
    "Valutaexponering: stor del av försäljning i EUR/USD mot SEK-rapportering",
    "Relativt okänt för internationella investerare — liten global institutionell ägarbas",
  ],
  opportunities: [
    "Profilreklam: företag ökar investeringar i varumärkeskläder efter pandemins hemarbetsvåg",
    "Sportswear-trend: Craft gynnas av ökad hälsomedvetenhet och löpning/triathlon",
    "Nordamerika: Cutter & Buck har stark position i golf- och businesskasual-segmentet",
    "Förvärv: fragmenterad marknad med möjligheter att konsolidera nischvarumärken",
    "E-handel: direkt-till-konsument-kanalen växer och förbättrar marginaler",
  ],
  threats: [
    "Konjunkturens påverkan på B2B-reklambudgetar — profilkläder skärs ofta först",
    "H&M, Zara och digital fast fashion utmanar workwear-segmentets prisnivåer",
    "Råvarupriser (bomull, polyester) påverkar kostnadssidan vid snabb prisuppgång",
    "Konkurrens om förvärv från private equity och internationella strategiska aktörer",
    "Stigande logistik- och fraktkostnader i ett globalt distributionsnätverk",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "SEK 220",
    change: "+35%",
    assumptions:
      "Craft och Cutter & Buck tar marknadsandel, förvärv skapar synergier, marginalerna förbättras mot 9-10%.",
    requires: "Omsättningstillväxt 8-10% och P/E-expansion mot 18-20x.",
  },
  {
    type: "base",
    probability: "50%",
    price: "SEK 165",
    change: "+1%",
    assumptions:
      "Stabil tillväxt 4-6%, marginaler 7-8%, utdelning höjs måttligt. Värdering kvarstår kring historiska nivåer.",
    requires: "Stabilitet i europeisk profilmarknad och Cutter & Buck bibehåller US-position.",
  },
  {
    type: "bear",
    probability: "25%",
    price: "SEK 100",
    change: "-39%",
    assumptions:
      "Recession pressar B2B-reklambudgetar, råvarupriser stiger och marginaler faller under 5%.",
    requires: "Omsättningstapp 5-8% och multipel-kontraktion.",
  },
];

const financialRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning (mdr SEK)" }, FY2022: { value: "7,8" }, FY2023: { value: "8,5" }, FY2024e: { value: "~9,0" } } },
  { cells: { metric: { value: "Tillväxt (%)" }, FY2022: { value: "+18%" }, FY2023: { value: "+9%", color: "green" }, FY2024e: { value: "+5-6%" } } },
  { cells: { metric: { value: "Rörelsemarginal (%)" }, FY2022: { value: "7,5%" }, FY2023: { value: "7,8%", color: "green" }, FY2024e: { value: "~7-8%" } } },
  { cells: { metric: { value: "Nettoresultat (mdr SEK)" }, FY2022: { value: "0,47" }, FY2023: { value: "0,55" }, FY2024e: { value: "~0,6" } } },
  { cells: { metric: { value: "EPS (SEK)" }, FY2022: { value: "9,2" }, FY2023: { value: "10,7" }, FY2024e: { value: "~11-12" } } },
  { cells: { metric: { value: "Soliditet (%)" }, FY2022: { value: "~48%" }, FY2023: { value: "~50%", color: "green" }, FY2024e: { value: "~50%" } } },
];

export default function NewWaveAnalysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 3,
      strategiskMoat: 3,
      finansiellKvalitet: 3,
      vardering: 3,
      tillvaxtutsikter: 3,
      riskprofil: 3,
      aiObservationer: 3,
      esgMakro: 3,
    };
    const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;
    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="New Wave Group"
      subtitle="Nasdaq Stockholm · NEWA-B"
      date="28 september 2025"
      dataSources="Halvårsrapport H1 2025, årsredovisning 2024, bolagets egna rapporter"
      sections={sections}
      accentColor={ACCENT}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (sep 2025)" value="SEK 163" />
            <MetricCard label="P/E (forward)" value="~14x" />
            <MetricCard label="Omsättning (2024e)" value="~9 mdr SEK" />
            <MetricCard label="Direktavkastning" value="~2,5%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            New Wave Group är ett av de minst omskrivna men mest konsekventa tillväxtbolagen på Stockholmsbörsen. Torsten Jansson grundade bolaget 1990 med idén att sälja profilkläder till företag och organisationer. Sedan dess har portföljen vuxit till att inkludera internationella sportswear-varumärken som Craft och Cutter & Buck, workwear-märken som Jobman, samt presentreklam och detaljhandel.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Omsättningen har mer än tiodubblats sedan millennieskiftet. Affärsmodellen bygger på förvärv, organisk tillväxt och varumärkeskonsolidering — snarare än innovation och teknologisk förändring. Det gör bolaget stabilt men ger begränsat utrymme för multipelexpansion.
          </p>
          <AlertBox type="info">
            New Wave är ett typiskt kvalitetsbolag för tålmodiga investerare. Låg glamour, stabila kassaflöden och ett kontrollerat ägarled. Värderingen är rimlig men inte uppenbart billig.
          </AlertBox>
        </section>

        {/* II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            New Waves moat är begränsad men verklig. I profilreklam-segmentet har bolaget starka kundrelationer, bred produktkatalog och effektiv distribution som är svår att replikera snabbt. Cutter & Buck har ett erkänt varumärke i det nordamerikanska business-casual och golfsegmentet med lojal kundkrets i förmögnare demografier.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Moaten är dock inte djup — det finns få strukturella hinder för en välkapitaliserad konkurrent att bygga liknande förmågor. Styrkan ligger snarare i exekveringen och Janssons operativa fokus på lönsamhet framför topplinje-tillväxt.
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
              { key: "FY2024e", header: "FY2024e" },
            ]}
            rows={financialRows}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            Finanserna är solida om ej spektakulära. Soliditet kring 50%, växande omsättning och stabila marginaler vittnar om ett välskött bolag. Skuldsättningen är hanterbar och fritt kassaflöde täcker utdelning med marginal.
          </p>
        </section>

        {/* IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="P/E (forward)" value="~14x" />
            <MetricCard label="EV/EBIT" value="~10x" />
            <MetricCard label="P/S" value="~0,9x" />
            <MetricCard label="Direktavkastning" value="~2,5%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            På 14x forward P/E och EV/EBIT kring 10x är New Wave rimligt värderat för ett stabilt konsumentvarubolag utan hög tillväxt. Det är inte billigt nog för ett entydigt köp men heller inte dyrt. För en investerare som söker ett stabilt, ägarstyrt bolag med hederlig värdering är det en rimlig ingångspunkt.
          </p>
        </section>

        {/* V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a5276] pl-4">
              <h3 className="text-sm font-bold text-[#1a5276] mb-1">Cutter & Buck — nordamerikansk premiumtillväxt</h3>
              <p className="text-sm text-[#2a2a2a]">Det nordamerikanska varumärket med fokus på business-casual och golf har bäst tillväxtpotential. Demografisk medvind från välbärgade konsumenter.</p>
            </div>
            <div className="border-l-4 border-[#2471a3] pl-4">
              <h3 className="text-sm font-bold text-[#2471a3] mb-1">Craft Sportswear — löpning och triathlon</h3>
              <p className="text-sm text-[#2a2a2a]">Skandinavisk tekniksportswear med stark position i Nordic och växande exponering mot USA och mellaneuropa via trail running-trenden.</p>
            </div>
            <div className="border-l-4 border-[#5dade2] pl-4">
              <h3 className="text-sm font-bold text-[#5dade2] mb-1">Profilreklam — konjunkturstabil återkommande intäkt</h3>
              <p className="text-sm text-[#2a2a2a]">Företag köper profilkläder löpande. Segment med höga kundrelationsbarriärer och stabila återköpsfrekvenser.</p>
            </div>
          </div>
        </section>

        {/* VI */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />
        </section>

        {/* VII */}
        <section id="segments" data-section="segments" className="mb-16">
          <SectionHeader number="VII" title="Segmentanalys" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#eaf2f8] border border-[#aed6f1] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a5276] uppercase tracking-widest mb-2">Sportswear & Leisure (~40%)</h3>
              <p className="text-sm text-[#2a2a2a]">Craft och Cutter & Buck. Hög varumärkeskännedom, direkt-till-konsument via webshop och återförsäljare. Bäst tillväxtpotential.</p>
            </div>
            <div className="bg-[#eaf2f8] border border-[#aed6f1] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a5276] uppercase tracking-widest mb-2">Workwear & Accessories (~35%)</h3>
              <p className="text-sm text-[#2a2a2a]">Jobman, Clique m.fl. Stabil B2B-marknad för yrkeskläder och profilprodukter. Lägre tillväxt men god lönsamhet.</p>
            </div>
            <div className="bg-[#eaf2f8] border border-[#aed6f1] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a5276] uppercase tracking-widest mb-2">Gifts & Home Interior (~25%)</h3>
              <p className="text-sm text-[#2a2a2a]">Presentreklam och heminredning. Mer konjunkturkänsligt. Volymdriven affär med lägre marginaler.</p>
            </div>
          </div>
        </section>

        {/* VIII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VIII" title="ESG & Ägarstruktur" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Torsten Jansson kontrollerar bolaget via röstmajoritet. Det ger en enhetlig long-term vision men begränsar minoritetsägarnas inflytande. ESG-arbetet fokuserar på hållbara material och ansvarsfull leverantörskedja — ett krav givet textilbranschens historiska utmaningar.
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
                <span className="text-xl font-bold font-serif text-[#1a5276]">{analysisData.totaltPoang} / {analysisData.maxPoang}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
                <span className="text-sm font-bold">Viktat betyg:</span>
                <span className="text-xl font-bold font-serif text-[#1a5276]">{analysisData.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            New Wave Group är ett välskött, ägarstyrt bolag med diversifierad varumärkesportfölj och rimlig värdering. Det är inte ett case med explosiv tillväxtpotential, utan ett stabilt bolag för investerare som söker exponering mot konsumentvaror och profilreklam till ett rimligt pris.
          </p>
          <AlertBox type="signal">
            <strong>BEVAKA — ingen tydlig trigger identifierad.</strong> Värderingen motiverar inte ett aktivt köp just nu, men bolaget är välskött och värd att ha på bevakningslistan vid en eventuell kursnedgång mot 130-140 SEK.
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
