"use client";

import React from "react";
import {
  AnalysisLayout,
  SectionHeader,
  MetricCard,
  FinancialTable,
  SwotGrid,
  ScenarioCards,
  AlertBox,
  RatingBox,
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
  { id: "overview",   number: "I",    title: "Oversikt" },
  { id: "moat",       number: "II",   title: "Strategisk Moat" },
  { id: "financials", number: "III",  title: "Finansiell analys" },
  { id: "valuation",  number: "IV",   title: "Vardering" },
  { id: "growth",     number: "V",    title: "Tillvaxtmotorer" },
  { id: "risk",       number: "VI",   title: "Riskprofil" },
  { id: "esg",        number: "VII",  title: "ESG och Agande" },
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

// --- DATA MED CELLS-STRUKTUR ---
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

// --- HJÄLPMETOD FÖR ATT RITA UT TABELLCELLER ---
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

  return (
    <AnalysisLayout
      companyName="Investor AB"
      subtitle="Nasdaq Stockholm"
      date="13 mars 2026"
      dataSources="Q4 2025, årsredovisning 2025, analytikeruppskattningar"
      sections={sections}
      accentColor={ACCENT}
    >
      {/* SEKTION I */}
<section id="overview" data-section="overview" className="mb-16">
        <SectionHeader number="I" title="Oversikt" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Aktiekurs (mar 2026)" value="352 kr" />
          <MetricCard label="Riktkurs (bascase)" value="370 kr" />
          <MetricCard label="NAV per aktie (dec 2025)" value="355 kr" />
          <MetricCard label="Rekommendation" value="BEHALL" />
        </div>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Investor AB, grundat av Wallenbergfamiljen 1916, är ett av Sveriges mest ikoniska investmentbolag. Med en portfölj av nu 24 världsledande bolag — däribland ABB, Atlas Copco, AstraZeneca, SEB och Saab — kombinerar Investor långsiktigt aktivt ägande med djup industriell kompetens. Affärsmodellen bygger inte på passiv kapitalförvaltning utan på genuint ägarengagemang via styrelserepresentation, finansiell styrka och ett unikt globalt Wallenberg-nätverk.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Helåret 2025 var starkt: justerat NAV växte 14% till 1 087 miljarder kronor (355 kr per aktie) och den totala aktieägaravkastningen uppgick till 15% — klart bättre än SIXRX (13%). Fjärde kvartalet levererade ytterligare 6% NAV-tillväxt och 13% totalavkastning. Styrelsen föreslog en höjd utdelning om 5,60 kr per aktie. Trots det transformativa Nova Biomedical-förvärvet (2,2 mdr USD) hölls belåningsgraden på måttliga 2,1%.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Under 2025 navigerade portföljbolagen ett makroklimat präglat av svag efterfrågan i vissa segment, höjda handelstariffer och en stärkande krona. VD Christian Cederholm formulerade utmaningen och strategin i ett mening: kronan kan inte kontrolleras, men effektivitetsförbättringar kan det. Trots motvindarna levererade Investor ett av sina starkaste år mätt i absolut NAV-tillväxt.
        </p>
        <AlertBox type="info">
          Investor handlas i mars 2026 med en minimal substansrabatt om bara 1-2% mot NAV 355 kr. Historiskt har rabatten legat på 10-20% — en klassisk fördel för Investor-investerare som nu nästan är borta. Vår rekommendation är BEHALL. Bolaget är exceptionellt, men värderingen ger begränsat utrymme för nyköp. Bästa ingångspunkten är vid substansrabatt om 10-15%, motsvarande en kurs kring 300-310 kr.
        </AlertBox>
      </section>

      {/* SEKTION II */}
<section id="moat" data-section="moat" className="mb-16">
        <SectionHeader number="II" title="Strategisk Moat" />
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Investors konkurrensfördel är unik och svår att replikera. Den genomsnittliga aktieägaravkastningen om 15,0% per år de senaste 20 åren (uppdaterat FY2025) — mot SIXRX 10,4% — är det tydligaste beviset på att ägarmodellen skapar verkligt mervärde. Wallenbergsfärens decennier av relationer, industriell kunskap och styrelserepresentation i världsledande bolag skapar ett ekosystem som är mer än summan av sina delar.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Investors affärsidé är att skapa värde för människor och samhället i stort genom att bygga starka och hållbara företag. Målet är en årlig totalavkastning på 8-9% — men historiken visar konsekvent leverans väl över det målet. Istället för att agera som passiv kapitalförvaltare tar Investor aktiv plats i portföljbolagens styrelser och stödjer dem via industriell expertis, finansiell styrka och ett unikt globalt nätverk.
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
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Ägarstrukturen är central: Knut och Alice Wallenbergs Stiftelse kontrollerar 42,96% av rösterna men bara 20,07% av kapitalet via A/B-aktiestrukturen. Detta möjliggör genuint långsiktigt beslutsfattande utan kortsiktig marknadspress. VD Christian Cederholm äger 227 500 aktier och ledningsgruppen agerar konsekvent som ägare.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a]">
          Under 2025 breddades PI-portföljen med Sarnova (akutmedicin, USA) och BraunAbility (tillgänglighetsfordon) — båda i linje med den långsiktiga strategin att bygga defensiva, kassaflödesstarka plattformar. En förändring i ledningen: Petra Hedengran, ansvarig för bolagsstyrning och EQT-investeringar, lämnade sin roll mot slutet av 2025. Ny General Counsel Ulrika Elfving tillträdde i december 2025. Kontinuiteten i ledningsgruppen i övrigt förblir stark.
        </p>
      </section>

      {/* SEKTION III */}
     <section id="financials" data-section="financials" className="mb-16">
  <SectionHeader number="III" title="Finansiell analys" />
<FinancialTable rows={financialRows as any} columns={["FY2023", "FY2024", "FY2025"] as any} />
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="NAV-tillväxt FY2025" value="+14%" />
          <MetricCard label="Aktieägaravkastning" value="+15%" />
          <MetricCard label="Belåningsgrad FY2025" value="2,1%" />
          <MetricCard label="Bruttokassa (Q3-utgång)" value="23,7 mdr SEK" />
        </div>

        <h3 className="text-sm font-bold text-[#1a3c6e] mt-8 mb-3 uppercase tracking-widest">Q3 2025 — Portföljstyrka trots makromotvind</h3>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Justerat NAV ökade 7% under Q3 till 1 028 mdr kr (336 kr per aktie). Koncernresultatet steg dramatiskt till 59 814 mkr jämfört med 12 781 mkr Q3 2024 — drivet av positiva värdeförändringar i noterade innehav om 58 714 mkr. EPS steg till 19,53 kr (mot 4,18 kr föregående år). Investors totalavkastning om 5% placerade sig 2 procentenheter över SIXRX.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Patricia Industries visade en komplex bild. Organisk omsättningstillväxt i konstant valuta var stabil på 4%, men den rapporterade omsättningen sjönk 4% och justerad EBITA minskade 2%. Denna 8 procentenheters klyfta förklaras nästan helt av en försvagad USD och handelstariffer — inte av försämrad underliggande affär. Mölnlycke förbättrade dock marginalen trots motvindarna.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Belåningsgraden steg från 1,2% (FY2024) till 2,6% vid Q3-utgången — en direkt följd av de 1,6 mdr USD i eget kapital som tillsköts för Nova Biomedical-förvärvet. Trots detta stor finansiell flexibilitet kvar: bruttokassa 23,7 mdr kr och genomsnittlig lånelooptid 9,4 år eliminerar refinansieringsrisken.
        </p>

        <h3 className="text-sm font-bold text-[#1a3c6e] mt-6 mb-3 uppercase tracking-widest">Q4 2025 och Helår — Starkt avslut</h3>
        <p className="text-sm leading-relaxed text-[#2a2a2a]">
          Q4 2025 levererade ytterligare 6% NAV-tillväxt och 13% totalavkastning. Justerat NAV nådde 1 087 mdr kr (355 kr per aktie) vid årets slut. Noterade Bolag genererade 6% totalavkastning i linje med SIXRX under Q4. Patricia Industries omsättning sjönk 5% — valutamotvinden och tarifftrycket kvarstod in i Q4. EQT-segmentet genererade 15% totalavkastning för hela FY2025. Totala investeringar under 2025 uppgick till 29 mdr kr, inklusive ökad ägarandel i EQT AB och Fortnox-saminvesteringen. Belåningsgraden förbättrades till 2,1% vid FY2025-utgången.
        </p>
      </section>

      {/* SEKTION IV */}
<section id="valuation" data-section="valuation" className="mb-16">
        <SectionHeader number="IV" title="Vardering" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <MetricCard label="Aktiekurs (mar 2026)" value="352 kr" />
          <MetricCard label="NAV per aktie (dec 2025)" value="355 kr" />
          <MetricCard label="Substansrabatt" value="ca -1%" />
          <MetricCard label="Direktavkastning" value="1,6%" />
        </div>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Det centrala värderingsmåttet för Investor är relationen mellan aktiekurs och substansvärde (NAV). Historiskt har aktien handlats med 10-20% substansrabatt — en strukturell fördel för den långsiktige investeraren. I Q2 2025 var substansrabatten ca 11% (kurs 279,75 kr, NAV 314 kr per aktie). I mars 2026 handlas aktien till i princip paritet med NAV 355 kr — en historiskt ovanlig situation som inte varat länge historiskt.
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
          Den minimala substansrabatten är den viktigaste risken i investeringsthesen just nu. De bästa historiska ingångspunkterna för Investor-aktien har uppstått när rabatten nått 15-20% — motsvarande en kurs under 300-310 kr givet nuvarande NAV. Befintliga ägare bör behålla. Nya investerare bör avvakta ett mer attraktivt pris.
        </AlertBox>
      </section>

      {/* SEKTION V */}
      <section id="growth" className="mb-16">
        <SectionHeader number="V" title="Tillvaxtmotorer" />
        <div className="space-y-4">
          <div className="border-l-4 border-[#1a3c6e] pl-4">
            <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">Automatisering och elektrifiering — ABB och Atlas Copco</h3>
            <p className="text-sm text-[#2a2a2a]">ABB (+19,8% Q3 2025) gynnas av industrins omställning mot automatisering och elektrifiering. ABB Robotics avtalades att avyttras till Softbank — ett exempel på aktivt portföljtrimning för att renodla fokus. Atlas Copco genomförde 30+ förvärv de senaste 12 månaderna och expanderar snabbt inom vakuumteknik och halvledartillverkning — en direkt länk till AI-datacenters infrastrukturbehov.</p>
          </div>
          <div className="border-l-4 border-[#b5892a] pl-4">
            <h3 className="text-sm font-bold text-[#b5892a] mb-1">Forsvar och sakerhet — Saab</h3>
            <p className="text-sm text-[#2a2a2a]">Saab levererade +147% totalavkastning YTD 2025, en av de starkaste kursrörelserna på Stockholmsbörsen. Europeisk upprustning och NATOs 2%-mål driver en flerårig strukturell uppgångscykel. Investors ägarandel om ca 30% av rösterna ger direkt exponering mot ett av Europas mest välpositionerade försvarsbolag.</p>
          </div>
          <div className="border-l-4 border-[#16a34a] pl-4">
            <h3 className="text-sm font-bold text-[#16a34a] mb-1">Life Science — Nova Biomedical, Molnlycke, AstraZeneca och Sobi</h3>
            <p className="text-sm text-[#2a2a2a]">Nova Biomedical-plattformen (fd. Advanced Instruments + Nova, 2,2 mdr USD) skapar en diversifierad global aktör inom analytiska instrument för biofarma och klinisk diagnostik. Mölnlycke (+3% organisk tillväxt Q3) visar marginalförbättring driven av Wound Care i USA och Kina. AstraZeneca planerar investera 50 mdr USD i USA till 2030. Sobi aviserade förvärv av Arthrosi (14 mdr kr) med lovande fas 3-tillgångar inom gikt — studieresultat 2026 kan bli en stark kurskatalisator.</p>
          </div>
          <div className="border-l-4 border-[#7c3aed] pl-4">
            <h3 className="text-sm font-bold text-[#7c3aed] mb-1">EQT och digital tillvaxt — Fortnox och fonddistributioner</h3>
            <p className="text-sm text-[#2a2a2a]">EQT-innehavet gav 15% totalavkastning FY2025 och totala investeringar om 29 mdr SEK genomfördes under 2025, inklusive ökad ägarandel i EQT AB. Fonddistributioner om 2 mdr SEK levererades enbart under Q3. Fortnox-saminvesteringen (4,5 mdr SEK totalt med EQT X) ger exponering mot digitala SME-lösningar i Norden.</p>
          </div>
          <div className="border-l-4 border-[#0891b2] pl-4">
            <h3 className="text-sm font-bold text-[#0891b2] mb-1">Wartsilä — Energi och marin omstallning</h3>
            <p className="text-sm text-[#2a2a2a]">Wärtsilä var kvartalets starkaste bidragsgivare Q3 (+26,8%) och fortsatte renodla portföljen under Q4 via avyttring av Gas Solutions. Fokus på kärnverksamheterna inom energi- och marinteknik premieras av marknaden och speglar Investors aktiva ägarstrategi.</p>
          </div>
          <div className="border-l-4 border-[#ea580c] pl-4">
            <h3 className="text-sm font-bold text-[#ea580c] mb-1">Mobilitet och halsa — Sarnova, BraunAbility och Permobil</h3>
            <p className="text-sm text-[#2a2a2a]">Patricia Industries breddades 2025 med Sarnova (akutmedicin och EMS i USA) och BraunAbility (tillgänglighetsfordon). Tillsammans med Permobil och Laborie byggs en mer diversifierad plattform inom mobilitet och hälsa — segment med demografiska medvindar från en åldrande befolkning i väst.</p>
          </div>
        </div>
      </section>

      {/* SEKTION VI */}
      <section id="risk" className="mb-16">
        <SectionHeader number="VI" title="Riskprofil" />
        <SwotGrid data={swotData} />

        <h3 className="text-sm font-bold text-[#1a3c6e] mt-8 mb-3 uppercase tracking-widest">Nova Biomedical — Djupanalys av cyberrisken</h3>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Den mest akuta bolagsspecifika risken är Nova Biomedical-integrationen efter ransomware-attacken utförd av cyberbrottsgruppen Nova under Q3 2025. Incidenten ledde till att känslig patientdata för 485 000 nederländska kvinnor läcktes — fullständiga namn, BSN-nummer och testresultat. Gruppen hotade att publicera data trots att en initial lösenavgift betalats, och krävde ytterligare betalning.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Konsekvenserna är flerskiktade: operationell störning bidrog direkt till negativ organisk tillväxt (-4% Q3), juridiska kostnader och externa experter drev upp förvärvsrelaterade kostnader till 297 mkr, potentiella GDPR-böter för BSN/hälsodata-läckage är reella (upp till 4% av global omsättning), och integrationsarbetet med affärssystem och organisationssammanfogning försenades. Investor har explicit varnat för att integrationsarbetet kan pressa omsättning och resultat kortsiktigt.
        </p>

        <h3 className="text-sm font-bold text-[#1a3c6e] mt-6 mb-3 uppercase tracking-widest">Makrorisk — VD Cederholms varningar</h3>
        <p className="text-sm leading-relaxed text-[#2a2a2a]">
          VD Christian Cederholm identifierade i Q3- och Q4-rapporterna tre sammanhängande makrorisker: ökad friktion i världshandeln via tariffer, betydande geopolitiska spänningar, och en stärkande krona som systematiskt tynger rapporterade siffror för exportbolag i portföljen. Dessa risker är externa och svårkontrollerade — men Investors finansiella styrka, med 2,1% belåningsgrad och 9,4 års genomsnittlig lånelooptid, ger en ovanlig motståndskraft jämfört med mer skuldsatta konkurrenter.
        </p>
      </section>

      {/* SEKTION VII */}
      <section id="esg" className="mb-16">
        <SectionHeader number="VII" title="ESG och Agande" />
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Investor har uppnått 89% minskning av egna CO2-utsläpp jämfört med 2016 och 70% minskning i portföljbolagen. Under Q4 2025 skärptes hållbarhetsmålen för 2030 med ytterligare fokus på Scope 3 — där den största klimatpåverkan och de största affärsmöjligheterna finns. Sustainalytics ESG-riskscore är 11,87 (låg risk). 100% av portföljbolagen genomför regelbunden antikorruptionsutbildning.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Mölnlyckes nya fabrik i USA är ett konkret exempel på hur ESG-strategi och affärsstrategi sammanflätas: fabriken reducerar klimatavtryck, stärker leveranskedjan mot handelstariffer och positionerar bolaget för lokal marknadsandel i USA. AstraZenecas investering på 50 mdr USD i USA till 2030 har liknande dual-logik.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Ägarstrukturen är i sig ett styrningsargument: Knut och Alice Wallenbergs Stiftelse kontrollerar 42,96% av rösterna. Familjens stiftelser äger en kontrollerande position och agerar med ett 100-årigt tidsperspektiv. Ledningsgruppens aktieinnehav (se nedan) stärker samklangen mellan ledningens och aktieägarnas intressen.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#1a3c6e] text-white">
                <th className="text-left p-3 font-semibold">Ledamot</th>
                <th className="text-right p-3 font-semibold">Aktieinnehav</th>
              </tr>
            </thead>
            <tbody>
              {boardRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                  <td className="p-3 font-medium">{renderCell(row.cells.namn)}</td>
                  <td className="p-3 text-right">{renderCell(row.cells.innehav)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEKTION VIII */}
      <section id="portfolio" className="mb-16">
        <SectionHeader number="VIII" title="Portföljanalys" />
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Noterade Bolag utgör 68% av Investors totala tillgångar och är den primära NAV-drivaren. Q3 2025 levererade 8% totalavkastning och 58 714 mkr i absolut värdeförändring. Q4 2025 levererade ytterligare 6%. Nedan visas Q3-bidragen per innehav:
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

        <h3 className="text-sm font-bold text-[#1a3c6e] mb-3 uppercase tracking-widest">Patricia Industries — Värdering och bolagsstatus</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#1a3c6e] text-white">
                <th className="text-left p-3 font-semibold">Bolag</th>
                <th className="text-right p-3 font-semibold">EV/EBITDA</th>
                <th className="text-left p-3 font-semibold">Status och nyheter</th>
              </tr>
            </thead>
            <tbody>
              {piRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#f5f0e8]" : "bg-white"}>
                  <td className="p-3 font-medium">{renderCell(row.cells.bolag)}</td>
                  <td className="p-3 text-right">{renderCell(row.cells.mult)}</td>
                  <td className="p-3 text-[#4a4a4a]">{renderCell(row.cells.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEKTION IX */}
      <section id="verdict" className="mb-16">
        <SectionHeader number="IX" title="Investeringsbeslut" />
        <RatingBox
         <RatingBox
         rating={3 as any}
         currentPrice={"352 kr" as any}
         targetPrice={"370 kr" as any}
         upside={"+5%" as any}
      />
        <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
          Investor AB är ett av Stockholmsbörsens absolut bästa långsiktiga innehav. Den 20-åriga historiken (15,0% per år vs SIXRX 10,4%), Wallenbergmodellens ägarstyrka, balansräkningens konservatism och portföljens exponering mot megatrender som automatisering, försvar, life science och digital infrastruktur gör bolaget till en naturlig kärnposition i en långsiktig portfölj.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Skälet till BEHALL snarare än KOP är värderingen. Med kurs 352 kr mot NAV 355 kr betalar investeraren fullt pris — utan den historiska substansrabatten som skyddat mot nedsidan. Dessutom bär Nova Biomedical-integrationen kortsiktiga risker (cyberincident, GDPR-exponering, press på omsättning) och Permobil behöver visa en tydlig vändning 2026. Dessa är inte dealbreakers, men de motiverar tålamod för den som ännu inte är inne.
        </p>
        <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
          Tre kritiska nyckeltal att följa under 2026: (1) Nova Biomedicals organiska tillväxt återgår till positiva tal. (2) Permobil visar tillväxt och EBITA-förbättring efter SmartDrive-återkallelsen. (3) Eventuella GDPR-böter från datainspektioner av Nova-incidenten kommuniceras och kvantifieras.
        </p>
        <AlertBox type="signal">
          <strong>Slutsats: BEHALL — Riktkurs 370 kr.</strong> Investor AB är ett av de bästa bolagen på Stockholmsbörsen och en given kärnposition for den långsiktige investeraren. Befintliga ägare bör behålla och ta emot utdelningen om 5,60 kr. Nya investerare bör avvakta en bättre ingångspunkt med substansrabatt om 10-15%, motsvarande kurs under 300-310 kr givet nuvarande NAV-nivåer.
        </AlertBox>
      </section>

      {/* SEKTION X */}
      <section id="scenarios" className="mb-16">
        <SectionHeader number="X" title="Scenarier" />
        <ScenarioCards scenarios={scenarios} />
        <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6">
          Det sannolikhetsviktade utfallet landar kring 357 kr — nära riktkursen 370 kr. Tre fokusområden dominerar osäkerheten för 2026: (1) Nova Biomedical-integration och GDPR-risk efter cyberincidenten. (2) Permobils vändning efter nolltillväxt Q3 och SmartDrive-återkallelse. (3) Makrofriktion via tariffer och en stärkande krona som pressar Patricia Industries rapporterade siffror. VD Cederholms budskap är tydligt: osäkerheten är hög, men Investors finansiella styrka och 110-åriga affärslogik är intakt.
        </p>
      </section>
    </AnalysisLayout>
  );
}
