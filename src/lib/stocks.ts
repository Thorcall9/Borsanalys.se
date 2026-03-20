export interface Company {
  slug: string;
  name: string;
  ticker: string;
  exchange: string;
  sector: string;
  country: string;
  description: string;
  analysisSlugs: string[];
  metrics?: {
    pe?: string;
    marketCap?: string;
    dividend?: string;
    currency?: string;
  };
}

export const companies: Company[] = [
  {
    slug: "nvidia",
    name: "NVIDIA",
    ticker: "NVDA",
    exchange: "NASDAQ",
    sector: "Halvledare",
    country: "USA",
    description:
      "NVIDIA är världsledande inom grafikprocessorer (GPU) och har positionerat sig som det centrala infrastrukturbolaget för artificiell intelligens. Blackwell-plattformen driver en historisk efterfrågevåg från hyperscalers och datacenteroperatörer globalt.",
    analysisSlugs: ["nvidia-fy2026"],
    metrics: {
      pe: "~35x",
      marketCap: "$2 800 mdr",
      dividend: "0,03%",
      currency: "USD",
    },
  },
  {
    slug: "microsoft",
    name: "Microsoft",
    ticker: "MSFT",
    exchange: "NASDAQ",
    sector: "Programvara",
    country: "USA",
    description:
      "Microsoft är ett av världens största teknikbolag med ledande positioner inom molntjänster (Azure), produktivitetsprogram (Microsoft 365) och spelmarknaden (Xbox/Activision). AI-integrationen via Copilot skapar nya intäktsströmmar tvärs hela produktportföljen.",
    analysisSlugs: ["microsoft-2026"],
    metrics: {
      pe: "~32x",
      marketCap: "$3 100 mdr",
      dividend: "0,7%",
      currency: "USD",
    },
  },
  {
    slug: "investor",
    name: "Investor AB",
    ticker: "INVE-B",
    exchange: "Stockholmsbörsen",
    sector: "Investmentbolag",
    country: "Sverige",
    description:
      "Investor AB är Wallenbergsfärens flaggskepp och ett av Sveriges största investmentbolag. Bolaget äger noterade kärninnehav som Atlas Copco och ABB samt onoterade bolag via Patricia Industries, och handlas historiskt med rabatt mot substansvärdet (NAV).",
    analysisSlugs: ["investor"],
    metrics: {
      pe: "N/A",
      marketCap: "~700 mdr SEK",
      dividend: "~2,5%",
      currency: "SEK",
    },
  },
  {
    slug: "volvo",
    name: "AB Volvo",
    ticker: "VOLV-B",
    exchange: "Stockholmsbörsen",
    sector: "Industri",
    country: "Sverige",
    description:
      "AB Volvo är en av världens ledande tillverkare av lastbilar, bussar, anläggningsmaskiner och marin- och industrimotorer. Bolaget är marknadsledare i Europa för tunga lastbilar och har en stark nettokassa som möjliggör generösa utdelningar.",
    analysisSlugs: ["volvo-2026", "volvo-2025-q2"],
    metrics: {
      pe: "~10x",
      marketCap: "~400 mdr SEK",
      dividend: "~4,0%",
      currency: "SEK",
    },
  },
  {
    slug: "alphabet",
    name: "Alphabet",
    ticker: "GOOGL",
    exchange: "NASDAQ",
    sector: "Teknik",
    country: "USA",
    description:
      "Alphabet är moderbolaget till Google och världens dominerande aktör inom sökannonsering. Google Cloud har vuxit till en lönsam verksamhet med snabbt ökande marginaler, och bolaget befäster sin position som en central vinnare i AI-eran.",
    analysisSlugs: ["alphabet"],
    metrics: {
      pe: "~22x",
      marketCap: "$2 200 mdr",
      dividend: "0,5%",
      currency: "USD",
    },
  },
  {
    slug: "novo-nordisk",
    name: "Novo Nordisk",
    ticker: "NOVO-B",
    exchange: "Köpenhamnsbörsen",
    sector: "Läkemedel",
    country: "Danmark",
    description:
      "Novo Nordisk är världsledande inom behandling av diabetes och fetma, med blockbuster-läkemedlen Ozempic och Wegovy. Bolaget möter nu hårdnande konkurrens inom GLP-1-segmentet och arbetar aktivt med att bredda sin pipeline.",
    analysisSlugs: ["novo-nordisk-2025"],
    metrics: {
      pe: "~20x",
      marketCap: "~2 000 mdr DKK",
      dividend: "~1,5%",
      currency: "DKK",
    },
  },
  {
    slug: "new-wave",
    name: "New Wave Group",
    ticker: "NEWA-B",
    exchange: "Stockholmsbörsen",
    sector: "Konsumentvaror",
    country: "Sverige",
    description:
      "New Wave Group är ett varumärkesbolag som designar, marknadsför och säljer profil- och presentreklam, sportkläder och detaljhandelsprodukter. Bolaget äger välkända varumärken som Cutter & Buck, Craft och Clique.",
    analysisSlugs: ["new-wave-2025"],
    metrics: {
      currency: "SEK",
    },
  },
  {
    slug: "freetrailer",
    name: "Freetrailer",
    ticker: "FREET",
    exchange: "Stockholmsbörsen",
    sector: "Tjänster",
    country: "Sverige",
    description:
      "Freetrailer driver ett plattformsbaserat system för uthyrning av trailers via återförsäljare och byggvaruhus. Affärsmodellen bygger på att erbjuda gratis uthyrning för konsumenter finansierat av reklamintäkter och partnersamarbeten.",
    analysisSlugs: ["freetrailer-2025"],
    metrics: {
      currency: "SEK",
    },
  },
  {
    slug: "evolution",
    name: "Evolution",
    ticker: "EVO",
    exchange: "Stockholmsbörsen",
    sector: "Spel & Casino",
    country: "Sverige",
    description:
      "Evolution är världsledande leverantör av live casino-lösningar till onlinekasino-operatörer. Bolaget har byggt upp en dominerande marknadsposition genom teknisk innovation och ett brett spelutbud, med höga marginaler och stark kassaflödesgenerering.",
    analysisSlugs: ["evolution-2025"],
    metrics: {
      pe: "~17x",
      marketCap: "~150 mdr SEK",
      dividend: "~4%",
      currency: "SEK",
    },
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getAllCompanies(): Company[] {
  return companies;
}
