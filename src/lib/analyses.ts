export interface Analysis {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  verdict?: string;
  target?: string;
}

export const analyses: Analysis[] = [
  {
    slug: "microsoft-2026",
    title: "Microsoft 2026 – Är AI-giganten fortfarande köpvärd?",
    date: "2026-03-02",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt:
      "Djupanalys av Microsofts AI-strategi, Azure-tillväxt, Copilot-monetarisering och värdering inför 2026.",
    verdict: "KÖP",
    target: "$480",
  },
  {
    slug: "nvidia-fy2026",
    title: "NVIDIA FY2026 – Finansiell analys",
    date: "2026-03-03",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt:
      "Komplett analys av NVIDIAs dominans inom AI-chip, Blackwell-plattformen, värdering och framtidsutsikter.",
    verdict: "KÖP",
    target: "$230–250",
  },
  {
    slug: "novo-nordisk-2025",
    title: "Novo Nordisk: Från hypertillväxt till hård konkurrens – vad händer nu?",
    date: "2025-10-20",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt:
      "Analys av konkurrensläget inom GLP-1, pipeline-uppdateringar och värdering av Novo Nordisk.",
    verdict: "KÖP",
    target: "DKK 520",
  },
  {
    slug: "alphabet-2025",
    title: "Alphabet (GOOGL): Är AI nästa stora lyft eller dyr fälla?",
    date: "2025-10-13",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Googles AI-satsning med Gemini — möjlighet eller risk för investerare?",
    verdict: "KÖP",
    target: "$210",
  },
  {
    slug: "investor-2025-q2",
    title: "Investor – Bear, Base, Bull-scenarion Q2 2025",
    date: "2025-10-07",
    author: "Carl Fredrik Thor",
    category: "Långsiktiga analyser",
    excerpt: "Scenarioanalys av Investor med potential uppsida på 14%.",
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
