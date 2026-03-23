import type { AnalysisSection, Scenario, TableRow } from "@/components/analysis";

export const ACCENT = "#1a3c6e";

export const sections: AnalysisSection[] = [
  { id: "overview",   number: "I",    title: "Översikt" },
  { id: "moat",       number: "II",   title: "Strategisk Moat" },
  { id: "financials", number: "III",  title: "Finansiell analys" },
  { id: "valuation",  number: "IV",   title: "Värdering & PEG" },
  { id: "growth",     number: "V",    title: "Tillväxtmotorer" },
  { id: "risk",       number: "VI",   title: "Riskprofil & UKGC" },
  { id: "segments",   number: "VII",  title: "Segmentanalys" },
  { id: "margins",    number: "VIII", title: "Marginaldjupdykning" },
  { id: "capital",    number: "IX",   title: "Kapitalallokering" },
  { id: "esg",        number: "X",    title: "ESG & Makro" },
  { id: "verdict",    number: "XI",   title: "Investeringsbeslut" },
  { id: "scenarios",  number: "XII",  title: "Scenarier" },
];

export const swotData = {
  strengths: [
    "Dominerande B2B-position — 870+ operatörer, extremt höga switching costs och nätverkseffekter",
    "EBITDA-marginaler >66% — strukturellt högre än i princip alla jämförbara spelbolag",
    "Nettokassa: 818 MEUR i likvida medel, noll räntebärande skulder — finansiell ointaglighet",
    "Kontinuerlig produktinnovation: 110+ nya spel 2025, Hasbro-exklusivavtal (MONOPOLY, m.fl.)",
    "Insiderägande 41,6% — ledningen har starkt skin in the game",
  ],
  weaknesses: [
    "Omsättningstillväxt kollapsade till +0,2% 2025 — från +14,5% året före",
    "EPS-tillväxt 2–4%/år framåt (2026–2028e) motiverar inte premiumvärdering",
    "Personalstyrkan växer snabbare än intäkterna — intäkt/anställd sjönk -5,3% 2025",
    "Asien-intäkter volatila och cyberbrottslighet mot videoströmmar ej fullt löst",
    "Utdelningen inställd 2025 — skrämde bort utdelningsinriktade institutionella ägare",
  ],
  opportunities: [
    "USA: Evolution nu i alla 7 stater, Ezugi återlanserat med mål att bli näst störst",
    "Brasilien: Studio öppnad i São Paulo — perfekt timing vid marknadens reglering 2025",
    "Hasbro-partnerskap: MONOPOLY Filthy Rich, Game Night — unik IP-differentiering",
    "Andel reglerade marknader ökade till 47% (Q4/25) — strukturell stabilitet",
    "Galaxy Gaming-förvärvet tillför sidebet-teknologi och USA-djup",
  ],
  threats: [
    "UKGC-granskning (dec 2024): binär risk — böter till licensindragning är möjliga utfall",
    "Contagion-risk: UKGC-sanktion kan trigga granskning i Ontario, New Jersey m.fl.",
    "Ringfencing i Europa pressar Europa-intäkter (–6,5% YoY Q3/25)",
    "PEG-tal på 3,4 för 2027e — dyrt relativt tillväxt om inte EPS accelererar",
    "Konkurrens från Playtech Live och Pragmatic Play Live på europeiska marknader",
  ],
};

export const scenarios: Scenario[] = [
  {
    type: "bull",
    probability: "25%",
    price: "SEK 880",
    change: "+53%",
    assumptions:
      "Asien normaliseras snabbt. USA-expansionen accelererar med Ezugi. Hasbro-spelen blir megahits. UKGC-utfallet är litet eller ingen påföljd. Marginalerna stabiliseras 67–68%.",
    requires: "P/E-expansion mot 13–15x när tillväxten bevisas i siffrorna.",
  },
  {
    type: "base",
    probability: "55%",
    price: "SEK 720",
    change: "+25%",
    assumptions:
      "EPS-tillväxt 2–4%/år (2026–2028e). Marginalen håller 66–67%. UKGC ger hanterbar böter. USA växer stadigt, LatAm bidrar allt mer.",
    requires: "P/E normaliseras mot 11–12x. Direktavkastning 5,3–5,7% ger kursstöd.",
  },
  {
    type: "bear",
    probability: "20%",
    price: "SEK 400",
    change: "–31%",
    assumptions:
      "UKGC-sanktion med smittorisk till övriga licenser. Asien försämras igen. Marginalen faller under 58% och bekräftar strukturell press.",
    requires: "P/E kontraktion mot 7–8x. Sänkt guidance utlöser kraftig nedgång.",
  },
];

// ── Finansiell tabell: historik + estimat ──────────────────────────────────
export const financialRows: TableRow[] = [
  {
    cells: {
      metric:  { value: "Nettoomsättning (MEUR)" },
      FY2023:  { value: "1 804" },
      FY2024:  { value: "2 063" },
      FY2025:  { value: "2 067" },
      FY2026e: { value: "2 231", color: "green" },
      FY2027e: { value: "2 360", color: "green" },
    },
  },
  {
    cells: {
      metric:  { value: "Omsättningstillväxt (%)" },
      FY2023:  { value: "+16,4%", color: "green", arrow: "up" },
      FY2024:  { value: "+14,5%", color: "green", arrow: "up" },
      FY2025:  { value: "+0,2%",  color: "red",   arrow: "down" },
      FY2026e: { value: "+8,0%",  color: "green" },
      FY2027e: { value: "+5,8%",  color: "green" },
    },
  },
  {
    cells: {
      metric:  { value: "Just. EBITDA-marginal (%)" },
      FY2023:  { value: "70,4%" },
      FY2024:  { value: "68,4%" },
      FY2025:  { value: "66,1%", color: "red", arrow: "down" },
      FY2026e: { value: "~66%",  color: "green" },
      FY2027e: { value: "~66%",  color: "green" },
    },
  },
  {
    cells: {
      metric:  { value: "Rörelsemarginal EBIT (%)" },
      FY2023:  { value: "63,8%" },
      FY2024:  { value: "64,1%" },
      FY2025:  { value: "59,4%", color: "red", arrow: "down" },
      FY2026e: { value: "58,6%" },
      FY2027e: { value: "58,5%" },
    },
  },
  {
    cells: {
      metric:  { value: "EPS (EUR, före utsp.)" },
      FY2023:  { value: "5,19" },
      FY2024:  { value: "5,94", color: "green", arrow: "up" },
      FY2025:  { value: "5,24", color: "red",   arrow: "down" },
      FY2026e: { value: "5,7",  color: "green" },
      FY2027e: { value: "5,8",  color: "green" },
    },
  },
  {
    cells: {
      metric:  { value: "EPS-tillväxt (%)" },
      FY2023:  { value: "+15%" },
      FY2024:  { value: "+14%" },
      FY2025:  { value: "–11,8%", color: "red", arrow: "down" },
      FY2026e: { value: "+8,7%",  color: "green" },
      FY2027e: { value: "+1,8%",  color: "red" },
    },
  },
  {
    cells: {
      metric:  { value: "Op. kassaflöde (MEUR)" },
      FY2023:  { value: "1 278" },
      FY2024:  { value: "1 301" },
      FY2025:  { value: "1 255" },
      FY2026e: { value: "1 313", color: "green" },
      FY2027e: { value: "1 419", color: "green" },
    },
  },
  {
    cells: {
      metric:  { value: "ROE (%)" },
      FY2023:  { value: "~31%" },
      FY2024:  { value: "31,6%" },
      FY2025:  { value: "26,3%", color: "red", arrow: "down" },
      FY2026e: { value: "—" },
      FY2027e: { value: "—" },
    },
  },
  {
    cells: {
      metric:  { value: "Soliditet (%)" },
      FY2023:  { value: "~75%" },
      FY2024:  { value: "74,3%" },
      FY2025:  { value: "73,8%" },
      FY2026e: { value: "—" },
      FY2027e: { value: "—" },
    },
  },
];

// ── Personaleffektivitet ───────────────────────────────────────────────────
export const efficiencyRows: TableRow[] = [
  {
    cells: {
      metric: { value: "Anställda (FTE, periodsslut)" },
      FY2023: { value: "15 600" },
      FY2024: { value: "15 381" },
      FY2025: { value: "16 243", color: "red", arrow: "up" },
    },
  },
  {
    cells: {
      metric: { value: "Nettoomsättning (MEUR)" },
      FY2023: { value: "1 804" },
      FY2024: { value: "2 063" },
      FY2025: { value: "2 067" },
    },
  },
  {
    cells: {
      metric: { value: "Intäkt per anställd (kEUR)" },
      FY2023: { value: "115,6" },
      FY2024: { value: "97,1" },
      FY2025: { value: "92,0", color: "red", arrow: "down" },
    },
  },
  {
    cells: {
      metric: { value: "Personalkostnad (MEUR)" },
      FY2023: { value: "372" },
      FY2024: { value: "438" },
      FY2025: { value: "477", color: "red", arrow: "up" },
    },
  },
  {
    cells: {
      metric: { value: "Just. EBITDA-marginal (%)" },
      FY2023: { value: "70,4%" },
      FY2024: { value: "68,4%" },
      FY2025: { value: "66,1%", color: "red", arrow: "down" },
    },
  },
];

// ── PEG-tabell ─────────────────────────────────────────────────────────────
export const pegRows: TableRow[] = [
  {
    cells: {
      year:       { value: "2026e" },
      eps:        { value: "5,7 EUR" },
      epsGrowth:  { value: "+8,7%",  color: "green" },
      pe:         { value: "9,6x" },
      peg:        { value: "1,4",    color: "green" },
      signal:     { value: "✓ Rimligt", color: "green" },
    },
  },
  {
    cells: {
      year:       { value: "2027e" },
      eps:        { value: "5,8 EUR" },
      epsGrowth:  { value: "+1,8%",  color: "red" },
      pe:         { value: "9,4x" },
      peg:        { value: "3,4",    color: "red" },
      signal:     { value: "⚠ Dyrt", color: "red" },
    },
  },
  {
    cells: {
      year:       { value: "2028e" },
      eps:        { value: "6,0 EUR" },
      epsGrowth:  { value: "+3,4%" },
      pe:         { value: "9,0x" },
      peg:        { value: "2,6" },
      signal:     { value: "~ Högt" },
    },
  },
];

// ── EV-matris (riskjusterad avkastning) ────────────────────────────────────
export const evMatrixRows: TableRow[] = [
  { cells: { scenario: { value: "Bull Case", color: "green" }, target: { value: "SEK 880" }, return: { value: "+53%", color: "green" }, probability: { value: "25%" }, weighted: { value: "+13%", color: "green" } } },
  { cells: { scenario: { value: "Base Case" }, target: { value: "SEK 720" }, return: { value: "+25%" }, probability: { value: "55%" }, weighted: { value: "+14%" } } },
  { cells: { scenario: { value: "Bear Case", color: "red" }, target: { value: "SEK 400" }, return: { value: "–31%", color: "red" }, probability: { value: "20%" }, weighted: { value: "–6%", color: "red" } } },
  { cells: { scenario: { value: "Förväntad avkastning (EV)", color: "green" }, target: { value: "" }, return: { value: "" }, probability: { value: "100%" }, weighted: { value: "+21%", color: "green" } } },
];
