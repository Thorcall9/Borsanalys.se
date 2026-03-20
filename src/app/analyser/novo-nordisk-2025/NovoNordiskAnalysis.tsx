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
  { id: "pipeline",   number: "VII", title: "Pipeline & Konkurrens" },
  { id: "esg",        number: "VIII", title: "ESG & Makro" },
  { id: "verdict",    number: "IX",  title: "Investeringsbeslut" },
  { id: "scenarios",  number: "X",   title: "Scenarier" },
];

const swotData = {
  strengths: [
    "Global #1 inom GLP-1 — Ozempic och Wegovy dominerar marknaden för diabetes och fetma med >50% marknadsandel",
    "Starka kliniska bevis — SELECT-studien visade 20% reduktion av allvarliga kardiovaskulära händelser",
    "FLOW-studien: Ozempic reducerar njursvikt och kardiovaskulär död hos CKD-patienter — ny indikation",
    "Exceptionella marginaler — rörelsemarginal >45%, ROIC >50%, exceptionell kapitaleffektivitet",
    "Vertikal integration av tillverkningskedjan minskar risken för kapacitetsbrist",
  ],
  weaknesses: [
    "CagriSema-besvikelsen: kombinationsläkemedlet nådde inte förväntad viktminskning i fas 3-studier",
    "Tirzepatide (Eli Lilly) visade sig överlägsent i SURMOUNT-5 för viktminskning — tydlig utmaning",
    "Hög beroende av GLP-1-segmentet — ~85% av omsättning kopplad till semaglutide-plattformen",
    "Tillverkning skalades upp aggressivt — hög fast kostnadsmassa om efterfrågan avtar",
    "Kursen föll >50% från topp 2024 pga. konkurrensoro och pipeline-besvikelse",
  ],
  opportunities: [
    "Fetmaepidemin: ~700 miljoner drabbade globalt, penetrationsgraden för GLP-1-behandling är fortfarande låg (<5%)",
    "Amycretin — nästa generations kombinationsläkemedel med tidiga lovande fas 2-data",
    "Kardiovaskulär och njurindikation breddar patientunderlaget bortom diabetes/fetma",
    "Kina och tillväxtmarknader: lång utbyggnadsfas skapar strukturellt stöd för volymtillväxt",
    "Oral semaglutide — tablettform förbättrar patientföljsamhet och öppnar nya segment",
  ],
  threats: [
    "Eli Lilly: Mounjaro/Zepbound med tirzepatide bevisad överlägsenhet för viktminskning",
    "Pipeline-konkurrens: retatrutid (triple agonist), orforglipron (oral GLP-1) från flera aktörer",
    "Politiskt tryck på läkemedelspriser i USA — Inflation Reduction Act och prisförhandlingar",
    "Patentutgångar för Victoza och äldre GLP-1 öppnar för biosimilars",
    "Eventuella biverkningsstudier som skadar varumärket för hela GLP-1-klassen",
  ],
};

const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "DKK 700",
    change: "+35%",
    assumptions:
      "Amycretin visar stark fas 3-data, marknadsandelen stabiliseras, patienter väljer Ozempic för CV-indikation.",
    requires: "Återvunnet förtroende för pipeline, oral GLP-1 godkänns och expansionen i tillväxtmarknader accelererar.",
  },
  {
    type: "base",
    probability: "50%",
    price: "DKK 520",
    change: "+0%",
    assumptions:
      "Stabil men avtagande GLP-1-tillväxt, tirzepatide vinner andel inom fetma men Ozempic dominerar diabetes.",
    requires: "Ingen ytterligare pipeline-besvikelse, marginaler håller kring 44-46%.",
  },
  {
    type: "bear",
    probability: "25%",
    price: "DKK 320",
    change: "-38%",
    assumptions:
      "Orforglipron (oral GLP-1) från Lilly godkänns och tar snabb marknadsandel, CagriSema misslyckas i fler studier.",
    requires: "Betydande erosion i marknadsandel och prispress i USA.",
  },
];

const financialRows: TableRow[] = [
  { cells: { metric: { value: "Omsättning (mdr DKK)" }, FY2022: { value: "177" }, FY2023: { value: "232" }, FY2024e: { value: "290" } } },
  { cells: { metric: { value: "Tillväxt (%)" }, FY2022: { value: "+26%" }, FY2023: { value: "+31%", color: "green", arrow: "up" }, FY2024e: { value: "+25%", color: "green" } } },
  { cells: { metric: { value: "Rörelseresultat (mdr DKK)" }, FY2022: { value: "77" }, FY2023: { value: "108" }, FY2024e: { value: "130" } } },
  { cells: { metric: { value: "Rörelsemarginal (%)" }, FY2022: { value: "43,5%" }, FY2023: { value: "46,5%", color: "green", arrow: "up" }, FY2024e: { value: "44-46%", color: "green" } } },
  { cells: { metric: { value: "EPS (DKK)" }, FY2022: { value: "14,5" }, FY2023: { value: "20,2" }, FY2024e: { value: "25-27" } } },
  { cells: { metric: { value: "Utdelning (DKK)" }, FY2022: { value: "5,4" }, FY2023: { value: "7,9" }, FY2024e: { value: "~10" } } },
  { cells: { metric: { value: "Fritt kassaflöde (mdr DKK)" }, FY2022: { value: "52" }, FY2023: { value: "70" }, FY2024e: { value: "~80" } } },
];

export default function NovoNordiskAnalysis() {
  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 4,
      finansiellKvalitet: 5,
      vardering: 3,
      tillvaxtutsikter: 3,
      riskprofil: 3,
      aiObservationer: 3,
      esgMakro: 4,
    };
    const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;
    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="Novo Nordisk"
      subtitle="Nasdaq Köpenhamn · NOVO-B"
      date="20 oktober 2025"
      dataSources="Halvårsrapport 2025, SELECT/FLOW-studier, pipe­line-data, analytikerkonsensus"
      sections={sections}
      accentColor={ACCENT}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        {/* I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (okt 2025)" value="DKK 520" />
            <MetricCard label="Riktkurs (bascase)" value="DKK 520" />
            <MetricCard label="P/E (forward)" value="~20x" />
            <MetricCard label="Rekommendation" value="KÖP" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Novo Nordisk är världens ledande läkemedelsbolag inom diabetes och fetma. Semaglutide-plattformen (Ozempic, Wegovy, Rybelsus) har drivit en historisk tillväxtvåg som mer än fördubblat omsättningen på tre år. Men 2025 kom det kalla vattnet: CagriSema missade förväntningarna i fas 3 och Eli Lillys tirzepatide bevisade överlägsenhet för viktminskning — kursen föll över 50% från toppnivåerna.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Trots turbulensen är den underliggande verksamheten stark. Ozempic dominerar fortfarande diabetessegmentet, de kliniska bevisen för kardiovaskulärt och njurskydd stärker indikationsbredden, och GLP-1-marknaden är strukturellt fortfarande i sin linda. Vid 20x forward P/E handlas Novo till en rimlig värdering för ett bolag med dessa marginaler och kassaflöden.
          </p>
          <AlertBox type="signal">
            <strong>Slutsats: KÖP — Riktkurs DKK 520.</strong> Kursfallet har skapat ett attraktivare läge. Konkurrensoro är reell men överskattad kortsiktigt. Viktigast att bevaka: Amycretin fas 3 och orala GLP-1-konkurrenters marknadspenetration.
          </AlertBox>
        </section>

        {/* II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Novo Nordisks moat bygger på tre pelare: kliniska bevis (två decennier av semaglutide-forskning), vertikal tillverkningskapacitet (egna fabriker för biologiska läkemedel), och ett stärkt varumärke bland förskrivare och patienter. SELECT-studiens resultat om 20% reduktion i kardiovaskulära händelser ger Ozempic ett differentierande argument som inte kan kopieras utan liknande kliniska investeringar.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Konkurrensmoten är dock under press. Tirzepatide (dubbel GIP/GLP-1-agonist) visar klinisk överlägsenhet för ren viktminskning. Det innebär att Novo inte längre är ensamt i premiumsegmentet — men Ozempic behåller sin starka position inom diabetes och den bredare kardiovaskulära indikationen.
          </p>
        </section>

        {/* III */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric", header: "Nyckeltal" },
              { key: "FY2022", header: "FY2022" },
              { key: "FY2023", header: "FY2023" },
              { key: "FY2024e", header: "FY2024e" },
            ]}
            rows={financialRows}
          />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Finansiellt är Novo Nordisk fortfarande exceptionellt starkt. Rörelsemarginaler kring 45% och fritt kassaflöde på över DKK 80 mdr gör bolaget till ett av Europas mest lönsamma läkemedelsbolag. Utmaningen är att tillväxttakten bromsar från de historiska toppnivåerna, vilket pressar värderingspremien.
          </p>
        </section>

        {/* IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="P/E (forward)" value="~20x" />
            <MetricCard label="EV/EBIT" value="~22x" />
            <MetricCard label="FCF-yield" value="~4%" />
            <MetricCard label="Direktavkastning" value="~1,5%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            På 20x forward P/E handlas Novo med en tydlig rabatt mot historiska multiplar (30–40x på toppen). Det reflekterar nedreviderade tillväxtförväntningar och ökad konkurrensoro. För ett bolag med {'>'}45% rörelsemarginal, diversifierade kliniska bevis och strukturell marknadstillväxt framstår den nuvarande värderingen som rimlig — inte uppenbart billig, men heller inte dyr.
          </p>
          <AlertBox type="info">
            Bull-case förutsätter att Amycretin bekräftar sin tidiga effektprofil och att Ozempics CV/njur-indikation driver volymtillväxt utanför diabetes/fetma-segmentet.
          </AlertBox>
        </section>

        {/* V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Fetmaepidemi — strukturell medvind</h3>
              <p className="text-sm text-[#2a2a2a]">Penetrationsgraden för läkemedelsbehandling av fetma är fortfarande under 5% globalt. Marknaden förväntas växa till $100+ mdr till 2030. Novo är positionerat att ta en stor del av den tillväxten.</p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">Kardiovaskulär och njurindikation</h3>
              <p className="text-sm text-[#2a2a2a]">SELECT-studien (CV-risk) och FLOW-studien (njurskydd) breddar patientunderlaget signifikant. Njurmedicin är ett relativt outforskat segment för GLP-1.</p>
            </div>
            <div className="border-l-4 border-[#00a651] pl-4">
              <h3 className="text-sm font-bold text-[#00a651] mb-1">Oral semaglutide och nästa generations läkemedel</h3>
              <p className="text-sm text-[#2a2a2a]">Rybelsus (oral) förbättrar följsamhet. Amycretin (GLP-1/amylin) har visat lovande fas 2-data med {'>'}20% viktminskning och kan bli nästa plattform.</p>
            </div>
          </div>
        </section>

        {/* VI */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Den mest omedelbara risken är konkurrensen från tirzepatide inom fetmaindikationen. Om Eli Lilly lyckas positionera Zepbound som det dominerande läkemedlet för viktnedgång riskerar Novo att tappa marknadsandel i det snabbast växande segmentet. En andra nyckelrisk är om orala GLP-1-konkurenter tar marknadsandel i diabetes — det är Novos hemmaplan.
          </p>
        </section>

        {/* VII */}
        <section id="pipeline" data-section="pipeline" className="mb-16">
          <SectionHeader number="VII" title="Pipeline & Konkurrens" />
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Läkemedel / Konkurrent</th>
                  <th className="text-right p-3 font-semibold">Mekanism</th>
                  <th className="text-right p-3 font-semibold">Status</th>
                  <th className="text-right p-3 font-semibold">Kommentar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Amycretin (Novo)", "GLP-1 + Amylin", "Fas 2 → 3", "Bäst-i-klass potential, >20% viktminskning"],
                  ["CagriSema (Novo)", "GLP-1 + Amylin analog", "Fas 3 — besvikelse", "Missade förväntningar, Novo reviderar strategi"],
                  ["Oral semaglutide (Novo)", "GLP-1 oral", "Godkänt (Rybelsus)", "Tillväxtsegment för följsamhet"],
                  ["Tirzepatide (Lilly)", "GLP-1 + GIP", "Godkänt", "Bevisad överlägsenhet för viktminskning i SURMOUNT-5"],
                  ["Orforglipron (Lilly)", "Oral GLP-1", "Fas 3", "Potentiell disruptor om godkänd"],
                  ["Retatrutid (Lilly)", "Triple agonist", "Fas 2", "Tidig men lovande viktminskningsdata"],
                ].map(([drug, mech, status, comment], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{drug}</td>
                    <td className="p-3 text-right text-[#4a4a4a]">{mech}</td>
                    <td className="p-3 text-right">{status}</td>
                    <td className="p-3 text-right text-xs text-[#4a4a4a]">{comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* VIII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VIII" title="ESG & Makro" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Novo Nordisk driver ett av världens mest välkända ESG-program — Triple Bottom Line-filosofin är inbyggd i bolagskulturen sedan decennier. Bolaget säljer insulin till kostnadspris i de fattigaste länderna och har ambitiösa klimatmål. ESG-risken är primärt politisk: prispressens politiska intensitet i USA är den viktigaste makrovariabeln att bevaka.
          </p>
          <AlertBox type="risk">
            Inflation Reduction Act (IRA) ger CMS rätt att förhandla läkemedelspriser i USA. Ozempic kan bli föremål för prisförhandling om 5–10 år, vilket riskerar att pressa marginaler på lång sikt.
          </AlertBox>
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
              <div className="flex justify-between items-center py-2 border-b border-[#e8e4da] mb-3">
                <span className="text-sm font-bold">Viktat betyg:</span>
                <span className="text-xl font-bold font-serif text-[#1a3c6e]">{analysisData.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            Novo Nordisk är ett exceptionellt bolag som handlas till en rimlig värdering efter kursfallet. Konkurrensen är reell men marknaden är tillräckligt stor för flera vinnare. Ozempics breddade kliniska profil (CV, njur) skapar ett differentierat argument. Tesen vilar på att GLP-1-marknaden fortsätter växa snabbt och att Novo behåller sin starka ställning inom diabetes.
          </p>
          <AlertBox type="signal">
            <strong>KÖP — Riktkurs DKK 520.</strong> Rimlig ingångspunkt efter kursfallet. Viktigaste triggers: Amycretin fas 3-data (2026) och oral GLP-1-konkurrensläge.
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
