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

const ACCENT = "#003087";

const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",   title: "Översikt" },
  { id: "moat",       number: "II",  title: "Strategisk Moat" },
  { id: "financials", number: "III", title: "Finansiell analys" },
  { id: "valuation",  number: "IV",  title: "Värdering" },
  { id: "growth",     number: "V",   title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",  title: "Riskprofil" },
  { id: "segments",   number: "VII", title: "Segmentanalys" },
  { id: "esg",        number: "VIII", title: "ESG & Elektifiering" },
  { id: "verdict",    number: "IX",  title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",   title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Marknadsledande premiumposition i Europa för tunga lastbilar",
    "Stark serviceaffär (~30% av omsättning) med stabil och konjunkturstabil intäktsström",
    "Nettokassa >80 mdr SEK (H1 2025) — exceptionell finansiell styrka",
    "Volvo Penta som stabil kassaflödesgenerator med höga marginaler",
    "Coretura-JV med Daimler Truck delar mjukvarukostnader och stärker konkurrenskraft",
  ],
  weaknesses: [
    "Cyklisk lastbilsmarknad — Nordamerika i nedgångsfas under H1 2025",
    "Höga rörliga kostnader med fabrikskapacitet anpassad för toppnivåer",
    "Marginalerna pressas vid volymnedgång pga. operativ hävstång",
    "Valutaexponering: USD/SEK- och EUR/SEK-rörelsen påverkar lönsamheten",
    "Elfordonssatsning kräver stora investeringar och långsam avkastning",
  ],
  opportunities: [
    "Cyklisk vändning: H2 2025 och 2026 förväntas bli bättre för Nordamerika",
    "Serviceaffären och Volvo Connect ökar digitala intäktsströmmar",
    "Elektrifiering: Volvo är tidigt ute med kommersiella el-lastbilar i Europa",
    "Swecon-förvärvet förväntas slutföras och stärker den europeiska servicekedjan",
    "Infrastrukturinvesteringar i Europa driver maskinefterfrågan (Construction Equipment)",
  ],
  threats: [
    "Fördjupad konjunkturnedgång i Nordamerika under 2025",
    "Kinesiska lastbilstillverkare (Sinotruk, FAW) expanderar på europeiska marknader",
    "Elektrifieringskostnader skadar marginalerna under övergångsperioden",
    "Geopolitiska spänningar och handelstariffer påverkar globala transportflöden",
    "Råvarupriser (stål, aluminium) vid kraftig uppgång pressar kostnadssidan",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "SEK 380",
    change: "+18%",
    assumptions:
      "Nordamerika återhämtar sig snabbt i H2 2025, marginaler återgår mot 12%, stark utdelning.",
    requires: "Positiv orderingångsutveckling Q3 2025 och stabila råvarupriser.",
  },
  {
    type: "base",
    probability: "50%",
    price: "SEK 310",
    change: "-4%",
    assumptions:
      "Gradvis återhämtning 2025-2026, marginaler 9-10%, nettokassa håller >70 mdr SEK.",
    requires: "Nordamerika bottnar H2 2025 och serviceaffären håller tillväxten.",
  },
  {
    type: "bear",
    probability: "25%",
    price: "SEK 220",
    change: "-32%",
    assumptions:
      "Global recession fördjupar nedgångscykeln, Nordamerika förblir svagt in i 2026.",
    requires: "Orderingång faller ytterligare och marginaler komprimeras mot 7-8%.",
  },
];

const financialRows: TableRow[] = [
  { cells: { metric: { value: "Nettoomsättning (mdr SEK)" }, FY2023: { value: "553" }, FY2024: { value: "572" }, H1_2025: { value: "247 (H1)" } } },
  { cells: { metric: { value: "Tillväxt (%)" }, FY2023: { value: "+22%" }, FY2024: { value: "+3%" }, H1_2025: { value: "-10% (YoY)", color: "red", arrow: "down" } } },
  { cells: { metric: { value: "Justerad rörelsemarginal (%)" }, FY2023: { value: "13,5%" }, FY2024: { value: "12,7%", color: "green" }, H1_2025: { value: "~10% (H1)", color: "amber" } } },
  { cells: { metric: { value: "Nettokassa industri (mdr SEK)" }, FY2023: { value: "87" }, FY2024: { value: "86" }, H1_2025: { value: "~80 (H1)" } } },
  { cells: { metric: { value: "EPS (SEK)" }, FY2023: { value: "21,0" }, FY2024: { value: "22,5" }, H1_2025: { value: "~9 (H1)" } } },
  { cells: { metric: { value: "Utdelning (SEK)" }, FY2023: { value: "8,00" }, FY2024: { value: "9,00" }, H1_2025: { value: "~13 totalt (FY2025e)" } } },
];

export default function VolvoQ2Analysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 4,
      strategiskMoat: 4,
      finansiellKvalitet: 4,
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
      companyName="AB Volvo"
      subtitle="Nasdaq Stockholm · VOLV-B · H1 2025-data"
      date="7 oktober 2025"
      dataSources="H1 2025 rapport, Q2 2025 kvartalsrapport, årsredovisning 2024"
      sections={sections}
      accentColor={ACCENT}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (okt 2025)" value="SEK 323" />
            <MetricCard label="P/E (forward)" value="~11x" />
            <MetricCard label="Nettokassa (H1)" value="~80 mdr SEK" />
            <MetricCard label="Direktavkastning" value="~4%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            AB Volvo befinner sig i en cyklisk nedgångsfas drivet av svag nordamerikansk lastbilsmarknad. H1 2025 visade omsättning ned ~10% mot föregående år och komprimerade marginaler från de rekordhöga nivåerna 2023-2024. Cykliska nedgångar är normala för industribolag av Volvos kaliber — frågan är djupet och varaktigheten.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Balansräkningen förblir exceptionell med nettokassa kring 80 mdr SEK. Serviceaffären fortsätter växa och visar konjunkturstabilitet. Utdelningspolitiken är generös och Volvos aktieägare kompenseras väl under väntetiden till nästa uppgångscykel.
          </p>
          <AlertBox type="info">
            OBS: Denna analys baseras på H1 2025-data. Se vår uppdaterade FY2025-analys för senaste bedömning av Volvo BEVAKA-rekommendation och riktkurs 345 kr.
          </AlertBox>
        </section>

        {/* II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Volvos moat bygger på varumärkesstyrka i lastbilssegmentet, global serviceinfrastruktur och kundrelationer byggda under decennier. En åkerichef väljer inte lastbilsleverantör bara baserat på inköpspris — servicekapacitet, tillförlitlighet och totalkostnad per kilometer är avgörande. Volvo är ledande i dessa dimensioner.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Coretura-JV med Daimler Truck är en smart kostnadsdelning för mjukvaruplattformar, vilket frigör resurser till differentiering. Det bevisar att Volvo kan samarbeta strategiskt utan att kompromissa med kärnkompetensen.
          </p>
        </section>

        {/* III */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric",  header: "Nyckeltal" },
              { key: "FY2023",  header: "FY2023" },
              { key: "FY2024",  header: "FY2024" },
              { key: "H1_2025", header: "H1 2025" },
            ]}
            rows={financialRows}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            H1 2025 bekräftade en cyklisk nedgång. Marginalkompressionen är tydlig men balansräkningen förblir exceptionell. Nettokassan på 80 mdr SEK ger en komfortabel kudde och möjliggör generösa kapitalåterbäringar även i sämre tider.
          </p>
        </section>

        {/* IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="P/E (forward)" value="~11x" />
            <MetricCard label="EV/EBIT" value="~8x" />
            <MetricCard label="Direktavkastning" value="~4%" />
            <MetricCard label="P/B" value="~2,5x" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            På 11x forward P/E är Volvo värderat i linje med historiska nedgångscykelvärderingar. Aktien reflekterar en rimlig kompensation för cyklisk risk. Investeringstesen är att en återhämtning 2026 lyfter EPS mot 20-22 SEK, vilket vid 12-13x ger ett riktkurs kring 260-290 SEK — ett begränsat upside vid riktig återhämtning.
          </p>
          <AlertBox type="info">
            Premium-värderingen vs. historiska cykeln reflekterar Volvos starka nettokassa och premiumpositionering. En djupare cykelnedgång kan komprimera multiplarna ytterligare.
          </AlertBox>
        </section>

        {/* V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#003087] pl-4">
              <h3 className="text-sm font-bold text-[#003087] mb-1">Cyklisk återhämtning H2 2025–2026</h3>
              <p className="text-sm text-[#2a2a2a]">Nordamerikansk lastbilsmarknad förväntas bottna H2 2025. Historiskt har återhämtningscykler drivit stark marginalexpansion pga. operativ hävstång.</p>
            </div>
            <div className="border-l-4 border-[#0057a8] pl-4">
              <h3 className="text-sm font-bold text-[#0057a8] mb-1">Serviceaffärens tillväxt</h3>
              <p className="text-sm text-[#2a2a2a]">Serviceaffären (~30% av omsättning) är strukturellt i tillväxt och konjunkturstabil. Volvo Connect och digitala tjänster ökar tjänstepenetrationen.</p>
            </div>
            <div className="border-l-4 border-[#4a90d9] pl-4">
              <h3 className="text-sm font-bold text-[#4a90d9] mb-1">Elektrifiering — first mover i Europa</h3>
              <p className="text-sm text-[#2a2a2a]">Volvo är ledande i kommersiell elektrifiering i Europa. EU:s koldioxidkrav driver strukturell efterfrågan på el-lastbilar från 2025 och framåt.</p>
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
            <div className="bg-[#eaf0fb] border border-[#aabfea] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#003087] uppercase tracking-widest mb-2">Trucks (~75%)</h3>
              <p className="text-sm text-[#2a2a2a]">Kärnaffären. Europa stark men Nordamerika i nedgång H1 2025. Serviceintäkterna motverkar volymfallet.</p>
            </div>
            <div className="bg-[#eaf0fb] border border-[#aabfea] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#003087] uppercase tracking-widest mb-2">Construction Equip. (~15%)</h3>
              <p className="text-sm text-[#2a2a2a]">SDLG och Volvo CE. Konjunkturkänsligt men gynnas av europeiska infrastrukturinvesteringar och US Infrastructure Act.</p>
            </div>
            <div className="bg-[#eaf0fb] border border-[#aabfea] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#003087] uppercase tracking-widest mb-2">Volvo Penta (~10%)</h3>
              <p className="text-sm text-[#2a2a2a]">Marin och industriella motorer. Stabil kassaflödesgenerator med 17%+ rörelsemarginal. Elframdrivning för båtar är nästa tillväxtsteg.</p>
            </div>
          </div>
        </section>

        {/* VIII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VIII" title="ESG & Elektrifiering" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Volvo är ett av Europas ledande industribolag på ESG. Bolaget har satt ambitiösa klimatmål och är bland de första lastbilstillverkarna att erbjuda kommersiella ellastbilar i Europa. EU:s koldioxidkrav för tunga fordon (−90% till 2040) driver strukturellt mot elektrifiering och Volvo är väl positionerat.
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
                <span className="text-xl font-bold font-serif text-[#003087]">{analysisData.totaltPoang} / {analysisData.maxPoang}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
                <span className="text-sm font-bold">Viktat betyg:</span>
                <span className="text-xl font-bold font-serif text-[#003087]">{analysisData.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Volvo är ett exceptionellt industribolag i en temporär nedgångsfas. Balansräkningen är stark, serviceaffären är stabil och utdelningen kompenserar aktieägarna under väntan. Aktien är rimligt värderad men inte uppenbart billig givet cykeln.
          </p>
          <AlertBox type="signal">
            <strong>BEVAKA — premiumvärdering kräver återhämtning.</strong> Se vår uppdaterade FY2025-analys för aktuell rekommendation BEVAKA och riktkurs 345 kr baserat på helårsdata.
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
