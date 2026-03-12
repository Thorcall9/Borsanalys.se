"use client";

import {
AnalysisLayout,
SectionHeader,
MetricCard,
FinancialTable,
SwotGrid,
ScenarioCards,
AlertBox,
RatingBox,
} from “@/components/analysis”;
import type { AnalysisSection, Scenario } from “@/components/analysis”;

const ACCENT = “#1a3c6e”;

const sections: AnalysisSection[] = [
{ id: “overview”,   number: “I”,    title: “Översikt” },
{ id: “moat”,       number: “II”,   title: “Strategisk Moat” },
{ id: “financials”, number: “III”,  title: “Finansiell analys” },
{ id: “valuation”,  number: “IV”,   title: “Värdering” },
{ id: “growth”,     number: “V”,    title: “Tillväxtmotorer” },
{ id: “risk”,       number: “VI”,   title: “Riskprofil” },
{ id: “esg”,        number: “VII”,  title: “ESG & Makro” },
{ id: “ai-obs”,     number: “VIII”, title: “AI-observationer” },
{ id: “verdict”,    number: “IX”,   title: “Investeringsbeslut” },
{ id: “scenarios”,  number: “X”,    title: “Scenarier” },
];

const swotData = {
strengths: [
“Dominans inom sök och annonsering — ~90% global marknadsandel”,
“Full-stack AI-ledarskap: Gemini 2.5, TPU Ironwood (gen. 7), DeepMind”,
“Massiva nätverkseffekter — 7 produkter med över 2 miljarder användare”,
“GCP-marginal 20,7% (Q2 2025) — snabb lönsamhetsexpansion”,
“Exceptionell balansräkning: $95Mdr nettokassa, nästintill skuldfri”,
],
weaknesses: [
“~75% av intäkterna från annonsering — koncentrationsrisk”,
“Google Cloud är #3 bakom AWS och Azure”,
“CapEx exploderar: ~$85Mdr 2025, pressar FCF kortsiktigt”,
“Other Bets (inkl. Waymo) genererar operativa förluster >$1Mdr/kvartal”,
“Dual-class aktiestruktur begränsar minoritetsägares inflytande”,
],
opportunities: [
“AI Overview Ads: bevisad monetarisering av generativ sökning”,
“GCP: målsättning $100Mdr ARR — 32% tillväxt i Q2 2025”,
“Waymo: ~450 000 betalda resor/vecka, potentiellt $100Mdr+ värde”,
“YouTube Subscriptions: 270M+ betalande prenumeranter”,
“Gemini 2.5 Pro: topprankad modell driver Cloud-efterfrågan”,
],
threats: [
“Microsoft/OpenAI hotar sökbeteendet med Bing + ChatGPT Search”,
“EU Digital Markets Act — begränsar Google Play och ekosystemet”,
“DOJ antitrust: eventuella beteendemässiga krav kvarstår”,
“FCF-kompression 2025–2026 pga massivt CapEx”,
“Energibehov från AI-datacenter — ESG-risk och kostnadsrisk”,
],
};

const scenarios: Scenario[] = [
{
type: “bull”,
probability: “25%”,
price: “$420”,
change: “+37% från $307”,
assumptions: “GCP >35% tillväxt med >25% marginal\nAI Overview Ads driver Search\nEPS $13–14”,
requires: “Cloud tar marknadsandelar, Gemini stärker Search-monetarisering, CapEx-effektiviteten är hög och regulatoriska remedies är minimala.”,
},
{
type: “base”,
probability: “50%”,
price: “$360”,
change: “+17% från $307”,
assumptions: “GCP ~30% tillväxt med stigande marginal\nSearch +10% YoY\nEPS ~$11,24 (2026e)”,
requires: “Stabil annonsmiljö, Cloud fortsätter växa, CapEx-toppen passerats 2025 och FCF återhämtar sig 2026–2027.”,
},
{
type: “bear”,
probability: “25%”,
price: “$220”,
change: “−28% från $307”,
assumptions: “Strukturella DOJ-åtgärder\nSearch tappar andelar till AI-konkurrenter\nP/E-kompression till 20x”,
requires: “Regulatorisk chock utöver det tidigare utfallet, AI-disruption av Search, Cloud-besvikelse och FCF under fortsatt press.”,
},
];

const PUBLISHED = false; // ändra till true för att publicera

export default function AlphabetAnalysis() {
if (!PUBLISHED) return null;

return (
<AnalysisLayout
companyName="ALPHABET"
subtitle="Aktieanalys · Mars 2026"
date="10 mars 2026"
dataSources="Data: FY2024, TTM Q2 2025, Q3 2025"
sections={sections}
accentColor={ACCENT}
theme="light"
>
{/* Header */}
<div className="bg-[#0f0f0f] text-[#faf8f3] px-6 sm:px-12 py-10">
<div className="text-[10px] tracking-[.15em] text-[#b5892a] uppercase mb-1">AKTIEANALYS</div>
<div className="flex flex-wrap items-end justify-between gap-4 mb-4">
<div>
<h1 className="font-serif text-3xl sm:text-4xl font-bold">Alphabet Inc.</h1>
<div className="text-sm text-[#a0a090] mt-1">NASDAQ: GOOGL · S&P 500</div>
</div>
<div className="text-right">
<div className="font-serif text-3xl font-bold text-[#b5892a]">$307</div>
<div className="text-[11px] text-[#a0a090]">10 mars 2026</div>
<span className="inline-block mt-1.5 bg-[#1a4a1a] text-[#80d080] text-[11px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide">
▲ KÖP
</span>
</div>
</div>
<div className="flex flex-wrap gap-4">
{[
{ label: “Börsvärde”,      value: “$3,9T” },
{ label: “P/E (TTM)”,      value: “~28x” },
{ label: “EBIT-marginal”,  value: “~33%” },
{ label: “Cloud-tillväxt”, value: “+32% (Q2 2025)” },
{ label: “Riktkurs”,       value: “$360” },
].map((kpi) => (
<div key={kpi.label} className="border-l-2 border-[#b5892a] pl-2.5">
<div className="text-[9px] text-[#808070] uppercase tracking-wide">{kpi.label}</div>
<div className="font-serif text-base font-bold">{kpi.value}</div>
</div>
))}
</div>
</div>

```
  {/* Hero image */}
  <div className="w-full">
    <img
      src="/alphabet_analys_hero.png"
      alt="Alphabet aktieanalys 2026"
      className="w-full object-cover"
    />
  </div>

  <div className="px-6 sm:px-12 pb-20 bg-[#faf8f3] text-[#0f0f0f]">

    {/* I. Översikt */}
    <div data-section="overview" id="overview" className="pt-14">
      <SectionHeader number="I" title="Översikt" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
        <MetricCard label="Börsvärde"     value="$3,9T" />
        <MetricCard label="P/E (TTM)"     value="~28x" />
        <MetricCard label="EBIT-marginal" value="~33%" />
        <MetricCard label="Nettokassa"    value="$95Mdr" />
        <MetricCard label="Anställda"     value="~187 000" />
      </div>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsidé & Mission</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Alphabet Inc., moderbolaget till Google, är en ledande global aktör inom teknik och kommunikationstjänster, noterat på Nasdaq under symbolerna GOOGL (Class A) och GOOG (Class C). Bolagets mission är att organisera världens information och göra den universellt tillgänglig och användbar. Sedan 2016 drivs denna mission av en genomgripande strategi att vara ett <strong>"AI-first company"</strong> — en övergång från att vara en informationsorganisatör till att bli en leverantör av intelligens och problemlösningsverktyg. Under 2024 genererades 49% av intäkterna från USA och 51% internationellt (29% EMEA, 16% APAC, 6% Övriga Amerika).
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Affärsmodell & Segment</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Alphabet verkar via tre primära segment: <strong>Google Services</strong> (Search, YouTube, Android, Chrome, Maps, Play, Ads — 87% av omsättningen 2024), <strong>Google Cloud</strong> (GCP, Vertex AI, Workspace — snabbast växande segment med dramatisk lönsamhetsexpansion) och <strong>Other Bets</strong> (Waymo, Calico, Wing — långsiktiga "moonshots" i R&D-fas). I Q1 2025 översteg antalet betalda prenumeranter för YouTube Music/Premium och Google One 270 miljoner.
      </p>

      <FinancialTable
        title="Segment — Omsättning & Tillväxt (FY2024)"
        columns={[
          { key: "segment", header: "Segment" },
          { key: "revenue", header: "Omsättning ($Mdr)" },
          { key: "share",   header: "Andel" },
          { key: "growth",  header: "Tillväxt YoY" },
        ]}
        rows={[
          { cells: { segment: { value: "Google Search & other"     }, revenue: { value: "198,1" }, share: { value: "57%"  }, growth: { value: "+12%", color: "green" } } },
          { cells: { segment: { value: "YouTube Ads"               }, revenue: { value: "36,1"  }, share: { value: "10%"  }, growth: { value: "+13%", color: "green" } } },
          { cells: { segment: { value: "Google Network"            }, revenue: { value: "~31"   }, share: { value: "9%"   }, growth: { value: "−2%",  color: "amber" } } },
          { cells: { segment: { value: "Google Subscriptions m.m." }, revenue: { value: "~39,8" }, share: { value: "11%"  }, growth: { value: "+23%", color: "green" } } },
          { cells: { segment: { value: "Google Cloud (GCP)"        }, revenue: { value: "43,2"  }, share: { value: "12%"  }, growth: { value: "+29%", color: "green" } } },
          { cells: { segment: { value: "Other Bets"                }, revenue: { value: "1,7"   }, share: { value: "<1%"  }, growth: { value: "+27%", color: "green" } } },
          { cells: { segment: { value: "Totalt"                    }, revenue: { value: "350,0" }, share: { value: "100%" }, growth: { value: "+14%", color: "green" } } },
        ]}
      />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Ledning</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
        <strong>Sundar Pichai (VD sedan 2015)</strong> — Har visat stark förmåga att driva teknologisk transformation och navigera teknikskiften. AI-first-strategin med CapEx på $85Mdr+ bekräftar ledningens proaktiva långsiktiga fokus.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-2">
        <strong>Anat Ashkenazi (CFO sedan 2024)</strong> — Erfaren finanschef med bakgrund från Eli Lilly, fokus på kapitalallokering och transparens.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        <strong>Demis Hassabis (VD DeepMind)</strong> — Nobelpristagare (AlphaFold 2024). Leder AI-forskning och Gemini-modellerna — en av teknikvärldens mest respekterade AI-forskare.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Ägarstruktur</h3>
      <FinancialTable
        title=""
        columns={[
          { key: "owner",    header: "Ägare" },
          { key: "share",    header: "Kapitalandel" },
          { key: "votes",    header: "Röstmakt" },
          { key: "category", header: "Kategori" },
        ]}
        rows={[
          { cells: { owner: { value: "Larry Page"     }, share: { value: "~5,8%" }, votes: { value: "~26%", color: "amber" }, category: { value: "Grundare (Class B)" } } },
          { cells: { owner: { value: "Sergey Brin"    }, share: { value: "~5,5%" }, votes: { value: "~26%", color: "amber" }, category: { value: "Grundare (Class B)" } } },
          { cells: { owner: { value: "Vanguard Group" }, share: { value: "~7,5%" }, votes: { value: "~4%"                 }, category: { value: "Institutionell"       } } },
          { cells: { owner: { value: "BlackRock"      }, share: { value: "~6,2%" }, votes: { value: "~3%"                 }, category: { value: "Institutionell"       } } },
          { cells: { owner: { value: "State Street"   }, share: { value: "~3,8%" }, votes: { value: "~2%"                 }, category: { value: "Institutionell"       } } },
        ]}
      />
      <p className="text-xs text-[#8a8678] mt-2 mb-4">Page & Brin behöll per 31 dec 2024 majoriteten av röstmakten (52,1%) via Class B-aktier (10 röster/aktie). Möjliggör långsiktigt fokus men begränsar minoritetsägares inflytande.</p>

      <RatingBox rating={5}><strong>5/5</strong> — Affärsmodellen har visat extrem uthållighet, byggd på marknadsdominans med sju produkter och över 2 miljarder användare var. Den pågående AI-transformationen bekräftar ledningens proaktiva långsiktiga fokus.</RatingBox>
    </div>

    {/* II. Strategisk Moat */}
    <div data-section="moat" id="moat" className="pt-14">
      <SectionHeader number="II" title="Strategisk Moat" />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Nätverkseffekter</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Nätverkseffekter är Alphabets starkaste försvarslinje. Android är världens mest populära operativsystem med över 3 miljarder aktiva enheter. Sju produkter har var och en över 2 miljarder användare. Denna massiva användarbas genererar en oöverträffad mängd data — den mest kritiska råvaran för att träna och förfina AI-modeller som Gemini. AI Overviews når 1,5 miljarder användare per månad och Gemini är integrerat i 15 produkter, vilket säkerställer att nya AI-tjänster direkt når global skala.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Immateriella Tillgångar & Teknologi</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Alphabets teknologiska ledarskap är full-stack. Inom AI-forskning citeras bolagets generativa AI-uppsatser tre gånger oftare än någon annan institution. Detta akademiska övertag kommersialiserast via egenutvecklade Tensor Processing Units (TPUs) — nu i sin sjunde generation (Ironwood). TPU-chips ger Alphabet en sällsynt prestanda- och kostnadsfördel vid träning och drift av stora AI-modeller. DeepMinds Nobelpris (AlphaFold, används av 2 miljoner forskare) befäster bolagets unika position.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Kostnadsfördelar & Skala</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Den globala infrastrukturen — över 2 miljoner miles fiberkabel och ett nätverk i 200+ länder — ger nära noll latens globalt och kritiska kostnadsfördelar. CapEx-cykeln ($85Mdr+ 2025) skapar en massiv inträdesbarriär och befäster kostnadsledarskapet inom AI-infrastruktur.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Konkurrensbild</h3>
      <FinancialTable
        title=""
        columns={[
          { key: "competitor", header: "Konkurrent" },
          { key: "strength",   header: "Styrka" },
          { key: "threat",     header: "Hot mot Alphabet" },
        ]}
        rows={[
          { cells: { competitor: { value: "Microsoft/Bing+Copilot" }, strength: { value: "AI-integrerad sökning"        }, threat: { value: "Medel — Bing <5% marknadsandel"    } } },
          { cells: { competitor: { value: "OpenAI/ChatGPT"         }, strength: { value: "LLM-sökning, ChatGPT Search"  }, threat: { value: "Hög — påverkar sökbeteende"        } } },
          { cells: { competitor: { value: "AWS"                    }, strength: { value: "Cloud-ledare (~33%)"          }, threat: { value: "Medel — GCP växer snabbare"         } } },
          { cells: { competitor: { value: "Meta"                   }, strength: { value: "Social annonsering"           }, threat: { value: "Medel — konkurrerar om annonsbudget" } } },
          { cells: { competitor: { value: "TikTok"                 }, strength: { value: "Video, yngre målgrupp"        }, threat: { value: "Medel — konkurrerar med YouTube"    } } },
        ]}
      />

      <SwotGrid data={swotData} title="SWOT-Analys" />
      <RatingBox rating={5}><strong>5/5</strong> — Alphabets konkurrensfördelar — nätverkseffekter, full-stack AI-ledarskap (TPUs + DeepMind + Gemini) och global infrastruktur — skapar en oöverträffad moat. Förmågan att genomföra en CapEx-satsning på $85Mdr demonstrerar vilja att bibehålla marknadsdominansen långsiktigt.</RatingBox>
    </div>

    {/* III. Finansiell analys */}
    <div data-section="financials" id="financials" className="pt-14">
      <SectionHeader number="III" title="Finansiell Analys" />

      <FinancialTable
        title="Resultaträkning"
        columns={[
          { key: "metric",      header: "Nyckeltal" },
          { key: "fy2022",      header: "FY2022" },
          { key: "fy2023",      header: "FY2023" },
          { key: "fy2024",      header: "FY2024" },
          { key: "ttm",         header: "TTM Q2 2025" },
          { key: "e2026",       header: "2026e" },
        ]}
        rows={[
          { cells: { metric: { value: "Omsättning ($Mdr)"  }, fy2022: { value: "282,8" }, fy2023: { value: "307,4" }, fy2024: { value: "350,0" }, ttm: { value: "~360,5" }, e2026: { value: "~455", color: "green" } } },
          { cells: { metric: { value: "Tillväxt YoY"        }, fy2022: { value: "+10%"  }, fy2023: { value: "+9%"   }, fy2024: { value: "+14%"  }, ttm: { value: "~14%"  }, e2026: { value: "~14%", color: "green" } } },
          { cells: { metric: { value: "EBIT ($Mdr)"         }, fy2022: { value: "74,8"  }, fy2023: { value: "84,3"  }, fy2024: { value: "112,4" }, ttm: { value: "~118,5"}, e2026: { value: "~152"               } } },
          { cells: { metric: { value: "EBIT-marginal"        }, fy2022: { value: "26,5%" }, fy2023: { value: "27,4%" }, fy2024: { value: "32,1%" }, ttm: { value: "~32,9%"}, e2026: { value: "~33%"               } } },
          { cells: { metric: { value: "Utspädd EPS ($)"     }, fy2022: { value: "$4,56" }, fy2023: { value: "$5,80" }, fy2024: { value: "$8,04" }, ttm: { value: "$9,48" }, e2026: { value: "~$11,24", color: "green" } } },
          { cells: { metric: { value: "EPS-tillväxt"         }, fy2022: { value: "−21%"  }, fy2023: { value: "+27%"  }, fy2024: { value: "+38%"  }, ttm: { value: "+18%"  }, e2026: { value: "~+19%", color: "green" } } },
        ]}
      />

      <p className="text-sm leading-relaxed text-[#2a2a2a] mt-3 mb-5">
        Ett avgörande finansiellt tecken på bolagets omställning är den dramatiska marginalexpansionen inom Google Cloud. GCP:s rörelsemarginal nådde <strong>20,7% i Q2 2025</strong>, upp från 8,7% i Q2 2024. Denna förbättring, i kombination med tillväxttakten på 32%, indikerar att GCP snabbt etablerar sig som ett primärt profit center för koncernen.
      </p>

      <FinancialTable
        title="Balansräkning (per 30 juni 2025)"
        columns={[
          { key: "metric",  header: "Post ($Mdr)" },
          { key: "value",   header: "Värde" },
          { key: "comment", header: "Kommentar" },
        ]}
        rows={[
          { cells: { metric: { value: "Kassa & marknadsförbara värdepapper" }, value: { value: "$95,1" }, comment: { value: "Hög finansiell flexibilitet",      color: "green" } } },
          { cells: { metric: { value: "Långfristig skuld"                   }, value: { value: "$23,6" }, comment: { value: "Inkl. $12,5Mdr obligationer maj 2025"              } } },
          { cells: { metric: { value: "Nettokassa"                          }, value: { value: ">$70"  }, comment: { value: "Kassa långt överstiger skulden",    color: "green" } } },
          { cells: { metric: { value: "Eget kapital"                        }, value: { value: "$362,9"}, comment: { value: "Soliditet ~72% av totala tillgångar", color: "green" } } },
          { cells: { metric: { value: "Anläggningstillgångar (netto)"       }, value: { value: "$203,2"}, comment: { value: "Drivs av AI CapEx",                color: "amber" } } },
        ]}
      />

      <FinancialTable
        title="Kassaflöde"
        columns={[
          { key: "metric",  header: "Kassaflöde ($Mdr)" },
          { key: "fy2023",  header: "FY2023" },
          { key: "fy2024",  header: "FY2024" },
          { key: "ttm",     header: "TTM Q2 2025" },
          { key: "e2026",   header: "2026e" },
        ]}
        rows={[
          { cells: { metric: { value: "Operativt KF" }, fy2023: { value: "101,7" }, fy2024: { value: "~125"  }, ttm: { value: "133,7"              }, e2026: { value: "~150"                } } },
          { cells: { metric: { value: "CapEx"        }, fy2023: { value: "32,3"  }, fy2024: { value: "~52"   }, ttm: { value: "67,0", color: "amber"}, e2026: { value: ">85",  color: "amber" } } },
          { cells: { metric: { value: "FCF"          }, fy2023: { value: "69,5"  }, fy2024: { value: "72,8"  }, ttm: { value: "66,7", color: "amber"}, e2026: { value: "~45–65",color:"amber"} } },
          { cells: { metric: { value: "FCF-marginal" }, fy2023: { value: "22,6%" }, fy2024: { value: "20,8%" }, ttm: { value: "~18,5%",color:"amber"}, e2026: { value: "~10–14%",color:"amber"} } },
          { cells: { metric: { value: "Aktieåterköp" }, fy2023: { value: "61,5"  }, fy2024: { value: "61,8"  }, ttm: { value: "~65"                }, e2026: { value: "~70 (auktoriserat)"  } } },
        ]}
      />

      <AlertBox type="risk">
        <strong>⚠️ Strategisk FCF-kompression:</strong> FCF-marginalen sjunker pga aggressiv CapEx (~$85Mdr 2025). Detta är en medveten strategisk "bränning" för att köpa framtida marknadsandelar i AI-infrastruktur — inte ett tecken på operativ ineffektivitet. När CapEx-toppen passeras och GCP:s marginaler (nu 20,7%) konverteras till FCF förväntas kraftig FCF-expansion från 2026.
      </AlertBox>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        <MetricCard label="ROE"            value="~30%"   trend="Stark kapitaleffektivitet" />
        <MetricCard label="Bruttomarginal" value="~57%"   trend="Stabil & hög" />
        <MetricCard label="Soliditet"      value="~72%"   trend="Exceptionell balansräkning" />
        <MetricCard label="GCP-marginal"   value="20,7%"  trend="Upp från 8,7% (Q2 2024)" />
      </div>

      <RatingBox rating={5}><strong>5/5</strong> — Balansräkningen är extremt solid med $95Mdr i nettokassa. FCF-genereringen är robust trots strategisk komprimering från historiskt höga CapEx. Den snabba marginalförbättringen i Cloud validerar investeringsstrategin.</RatingBox>
    </div>

    {/* IV. Värdering */}
    <div data-section="valuation" id="valuation" className="pt-14">
      <SectionHeader number="IV" title="Värdering & Jämförelse" />

      <FinancialTable
        title="Värderingsmultiplar"
        columns={[
          { key: "metric",  header: "Multipel" },
          { key: "current", header: "Nuv. (mars 2026)" },
          { key: "hist5",   header: "Historiskt snitt (5 år)" },
          { key: "comment", header: "Kommentar" },
        ]}
        rows={[
          { cells: { metric: { value: "P/E (TTM)"         }, current: { value: "~28x"  }, hist5: { value: "~23x"  }, comment: { value: "Liten premie, motiverad av AI-momentum"    } } },
          { cells: { metric: { value: "Forward P/E 2026e" }, current: { value: "~27x"  }, hist5: { value: "–"     }, comment: { value: "Analytikerkonsensus 23x — vi tillämpar premie" } } },
          { cells: { metric: { value: "EV/EBITDA (LTM)"   }, current: { value: "~19x"  }, hist5: { value: "~18x"  }, comment: { value: "Nära historiskt genomsnitt"                 } } },
          { cells: { metric: { value: "EV/FCF (LTM)"      }, current: { value: "~45x"  }, hist5: { value: "~41x"  }, comment: { value: "Förhöjd pga CapEx-komprimering av FCF", color: "amber" } } },
          { cells: { metric: { value: "FCF Yield"         }, current: { value: "~1,7%" }, hist5: { value: "~2,0%" }, comment: { value: "Lägre pga CapEx — återhämtar sig 2026"       } } },
        ]}
      />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Riktkurs — Värderingsmodell</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Bascase målpris <strong>$360</strong> bygger på 32x P/E × $11,24 (2026e EPS). En premie motiverad av sökmonopolet, GCP:s snabba lönsamhetsexpansion och Waymo/DeepMind-optionalitet. Analytikerkonsensus för 2026 P/E ligger på ~23x — vi tillämpar en premie givet AI-ledarpositionen. Bull case $420 förutsätter EPS-upprevidering till $13–14. Bear case $220 förutsätter regulatoriska strukturella åtgärder och P/E-kompression till 20x.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Relativ värdering — Tech Megacap Peers</h3>
      <FinancialTable
        title=""
        columns={[
          { key: "company",  header: "Bolag" },
          { key: "pe",       header: "P/E (nuv.)" },
          { key: "growth",   header: "EPS-tillväxt" },
          { key: "margin",   header: "EBIT-marginal" },
          { key: "comment",  header: "Kommentar" },
        ]}
        rows={[
          { cells: { company: { value: "Alphabet (GOOGL)" }, pe: { value: "~28x"  }, growth: { value: "+38% (FY24)", color: "green" }, margin: { value: "~33%"  }, comment: { value: "Signifikant rabatt vs MSFT"          } } },
          { cells: { company: { value: "Microsoft (MSFT)" }, pe: { value: "24,5x" }, growth: { value: "+17%"                        }, margin: { value: "47,1%", color: "green" }, comment: { value: "Bevisad AI-monetarisering i Azure" } } },
          { cells: { company: { value: "Meta (META)"      }, pe: { value: "~27x"  }, growth: { value: "+8%"                         }, margin: { value: "~41%"  }, comment: { value: "Jämförbar värdering"                  } } },
          { cells: { company: { value: "Amazon (AMZN)"    }, pe: { value: "~29x"  }, growth: { value: "+29%"                        }, margin: { value: "~12%"  }, comment: { value: "Lägre marginal, AWS-dominans"          } } },
          { cells: { company: { value: "Nvidia (NVDA)"    }, pe: { value: "~36x"  }, growth: { value: "+66%", color: "green"        }, margin: { value: "~65%",  color: "green" }, comment: { value: "Högst tillväxt och marginal"    } } },
        ]}
      />

      <RatingBox rating={4}><strong>4/5</strong> — Rimligt värderat i förhållande till hög kvalitet och tillväxtpotential. Rabatten mot Microsoft är betydande och ger en säkerhetsmarginal. CapEx-komprimeringen av FCF är tillfällig — när GCP:s marginaler expanderar ytterligare omvärderas aktien kraftigt.</RatingBox>
    </div>

    {/* V. Tillväxtmotorer */}
    <div data-section="growth" id="growth" className="pt-14">
      <SectionHeader number="V" title="Tillväxtmotorer & Triggers" />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">1. Google Cloud — Den primära tillväxtmotorn</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        GCP är bolagets snabbaste tillväxtmotor med målet att nå $100Mdr ARR. Tillväxten var 32% i Q2 2025 och GCP:s rörelsemarginal steg till 20,7% — upp dramatiskt från 8,7% ett år tidigare. I Q2 2025 låg Cloud på $50Mdr+ run-rate. Det planerade Wiz-förvärvet ($32Mdr, cybersäkerhet) stärker positionen ytterligare. Analytiker prognostiserar 35–50% tillväxt 2026 drivet av AI-efterfrågan och ett kontraktsbaklog på $155Mdr+. Cloud och YouTube tillsammans nådde en kombinerad run-rate på $110Mdr i slutet av 2024.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">2. Google Search + AI Overviews — Mer resilient än befarat</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Search växte +12% FY2024 och +15% i Q3 2025 trots ChatGPT-konkurrensen. AI Overviews når 1,5 miljarder användare/månad och ökar volymen kommersiella sökfrågor. Istället för kannibalisering stärker AI Overviews intäkterna per sökning. Ads i AI Overviews är den viktigaste katalysatorn att följa — initiala data visar att volymen kommersiella sökfrågor ökar.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">3. YouTube — Streaming + Prenumerationer</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        YouTube Ads: $36,1Mdr FY2024 (+13% YoY). YouTube + Google One: 270M+ betalande prenumeranter. YouTube leder i streaming watch time globalt och investerar i generativ video (Veo 2) för nästa generation av innehållsskapande. Connected TV-annonsering är en snabbväxande kategori där YouTube tar marknadsandelar från linjär TV.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">4. FCF-återhämtning 2026+ — Den finansiella katalysatorn</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        När 2025 års CapEx-topp planat ut kommer GCP:s stigande marginaler och stabila Services-intäkter att leda till kraftig FCF-expansion. Det pågående återköpsprogrammet ($70Mdr ytterligare auktoriserat april 2025) och den höjda kvartalsutdelningen ($0,21 efter 5% höjning Q1 2025) stödjer aktiekursen löpande.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">5. Waymo — Autonomi-optionalitet</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Waymo genomför ~450 000 betalda resor/vecka och söker kapital vid $100–110Mdr värdering. Sundar Pichai har sagt att Waymo ska bli "meaningful in our financials" 2027–2028. En framgångsrik Waymo-expansion kan addera $30–50+ per Alphabet-aktie — optionalitet som marknaden ännu inte prissätter fullt ut.
      </p>

      <FinancialTable
        title="Katalysatorer (12–24 månader)"
        columns={[
          { key: "catalyst", header: "Katalysator" },
          { key: "timing",   header: "Timing" },
          { key: "impact",   header: "Potentiell påverkan" },
        ]}
        rows={[
          { cells: { catalyst: { value: "AI Overview Ads — monetariseringsdata"     }, timing: { value: "Kvartalsvis"   }, impact: { value: "Hög",          color: "green" } } },
          { cells: { catalyst: { value: "GCP-tillväxt >35% med stigande marginal"   }, timing: { value: "Löpande"      }, impact: { value: "Hög",          color: "green" } } },
          { cells: { catalyst: { value: "FCF-återhämtning när CapEx toppar"         }, timing: { value: "2026"         }, impact: { value: "Hög",          color: "green" } } },
          { cells: { catalyst: { value: "Wiz-förvärv stänger & integreras"          }, timing: { value: "2026"         }, impact: { value: "Medel"                       } } },
          { cells: { catalyst: { value: "Waymo kapitalrunda + geografisk expansion" }, timing: { value: "2026"         }, impact: { value: "Hög risk/reward", color: "amber" } } },
          { cells: { catalyst: { value: "DOJ remedies — slutgiltigt beslut"         }, timing: { value: "2026"         }, impact: { value: "Hög — osäker",  color: "amber" } } },
        ]}
      />
    </div>

    {/* VI. Riskprofil */}
    <div data-section="risk" id="risk" className="pt-14">
      <SectionHeader number="VI" title="Riskprofil" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <MetricCard label="Risknivå"   value="Medel"  trend="Relativt ett megacap" />
        <MetricCard label="Risk-score" value="3/5"    trend="5 = Högst risk" />
      </div>

      <FinancialTable
        title="Riskmatris"
        columns={[
          { key: "risk",        header: "Risk" },
          { key: "category",    header: "Kategori" },
          { key: "probability", header: "Sannolikhet" },
          { key: "impact",      header: "Påverkan" },
        ]}
        rows={[
          { cells: { risk: { value: "DOJ antitrust — beteendemässiga åtgärder" }, category: { value: "Regulatorisk" }, probability: { value: "Hög"       }, impact: { value: "Medel",        color: "amber" } } },
          { cells: { risk: { value: "DOJ antitrust — strukturell uppdelning"   }, category: { value: "Regulatorisk" }, probability: { value: "Låg"       }, impact: { value: "Mycket hög",   color: "amber" } } },
          { cells: { risk: { value: "AI disruption av Search"                  }, category: { value: "Teknologisk"  }, probability: { value: "Låg–Medel" }, impact: { value: "Hög",          color: "amber" } } },
          { cells: { risk: { value: "CapEx ger ej tillräcklig ROI"            }, category: { value: "Finansiell"   }, probability: { value: "Medel"     }, impact: { value: "Hög",          color: "amber" } } },
          { cells: { risk: { value: "Annonsmarknad — konjunkturavmattning"    }, category: { value: "Makro"        }, probability: { value: "Medel"     }, impact: { value: "Hög",          color: "amber" } } },
          { cells: { risk: { value: "EU DMA — Google Play, ekosystem"         }, category: { value: "Regulatorisk" }, probability: { value: "Hög"       }, impact: { value: "Medel"                        } } },
          { cells: { risk: { value: "TikTok-konkurrens mot YouTube"           }, category: { value: "Konkurrens"   }, probability: { value: "Hög"       }, impact: { value: "Medel"                        } } },
          { cells: { risk: { value: "Valutarisker (stark USD)"               }, category: { value: "Finansiell"   }, probability: { value: "Medel"     }, impact: { value: "Låg"                          } } },
        ]}
      />

      <AlertBox type="risk">
        <strong>⚠️ DOJ Antitrust:</strong> En domstol fastslog i augusti 2024 att Google brutit mot antitrustlagar rörande sökverksamheten. Strukturell uppdelning (Chrome/Android) undveks i september 2025 — utfallet blev beteendemässiga krav. Remedies-fasen är dock inte avslutad och eventuella ytterligare krav kan komma under 2026. EU DMA-utredningar om Google Play pågår parallellt. Regulatorisk klarhet är en positiv katalysator när den väl kommer.
      </AlertBox>

      <RatingBox rating={3}><strong>3/5 risk</strong> — Finansiell risk är låg tack vare stark balansräkning och hög kassaflödesgenerering. Strukturell regulatorisk risk är förhöjd men minskat sedan strukturell uppdelning undveks. Bolagets snabba anpassning visar att riskerna är hanterbara.</RatingBox>
    </div>

    {/* VII. ESG & Makro */}
    <div data-section="esg" id="esg" className="pt-14">
      <SectionHeader number="VII" title="ESG & Makroekonomiska Faktorer" />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Miljö (E)</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Alphabet driver ett ambitiöst hållbarhetsarbete med målet om net-zero utsläpp och 24/7 koldioxidfri energi (CFE) till 2030. Den enorma CapEx-satsningen ökar energibehovet dramatiskt — bolaget möter detta via investeringar i ren energiproduktion inklusive Small Modular Reactors (SMR). MSCI ESG-rating: AAA. Proaktiv hantering mildrar miljörisken men energibehovet kvarstår som en utmaning givet AI-skalningen.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Socialt (S)</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Alphabet hade 187 103 anställda per Q2 2025. AI Opportunity Fund ($120M) utbildar människor inom AI globalt. Den största sociala utmaningen är etiska konsekvenser av Generativ AI — bolaget adresserar detta via fastställda AI-principer och säkerhetsinvesteringar. En unrealiserad vinst på $8Mdr i Q1 2025 (icke-marknadsförbara aktier) visar bolagets förmåga att generera Alpha via riskkapitalinvesteringar i Other Bets.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Styrning (G)</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Den duala aktiestrukturen ger grundarna 52,1% av röstmakten via Class B-aktier, vilket möjliggör långsiktiga beslut men minskar minoritetsägares inflytande. Obligationsemissionen ($12,5Mdr, maj 2025) för att finansiera CapEx medan operativt kassaflöde allokeras till återköp är ett intelligent kapitalallokerings­beslut. Styrningen stärktes med utnämning av Chief ESG Officer 2024.
      </p>

      <FinancialTable
        title="Makroekonomiska faktorer"
        columns={[
          { key: "factor",    header: "Makrofaktor" },
          { key: "impact",    header: "Påverkan" },
          { key: "direction", header: "Riktning" },
        ]}
        rows={[
          { cells: { factor: { value: "Annonskonjunktur"    }, impact: { value: "Direkt påverkan på ~75% av intäkterna"       }, direction: { value: "Neutral 2026",  color: "amber" } } },
          { cells: { factor: { value: "AI-investeringsboom" }, impact: { value: "Driver Cloud och infrastrukturefterfrå­gan"  }, direction: { value: "Starkt positiv", color: "green" } } },
          { cells: { factor: { value: "USD-styrka"          }, impact: { value: "Pressar ex-USA intäkter negativt"            }, direction: { value: "Negativ",        color: "amber" } } },
          { cells: { factor: { value: "Enterprise IT-budget"}, impact: { value: "AI-drivna investeringar stödjer GCP"         }, direction: { value: "Positiv",        color: "green" } } },
          { cells: { factor: { value: "Räntor (höga)"       }, impact: { value: "Begränsad — stark nettokassa $70Mdr+"        }, direction: { value: "Neutral"                       } } },
          { cells: { factor: { value: "Regulatorisk miljö"  }, impact: { value: "DOJ + EU DMA — påtagliga men hanterbara"     }, direction: { value: "Negativ risk",   color: "amber" } } },
        ]}
      />
    </div>

    {/* VIII. AI-observationer */}
    <div data-section="ai-obs" id="ai-obs" className="pt-14">
      <SectionHeader number="VIII" title="AI-observationer & Avvikande mönster" />

      <div className="bg-[#0f1a0f] rounded p-4 mb-4 font-mono">
        <div className="text-[#40d040] text-[10px] tracking-widest mb-2">◈ AI-ANALYSMODUL AKTIVERAD · ALPHABET INC. · 10 MARS 2026</div>
        <div className="text-[#80e080] text-xs leading-loose">► Sentimentanalys: BULLISH (76/100) | Omvärdering pågår sedan H2 2025 — "AI winner"-narrativ befäst</div>
        <div className="text-[#80e080] text-xs leading-loose">► Analytikerkonsensus: 41/41 = KÖP/Strong Buy | Snittpris $351–367</div>
        <div className="text-[#80e080] text-xs leading-loose">► Q3 2025: Omsättning $102,3Mdr — historisk milstolpe, EPS $3,10 kraftig beat</div>
        <div className="text-[#80e080] text-xs leading-loose">► GCP-marginal Q2 2025: 20,7% — upp från 8,7% ett år tidigare</div>
        <div className="text-[#80e080] text-xs leading-loose">► DOJ: Strukturell uppdelning undveks sept 2025 — beteendemässiga krav kvarstår</div>
      </div>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Positiv omvärdering under 2025</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-3">
        Marknadssentimentet kring Alphabet har genomgått en betydande positiv omvärdering. Tidigare investeraroro över bolagets AI-positionering har ersatts av optimism — bolaget ses nu som en tydlig "generative-AI winner". Q3 2025 med >$100Mdr kvartal bekräftade detta. CapEx-planen ($85Mdr 2025) bör tolkas som en medveten strategisk manöver — en upprepning av historiska mönster där aggressiva investeringsvågor ledde till marknadsdominans (GCP, Android, YouTube).
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Search mer resilient än befarat</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Konsensusnarrativet 2023–2024 var att ChatGPT skulle kannibalisera Google Search. Utfallet är det motsatta — Search +15% i Q3 2025 och AI Overviews ökar komplexiteten i sökfrågor och annonsintäkterna per sökning. Detta är en signifikant positiv avvikelse mot ursprungsförväntningarna och en central anledning till omvärderingen.
      </p>

      <AlertBox type="info">
        <strong>💡 EPS-estimaten kan vara konservativa:</strong> Analytikernas 2026e EPS ~$11,24 förutsätter blygsam tillväxt jämfört med TTM Q2 2025 ($9,48). Om GCP levererar 40–50% tillväxt och Search håller +12% finns upprevideringsrisk mot $13–14 EPS — vilket ger målpris $415–450 vid 32x P/E. GCP:s marginalexpansion (8,7% → 20,7% på ett år) är den starkaste signalen för denna upprevidering.
      </AlertBox>

      <FinancialTable
        title="Datapunkter att bevaka"
        columns={[
          { key: "datapoint",  header: "Datapunkt" },
          { key: "why",        header: "Varför viktig" },
          { key: "frequency",  header: "Frekvens" },
        ]}
        rows={[
          { cells: { datapoint: { value: "AI Overview Ads — intäkter per sökning (RPM)"  }, why: { value: "Bevisar AI-monetarisering av Search"    }, frequency: { value: "Kvartalsvis" } } },
          { cells: { datapoint: { value: "GCP tillväxttakt & rörelsemarginal"            }, why: { value: "Primär ny intäktsdrivare"               }, frequency: { value: "Kvartalsvis" } } },
          { cells: { datapoint: { value: "DOJ remedies — slutgiltigt beslut"             }, why: { value: "Strukturell risk — okänd variabel"      }, frequency: { value: "2026"        } } },
          { cells: { datapoint: { value: "Waymo — ridvolym och kapitalrunda"             }, why: { value: "Optionalitetsvärde i aktien"            }, frequency: { value: "Halvårsvis"  } } },
          { cells: { datapoint: { value: "CapEx-guidance vs Cloud-intäkter ratio"        }, why: { value: "ROI på AI-infrastruktur"                }, frequency: { value: "Kvartalsvis" } } },
          { cells: { datapoint: { value: "YouTube Subscription-tillväxt"                }, why: { value: "Diversifiering bort från annonsintäkter" }, frequency: { value: "Kvartalsvis" } } },
        ]}
      />
    </div>

    {/* IX. Investeringsbeslut */}
    <div data-section="verdict" id="verdict" className="pt-14">
      <SectionHeader number="IX" title="Sammanfattning & Investeringsbeslut" />

      <div className="bg-[#0f0f0f] text-[#faf8f3] rounded p-5 mb-5">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <div className="text-[10px] text-[#b5892a] tracking-widest uppercase mb-1">Investeringsrekommendation</div>
            <div className="font-serif text-4xl font-bold text-[#80e080]">▲ KÖP</div>
            <div className="text-sm text-[#a0a090] mt-1">Med 12–18 månaders horisont</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#b5892a] tracking-widest uppercase">Målpris</div>
            <div className="font-serif text-4xl font-bold">$360</div>
            <div className="text-xs text-[#80e080]">+17% potential från $307</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {[
            { label: "Analysdatum",         value: "10 mars 2026" },
            { label: "Kurs vid analys",     value: "$307" },
            { label: "Målpris (12–18 mån)", value: "$360" },
            { label: "Bull case",           value: "$420" },
            { label: "Bear case",           value: "$220" },
          ].map((kpi) => (
            <div key={kpi.label} className="border-l-2 border-[#b5892a] pl-2.5">
              <div className="text-[9px] text-[#808070] uppercase tracking-wide">{kpi.label}</div>
              <div className="font-serif text-sm font-bold">{kpi.value}</div>
            </div>
          ))}
        </div>
      </div>

      <FinancialTable
        title="Kvalitetsbolag-kriterierna"
        columns={[
          { key: "criteria", header: "Kriterium" },
          { key: "result",   header: "Uppfyllt?" },
          { key: "comment",  header: "Kommentar" },
        ]}
        rows={[
          { cells: { criteria: { value: "Uthållig affärsmodell"    }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "Sökmonopol + GCP + YouTube — AI-first"   } } },
          { cells: { criteria: { value: "Stark moat"              }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "Full-stack AI, nätverkseffekter, TPUs"    } } },
          { cells: { criteria: { value: "Konsistent vinsttillväxt"}, result: { value: "✅ Ja",     color: "green" }, comment: { value: "EPS +38% FY2024, +49% Q1 2025"           } } },
          { cells: { criteria: { value: "Stark balansräkning"     }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "$95Mdr nettokassa, soliditet 72%"         } } },
          { cells: { criteria: { value: "Hög kapitalavkastning"   }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "ROE ~30%, ROIC > WACC"                   } } },
          { cells: { criteria: { value: "Kompetent ledning"       }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "Pichai + Hassabis (Nobelpriset) — topp"  } } },
          { cells: { criteria: { value: "Attraktiv värdering"     }, result: { value: "⚠️ Delvis", color: "amber" }, comment: { value: "28x P/E — motiverat men inte billigt"    } } },
          { cells: { criteria: { value: "Regulatorisk risk"       }, result: { value: "⚠️ Risk",   color: "amber" }, comment: { value: "DOJ + EU DMA — hanterbara men påtagliga" } } },
          { cells: { criteria: { value: "5–10 år ägbarhet"        }, result: { value: "✅ Ja",     color: "green" }, comment: { value: "AI + Cloud + Waymo = generationsskifte"  } } },
        ]}
      />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-2 pl-2 border-l-[3px] border-[#b5892a]">Motivering</h3>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-3">
        Alphabet är ett utmärkt kvalitetsbolag med en oöverträffad finansiell ställning och ett teknologiskt försprång inom det mest betydande strukturella skiftet på decennier: Generativ AI. Bolagets strategi bygger på full-stack dominans — från egenutvecklade TPU-chips (gen. 7 Ironwood) och världsledande AI-forskning (DeepMind/Gemini 2.5) till globala distributionsplattformar med miljarder användare. Sökmonopolet har visat sig mer resilient än befarat och AI Overviews stärker snarare än hotar intäkterna.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Den nuvarande CapEx-cykeln ($85Mdr 2025) är en offensiv åtgärd för att befästa AI-ledarskapet och valideras av GCP:s snabbt stigande lönsamhet (8,7% → 20,7% på ett år). Värderat till ~28x P/E med massiv optionalitet i Waymo och en Cloud-affär som accelererar mot $100Mdr ARR framstår aktien som attraktiv. Regulatoriska risker är reella men hanterbara — strukturell uppdelning undveks. En långsiktig investering (5–10 år) stöds av den robusta balansräkningen och bolagets bevisade förmåga att leda teknikskiften.
      </p>

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-5 mb-3 pl-2 border-l-[3px] border-[#b5892a]">Samlade scores</h3>
      <div className="space-y-2 mb-5">
        {[
          { label: "Affärsmodell & Ledning (I)",  rating: 5 },
          { label: "Strategisk moat (II)",         rating: 5 },
          { label: "Finansiell kvalitet (III)",    rating: 5 },
          { label: "Värdering (IV)",               rating: 4 },
          { label: "Riskprofil (VI)",              rating: 3 },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs text-[#8a8678] w-48 flex-shrink-0">{item.label}</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((dot) => (
                <div key={dot} className={`w-3.5 h-3.5 rounded-sm ${dot <= item.rating ? "bg-[#1a3c6e]" : "bg-[#e8e4da]"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-[#1a3c6e] font-serif">{item.rating}/5</span>
          </div>
        ))}
      </div>

      <AlertBox type="signal">
        <strong>✅ Slutsats: KÖP</strong> — Alphabet kombinerar ett av teknikhistoriens starkaste sökmonopol med en snabbväxande och alltmer lönsam Cloud-affär (GCP-marginal 20,7% Q2 2025) och world-class AI-kapacitet i DeepMind. Q3 2025 visade att bolaget är tillbaka i offensiven — historisk milstolpe med >$100Mdr i kvartalsomsättning. Regulatorisk risk (DOJ) är reell men hanteras — vi ser $360 som rimligt bascase och köper vid nuvarande nivåer kring $307.
      </AlertBox>
    </div>

    {/* X. Scenarier */}
    <div data-section="scenarios" id="scenarios" className="pt-14">
      <SectionHeader number="X" title="Scenarier: Bull, Base & Bear Case" />

      <ScenarioCards scenarios={scenarios} />

      <h3 className="text-xs font-bold text-[#1a3c6e] uppercase tracking-widest mt-6 mb-3 pl-2 border-l-[3px] border-[#b5892a]">Sannolikhetsfördelning</h3>
      <div className="space-y-3 mb-5">
        {[
          { label: "Bull case ($420)", pct: 25, color: "#1a6e3c", textColor: "text-[#1a6e3c]" },
          { label: "Base case ($360)", pct: 50, color: "#1a3c6e", textColor: "text-[#1a3c6e]" },
          { label: "Bear case ($220)", pct: 25, color: "#8b1a1a", textColor: "text-[#8b1a1a]" },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold">{item.label}</span>
              <span className={`text-xs font-bold ${item.textColor}`}>{item.pct}%</span>
            </div>
            <div className="bg-[#e8e4da] rounded h-2 overflow-hidden">
              <div className="h-full rounded" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Sannolikhetsviktat förväntat värde: (0,25 × $420) + (0,50 × $360) + (0,25 × $220) = <strong>$340</strong> — något under bascase-målpriset på $360, vilket reflekterar den kvarstående regulatoriska risken. Ändå ger detta +11% från nuvarande $307. Bull case (+37%) ger attraktivt riskjusterat läge givet Alphabets fundamentala kvalitet och AI-positionering.
      </p>

      <div className="bg-[#0f0f0f] text-[#faf8f3] rounded p-4 text-center">
        <div className="text-[10px] text-[#b5892a] tracking-widest uppercase mb-1">Probability-Weighted Målpris</div>
        <div className="font-serif text-5xl font-bold">$340</div>
        <div className="text-xs text-[#80e080] mt-1">+11% potential från nuvarande $307</div>
        <div className="text-[10px] text-[#808070] mt-2">Analyserat 10 mars 2026 · Ej finansiell rådgivning</div>
      </div>
    </div>

  </div>
</AnalysisLayout>
```

);
}
