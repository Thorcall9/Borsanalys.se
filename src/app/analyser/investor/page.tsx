"use client";

import React, { useMemo } from "react";
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
import type { AnalysisSection, Scenario } from "@/components/analysis";

// --- TYPER & INTERFACES ---
export interface TableCell {
  value: string;
  color?: "green" | "red" | "amber" | "neutral";
  arrow?: "neutral" | "up" | "down";
}

export interface TableRow {
  cells: {
    [key: string]: TableCell;
  };
}

const ACCENT = "#1a3c6e";

// --- KONSTANTER ---
const sections: AnalysisSection[] = [
    { id: "overview",   number: "I",    title: "Översikt" },
    { id: "moat",       number: "II",   title: "Strategisk Moat" },
    { id: "financials", number: "III",  title: "Finansiell analys" },
    { id: "valuation",  number: "IV",   title: "Värdering" },
    { id: "growth",     number: "V",    title: "Tillväxtmotorer" },
    { id: "risk",       number: "VI",   title: "Riskprofil" },
    { id: "esg",        number: "VII",  title: "ESG & Ägarskap" },
    { id: "portfolio",  number: "VIII", title: "Portföljanalys" },
    { id: "verdict",    number: "IX",   title: "Investeringsbeslut" },
    { id: "scenarios",  number: "X",    title: "Scenarier" },
  ];

  const swotData = {
    strengths: [
      "Wallenbergsfärens 110-åriga track record — 15,0% genomsnittlig årsavkastning senaste 20 åren (FY2025) vs SIXRX 10,4%",
      "Exceptionellt stark balansräkning — belåningsgrad 2,1% (FY2025), genomsnittlig lånelooptid 9,4 år",
      "Trefaldigt diversifierad portfölj: Noterade Bolag (68%), EQT (10%) och Patricia Industries (19%), nu 24 portföljbolag",
      "Aktivt ägarskap med styrelserepresentation skapar svårreplikerade nätverkseffekter och reputationsmoat",
      "Stadigt stigande utdelning — ca 9% per år senaste decenniet, höjd till 5,60 kr för FY2025",
    ],
    weaknesses: [
      "Minimal substansrabatt i mars 2026 — kurs nära NAV-paritet eliminerar den klassiska Investor-rabatten som skyddskudde",
      "Nova Biomedical-integration komplicerad: ransomware-attack (485 000 patientdata läckta), hög multipel 18,2x EV/EBITDA",
      "Patricia Industries drabbas av valutamotvind — 8 procentenheters gap organisk vs rapporterad tillväxt Q3, Q4-omsättning -5%",
      "Permobil: nolltillväxt Q3, produktåterkallelse SmartDrive — kräver tydlig vändning under 2026",
      "Petra Hedengran lämnade Investor i slutet av 2025 — erfarenhetsförlust inom EQT-investeringar och bolagsstyrning",
    ],
    opportunities: [
      "EQT-innehavets fortsatta tillväxt — 2 mdr SEK i fonddistributioner Q3, 15% totalavkastning FY2025, 29 mdr SEK totala investeringar",
      "Saab: europeisk upprustningscykel driver flerårig strukturell tillväxt, +147% totalavkastning YTD 2025",
      "Sobi: förvärv av Arthrosi (14 mdr kr, fas 3 inom gikt) — studieresultat väntas 2026, potentiell NAV-trigger",
      "AstraZeneca planerar investera 50 mdr USD i USA till 2030 — stark pipeline gynnar långsiktig NAV-tillväxt",
      "Stor kassa och låg belåning ger kapacitet för opportunistiska förvärv om marknaden försvagas",
    ],
    threats: [
      "Geopolitisk friktion och handelstariffer — VD Cederholm identifierade detta som huvudrisk, SEK-förstärkning tynger rapporterade siffror",
      "Nova Biomedical: potentiella GDPR-böter (hälsodata-läckage), integrationstryck kan pressa omsättning ytterligare",
      "Hög värdering eliminerar den klassiska substansrabatten som historisk skyddskudde vid börsnedgång",
      "Permobils vändning uteblir — ytterligare produktkvalitetsproblem kan skada varumärket och kräva avsättningar",
    ],
  };

  const scenarios: Scenario[] = [
    {
      type: "bull",
      probability: "25%",
      price: "430 kr",
      change: "+22%",
      assumptions: "Bred börshaussé lyfter noterade innehav. EQT levererar starka exits. Nova Biomedical-integration lyckas.",
      requires: "Substansrabatt normaliseras mot 5-10% och stark tillväxt i onoterade portföljen."
    },
    {
      type: "base",
      probability: "50%",
      price: "370 kr",
      change: "+5%",
      assumptions: "NAV-tillväxt ca 5-7%. Utdelning 5,60 kr utbetalas. Nova-integrationen fortskrider enligt plan.",
      requires: "Stabil utveckling i Atlas Copco och ABB samt bibehållen substansrabatt."
    },
    {
      type: "bear",
      probability: "25%",
      price: "260 kr",
      change: "-26%",
      assumptions: "Global recession pressar noterade innehav och EQT-värderingar. Nova Biomedical belastas av störningar.",
      requires: "Kraftig kronförstärkning och sämre konjunktur för verkstadsbolagen."
    }
  ];

  const financialRows: TableRow[] = [
    { cells: { metric: { value: "Justerat NAV (mdkr SEK)" }, FY2023: { value: "808" }, FY2024: { value: "970" }, FY2025: { value: "1 087" } } },
    { cells: { metric: { value: "NAV per aktie (SEK)" }, FY2023: { value: "264" }, FY2024: { value: "317" }, FY2025: { value: "355" } } },
    { cells: { metric: { value: "NAV-tillväxt (%)" }, FY2023: { value: "+18%", color: "green", arrow: "up" }, FY2024: { value: "+20%", color: "green", arrow: "up" }, FY2025: { value: "+14%", color: "green", arrow: "up" } } },
    { cells: { metric: { value: "Total aktieägaravkastning (%)" }, FY2023: { value: "+22%", color: "green", arrow: "up" }, FY2024: { value: "+27%", color: "green", arrow: "up" }, FY2025: { value: "+15%", color: "green", arrow: "up" } } },
    { cells: { metric: { value: "Resultat per aktie (EPS, kr)" }, FY2023: { value: "41,48" }, FY2024: { value: "37,00" }, FY2025: { value: "~55 (est.)" } } },
    { cells: { metric: { value: "Eget kapital (mdkr SEK)" }, FY2023: { value: "717" }, FY2024: { value: "820" }, FY2025: { value: "~1 050" } } },
    { cells: { metric: { value: "Soliditet (%)" }, FY2023: { value: "~85,6%" }, FY2024: { value: "~86,1%" }, FY2025: { value: "~85%" } } },
    { cells: { metric: { value: "Belåningsgrad (%)" }, FY2023: { value: "1,2%" }, FY2024: { value: "1,2%" }, FY2025: { value: "2,1%" } } },
    { cells: { metric: { value: "Utdelning per aktie (SEK)" }, FY2023: { value: "4,40" }, FY2024: { value: "5,20" }, FY2025: { value: "5,60" } } },
    { cells: { metric: { value: "20-årig genomsnittlig årsavkastning (%)" }, FY2023: { value: "—" }, FY2024: { value: "16,4%" }, FY2025: { value: "15,0%" } } },
  ];

  const peerRows: TableRow[] = [
    { cells: { matt: { value: "P/E (TTM)" }, investor: { value: "ca 20x" }, industri: { value: "12,4x" }, kinnevik: { value: "-9,6x", color: "red" } } },
    { cells: { matt: { value: "ROE (%)*" }, investor: { value: "2,82%" }, industri: { value: "8,02%", color: "green" }, kinnevik: { value: "-6,77%", color: "red" } } },
    { cells: { matt: { value: "Direktavkastning" }, investor: { value: "1,6%" }, industri: { value: "2,19%", color: "green" }, kinnevik: { value: "0%", color: "red" } } },
    { cells: { matt: { value: "Substansrabatt" }, investor: { value: "ca -1%", color: "amber" }, industri: { value: "ca -5%", color: "green" }, kinnevik: { value: "ca -50%", color: "green" } } },
    { cells: { matt: { value: "20-årig årsavkastning" }, investor: { value: "15,0%", color: "green" }, industri: { value: "N/A" }, kinnevik: { value: "N/A" } } },
  ];

  const boardRows: TableRow[] = [
    { cells: { namn: { value: "Christian Cederholm (VD)" }, innehav: { value: "227 500 aktier" } } },
    { cells: { namn: { value: "Daniel Nodhäll" }, innehav: { value: "80 000 aktier" } } },
    { cells: { namn: { value: "Yuriy Prilutskiy" }, innehav: { value: "78 293 aktier" } } },
    { cells: { namn: { value: "Thomas Kidane" }, innehav: { value: "31 460 aktier" } } },
    { cells: { namn: { value: "Jessica Häggström" }, innehav: { value: "10 836 aktier" } } },
  ];

  const holdingRows: TableRow[] = [
    { cells: { bolag: { value: "ABB" }, sektor: { value: "Elektr./Automation" }, avk: { value: "+19,8%", color: "green", arrow: "up" }, effekt: { value: "+29 691", color: "green" } } },
    { cells: { bolag: { value: "SEB" }, sektor: { value: "Bank/Finans" }, avk: { value: "+11,7%", color: "green", arrow: "up" }, effekt: { value: "+8 759", color: "green" } } },
    { cells: { bolag: { value: "Saab" }, sektor: { value: "Forsvar (+147% YTD)" }, avk: { value: "+8,8%", color: "green", arrow: "up" }, effekt: { value: "+7 572", color: "green" } } },
    { cells: { bolag: { value: "Wärtsilä" }, sektor: { value: "Energi/Marin" }, avk: { value: "+26,8%", color: "green", arrow: "up" }, effekt: { value: "+6 230", color: "green" } } },
    { cells: { bolag: { value: "Atlas Copco" }, sektor: { value: "Industri/Vakuum" }, avk: { value: "positiv", color: "green" }, effekt: { value: "positiv", color: "green" } } },
    { cells: { bolag: { value: "AstraZeneca" }, sektor: { value: "Läkemedel" }, avk: { value: "stabil" }, effekt: { value: "stabil" } } },
    { cells: { bolag: { value: "Sobi" }, sektor: { value: "Specialty Pharma (Arthrosi)" }, avk: { value: "positiv", color: "green" }, effekt: { value: "positiv", color: "green" } } },
    { cells: { bolag: { value: "Epiroc" }, sektor: { value: "Gruv/Industri" }, avk: { value: "-5,0%", color: "red", arrow: "down" }, effekt: { value: "-2 130", color: "red" } } },
    { cells: { bolag: { value: "Electrolux" }, sektor: { value: "Konsumentvaror" }, avk: { value: "-23,2%", color: "red", arrow: "down" }, effekt: { value: "-789", color: "red" } } },
  ];

  const piRows: TableRow[] = [
    { cells: { bolag: { value: "Nova Biomedical" }, mult: { value: "18,2x", color: "amber" }, status: { value: "Integration pågår. Cyberincident Q3 (485k patienter). -4% org. tillväxt Q3. GDPR-risk." } } },
    { cells: { bolag: { value: "Laborie" }, mult: { value: "18,0x" }, status: { value: "Ny VD Chris Smith (sep 2025). Förvärvar JADA System (Q4 2025)." } } },
    { cells: { bolag: { value: "Mölnlycke" }, mult: { value: "14,8x", color: "green" }, status: { value: "+3% org. tillväxt Q3. Marginalförbättring Wound Care USA och Kina. Ny fabrik USA." } } },
    { cells: { bolag: { value: "Permobil" }, mult: { value: "N/A" }, status: { value: "0% org. tillväxt Q3. SmartDrive-återkallelse. Kräver vändning 2026." } } },
    { cells: { bolag: { value: "Piab Group" }, mult: { value: "N/A" }, status: { value: "+2% org. tillväxt Q3. Höga EBITDA-marginaler 27,8%. Stabil." } } },
    { cells: { bolag: { value: "Vectura" }, mult: { value: "N/A" }, status: { value: "Säljer Näckström till FAM (1,4 mdr kr). Bygger Forskaren Hagastaden." } } },
    { cells: { bolag: { value: "Sarnova" }, mult: { value: "N/A" }, status: { value: "Ny i PI 2025. Akutmedicin och EMS, USA." } } },
    { cells: { bolag: { value: "BraunAbility" }, mult: { value: "N/A" }, status: { value: "Ny i PI 2025. Tillgänglighetsfordon, demografisk medvind." } } },
  ];

const PUBLISHED = true;

const renderCell = (cell: TableCell) => {
  let colorClass = "";
  if (cell.color === "green") colorClass = "text-green-600 font-medium";
  if (cell.color === "red") colorClass = "text-red-600 font-medium";
  if (cell.color === "amber") colorClass = "text-amber-600 font-medium";

  return (
    <span className={colorClass}>
      {cell.value}
      {cell.arrow === "up" && " ↑"}
      {cell.arrow === "down" && " ↓"}
    </span>
  );
};

export default function InvestorPage() {
  if (!PUBLISHED) return null;

  const analysisData = useMemo(() => {
    const scores = {
      affarsmodell: 5,
      strategiskMoat: 5,
      finansiellKvalitet: 5,
      vardering: 3,
      tillvaxtutsikter: 4,
      riskprofil: 2,
      esgMakro: 4,
      aiObservationer: 0, // Not applicable for Investor
    };
    const totaltPoang = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxPoang = 35; // Adjusted max points
    const rating = (totaltPoang / maxPoang) * 5;

    return { scores, totaltPoang, maxPoang, rating };
  }, []);

  return (
    <AnalysisLayout
      companyName="Investor AB"
      subtitle="Nasdaq Stockholm"
      date="13 mars 2026"
      dataSources="Q4 2025, årsredovisning 2025, analytikeruppskattningar"
      sections={sections}
      accentColor={ACCENT}
    >
      {/* Hero image */}
      <div className="w-full">
        <img
          src="/investor_analys_hero.png"
          alt="Investor AB aktieanalys 2026"
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">
        {/* SEKTION I */}
        <section id="overview" data-section="overview" className="mb-16 pt-12">
          <SectionHeader number="I" title="Översikt" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <MetricCard label="Aktiekurs (mar 2026)" value="352 kr" />
            <MetricCard label="Riktkurs (bascase)" value="370 kr" />
            <MetricCard label="NAV per aktie (dec 2025)" value="355 kr" />
            <MetricCard label="Rekommendation" value="BEHÅLL" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Investor AB, grundat av Wallenbergfamiljen 1916, är ett av Sveriges mest ikoniska investmentbolag. Med en portfölj av nu 24 världsledande bolag — däribland ABB, Atlas Copco, AstraZeneca, SEB och Saab — kombinerar Investor långsiktigt aktivt ägande med djup industriell kompetens. Affärsmodellen bygger inte på passiv kapitalförvaltning utan på genuint ägarengagemang via styrelserepresentation, finansiell styrka och ett unikt globalt Wallenberg-nätverk.
          </p>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Helåret 2025 var starkt: justerat NAV växte 14% till 1 087 miljarder kronor (355 kr per aktie) och den totala aktieägaravkastningen uppgick till 15% — klart bättre än SIXRX (13%). Fjärde kvartalet levererade ytterligare 6% NAV-tillväxt och 13% totalavkastning. Styrelsen föreslog en höjd utdelning om 5,60 kr per aktie. Trots det transformativa Nova Biomedical-förvärvet (2,2 mdr USD) hölls belåningsgraden på måttliga 2,1%.
          </p>
          <AlertBox type="info">
            Investor handlas i mars 2026 med en minimal substansrabatt om bara 1-2% mot NAV 355 kr. Historiskt har rabatten legat på 10-20% — en klassisk fördel för Investor-investerare som nu nästan är borta. Vår rekommendation är BEHÅLL. Bolaget är exceptionellt, men värderingen ger begränsat utrymme för nyköp. Bästa ingångspunkten är vid substansrabatt om 10-15%, motsvarande en kurs kring 300-310 kr.
          </AlertBox>
        </section>

        {/* SEKTION II */}
        <section id="moat" data-section="moat" className="mb-16">
          <SectionHeader number="II" title="Strategisk Moat" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Investors konkurrensfördel är unik och svår att replikera. Den genomsnittliga aktieägaravkastningen om 15,0% per år de senaste 20 åren (uppdaterat FY2025) — mot SIXRX 10,4% — är det tydligaste beviset på att ägarmodellen skapar verkligt mervärde. Wallenbergsfärens decennier av relationer, industriell kunskap och styrelserepresentation i världsledande bolag skapar ett ekosystem som är mer än summan av sina delar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Noterade Bolag (68%)</h3>
              <p className="text-sm text-[#2a2a2a]">ABB, Atlas Copco, AstraZeneca, SEB, Saab, Sobi, Ericsson, Wärtsilä m.fl. Totalavkastning +8% Q3 och +6% Q4 2025. ABB +19,8% och Saab +147% YTD 2025.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">EQT (10%)</h3>
              <p className="text-sm text-[#2a2a2a]">Ägarandel i EQT AB plus fondinvesteringar. 15% totalavkastning FY2025. Starka distributioner — 2 mdr SEK Q3. Fortnox-saminvestering 4,5 mdr SEK slutförd. Totala investeringar 29 mdr SEK 2025.</p>
            </div>
            <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mb-2">Patricia Industries (19%)</h3>
              <p className="text-sm text-[#2a2a2a]">Nova Biomedical (ny plattform), Mölnlycke, Permobil, Laborie, Piab, Sarnova, BraunAbility och Vectura. Starka kassaflöden från defensiva sektorer inom life science och mobilitet.</p>
            </div>
          </div>
        </section>

        {/* SEKTION III */}
        <section id="financials" data-section="financials" className="mb-16">
          <SectionHeader number="III" title="Finansiell analys" />
          <FinancialTable
            columns={[
              { key: "metric", header: "Nyckeltal" },
              { key: "FY2023", header: "FY2023" },
              { key: "FY2024", header: "FY2024" },
              { key: "FY2025", header: "FY2025" }
            ]}
            rows={financialRows}
          />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard label="NAV-tillväxt FY2025" value="+14%" />
            <MetricCard label="Aktieägaravkastning" value="+15%" />
            <MetricCard label="Belåningsgrad" value="2.1%" />
            <MetricCard label="Utdelning/aktie" value="5,60 kr" />
          </div>
          <h3 className="text-sm font-bold text-[#1a3c6e] mt-8 mb-3 uppercase tracking-widest">Q4 och Helår 2025</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Q4 2025 levererade 6% NAV-tillväxt och 13% totalavkastning. Justerat NAV nådde 1 087 mdr kr (355 kr per aktie) vid årets slut. Noterade Bolag genererade 6% totalavkastning i linje med SIXRX under Q4. Patricia Industries omsättning sjönk 5% — valutamotvinden och tarifftrycket kvarstod. EQT-segmentet genererade 15% totalavkastning för hela FY2025. Belåningsgraden förbättrades till 2,1% vid FY2025-utgången.
          </p>
        </section>

        {/* SEKTION IV */}
        <section id="valuation" data-section="valuation" className="mb-16">
          <SectionHeader number="IV" title="Värdering" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <MetricCard label="Aktiekurs (mar 2026)" value="352 kr" />
            <MetricCard label="NAV per aktie (dec 2025)" value="355 kr" />
            <MetricCard label="Substansrabatt" value="ca -1%" />
            <MetricCard label="Direktavkastning" value="1,6%" />
          </div>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Det centrala värderingsmåttet för Investor är relationen mellan aktiekurs och substansvärde (NAV). Historiskt har aktien handlats med 10-20% substansrabatt. I mars 2026 handlas aktien till i princip paritet med NAV 355 kr — en historiskt ovanlig situation.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Mått</th>
                  <th className="text-right p-3 font-semibold">Investor AB</th>
                  <th className="text-right p-3 font-semibold">Industrivärden</th>
                  <th className="text-right p-3 font-semibold">Kinnevik</th>
                </tr>
              </thead>
              <tbody>
                {peerRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{renderCell(row.cells.matt)}</td>
                    <td className="p-3 text-right">{renderCell(row.cells.investor)}</td>
                    <td className="p-3 text-right">{renderCell(row.cells.industri)}</td>
                    <td className="p-3 text-right">{renderCell(row.cells.kinnevik)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#6a6a6a] mb-4">* ROE är missvisande för investmentbolag — NAV-tillväxt är det relevanta måttet.</p>
          <AlertBox type="risk">
            Den minimala substansrabatten är den viktigaste risken. De bästa historiska ingångspunkterna har uppstått när rabatten nått 15-20% — motsvarande en kurs under 300-310 kr givet nuvarande NAV.
          </AlertBox>
        </section>

        {/* SEKTION V */}
        <section id="growth" data-section="growth" className="mb-16">
          <SectionHeader number="V" title="Tillväxtmotorer" />
          <div className="space-y-4">
            <div className="border-l-4 border-[#1a3c6e] pl-4">
              <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Automatisering & Elektrifiering</h3>
              <p className="text-sm text-[#2a2a2a]">ABB (+19,8% Q3 2025) gynnas av industrins omställning. Atlas Copco expanderar snabbt inom vakuumteknik för halvledartillverkning.</p>
            </div>
            <div className="border-l-4 border-[#b5892a] pl-4">
              <h3 className="text-sm font-bold text-[#b5892a] mb-1">Försvar & Säkerhet</h3>
              <p className="text-sm text-[#2a2a2a]">Saab (+147% YTD 2025) drivs av en flerårig strukturell uppgångscykel i Europa.</p>
            </div>
            <div className="border-l-4 border-[#16a34a] pl-4">
              <h3 className="text-sm font-bold text-[#16a34a] mb-1">Life Science</h3>
              <p className="text-sm text-[#2a2a2a]">Nova Biomedical skapar en ny plattform. Sobi-förvärvet av Arthrosi (gikt, fas 3) har en potentiell NAV-trigger 2026.</p>
            </div>
          </div>
        </section>

        {/* SEKTION VI */}
        <section id="risk" data-section="risk" className="mb-16">
          <SectionHeader number="VI" title="Riskprofil" />
          <SwotGrid data={swotData} />
          <h3 className="text-sm font-bold text-[#1a3c6e] mt-8 mb-3 uppercase tracking-widest">Huvudrisker</h3>
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Den mest akuta risken är Nova Biomedical-integrationen efter en ransomware-attack som läckte patientdata. Detta medför legala kostnader, potentiella GDPR-böter och operationella störningar. Permobils vändning är en annan nyckelpunkt att bevaka. Makroekonomiskt är handelstariffer och en starkare krona de främsta hoten.
          </p>
        </section>

        {/* SEKTION VII */}
        <section id="esg" data-section="esg" className="mb-16">
          <SectionHeader number="VII" title="ESG & Ägarskap" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Investor har en stark ESG-profil (Sustainalytics 11,87, låg risk) och har minskat CO2-utsläppen med 70% i portföljen sedan 2016. Ägarstrukturen med Wallenbergstiftelserna som kontrollerande ägare garanterar ett långsiktigt perspektiv.
          </p>
        </section>

        {/* SEKTION VIII */}
        <section id="portfolio" data-section="portfolio" className="mb-16">
          <SectionHeader number="VIII" title="Portföljanalys" />
          <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Noterade Bolag (68% av NAV) är den primära värdedrivaren. ABB, SEB och Saab var de största positiva bidragsgivarna till NAV-tillväxten under 2025. Patricia Industries (19% av NAV) ger en defensiv och stabil kassaflödeskomponent, trots kortsiktig motvind från valuta och integration.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1a3c6e] text-white">
                  <th className="text-left p-3 font-semibold">Bolag</th>
                  <th className="text-right p-3 font-semibold">Sektor</th>
                  <th className="text-right p-3 font-semibold">Avk. Q3 2025</th>
                  <th className="text-right p-3 font-semibold">NAV-bidrag (mkr)</th>
                </tr>
              </thead>
              <tbody>
                {holdingRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                    <td className="p-3 font-medium">{renderCell(row.cells.bolag)}</td>
                    <td className="p-3 text-right text-[#4a4a4a]">{renderCell(row.cells.sektor)}</td>
                    <td className="p-3 text-right">{renderCell(row.cells.avk)}</td>
                    <td className="p-3 text-right">{renderCell(row.cells.effekt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEKTION IX */}
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
                        if (label === 'AiObservationer') return null;
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
            Investor är ett av Stockholmsbörsens bästa långsiktiga innehav. Den 20-åriga historiken, Wallenbergmodellens ägarstyrka, och portföljens exponering mot strukturella megatrender gör bolaget till en naturlig kärnposition i en långsiktig portfölj.
          </p>
          <AlertBox type="signal">
            <strong>Slutsats: BEHÅLL — Riktkurs 370 kr.</strong> Befintliga ägare bör behålla. Nya investerare bör avvakta en bättre ingångspunkt med en substansrabatt på 10-15%, motsvarande en kurs under 300-310 kr.
          </AlertBox>
        </section>

        {/* SEKTION X */}
        <section id="scenarios" data-section="scenarios" className="mb-16">
          <SectionHeader number="X" title="Scenarier" />
          <ScenarioCards scenarios={scenarios} />
        </section>
      </div>
    </AnalysisLayout>
  );
}
