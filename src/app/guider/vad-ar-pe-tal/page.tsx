// ============================================================
// src/app/guider/vad-ar-pe-tal/page.tsx
// "Vad är P/E-tal?" – komplett guide-sida
// ============================================================

import {
  SectionTitle,
  TwoCol,
  MetricBox,
  RulesTable,
  InfoBox,
  ExampleRow,
  ValuationBar,
  KeyInsight,
} from "@/components/GuideComponents";

function KeyPoints() {
  const points = [
    {
      nr: 1,
      text: "P/E = aktiekurs ÷ vinst per aktie. Talet visar hur mycket du betalar för varje krona bolaget tjänar.",
    },
    {
      nr: 2,
      text: "Jämför alltid P/E inom samma bransch – ett P/E på 25 kan vara billigt för ett teknikbolag men dyrt för ett fastighetsbolag.",
    },
    {
      nr: 3,
      text: "Trailing P/E baseras på historisk vinst. Forward P/E baseras på framtida prognoser och är mer relevant för tillväxtbolag.",
    },
    {
      nr: 4,
      text: "P/E fungerar dåligt för bolag med negativ vinst, cykliska bolag och bolag med stor skuldsättning – komplettera alltid med andra nyckeltal.",
    },
  ];

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-3">
      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
        Viktiga punkter
      </p>
      {points.map((p) => (
        <div key={p.nr} className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {p.nr}
          </span>
          <p className="text-sm text-gray-700">{p.text}</p>
        </div>
      ))}
    </div>
  );
}

function PEChecklist() {
  const dos = [
    "Jämför P/E mot bolagets eget 5-årssnitt",
    "Jämför mot branschkollegor",
    "Sätt P/E i relation till tillväxttakt (PEG-tal)",
    "Använd forward P/E för tillväxtbolag",
  ];
  const donts = [
    "Köp bara för att P/E ser lågt ut",
    "Ignorera skuldsättning",
    "Använda P/E på förlustbolag",
    "Jämföra P/E över branscher",
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-5">
      <p className="font-semibold text-gray-800">Snabb checklista för P/E-analys</p>
      <div>
        <p className="text-sm font-semibold text-green-700 mb-2">Gör så här:</p>
        <ul className="space-y-1">
          {dos.map((s) => (
            <li key={s} className="text-sm text-gray-700 flex gap-2">
              <span className="text-green-500">•</span> {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold text-red-600 mb-2">Undvik:</p>
        <ul className="space-y-1">
          {donts.map((m) => (
            <li key={m} className="text-sm text-gray-700 flex gap-2">
              <span className="text-red-400">•</span> {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PETalGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Vad är P/E-tal?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          P/E-talet är ett av de vanligaste måtten för att värdera aktier. Lär dig hur du
          beräknar och tolkar P/E-tal för att hitta rätt pris på en aktie.
        </p>
      </header>

      <KeyPoints />

      {/* ── 1. VAD BETYDER P/E ─────────────────── */}
      <SectionTitle number={1} title="Vad betyder P/E?" />

      <InfoBox variant="neutral" title="Formeln">
        <p>
          P/E står för <strong>Price-to-Earnings</strong>, eller pris i förhållande till vinst
          på svenska. Formeln är enkel:
        </p>
        <p className="mt-2 font-mono bg-white/60 rounded px-3 py-2 text-sm border border-gray-200">
          P/E = Aktiekurs ÷ Vinst per aktie (EPS)
        </p>
        <p className="mt-2">
          Talet visar hur mycket du betalar per krona vinst som bolaget genererar – eller hur
          många år det tar att få tillbaka din investering om vinsten är konstant.
        </p>
      </InfoBox>

      <InfoBox variant="example" title="Räkneexempel">
        <ExampleRow
          name="Bolag med P/E 20"
          details="Aktiekurs: 200 kr, Vinst per aktie: 10 kr → P/E = 200 ÷ 10 = 20"
          verdict="Du betalar 20 kronor för varje krona i vinst."
        />
        <ExampleRow
          name="Bolag med P/E 10"
          details="Aktiekurs: 100 kr, Vinst per aktie: 10 kr → P/E = 100 ÷ 10 = 10"
          verdict="Du betalar 10 kronor för varje krona i vinst – hälften så dyrt."
        />
      </InfoBox>

      {/* ── 2. HUR TOLKAR MAN P/E ──────────────── */}
      <SectionTitle number={2} title="Hur tolkar man P/E-talet?" />

      <ValuationBar
        metric="P/E – generella riktlinjer"
        low="Under 15"
        mid="15–25"
        high="Över 25"
      />

      <TwoCol
        left={
          <RulesTable
            title="Vad signalerar P/E-nivån?"
            rows={[
              { range: "Under 10",  label: "Riskabel eller djup rabatt" },
              { range: "10–15",     label: "Lågt/rimligt", highlight: true },
              { range: "15–20",     label: "Normalt", highlight: true },
              { range: "20–30",     label: "Tillväxtpremium" },
              { range: "Över 30",   label: "Hög tillväxt krävs" },
            ]}
          />
        }
        right={
          <InfoBox variant="example" title="Branscher skiljer sig åt">
            <ExampleRow
              name="Teknikbolag"
              details="P/E 25–40 är vanligt"
              verdict="Hög tillväxt motiverar premie."
            />
            <ExampleRow
              name="Fastighetsbolag"
              details="P/E 10–20 är vanligt"
              verdict="Stabilt men låg tillväxt."
            />
            <ExampleRow
              name="Banker"
              details="P/E 8–15 är vanligt"
              verdict="Reglerat, cykliskt – lägre multiplar."
            />
          </InfoBox>
        }
      />

      <KeyInsight>
        Jämför alltid P/E med bolagets eget historiska snitt (5 år). En aktie med P/E 20
        som normalt handlas till 30 kan vara billig – och tvärtom.
      </KeyInsight>

      {/* ── 3. TRAILING VS FORWARD ─────────────── */}
      <SectionTitle number={3} title="Trailing vs. Forward P/E" />

      <TwoCol
        left={
          <MetricBox
            title="Trailing P/E"
            description="Baseras på de senaste 12 månadernas faktiska vinst. Historiska data – tillförlitligt men bakåtblickande. Bäst för stabila, mogna bolag."
            badges={[{ label: "Historiskt", variant: "ok" }]}
          />
        }
        right={
          <MetricBox
            title="Forward P/E"
            description="Baseras på analytikernas vinstprognoser för kommande 12 månader. Mer relevant för tillväxtbolag men mer osäkert – prognoser kan vara fel."
            badges={[{ label: "Framåtblickande", variant: "bra" }]}
          />
        }
      />

      <InfoBox variant="insight" title="När ska du använda vilket?">
        <p>
          För ett stabilt konsumentbolag med förutsägbar vinst räcker trailing P/E gott. För
          ett snabbväxande techbolag vars vinst kan fördubblas på ett år ger forward P/E en
          mer rättvisande bild av värderingen. Titta gärna på båda och jämför skillnaden –
          en stor skillnad signalerar att marknaden prisar in kraftig vinstökning.
        </p>
      </InfoBox>

      {/* ── 4. BEGRÄNSNINGAR ───────────────────── */}
      <SectionTitle number={4} title="Begränsningar med P/E-talet" />

      <InfoBox variant="warning" title="När P/E inte fungerar">
        <p>
          P/E-talet fungerar dåligt i flera situationer: bolag med negativ vinst (P/E går inte
          att beräkna), cykliska bolag vars vinster svänger kraftigt med konjunkturen
          (P/E ser ofta högt ut i lågkonjunktur och lågt i högkonjunktur), och bolag med
          stora engångsposter som tillfälligt påverkar vinsten.
        </p>
        <p className="mt-2">
          Måttet tar heller inte hänsyn till skuldsättning. Två bolag med identiskt P/E kan
          ha vitt skilda riskprofiler. Komplettera alltid P/E med EV/EBIT eller
          skuldsättningsgrad.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="P/E kan vara missvisande">
            <ExampleRow
              name="Cykliskt bolag i topp"
              details="P/E ser lågt ut (vinsten är hög)"
              verdict="Kan vara dyrt – vinsten är nära toppen."
            />
            <ExampleRow
              name="Cykliskt bolag i botten"
              details="P/E ser högt ut (vinsten är låg)"
              verdict="Kan vara billigt – vinsten är nära botten."
            />
          </InfoBox>
        }
        right={
          <KeyInsight>
            P/E är ett utmärkt startverktyg men aldrig det enda verktyget. Kombinera
            med EV/EBIT, FCF-yield och tillväxttakt för en komplett bild.
          </KeyInsight>
        }
      />

      <PEChecklist />

    </article>
  );
}
