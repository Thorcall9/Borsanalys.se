// ============================================================
// src/app/guider/hur-analyserar-man-en-aktie/page.tsx
// "Hur analyserar man en aktie?" – komplett guide-sida
// ============================================================

import {
  SectionTitle,
  TwoCol,
  MetricBox,
  InfoBox,
  ExampleRow,
  KeyInsight,
} from "@/components/GuideComponents";

function KeyPoints() {
  const points = [
    {
      nr: 1,
      text: "Börja med affärsmodellen – förstå hur bolaget tjänar pengar. Kan du förklara det på 30 sekunder? Om inte är det en röd flagg.",
    },
    {
      nr: 2,
      text: "Identifiera competitive moat: vad skyddar bolaget från konkurrenter och hur länge kan den fördelen bestå?",
    },
    {
      nr: 3,
      text: "Kassaflöde är mer tillförlitligt än redovisningsvinst. Vinsten kan manipuleras – kassaflödet är svårare att bluffa.",
    },
    {
      nr: 4,
      text: "Värdera med minst två metoder och bygg alltid bull/base/bear-scenarion för att förstå riskintervallet.",
    },
    {
      nr: 5,
      text: "Identifiera aktivt vad som kan förstöra investeringstesen – det är en bättre analys än att bara förutspå uppgångar.",
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

function AnalysisProcess() {
  const steps = [
    { nr: 1, label: "Affärsmodell",    question: "Hur tjänar bolaget pengar?" },
    { nr: 2, label: "Competitive moat",question: "Vad skyddar bolaget?" },
    { nr: 3, label: "Finanser",        question: "Hur ser siffrorna ut?" },
    { nr: 4, label: "Ledning",         question: "Är ledningen kompetent?" },
    { nr: 5, label: "Värdering",       question: "Vad är rimligt pris?" },
    { nr: 6, label: "Riskanalys",      question: "Vad kan gå fel?" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
      <p className="font-semibold text-gray-800 mb-4">Analysprocessen i ordning</p>
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.nr} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              {s.nr}
            </span>
            <span className="text-sm font-semibold text-gray-800 w-36">{s.label}</span>
            <span className="text-sm text-gray-500">{s.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyseraAktieGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Hur analyserar man en aktie?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          En strukturerad guide till aktieanalys – från att förstå affärsmodellen till att
          beräkna en rimlig värdering. Lär dig den process som professionella analytiker
          använder.
        </p>
      </header>

      <KeyPoints />

      <AnalysisProcess />

      {/* ── 1. AFFÄRSMODELLEN ──────────────────── */}
      <SectionTitle number={1} title="Förstå affärsmodellen" />

      <InfoBox variant="neutral" title="30-sekunderstestet">
        <p>
          Börja alltid med att förstå hur bolaget tjänar pengar. Vad säljer de? Till vem?
          Hur ser prissättningen ut? Är det en återkommande intäktsmodell (SaaS,
          prenumerationer) eller engångsförsäljning? Kan du förklara affärsmodellen på
          30 sekunder?
        </p>
        <p className="mt-2">
          Buffett kallar detta &quot;circle of competence&quot; – analysera bara bolag du verkligen
          förstår. En komplicerad affärsmodell du inte begriper är en röd flagg i sig.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="Återkommande intäkter"
            description="Prenumerationer, serviceavtal, förbrukningsvaror. Förutsägbara och värdefulla – bör premieras med högre värdering."
            badges={[{ label: "Högt värde", variant: "mycketbra" }]}
          />
        }
        right={
          <MetricBox
            title="Engångsförsäljning"
            description="Projekt, engångsleveranser, konjunkturkänslig efterfrågan. Svårare att förutsäga och värdera. Kräver djupare konjunkturanalys."
            badges={[{ label: "Mer osäkert", variant: "ok" }]}
          />
        }
      />

      {/* ── 2. COMPETITIVE MOAT ────────────────── */}
      <SectionTitle number={2} title="Analysera competitive moat" />

      <InfoBox variant="insight" title="Vad är en moat?">
        <p>
          En moat (vallgrav) är den konkurrensfördel som skyddar bolaget från konkurrenter.
          Fråga dig: varför väljer kunder det här bolaget framför konkurrenterna? Och hur
          länge kan den fördelen bestå? Bolag med starka moats kan ta ut prispremium och
          försvara sina marginaler under lång tid.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="Typer av moats">
            <ExampleRow
              name="Nätverkseffekter"
              details="Visa, Facebook, börser"
              verdict="Produkten blir mer värdefull ju fler som använder den."
            />
            <ExampleRow
              name="Switching costs"
              details="SAP, Salesforce, bankrelationer"
              verdict="Dyrt och komplicerat att byta leverantör."
            />
            <ExampleRow
              name="Kostnadsfördelar"
              details="Amazon, IKEA, lågprisflygbolag"
              verdict="Kan erbjuda lägre pris och ändå tjäna pengar."
            />
          </InfoBox>
        }
        right={
          <InfoBox variant="example" title="Fler moat-typer">
            <ExampleRow
              name="Immateriella tillgångar"
              details="Patent, varumärken, licenser"
              verdict="Juridiskt skydd mot kopiering och konkurrens."
            />
            <ExampleRow
              name="Skalfördelar"
              details="Fasta kostnader sprids på fler enheter"
              verdict="Marginalerna ökar automatiskt med volymen."
            />
          </InfoBox>
        }
      />

      {/* ── 3. GRANSKA FINANSERNA ──────────────── */}
      <SectionTitle number={3} title="Granska finanserna" />

      <InfoBox variant="neutral" title="Minst 5 år bakåt">
        <p>
          Studera resultaträkning, balansräkning och kassaflödesanalys för minst 5 år bakåt.
          Ett enskilt bra år berättar lite – det är trenden och konsistensen som avslöjar
          ett kvalitetsbolag.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="Nyckeltal att fokusera på"
            description="Intäktstillväxt, bruttomarginal, rörelsemarginal, ROE, skuldsättningsgrad och fritt kassaflöde. Titta på 5-årssnitt, inte enskilda år."
          />
        }
        right={
          <MetricBox
            title="Kassaflöde framför vinst"
            description="Vinsten kan påverkas av redovisningsval. Kassaflödet är svårare att manipulera. Ett bolag med hög vinst men negativt FCF år efter år är ett varningstecken."
          />
        }
      />

      <InfoBox variant="warning" title="Varningstecken i finanserna">
        <p>
          Håll utkik efter: vinst som växer snabbare än kassaflödet, ökande
          kundfordringar utan tillhörande intäktstillväxt, återkommande
          &quot;engångskostnader&quot;, och förvärv som konstant ökar skuldsättningen.
          Dessa kan alla indikera att den rapporterade vinsten är sämre än den ser ut.
        </p>
      </InfoBox>

      {/* ── 4. BEDÖM LEDNING ───────────────────── */}
      <SectionTitle number={4} title="Bedöm ledning och ägare" />

      <TwoCol
        left={
          <InfoBox variant="insight" title="Kapitalallokering avgör allt">
            <p>
              Ledningens kapitalallokering avgör ofta om en investering lyckas.
              Återinvesterar de i lönsam tillväxt, betalar de utdelning, genomför de
              aktieåterköp, eller gör de dyra förvärv? Studera historiken.
            </p>
          </InfoBox>
        }
        right={
          <InfoBox variant="example" title="Bra vs dåliga signaler">
            <ExampleRow
              name="Positivt"
              details="Insiderägande, insider-köp, konsekvent ROE"
              verdict="Ledningen har hud i spelet och levererar."
            />
            <ExampleRow
              name="Negativt"
              details="Insider-försäljning, dyra förvärv, höga VD-löner"
              verdict="Kan indikera intressekonflikter eller optimism om framtiden."
            />
          </InfoBox>
        }
      />

      <KeyInsight>
        Insiderägande är en stark positiv signal – när ledning och styrelse har
        signifikant eget kapital i bolaget är deras intressen i linje med aktieägarnas.
        Titta också på om insiders köper eller säljer aktier i marknaden.
      </KeyInsight>

      {/* ── 5. VÄRDERA AKTIEN ──────────────────── */}
      <SectionTitle number={5} title="Värdera aktien" />

      <InfoBox variant="neutral" title="Använd minst två metoder">
        <p>
          Använd minst två värderingsmetoder: relativa multiplar (P/E, EV/EBIT mot
          historiska snitt och konkurrenter) och absolut värdering (DCF). Bygg ett
          base-scenario, ett bull-scenario och ett bear-scenario med olika antaganden.
        </p>
        <p className="mt-2">
          Jämför det beräknade värdet med aktiekursen. Är det en tillräcklig margin of
          safety? Att köpa ett fantastiskt bolag till ett absurt pris ger dålig avkastning.
          Priset du betalar avgör din avkastning.
        </p>
      </InfoBox>

      <InfoBox variant="example" title="Scenarioanalys">
        <ExampleRow
          name="Bull-scenario"
          details="Stark tillväxt, marginalexpansion, premium-multipel"
          verdict="Värde: 180 kr – vad händer om allt går bra?"
        />
        <ExampleRow
          name="Base-scenario"
          details="Historisk tillväxt, stabila marginaler, normal multipel"
          verdict="Värde: 130 kr – det troligaste utfallet."
        />
        <ExampleRow
          name="Bear-scenario"
          details="Svag tillväxt, marginalpress, rabattmultipel"
          verdict="Värde: 85 kr – vad händer om det går dåligt?"
        />
      </InfoBox>

      {/* ── 6. IDENTIFIERA RISKER ──────────────── */}
      <SectionTitle number={6} title="Identifiera riskerna" />

      <InfoBox variant="warning" title="Vad kan gå fel?">
        <p>
          Tänk på: regulatoriska risker, teknologisk disruption, konjunkturkänslighet,
          valutarisker, konkurrensintensitet och balansräkningsrisker. Bedöm sannolikheten
          och konsekvensen av varje risk.
        </p>
        <p className="mt-2">
          Den bästa analysen är inte den som förutspår framtida uppgångar – det är den
          som identifierar vad som kan förstöra investeringstesen. Om du vet varför
          tesen kan vara fel kan du bevaka rätt signaler och reagera snabbt om de
          materialiseras.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="Risktyper att beakta">
            <ExampleRow
              name="Branschrisk"
              details="Disruption, nya konkurrenter, prispress"
              verdict="Hur stark är moaten mot dessa hot?"
            />
            <ExampleRow
              name="Finansiell risk"
              details="Hög skuldsättning, refinansieringsbehov"
              verdict="Klarar bolaget en recession eller räntehöjning?"
            />
            <ExampleRow
              name="Regulatorisk risk"
              details="Ny lagstiftning, böter, förbud"
              verdict="Gäller särskilt fintech, läkemedel, energi."
            />
          </InfoBox>
        }
        right={
          <KeyInsight>
            Skriv ned din investeringste och vilka faktorer som skulle göra att du
            säljer. En förutbestämd exit-strategi förhindrar att du håller kvar en
            aktie vars tes har förändrats enbart för att du är psykologiskt
            engagerad i positionen.
          </KeyInsight>
        }
      />

    </article>
  );
}
