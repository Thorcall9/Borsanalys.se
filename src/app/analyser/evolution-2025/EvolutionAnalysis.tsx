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
ScoreBreakdown,
} from "@/components/analysis";
import {
ACCENT,
sections,
swotData,
scenarios,
financialRows,
efficiencyRows,
pegRows,
evMatrixRows,
} from "./data";

export default function EvolutionAnalysis() {
const analysisData = useMemo(() => {
const scores = {
affarsmodell:      5,
strategiskMoat:    5,
finansiellKvalitet: 4,
vardering:         4,
tillvaxtutsikter:  3,
riskprofil:        3,
esgMakro:          3,
aiObservationer:   4,
};
return { scores };
}, []);

return (
<AnalysisLayout
companyName="Evolution"
subtitle="Nasdaq Stockholm · EVO · ISIN: SE0018538068"
date="21 mars 2026"
dataSources="Bokslutskommuniké 2025, Q3 2025-presentation, Q2 2025-rapport, S&P Pro-estimat"
sections={sections}
accentColor={ACCENT}
>
<div className="max-w-5xl mx-auto px-6 sm:px-12 pb-20">

```
    {/* ── I. ÖVERSIKT ─────────────────────────────────────────────────── */}
    <section id="overview" data-section="overview" className="mb-16 pt-12">
      <SectionHeader number="I" title="Översikt" />
      <ScoreBreakdown scores={analysisData.scores} accentColor={ACCENT}>
        <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
          <span className="text-sm font-bold">Rekommendation:</span>
          <span className="text-xl font-bold font-serif text-green-700">KÖP</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#e8e4da]">
          <span className="text-sm font-bold">Målpris (12 mån):</span>
          <span className="text-xl font-bold font-serif text-[#1a3c6e]">SEK 720</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-bold">Riskjust. EV-avkastning:</span>
          <span className="text-xl font-bold font-serif text-green-700">+21%</span>
        </div>
      </ScoreBreakdown>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Börskurs (mars 2026)" value="~SEK 577" />
        <MetricCard label="P/E (nuläge)"          value="9,95x" />
        <MetricCard label="Just. EBITDA-marginal" value="66,1%" />
        <MetricCard label="Direktavkastning 2026e" value="5,3%" />
      </div>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Evolution är världens ledande B2B-leverantör av live casino-lösningar till speloperatörer.
        Grundat 2006 i en liten Lettland-studio har bolaget vuxit till en global aktör med 870+
        operatörskunder, 22 475 anställda och studior på fyra kontinenter. Affärsmodellen är
        provisionsbaserad — Evolution tar en andel av de spelintäkter (GGR) som operatörernas
        spelare genererar, vilket skapar återkommande, skalbara intäkter utan direkt kundanskaffningskostnad.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        2025 var ett utmanande år: omsättningstillväxten kollapsade till +0,2%, EPS föll 11,8%
        och utdelningen ställdes in. Bakom rubrikerna döljer sig dock ett bolag med 818 MEUR i
        likvida medel, noll räntebärande skulder och en operativ kassaflödesgenereringsförmåga
        på 1 255 MEUR per år. Kursen på ~577 kr ger ett P/E på under 10x — historiskt exceptionellt
        lågt för ett bolag med Evolutions kvalitetsprofil.
      </p>
      <AlertBox type="info">
        Köprekommendationen bygger på riskjusterad analys. Marknaden prisar in ett brittiskt
        worst-case-scenario med hög sannolikhet — vi bedömer den lägre. Säkerhetsmarginalen
        ligger i gapet mellan marknadens rädsla och den operationella verkligheten. Läs
        riskanalysen (sektion VI) noggrant.
      </AlertBox>
    </section>

    {/* ── II. STRATEGISK MOAT ─────────────────────────────────────────── */}
    <section id="moat" data-section="moat" className="mb-16">
      <SectionHeader number="II" title="Strategisk Moat" />
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Evolutions moat är djup och mångdimensionell. Teknologiplattformen med låg latens och hög
        videokvalitet kräver enorma investeringar och år av tuning. Produktportföljen —
        Lightning Roulette, Crazy Time, MONOPOLY Live — har blivit egna varumärken som spelare
        aktivt söker, vilket driver lojalitet hos operatörerna.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        <strong>Switching costs</strong> är höga: en operatör som byter live casino-leverantör
        riskerar att tappa spelare som är vana vid specifika Evolution-titlar. Det självförstärkande
        ekosystemet med 870+ operatörer gör att intäkterna växer med marknadens tillväxt snarare
        än att behöva erövras aktivt. Varje ny operatör som ansluter ökar nätverkets värde för
        alla befintliga kunder.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Hasbro-partnerskapet (exklusivt flerårigt avtal, ingånget 2025) tillför ytterligare
        ett differentieringslager — ikoniska varumärken som MONOPOLY, Game Night och fler
        kommande titlar som konkurrenter inte kan replikera. VD Martin Carlesund beskriver
        produktplanen för 2026 som "inget mindre än spektakulär".
      </p>
    </section>

    {/* ── III. FINANSIELL ANALYS ──────────────────────────────────────── */}
    <section id="financials" data-section="financials" className="mb-16">
      <SectionHeader number="III" title="Finansiell analys" />
      <FinancialTable
        columns={[
          { key: "metric",  header: "Nyckeltal" },
          { key: "FY2023",  header: "FY2023" },
          { key: "FY2024",  header: "FY2024" },
          { key: "FY2025",  header: "FY2025" },
          { key: "FY2026e", header: "FY2026e" },
          { key: "FY2027e", header: "FY2027e" },
        ]}
        rows={financialRows}
      />
      <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-4">
        Balansräkningen är i enastående skick. De 194 MEUR i långfristiga skulder utgörs
        nästan uteslutande av leasingskulder — räntebärande skuld är i praktiken noll. Med
        818 MEUR i likvida medel och en obligationsportfölj på 104 MEUR har bolaget en
        nettokassaposition som ger enorm finansiell flexibilitet för förvärv, återköp och expansion.
      </p>
      <AlertBox type="info">
        ROE på 26% och ROCE på 26% är starka absoluta tal — men observera att de föll från
        31,6% 2024. Det är ett mönster att bevaka. Faller ROE under 20% är det en tydlig signal
        om försämrad kapitaleffektivitet.
      </AlertBox>
    </section>

    {/* ── IV. VÄRDERING & PEG ─────────────────────────────────────────── */}
    <section id="valuation" data-section="valuation" className="mb-16">
      <SectionHeader number="IV" title="Värdering & PEG" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <MetricCard label="P/E (nuläge)"    value="9,95x" />
        <MetricCard label="EV/EBITDA"       value="7,5x" />
        <MetricCard label="Earnings Yield"  value="10,1%" />
        <MetricCard label="Direktavk. 2026e" value="5,3%" />
      </div>
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Evolution handlas till historiskt låga multiplar. P/E på ~10x för ett bolag med
        66%+ EBITDA-marginal, nettokassa och dominerande marknadsposition är exceptionellt.
        Historiska multiplar har legat på 20–30x P/E under tillväxtåren. En
        <strong> Earnings Yield</strong> på 10,1% — inversen av P/E — innebär att bolaget
        ger mer vinstavkastning än en statsobligation med mångfalt bättre underliggande kvalitet.
      </p>

      {/* PEG-varning */}
      <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-3">
          ⚠ PEG-varning — 2027e signalerar dyrt relativt tillväxt
        </p>
        <p className="text-sm text-[#2a2a2a] mb-4">
          <strong>PEG-talet</strong> (Price/Earnings to Growth) sätter P/E i relation till
          EPS-tillväxttakten. Under 1 = billigt, över 2 = dyrt relativt tillväxt. Med
          konsensusestimat från S&P Pro:
        </p>
        <FinancialTable
          columns={[
            { key: "year",      header: "År" },
            { key: "eps",       header: "EPS (EUR)" },
            { key: "epsGrowth", header: "EPS-tillväxt" },
            { key: "pe",        header: "P/E" },
            { key: "peg",       header: "PEG" },
            { key: "signal",    header: "Signal" },
          ]}
          rows={pegRows}
        />
        <p className="text-xs text-[#666] mt-3 leading-relaxed">
          PEG 3,4 för 2027e är en tydlig varningsflagga. Köprekommendationen bygger på att
          2026 levererar över förväntan och att tillväxten sedan accelererar bortom konsensus.
          Om EPS-tillväxten stannar på 2% per år bör målpriset revideras ned ytterligare.
        </p>
      </div>

      <p className="text-sm leading-relaxed text-[#2a2a2a]">
        Direktavkastningen på 5,3% (2026e) är en viktig stödnivå som lockar tillbaka
        utdelningsinriktade institutionella ägare som sålde vid utdelningsindragningen 2025.
        Återkomsten av utdelningen är i sig en katalysator.
      </p>
    </section>

    {/* ── V. TILLVÄXTMOTORER ──────────────────────────────────────────── */}
    <section id="growth" data-section="growth" className="mb-16">
      <SectionHeader number="V" title="Tillväxtmotorer" />
      <AlertBox type="risk">
        Tillväxtbetyg: 3/5 — Stabil, ej stark. Estimaten talar tydligt: omsättningstillväxt
        8% → 6% → 4% och EPS-tillväxt 2–4%/år. USA och LatAm är reella möjligheter men ännu
        inte bevisade i siffrorna. Potential räknas inte som leverans.
      </AlertBox>
      <div className="space-y-4 mt-6">
        <div className="border-l-4 border-[#1a3c6e] pl-4">
          <h3 className="text-sm font-bold text-[#1a3c6e] mb-1">
            🇺🇸 USA — Det stora priset (ännu ej inprisat)
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Evolution är nu representerat i alla 7 US-stater med online casino. Ezugi
            återlanserades i New Jersey med målet att bli näst störst. Ny studio planeras i
            Grand Rapids, Michigan. Onlinespel i USA är fortfarande i sin absoluta linda —
            under 20% av spelmarknaden är online vs. 50–80% i Europa.
          </p>
        </div>
        <div className="border-l-4 border-[#b5892a] pl-4">
          <h3 className="text-sm font-bold text-[#b5892a] mb-1">
            🌎 Latinamerika — Brasilien accelererar
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Brasilien reglerade online-spel 2025. Studio öppnad i São Paulo. LatAm växer
            +6% YoY (Q3/25) och är nu en stabil pelare på ~40 MEUR/kvartal. Colombia och
            Mexico öppnar successivt.
          </p>
        </div>
        <div className="border-l-4 border-[#16a34a] pl-4">
          <h3 className="text-sm font-bold text-[#16a34a] mb-1">
            🎲 Hasbro-exklusivavtal — Unik IP-differentiering
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Exklusivt flerårigt licensavtal med Hasbro (ingånget mid-2025). Spel under
            utveckling: MONOPOLY Filthy Rich, Game Night och flera RNG-titlar. Konkurrenter
            kan inte replikera dessa varumärken.
          </p>
        </div>
        <div className="border-l-4 border-[#7c3aed] pl-4">
          <h3 className="text-sm font-bold text-[#7c3aed] mb-1">
            📈 Reglerade marknader — Strukturell rygvind
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Andel reglerade marknader: 41% (Q4/24) → 47% (Q4/25). Reglerade marknader
            är mer stabila, förutsägbara och ger lägre long-tail regulatorisk risk. Trenden
            är strukturell och gynnar Evolution på 3–5 års sikt.
          </p>
        </div>
      </div>
    </section>

    {/* ── VI. RISKPROFIL & UKGC ───────────────────────────────────────── */}
    <section id="risk" data-section="risk" className="mb-16">
      <SectionHeader number="VI" title="Riskprofil & UKGC" />

      {/* UKGC binär risk */}
      <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-red-700 mb-3">
          ⚠ Binär risk: UK Gambling Commission (UKGC)
        </p>
        <p className="text-sm text-[#2a2a2a] mb-3">
          UKGC inledde en granskning av Evolutions maltesiska holdingbolag i december 2024
          under sektion 116 av Gambling Act 2005. Utfallet är fortfarande okänt.
          Risken är <em>binär</em> — antingen böter och åtgärdsplaner, eller licensindragning
          i värsta fall.
        </p>
        <p className="text-sm text-[#2a2a2a] mb-3">
          <strong>Contagion-risk:</strong> Om UKGC drar licensen — vad händer med licenser
          i USA, Ontario och Malta? Varje jurisdiktion granskar självständigt, men en
          UKGC-sanktion ökar granskningstrycket globalt. Historiskt har regulatorer i New
          Jersey och Ontario agerat oberoende, men en allvarlig UKGC-dom skapar prejudikat.
        </p>
        <p className="text-sm text-[#2a2a2a]">
          <strong>Vår sannolikhetsbedömning:</strong> Fullständig licensindragning ~5–10%.
          Betydande böter (50–300 MEUR) ~30–35%. Liten sanktion eller ingen påföljd ~55–65%.
          Marknaden verkar prisa in det mellersta scenariot tyngre — det är den asymmetri vi
          nyttjar. <em>Investerare med låg risktolerans: minska positionsstorleken snarare än
          att avvakta helt.</em>
        </p>
      </div>

      <SwotGrid data={swotData} />

      <p className="text-sm leading-relaxed text-[#2a2a2a] mt-6 mb-2">
        <strong>Asien:</strong> Cyberbrottslighet och piratkopiering av videoströmmar tryckte
        ned Asien-intäkterna under hela 2025. Men Q4/25 visade QoQ-tillväxt för första gången
        på länge (189 → 194 MEUR) — ett tecken på att bekämpningsarbetet börjar bära frukt.
      </p>
      <p className="text-sm leading-relaxed text-[#2a2a2a]">
        <strong>Finansiell risk:</strong> Praktiskt taget obefintlig. Noll räntebärande skulder,
        818 MEUR i kassa, soliditet 73,8%. En ränteuppgång, recession eller valutachock drabbar
        Evolution minimalt jämfört med skuldtyngda konkurrenter.
      </p>
    </section>

    {/* ── VII. SEGMENTANALYS ──────────────────────────────────────────── */}
    <section id="segments" data-section="segments" className="mb-16">
      <SectionHeader number="VII" title="Segmentanalys" />
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-6">
        Evolution rapporterar geografiska intäkter baserat på operatörernas spelares
        IP-adresser — det ger den mest rättvisande bilden av var spelarna faktiskt befinner sig.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Europa (~35%)
          </h3>
          <p className="text-sm text-[#2a2a2a] mb-2">
            177,6 MEUR i Q4/25. YoY –6,5% pga ringfencing. Stabilt QoQ +1,1% — bottnen
            kan vara nådd.
          </p>
          <p className="text-xs text-[#666]">Risk: ytterligare ringfencing-åtgärder</p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Asien (~38%)
          </h3>
          <p className="text-sm text-[#2a2a2a] mb-2">
            193,6 MEUR i Q4/25. Volatil men vände upp QoQ i Q4. Ny studio i Filippinerna
            off to a good start.
          </p>
          <p className="text-xs text-[#666]">Risk: cyberbrottslighet, oreglerade marknader</p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Nordamerika (~15%)
          </h3>
          <p className="text-sm text-[#2a2a2a] mb-2">
            77,1 MEUR i Q4/25. YoY +9,2%. Ezugi-återlansering + Grand Rapids-studio. Störst
            tillväxtpotential.
          </p>
          <p className="text-xs text-[#666]">Möjlighet: 7 stater, mer reglering väntas</p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            LatAm (~8%)
          </h3>
          <p className="text-sm text-[#2a2a2a] mb-2">
            43,2 MEUR i Q4/25. YoY +15,3%. Brasilien-studio öppnad. Accelererande tillväxt.
          </p>
          <p className="text-xs text-[#666]">Möjlighet: reglering + lokal studio = katalysator</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#2a2a2a]">
        <strong>Live vs. RNG:</strong> Live casino (1 773 MEUR, 86% av intäkterna) är kärnprodukten
        med de högsta marginalerna. RNG (294 MEUR, 14%) växer på 2,3% och underpresterar — Nolimit
        City är stark men övriga RNG-varumärken bidrar svagt.
      </p>
    </section>

    {/* ── VIII. MARGINALDJUPDYKNING ────────────────────────────────────── */}
    <section id="margins" data-section="margins" className="mb-16">
      <SectionHeader number="VIII" title="Marginaldjupdykning" />
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Från 68,4% justerad EBITDA-marginal 2024 till 66,1% 2025 — en minskning med 2,3
        procentenheter som representerar ~47 MEUR i "borttappat" EBITDA vid oförändrad omsättning.
        Det avslöjar en identitetskris: <strong>är Evolution ett mjukvarubolag (höga marginaler,
        skalning utan proportionell kostnadsökning) eller ett personalintensivt tjänsteföretag
        (varje nytt bord kräver 20–30 croupierer i roterande skift)?</strong>
      </p>

      <FinancialTable
        columns={[
          { key: "metric", header: "Effektivitetsmått" },
          { key: "FY2023", header: "FY2023" },
          { key: "FY2024", header: "FY2024" },
          { key: "FY2025", header: "FY2025" },
        ]}
        rows={efficiencyRows}
      />

      <div className="space-y-4 mt-6">
        <div className="border-l-4 border-red-400 pl-4">
          <h3 className="text-sm font-bold text-red-700 mb-1">
            1. Löneinflation i studionätverket
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Personalkostnader ökade +8,9% 2025 mot omsättningstillväxt på +0,2%. Evolutions
            flesta croupierer sitter i Lettland, Georgien och Malta där lönerna inflationstrycks.
            "Resource mix optimization" nämns explicit i Q3-rapporten — ledningen är medveten.
          </p>
        </div>
        <div className="border-l-4 border-amber-400 pl-4">
          <h3 className="text-sm font-bold text-amber-700 mb-1">
            2. Revenuemix: Aggregatorer vs. Direktförsäljning
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Snabb tillväxt i Asien och LatAm sker till stor del via <em>aggregatorer</em> —
            mellanhänder som tar en cut av GGR. Det ger lägre nettomarginal per spel vs.
            direktoperatörer i Europa (Bet365, William Hill etc.). Andelen reglerade marknader
            (47% Q4/25) är strukturellt positivt på lång sikt men innebär kortsiktigt att de
            historiskt lönsammaste marknaderna tappar andel.
          </p>
        </div>
        <div className="border-l-4 border-blue-400 pl-4">
          <h3 className="text-sm font-bold text-blue-700 mb-1">
            3. RNG-segmentet underpresterar
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            RNG (294 MEUR, +2,3% 2025) levererar sämre marginal än Live casino och kräver
            spelstudio-investeringar. Nolimit City är stark, men övriga RNG-varumärken drar
            ned snittet. Inga tecken på vändning i närtid.
          </p>
        </div>
      </div>

      <AlertBox type="info">
        Ledningens guide för 2026: EBITDA-marginal i linje med 2025 (66–68%). Det innebär
        att ledningen <em>inte förväntar sig en marginalåterhämtning</em> — det är ärligt och
        sätter realistiska förväntningar. Om marginalerna mot förmodan håller 67%+ under H1/26
        är det en positiv surpris.
      </AlertBox>
    </section>

    {/* ── IX. KAPITALALLOKERING ────────────────────────────────────────── */}
    <section id="capital" data-section="capital" className="mb-16">
      <SectionHeader number="IX" title="Kapitalallokering" />
      <p className="text-sm font-semibold text-[#1a3c6e] mb-1">
        Kapitalallokeringens psykologi vs. Matematik
      </p>

      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Att ett moget, kassaflödesstarkt bolag som Evolution helt ställer in utdelningen
        väcker legitimt oro. Marknaden tolkar ofta det som dolda problem — kommande böter,
        fryst kassa, eller försvagat kassaflöde. <strong>Siffrorna dödar den myten:</strong>
        operativt kassaflöde 1 255 MEUR, minus kapex 135 MEUR = ~1 120 MEUR fritt kassaflöde.
        Mer än nog för att betala utdelning (~572 MEUR) och återköp (~500 MEUR) samtidigt.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Aktieåterköp — Ledningens favoritverktyg
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            500 MEUR i återköp 2025 till snittpris ~752 SEK. Nuläge ~577 SEK — ledningen
            köpte dyrare än nuläget, ett tecken på övertygelse. Återköp är skattemässigt
            effektivare och ökar EPS för kvarvarande ägare.
          </p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Strategiska förvärv (M&A)
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Galaxy Gaming-förvärv (~85 MUSD) pågår. Nolimit City earn-out betalt.
            BTG-tilläggsköpeskilling förlängd till 2031 (reducerades med 51,7 MEUR).
            Kassan är redo för nästa förvärv.
          </p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">
            Studioexpansion
          </h3>
          <p className="text-sm text-[#2a2a2a]">
            Filippinerna, Brasilien, Grand Rapids (Michigan) — toppmoderna studios kräver
            kapital upfront men genererar intäkter i 10–15 år. Capex 2025: ~135 MEUR
            (under den guidade 140 MEUR — kostnadsmedvetenhet).
          </p>
        </div>
      </div>

      <AlertBox type="risk">
        Den psykologiska kostnaden: pensionsfonder och utdelningsfonder <em>kräver</em> utdelning
        för att hålla aktier. Inställd utdelning skapar onödig volatilitet och skrämmer bort
        defensiva institutionella ägare — oavsett hur rationell matematiken är. Återkomsten
        av utdelningen 2026e (~30 kr/aktie, 5,3% DA) är en viktig katalysator för att
        återlocka dessa ägare.
      </AlertBox>
    </section>

    {/* ── X. ESG & MAKRO ──────────────────────────────────────────────── */}
    <section id="esg" data-section="esg" className="mb-16">
      <SectionHeader number="X" title="ESG & Makro" />
      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Spelbranschen möter systematisk ESG-granskning kring spelansvar och konsumentskydd.
        Evolution är proaktivt kring regulatorisk compliance och har de mest omfattande
        ringfencing-åtgärderna av alla leverantörer enligt egen uppgift. Andelen reglerade
        marknader på 47% (Q4/25) är strukturellt positivt för ansvarsfullt spelande.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Miljö (E)</h3>
          <p className="text-sm text-[#2a2a2a]">Energikrävande studionätverk globalt. Neutral ESG-profil — inte en ledstjärna men heller inte en flaggstång.</p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Socialt (S)</h3>
          <p className="text-sm text-[#2a2a2a]">Spelberoende är en reell samhällsrisk. Bolaget investerar i ansvarsfulla spelverktyg. Ökad andel reglerade marknader är strukturellt positivt.</p>
        </div>
        <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-4">
          <h3 className="text-xs font-bold text-[#b5892a] uppercase tracking-widest mb-2">Styrning (G)</h3>
          <p className="text-sm text-[#2a2a2a]">Transparent rapportering, insiderägande 41,6%, aktiv IR-kommunikation. Rättsprocessen mot Black Cube/Playtech stärker trovärdigheten.</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[#2a2a2a]">
        <strong>Makro:</strong> Online casino är relativt konjunkturokänsligt. Räntorna
        påverkar inte Evolution direkt (noll räntebärande skuld). EUR-rapportering med global
        exponering ger naturlig valutadiversifiering.
      </p>
    </section>

    {/* ── XI. INVESTERINGSBESLUT ───────────────────────────────────────── */}
    <section id="verdict" data-section="verdict" className="mb-16">
      <SectionHeader number="XI" title="Investeringsbeslut" />
      <ScoreBreakdown scores={analysisData.scores} accentColor={ACCENT} />

      {/* EV-matris */}
      <div className="bg-[#f5f0e8] border border-[#e0d5c0] rounded-xl p-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#b5892a] mb-3">
          Riskjusterad förväntad avkastning (EV-kalkyl)
        </p>
        <FinancialTable
          columns={[
            { key: "scenario",    header: "Scenario" },
            { key: "target",      header: "Målkurs" },
            { key: "return",      header: "Avkastning" },
            { key: "probability", header: "Sannolikhet" },
            { key: "weighted",    header: "Vägt bidrag" },
          ]}
          rows={evMatrixRows}
        />
      </div>

      <p className="text-sm leading-relaxed text-[#2a2a2a] mb-4">
        Evolution är ett kvalitetsbolag som straffas för kortfristiga utmaningar. P/E ~10x,
        EV/EBITDA 7,5x och Earnings Yield 10,1% ger en bred säkerhetsmarginal. Bolagets
        affärsmodell, moat och kassaflöde är intakta. De strukturella tillväxtdrivarna i USA
        och LatAm är reella men ännu ej bevisade i siffrorna — det är risken och möjligheten.
      </p>
      <AlertBox type="signal">
        <strong>KÖP — Målpris SEK 720 (25% uppsida).</strong> Riskjusterad EV +21%. UKGC-risken
        är binär och reell — hantera med positionsstorlek snarare än avvaktning. Bevaka:
        (1) UKGC-utfall, (2) USA/LatAm-tillväxttakt i Q1/26-rapporten (22 april), (3) om
        EPS-tillväxt accelererar bortom 2027e-konsensus på 1,8%.
      </AlertBox>
    </section>

    {/* ── XII. SCENARIER ───────────────────────────────────────────────── */}
    <section id="scenarios" data-section="scenarios" className="mb-16">
      <SectionHeader number="XII" title="Scenarier" />
      <ScenarioCards scenarios={scenarios} />
    </section>

  </div>
</AnalysisLayout>

);
}
