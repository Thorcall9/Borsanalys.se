"use client";

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
} from "@/components/analysis";
import type { AnalysisSection, Scenario, TableRow } from "@/components/analysis";

const ACCENT = "#1a3c6e";

const sections: AnalysisSection[] = [
    { id: "overview",   number: "I",    title: "Översikt" },
    { id: "moat",       number: "II",   title: "Strategisk Moat" },
    { id: "financials", number: "III",  title: "Finansiell analys" },
    { id: "valuation",  number: "IV",   title: "Värdering" },
    { id: "growth",     number: "V",    title: "Tillväxtmotorer" },
    { id: "risk",       number: "VI",   title: "Riskprofil" },
    { id: "esg",        number: "VII",  title: "ESG och Hållbarhet" },
    { id: "portfolio",  number: "VIII", title: "Segmentanalys" },
    { id: "verdict",    number: "IX",   title: "Investeringsbeslut" },
    { id: "scenarios",  number: "X",    title: "Scenarier" },
  ];

  const swotData = {
    strengths: [
      "Stark premiumposition — marknadsandel 19,0% i Europa (tunga lastbilar) FY2025, marknadsledande för andra året i rad",
      "Nettokassa 63,0 mdr SEK i industriverksamheten vid FY2025 — exceptionell finansiell styrka trots utdelning på 37,6 mdr",
      "Serviceaffären visar motståndskraft — omsättningstillväxt +5% i konstant valuta Q4 trots svag fordonsmarknad",
      "Volvo Penta: justerad rörelsemarginal 17,4% FY2025 — bolagets stabilaste kassaflödesgenerator",
      "Coretura-JV med Daimler Truck delar kostnaden för mjukvaruplattform och frigör resurser till differentiering",
      "Generös utdelning: 8,50 kr ordinarie + 4,50 kr extra = 13 kr per aktie för FY2025 (direktavkastning 4,0%)",
    ],
    weaknesses: [
      "Lastbilsmarginal under press — justerad marginal 9,8% FY2025 vs 12,7% FY2024, Nordamerika -31% i justerat rörelseresultat",
      "Operativt kassaflöde industriverksamheten halverades — 21,8 mdr SEK FY2025 vs 45,3 mdr FY2024",
      "Nettokassa minskade kraftigt från 85,9 till 63,0 mdr SEK, varav utdelning på 37,6 mdr förklarar merparten",
      "Nordamerika fortsatt svagt — leveranser -15% FY2025, förväntas svag även H1 2026 med fortsatt underabsorption",
      "Valutamotvind systematisk — negativ påverkan på rörelseresultatet -2,1 mdr SEK Q4, -4,5 mdr SEK valutaeffekt på likvida medel FY2025",
    ],
    opportunities: [
      "Cyklisk uppgångsfas närmar sig — VD Lundstedt: stabilisering på flera marknader, kunder nyttjar fordon på bra nivå",
      "Swecon-förvärvet (slutfört jan 2026) stärker vertikal integration och serviceandel i Europa och Baltikum",
      "Anläggningsmaskiner vänder — justerat rörelseresultat marginal 13,9% Q4 (vs 11,8% Q4 2024), orderingång +18% ex-SDLG",
      "Volvo Penta: naturgasmotor G17 lanserades jan 2026 — breddning mot datacenter och energiinfrastruktur",
      "Autonoma lastbilar — milstolpe Q4: Waabi Driver integrerat med Volvo VNL Autonomous",
      "Infrastrukturinvesteringar globalt driver anläggningsmaskiner — Kina +20% totalmarknad 2025",
    ],
    threats: [
      "Tariffer och handelspolitik — Q4-nettoeffekt -800 Mkr, Q1 2026 förväntas -1 mdr SEK, osäkerheten stor",
      "Nordamerikansk lastbilsmarknad — förväntas svag H1 2026, EPA 2027-regler skapar inköpspaus",
      "Lastbilskartellen — 6 mdr SEK i avsättningar (Q2 2023), solidariskt ansvar kan överstiga avsatt belopp, ca 3 000 krav i 20+ länder",
      "Stärkande krona — systematisk negativ påverkan, SEK/USD gick från 11,00 till 9,17 under 2025",
      "Avgaskomponent-reservering — ~3/4 av 7 mdr SEK (Q4 2018) utnyttjad, resterande del fortfarande osäker",
    ],
  };
  
  const scenarios: Scenario[] = [
    {
      type: "bull",
      probability: "25%",
      price: "390 kr",
      change: "+20% från 324 kr",
      assumptions: "Marginal återhämtar sig mot 12%\nNordamerika normaliseras H2 2026\nEPS 2026e 20,91 kr levereras",
      requires: "Nordamerikansk lastbilsmarknad normaliseras efter EPA 2027-klarhet, Swecon-integration lyfter serviceandelen, valutamotvinden minskar och kartellkostnaderna hålls inom avsatt belopp. P/E expansion mot 18-19x på 2026e-vinst.",
    },
    {
      type: "base",
      probability: "50%",
      price: "345 kr",
      change: "+6% från 324 kr",
      assumptions: "Marginal ~10,5-11% FY2026\nEPS ~20 kr\nUtdelning 13 kr bibehålls",
      requires: "Stabil europeisk marknad, gradvis normalisering i Nordamerika H2 2026, Swecon bidrar positivt, kassaflöde återhämtar sig mot 30-35 mdr och kartellkostnader hålls inom avsatt ram. Värdering 16-17x P/E på 2026e-vinst.",
    },
    {
      type: "bear",
      probability: "25%",
      price: "230 kr",
      change: "-29% från 324 kr",
      assumptions: "Marginal faller under 9%\nKartellkostnader överstiger 6 mdr\nNordamerika försvagas ytterligare",
      requires: "Global recession pressar lastbilar och anläggningsmaskiner simultant, tariffer eskalerar, kartelldomslut med solidariskt ansvar överstiger avsättningar kraftigt och SEK fortsätter stärkas mot USD/EUR.",
    },
  ];
  
  const financialRows: TableRow[] = [
    { cells: { metric: { value: "Nettoomsättning (mdr SEK)" }, fy2023: { value: "—" }, fy2024: { value: "526,8" }, fy2025: { value: "479,2" } } },
    { cells: { metric: { value: "Omsättningstillväxt (%)" }, fy2023: { value: "—" }, fy2024: { value: "+20%*", color: "green", arrow: "up" }, fy2025: { value: "-9%", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Just. rörelseresultat (mdr SEK)" }, fy2023: { value: "—" }, fy2024: { value: "65,7" }, fy2025: { value: "51,2", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Just. rörelsemarginal (%)" }, fy2023: { value: "—" }, fy2024: { value: "12,5%" }, fy2025: { value: "10,7%", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Rapporterat rörelseresultat (mdr SEK)" }, fy2023: { value: "—" }, fy2024: { value: "66,6" }, fy2025: { value: "48,5", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Resultat per aktie (SEK)" }, fy2023: { value: "—" }, fy2024: { value: "24,78" }, fy2025: { value: "16,94", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Op. kassaflöde industri (mdr SEK)" }, fy2023: { value: "—" }, fy2024: { value: "45,3" }, fy2025: { value: "21,8", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Nettokassa industri (mdr SEK)" }, fy2023: { value: "—" }, fy2024: { value: "85,9" }, fy2025: { value: "63,0", color: "amber", arrow: "down" } } },
    { cells: { metric: { value: "Avk. sysselsatt kapital industri (%)" }, fy2023: { value: "—" }, fy2024: { value: "35,8%" }, fy2025: { value: "25,3%", color: "red", arrow: "down" } } },
    { cells: { metric: { value: "Utdelning per aktie (SEK)" }, fy2023: { value: "—" }, fy2024: { value: "18,50" }, fy2025: { value: "13,00", color: "amber", arrow: "down" } } },
  ];

const PUBLISHED = true;

export default function VolvoPage() {
  if (!PUBLISHED) return null;

  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 4,
      vardering: 3,
      tillvaxtutsikter: 4,
      riskprofil: 3,
      esgMakro: 4,
      aiObservationer: 3,
    };
    const totaltPoang = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPoang = 40;
    const rating = (totaltPoang / maxPoang) * 5;

    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="AB Volvo"
      subtitle="VOLV B • Nasdaq Stockholm"
      date="14 mars 2026"
      dataSources="Q4 2025, helårsbokslut FY2025, analytikeruppskattningar"
      sections={sections}
      accentColor={ACCENT}
    >
      {/* Hero image */}
      <div className="w-full">
        <img
          src="/volvo_analys_hero.svg"
          alt="AB Volvo aktieanalys 2026"
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (mar 2026)" value="324 kr" />
            <MetricCard label="Riktkurs (bascase)" value="345 kr" />
            <MetricCard label="Utdelning FY2025" value="13 kr" />
            <MetricCard label="Rekommendation" value="BEVAKA" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            AB Volvo är en global ledare inom transport- och infrastrukturlösningar, noterad på Nasdaq Stockholm med tickern VOLV B. Bolaget designar, tillverkar och marknadsför lastbilar, bussar, anläggningsmaskiner samt marina och industriella motorer under varumärkena Volvo Trucks, Renault Trucks, Mack och Volvo CE. En central del av affärsmodellen är den breda serviceverksamheten — finansiering, försäkring, reservdelar och underhåll — som strukturellt balanserar de naturliga fluktuationerna i fordonsförsäljningen.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Helåret 2025 var utmanande: nettoomsättningen sjönk 9% till 479,2 mdr SEK (526,8 mdr), den justerade rörelsemarginalen föll till 10,7% (12,5%) och det operativa kassaflödet i industriverksamheten halverades till 21,8 mdr SEK (45,3 mdr). Bakom dessa siffror döljer sig dock en stark underliggande affär — serviceförsäljningen ökade 5% i konstant valuta under Q4 och anläggningsmaskiner förbättrade marginalen till 13,9% (11,8%) under kvartalet. Volvo avslutar 2025 med en nettokassa om 63,0 mdr SEK och är marknadsledande i Europa för tunga lastbilar för andra året i rad.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Styrelsen föreslår en ordinarie utdelning om 8,50 kr plus extra utdelning om 4,50 kr per aktie — totalt 13 kr, en direktavkastning om 4,0% på nuvarande kurs 324 kr. Q1 2026 väntas tufft med förväntad tarifftryckseffekt om -1 mdr SEK och fortsatt svagt Nordamerika.
          </p>
          <AlertBox type="info">
            Aktiekursen har stigit från 267 kr (vårt ursprungliga scenario) till 324 kr — en uppgång om 21% som speglar marknadens positivare syn på cyklisk återhämtning. Vid 324 kr handlas Volvo till P/E 19,1x på FY2025-vinst och 15,5x på 2026e — rimligt men inte billigt för ett cykliskt bolag i bottenfas. BEVAKA kvarstår med uppdaterad riktkurs 345 kr.
          </AlertBox>
          <RatingBox rating={5}><strong>5/5</strong> — Volvo är en global ledare med en extremt robust serviceaffär som nu utgör en strukturell krockkudde (växte 5% trots svag fordonsmarknad). Ledningen under Martin Lundstedt har visat prov på god kostnadskontroll i en nedgång och ägarstrukturen med Industrivärden garanterar långsiktighet och &quot;skin in the game&quot;.</RatingBox>
        </section>

        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Volvos konkurrensfördel vilar på tre pelare. Varumärkesstyrkan — globalt erkänd för säkerhet, kvalitet och hållbarhet — möjliggör en prispremie, särskilt i premiumsegmentet. I Europa tog Volvo Lastvagnar marknadsandel 19,0% (17,9%) under FY2025 och bibehöll marknadsledarskapet. Renault Trucks förbättrade till 9,4% (9,1%). Serviceaffären skapar höga byteskostnader via ett globalt nät av återförsäljare och underhållsavtal — Q4 visade serviceförsäljning +5% i konstant valuta trots svag fordonsmarknad.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Den teknologiska bredden är sällsynt: Coretura-JV med Daimler Truck (etablerat Q2 2025) delar kostnaden för en standardiserad mjukvaruplattform, Waabi-partnerskapet tog ett avgörande kliv i Q4 när Waabi Driver integrerades med Volvo VNL Autonomous, och Volvo Penta lanserade i januari 2026 sin första naturgasmotor G17 — riktad mot den snabbväxande datacentersektorn.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Lastbilar (67% av industri)</h3>
              <p className="text-sm text-[#2a2a2a]">Marknadsandel Europa tunga 19,0% — marknadsledare år 2. Nordamerika tufft (-15% leveranser FY2025). Mack Pioneer levererad Q4. Justerad marginal 9,8% FY2025.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Anläggningsmaskiner (18%)</h3>
              <p className="text-sm text-[#2a2a2a]">SDLG avyttrat sep 2025. Swecon-förvärv slutfört jan 2026. Justerad marginal 13,9% Q4 (11,8% Q4 2024) — tydlig förbättring. Orderingång +18% ex-SDLG.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Volvo Penta (4%)</h3>
              <p className="text-sm text-[#2a2a2a]">Justerad marginal 17,4% FY2025 (17,2% FY2024) — bolagets starkaste. Leveranser +30% Q4. Stark efterfrågan generatoraggregat från datacenter och energisäkerhet.</p>
            </div>
          </div>
          <RatingBox rating={5}><strong>5/5</strong> — Marknadsledarskap i Europa (19% andel), starka varumärken (Volvo, Mack, Renault) och ett oöverträffat servicenätverk skapar höga byteskostnader. Partnerskap som Coretura (mjukvara) och Waabi (autonom körning) säkrar den teknologiska vallgraven för nästa generation fordon.</RatingBox>
        </section>

        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric", header: "Nyckeltal" },
              { key: "fy2023", header: "FY2023*" },
              { key: "fy2024", header: "FY2024" },
              { key: "fy2025", header: "FY2025" },
            ]}
            rows={financialRows}
          />
          <p className="text-xs text-[#6a6a6a] mt-2 mb-6">* FY2023-data ej tillgänglig i denna analys. FY2024-utdelning inkl. extra 10,50 kr = 18,50 kr totalt. FY2025: 8,50 kr ord. + 4,50 kr extra = 13 kr totalt.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Just. marginal FY2025" value="10,7%" />
            <MetricCard label="Nettokassa industri" value="63 mdr" />
            <MetricCard label="EPS FY2025" value="16,94 kr" />
            <MetricCard label="Direktavkastning" value="4,0%" />
          </div>

          <h3 className="text-sm font-bold text-[#1a3c6e] mt-6 mb-3 uppercase tracking-widest">Q4 2025 — Stabilisering med blandade signaler</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Nettoomsättningen sjönk 11% till 123,8 mdr SEK (138,4 mdr) — men justerat för valutakursförändringar och SDLG-avyttringen var försäljningen på samma nivå som föregående år. Det justerade och rapporterade rörelseresultatet uppgick till 12,769 mdr SEK (14,039), med en justerad rörelsemarginal på 10,3% (10,1%) — faktiskt en liten förbättring mot föregående år. EPS 4,73 kr (5,28 kr). Valutaeffekten på rörelseresultatet var negativ med 2,072 mdr SEK. Tarifftrycket var negativt med -800 Mkr netto i Q4, varav ungefär hälften i anläggningsmaskiner.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Det operativa kassaflödet i industriverksamheten uppgick till 19,319 mdr SEK (24,270) — ett starkt Q4 som bidrog avgörande till helårsresultatet. Nettokassan steg från 45,4 mdr (sep 2025) till 63,0 mdr vid årsskiftet tack vare det positiva kassaflödet.
          </p>

          <h3 className="text-sm font-bold text-[#1a3c6e] mt-6 mb-3 uppercase tracking-widest">Kvartalsutveckling 2025 — Det svåraste var Q2</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Kvartal</th>
                  <th className="text-right p-3 font-semibold">Nettoomss. (mdr)</th>
                  <th className="text-right p-3 font-semibold">Just. marginal</th>
                  <th className="text-right p-3 font-semibold">EPS (kr)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { kv: "Q1 2025", omsat: "121,8", marg: "10,9%", eps: "4,86" },
                  { kv: "Q2 2025 (svagast)", omsat: "122,9", marg: "11,0%", eps: "3,64" },
                  { kv: "Q3 2025", omsat: "110,7", marg: "10,6%", eps: "3,71" },
                  { kv: "Q4 2025", omsat: "123,8", marg: "10,3%", eps: "4,73" },
                  { kv: "Helår 2025", omsat: "479,2", marg: "10,7%", eps: "16,94" },
                  { kv: "Helår 2024", omsat: "526,8", marg: "12,5%", eps: "24,78" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{row.kv}</td>
                    <td className="p-3 text-right">{row.omsat}</td>
                    <td className="p-3 text-right">{row.marg}</td>
                    <td className="p-3 text-right">{row.eps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a]">
            Det rapporterade rörelseresultatet för Q2 innehöll engångsposter om -3,5 mdr SEK (övergången till nollutsläppsfordon -4,5 mdr, Coretura +1,0 mdr). Det justerade resultatet för Q2 var faktiskt starkare: 13,5 mdr SEK med 11,0% justerad marginal. Framåtsikten för 2026 innebär att nettot av kapitalisering och avskrivning av FoU förväntas ge positiv effekt om +3 mdr SEK på rörelseresultatet, men ca 1 mdr SEK negativt jämfört med 2025.
          </p>
          <RatingBox rating={4}><strong>4/5</strong> — Trots ett utmanande 2025 bibehåller Volvo en urstark nettokassa på 63 mdr SEK och en tvåsiffrig rörelsemarginal (10,7%). Det som drar ner betyget från en 5:a är det halverade operativa kassaflödet och den cykliska sårbarheten som blev tydlig under året.</RatingBox>
        </section>

        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Aktiekurs (mar 2026)" value="324 kr" />
            <MetricCard label="P/E FY2025" value="19,1x" />
            <MetricCard label="P/E 2026e" value="15,5x" />
            <MetricCard label="Direktavkastning" value="4,0%" />
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Nyckeltal</th>
                  <th className="text-right p-3 font-semibold">2024</th>
                  <th className="text-right p-3 font-semibold">2025</th>
                  <th className="text-right p-3 font-semibold">2026e</th>
                  <th className="text-right p-3 font-semibold">2027e</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { matt: "EPS (kr)", v2024: "24,78", v2025: "16,94", v2026: "20,91", v2027: "24,19" },
                  { matt: "P/E (vid 324 kr)", v2024: "13,1x", v2025: "19,1x", v2026: "15,5x", v2027: "13,4x" },
                  { matt: "EV/EBIT", v2024: "10,6x", v2025: "16,1x", v2026: "—", v2027: "—" },
                  { matt: "Utdelning (kr)", v2024: "18,50", v2025: "13,00", v2026: "16,17e", v2027: "18,30e" },
                  { matt: "Direktavkastning (%)", v2024: "5,7%", v2025: "4,0%", v2026: "5,0%e", v2027: "5,7%e" },
                  { matt: "ROE (%)", v2024: "27,1%", v2025: "18,5%", v2026: "—", v2027: "—" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{row.matt}</td>
                    <td className="p-3 text-right">{row.v2024}</td>
                    <td className="p-3 text-right">{row.v2025}</td>
                    <td className="p-3 text-right">{row.v2026}</td>
                    <td className="p-3 text-right">{row.v2027}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Vid 324 kr handlas Volvo till P/E 19,1x på FY2025-vinsten — hög för ett cykliskt bolag i nedgångsfas, men marknaden prissätter en tydlig vinståterhämtning. Om analytikerkonsensus om EPS 20,91 kr för 2026 levereras landar P/E på 15,5x — rimligt relativt historiskt snitt. Nettokassan om 63,0 mdr SEK (ca 31 kr per aktie) utgör ett starkt golv på nedsidan. Eget kapital per aktie är 87,7 kr vilket ger P/B 3,7x — premiumvärdering motiverad av historiskt hög ROE men sträcker sig vid nuvarande vinstnivå.
          </p>
          <AlertBox type="info">
            Analytikerkonsensus (2026e EPS 20,91 kr) förutsätter en vinståterhämtning på +23% från FY2025. Det kräver att Nordamerika normaliseras och marginalen återgår mot 11-12%. Q1 2026 förväntas fortsatt tufft — tarifftryck på -1 mdr SEK och svagt Nordamerika. En besvikelse i Q1 kan skapa ett bättre ingångsläge.
          </AlertBox>
          <RatingBox rating={3}><strong>3/5</strong> — Vid 324 kr är uppsidan begränsad (+6% till bascase). P/E 19x på fjolårets vinst är historiskt högt för Volvo, även om 15,5x på 2026e är rimligare. Aktien prisar redan in en stor del av den förväntade återhämtningen, vilket gör &quot;Bevaka&quot; till en korrekt bedömning.</RatingBox>
        </section>

        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Cyklisk återhämtning — Nordamerika och Europa</h3>
              <p className="text-sm text-[#2a2a2a]">VD Lundstedt konstaterade i Q4-rapporten att stabilisering sker på flera marknader och i vissa fall små förbättringar. Europeisk orderingång ökade +11% under Q4. Den nordamerikanska marknaden förväntas vara svag H1 2026 men normaliseras gradvis när EPA 2027-klarhet ges och lageruppbyggnad hos återförsäljare pågår. Den brasilianska marknaden kyls av räntor, men Volvo bibehåller 23,2% marknadsandel.</p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">Swecon — Vertikal integration i Europa</h3>
              <p className="text-sm text-[#2a2a2a]">Swecon-förvärvet slutfördes den 31 januari 2026 och ger Volvo CE direkt kontroll över detaljhandelsledet i Sverige, Tyskland och Baltikum. Stärker kundrelationerna, accelererar serviceaffären och bör gradvis förbättra marginalerna i dessa nyckelmarknader. Finansierat delvis av SDLG-avyttringen om 8 mdr SEK (slutfört sep 2025).</p>
            </div>
            <div className="border-l-4 border-[#16a34a] pl-4">
              <h3 className="text-sm font-bold text-[#16a34a] mb-1">Volvo Penta — Datacenter och energisäkerhet</h3>
              <p className="text-sm text-[#2a2a2a]">Volvo Penta levererade justerad marginal 17,4% FY2025 och leveranser +30% Q4 — driven av stark efterfrågan på generatoraggregat från Nordamerika och datacenters. I januari 2026 lanserades naturgasmotor G17 — ett strategiskt drag mot den snabbväxande energiinfrastrukturmarknaden. CoPilot-systemet lanserat för smart fordonshantering.</p>
            </div>
            <div className="border-l-4 border-[#7c3aed] pl-4">
              <h3 className="text-sm font-bold text-[#7c3aed] mb-1">Autonoma lastbilar — Waabi och Volvo VNL</h3>
              <p className="text-sm text-[#2a2a2a]">I oktober 2025 integrerades Waabi Driver framgångsrikt med Volvo VNL Autonomous — en milstolpe inom fysisk AI för autonoma lastbilstransporter. I november levererades första helt nya Mack Pioneer till en nordamerikansk kund. I januari 2026 levererade Volvo 125 nya VNL-lastbilar till Highlight Motor Group i Kanada — största ordern hittills för detta flaggskepp.</p>
            </div>
            <div className="border-l-4 border-[#ea580c] pl-4">
              <h3 className="text-sm font-bold text-[#ea580c] mb-1">Anläggningsmaskiner — Tydlig marginalförbättring</h3>
              <p className="text-sm text-[#2a2a2a]">Anläggningsmaskiner visade 13,9% justerad marginal Q4 (11,8% Q4 2024) — driven av positiv produktmix och förbättrad serviceaffär. Orderingång +18% ex-SDLG. Ny monteringsfabrik för bandgravmaskiner bekräftad i Eskilstuna. Nya elektriska L120-hjullastare levererade till europeiska och asiatiska marknader.</p>
            </div>
          </div>
          <RatingBox rating={4}><strong>4/5</strong> — Starka drivkrafter i form av cyklisk återhämtning (H2 2026), vertikal integration genom Swecon-förvärvet och en spännande nisch i Volvo Penta (datacenter/energi). Elektrifieringen (orderingång +18%) ger en strukturell tillväxtresa långt bortom konjunkturen.</RatingBox>
        </section>

        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />

          <h3 className="text-sm font-bold text-[#1a3c6e] mt-8 mb-3 uppercase tracking-widest">Lastbilskartellen — Den svårkvantifierbara risken</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            EU-kommissionens bötesbeslut (juli 2016) lade fast att Volvo deltog i en konkurrensöverträdelse 1997-2011. Volvo betalade böter på 670 miljoner euro. Därefter har ca 3 000 skadeståndskrav inkommit från kunder i mer än 20 länder, inklusive krav på lastbilar sålda av andra tillverkare (solidariskt ansvar). Avsättningar om 6 mdr SEK gjordes i Q2 2023, och vid årets slut 2025 uppgick totala eventualförpliktelser till 14,4 mdr SEK (ner 2,5 mdr från 2024, huvudsakligen pga SDLG-försäljning). Volvo konstaterar självt att "ett ogynnsamt utfall kan väsentligt påverka finansiellt resultat, kassaflöde och finansiell ställning."
          </p>

          <h3 className="text-sm font-bold text-[#1a3c6e] mt-6 mb-3 uppercase tracking-widest">Tariffer och handelspolitik — Q1 2026 förväntas tufft</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a]">
            Volvo belyser i risknotesen att tariffer och handelshinder "kraftigt ökat osäkerheten" och kan "störa befintliga leverantörskedjor, medföra ökade kostnader och skapa plötsliga konkurrens nackdelar." Nettoeffekten från tariffer var -800 Mkr i Q4 2025 och förväntas bli -1 mdr SEK i Q1 2026. Situationen "förändras snabbt och är komplex att analysera." En stärkande SEK lade på ytterligare -2,1 mdr SEK på rörelseresultatet under Q4. SEK/USD gick från 11,00 vid årsskiftet 2024 till 9,17 vid årsskiftet 2025.
          </p>
          <RatingBox rating={3}><strong>3/5 — Medelrisk (inverterat betyg)</strong> — Riskerna är betydande men hanterbara. Lastbilskartellen (eventualförpliktelser på 14,4 mdr) och handelspolitiska tariffer (-1 mdr i Q1-effekt) är mörka moln. Den starka kassan agerar dock som en effektiv krockkudde.</RatingBox>
        </section>

        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VII" title="ESG och Hållbarhet" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Volvos ESG-arbete är en hörnsten i den långsiktiga strategin. Bolaget har satt ett ambitiöst mål om nettonollutsläpp till 2040. Externa betyg är starka: MSCI AA och Refinitiv 89/100 — bolagets elektrifieringsstrategi för tunga fordon är ledande i Europa. Under 2025 levererades 4 006 helelektriska lastbilar (3 717 år 2024), en ökning på 8%. Orderingången på helelektriska lastbilar ökade med 18% till 3 925 fordon.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            EU-innovationsstöd erhålls för CarbonSmart-initiativet. Swecon-förvärvet och SDLG-avyttringen är båda i linje med ESG-strategin: högre serviceandel och renodling mot premiumprodukter minskar det absoluta klimatavtrycket per omsättningskrona. Avgaskomponent-reserveringen (7 mdr SEK från Q4 2018, ~75% utnyttjad vid årsskiftet 2025) är en lågstående ESG-skuld som rullar av gradvis.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a]">
            Ägarstrukturen: Industrivärden är Volvos största aktieägare och bedriver aktivt, långsiktigt ägarskap via styrelserepresentation. Helena Stjernholm (VD Industrivärden) sitter i Volvos styrelse. VD Martin Lundstedts optionsavtal med Industrivärden säkerställer att ledningens och aktieägarnas intressen är synkroniserade.
          </p>
          <RatingBox rating={4}><strong>4/5</strong> — Ledande position inom elektrifiering av tunga fordon och starka externa betyg (MSCI AA). Det som hindrar en 5:a är de kvarvarande juridiska skuggorna från kartellärendet och sårbarheten för globala handelshinder.</RatingBox>
        </section>

        <section id="portfolio" data-section="portfolio" className="mb-16">
          <SectionHeader number="VIII" title="Segmentanalys" />
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Segment</th>
                  <th className="text-right p-3 font-semibold">Omss. FY2025 (mdr)</th>
                  <th className="text-right p-3 font-semibold">Just. marginal FY2025</th>
                  <th className="text-right p-3 font-semibold">Just. marginal Q4 2025</th>
                  <th className="text-left p-3 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { seg: "Lastbilar", omsat: "323,5", marg: "9,8%", q4: "9,5%", trend: "Ned från 12,7%. Europa stark, Nordamerika svagt. Mack Pioneer levererad." },
                  { seg: "Anläggningsmaskiner", omsat: "81,6", marg: "13,3%", q4: "13,9%", trend: "Q4 förbättring tydlig. Swecon slutfört jan 2026. SDLG borta." },
                  { seg: "Bussar", omsat: "25,1", marg: "9,1%", q4: "9,0%", trend: "Stabilt. Elbuss +55% FY2025. Tariffer påverkar nordamerikanska bussar negativt." },
                  { seg: "Volvo Penta", omsat: "20,6", marg: "17,4%", q4: "11,9%", trend: "Starkt FY (+5% resultat). Q4 lägre pga ogynnsam mix. Datacenter driver tillväxt." },
                  { seg: "Financial Services", omsat: "26,5", marg: "14,8%*", q4: "13,4%*", trend: "Portfölj +2% i konstant valuta. Ökade kreditreserveringar syns." },
                  { seg: "Totalt", omsat: "479,2", marg: "10,7%", q4: "10,3%", trend: "Stabilisering Q4. Q1 2026 fortsatt tufft pga tariffer och svagt Nordamerika." },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{row.seg}</td>
                    <td className="p-3 text-right">{row.omsat}</td>
                    <td className="p-3 text-right">{row.marg}</td>
                    <td className="p-3 text-right">{row.q4}</td>
                    <td className="p-3 text-[#4a4a4a] text-xs">{row.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#6a6a6a] mb-4">* Financial Services marginal beräknad på justerat rörelseresultat / nettoomsättning.</p>
          <p className="text-sm leading-relaxed text-[#2a2a2a]">
            Renault Trucks var en positiv överraskning: orderingången ökade +15% och leveranserna +11% under Q4, med marknadsandel för tunga lastbilar i Europa förbättrad till 9,4% (9,1%). Dongfeng Commercial Vehicles (ej konsoliderat) levererade +20% till 32 848 lastbilar under Q4 och +21% helåret — en stark indikation på kinesisk efterfrågehämtning.
          </p>
          <RatingBox rating={3}><strong>3/5 — AI-observationer</strong> — AI-indikationer pekar på en marknad som redan prisar in återhämtning, vilket begränsar kortsiktig uppsida. Samtidigt visar serviceaffärens motståndskraft och orderingång i elektrifiering positiva underliggande signaler. Ingen tydlig negativ avvikelse, men heller inget &quot;edge-case&quot; fynd.</RatingBox>
        </section>

        <section id="verdict" data-section="verdict" className="mb-16">
          <SectionHeader number="IX" title="Investeringsbeslut" />
          
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

          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
            AB Volvo är ett kvalitetsbolag med stark premiumposition, robust balansräkning (63 mdr SEK nettokassa) och en tydlig strategi för den teknologiska omställningen. Serviceaffären ger strukturell stabilitet, Volvo Penta levererar rekordhöga marginaler och anläggningsmaskiner visar tydlig förbättring. Den generösa utdelningen om 13 kr (4,0% direktavkastning) är ett konkret bevis på finansiell styrka.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Aktiekursen 324 kr speglar redan mycket av den cykliska återhämtningen — P/E 19,1x på FY2025-vinst och 15,5x på 2026e ger begränsat uppside i bascaset. Q1 2026 förväntas tufft med -1 mdr SEK i tarifftryck och svagt Nordamerika. En besvikelse i Q1-rapporten (24 april 2026) kan skapa ett bättre ingångsläge under 300 kr, där direktavkastningen på ordinarie utdelning (8,50 kr) överstiger 2,8%.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Tre nyckeltal att följa: (1) Lastbilsmarginal återvänder mot 11-12% under H2 2026. (2) Operativt kassaflöde industri återhämtar sig mot 35-40 mdr SEK. (3) Kartellkostnaderna hålls inom avsatta 6 mdr SEK.
          </p>
          <AlertBox type="signal">
            <strong>Slutsats: BEVAKA — Riktkurs 345 kr (+6%).</strong> Volvo är ett långsiktigt stabilt innehav men kurs 324 kr ger begränsat utrymme. Befintliga ägare bör behålla och ta emot 13 kr i utdelning. För nya investerare: avvakta Q1-rapporten 24 april 2026 — en besvikelse där kan ge ett attraktivare ingångsläge kring 280-300 kr.
          </AlertBox>
        </section>

        <section id="scenarios" data-section="scenarios" className="mb-16">
          <SectionHeader number="X" title="Scenarier" />
          <ScenarioCards scenarios={scenarios} />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
            Det sannolikhetsviktade utfallet landar kring 330 kr — nära nuvarande kurs. Tre fokusområden dominerar osäkerheten för 2026: (1) Nordamerikansk normalisering efter EPA 2027-klarhet. (2) Kartellkostnader — hålls avsättningarna? (3) Valutautvecklingen — en försvagad krona mot USD/EUR är den enklaste positiva katalysatorn för Volvo. Lundstedts budskap från Q4-rapporten är tydligt: stabilisering syns, framtiden är osäker, men Volvo är väl positionerat när marknaderna går in i nästa cykliska uppgång.
          </p>
        </section>

      </div>
    </AnalysisLayout>
  );
}
