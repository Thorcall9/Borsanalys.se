export interface Analysis {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  verdict?: string;
  target?: string;
  heroImage?: string;
}

export const analyses: Analysis[] = [
  {
    slug: "volvo-2026",
    title: "AB Volvo – Aktieanalys 2026 (FY2025)",
    date: "2026-03-14",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt:
      "Djupanalys av AB Volvo med FY2025-data. Nettokassa 63 mdr SEK, marknadsledare i Europa för tunga lastbilar för andra året i rad. BEVAKA med riktkurs 345 kr — utdelning 13 kr ger 4,0% direktavkastning.",
    verdict: "BEVAKA",
    target: "345 kr",
    heroImage: "/volvo_analys_hero.svg",
  },
  {
    slug: "investor",
    title: "Investor AB – Aktieanalys 2026",
    date: "2026-03-13",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Djupanalys av Investor AB med Q3 och Q4 2025-data. NAV 355 kr, riktkurs 370 kr. Wallenbergsfärens flaggskepp navigerar makromotvind med finansiell styrka.",
    verdict: "BEHÅLL",
    target: "370 kr",
    heroImage: "/investor_analys_hero.png",
  },
  {
    slug: "alphabet",
    title: "Alphabet (GOOGL): AI-ledarskap och historiska milstolpar",
    date: "2026-03-12",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Med en historisk kvartalsomsättning på över $100Mdr och en Cloud-marginal som rusat från 8% till 20% på ett år, befäster Alphabet sin roll som AI-erans definitiva vinnare.",
    verdict: "KÖP",
    target: "$360",
    heroImage: "/alphabet_analys_hero.png",
  },
  {
    slug: "nvidia-fy2026",
    title: "NVIDIA FY2026 – Finansiell analys",
    date: "2024-06-05",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Komplett analys av NVIDIAs dominans inom AI-chip, Blackwell-plattformen, värdering och framtidsutsikter.",
    verdict: "KÖP",
    target: "$230–250",
  },
  {
    slug: "microsoft-2026",
    title: "Microsoft 2026 – Är AI-giganten fortfarande köpvärd?",
    date: "2026-03-02",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Djupanalys av Microsofts AI-strategi, Azure-tillväxt, Copilot-monetarisering och värdering inför 2026.",
    verdict: "KÖP",
    target: "$480",
    heroImage: "/microsoft_analys_hero.png",
  },
  {
    slug: "novo-nordisk-2025",
    title: "Novo Nordisk: Från hypertillväxt till hård konkurrens – vad hände nu?",
    date: "2025-10-20",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Analys av konkurrensläget inom GLP-1, pipeline-uppdateringar och värdering av Novo Nordisk.",
    verdict: "KÖP",
    target: "DKK 520",
  },
  {
    slug: "volvo-2025-q2",
    title: "Volvo – Premium Valuation Assessment 2025",
    date: "2025-10-07",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Värderingsanalys av Volvos premiumposition och framtidsutsikter.",
  },
  {
    slug: "new-wave-2025",
    title: "New Wave Group – Strategy and Valuation 2025",
    date: "2025-09-28",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Strategisk analys och värdering av New Wave Group.",
  },
  {
    slug: "freetrailer-2025",
    title: "Freetrailer – Growth Analysis 2025",
    date: "2025-09-18",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Tillväxtanalys av Freetrailers affärsmodell och potential.",
  },
  {
    slug: "evolution-2025",
    title: "Evolution – Market Position 2025",
    date: "2025-08-27",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Analys av Evolutions marknadsposition inom live casino.",
  },
];

export function getAnalysisBySlug(slug: string): Analysis | undefined {
  return analyses.find((a) => a.slug === slug);
}

export function getFeaturedAnalyses(count = 4): Analysis[] {
  return analyses.slice(0, count);
}
