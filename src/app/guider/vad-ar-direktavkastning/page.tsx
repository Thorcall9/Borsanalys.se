// ============================================================
// src/app/guider/vad-ar-direktavkastning/page.tsx
// "Vad är direktavkastning?" – komplett guide-sida
// ============================================================

import {
  SectionTitle,
  TwoCol,
  MetricBox,
  RulesTable,
  InfoBox,
  ExampleRow,
  KeyInsight,
} from "@/components/GuideComponents";

function KeyPoints() {
  const points = [
    {
      nr: 1,
      text: "Direktavkastning = utdelning per aktie ÷ aktiekurs × 100. Visar din kontantavkastning per år som andel av inköpspriset.",
    },
    {
      nr: 2,
      text: "3–5% är generellt attraktivt för ett stabilt bolag. Över 8% kan vara en varningssignal om att utdelningen snart sänks.",
    },
    {
      nr: 3,
      text: "Kontrollera alltid payout ratio (utdelning ÷ vinst). Över 80% innebär att utdelningen är sårbar om vinsten faller.",
    },
    {
      nr: 4,
      text: "Utdelningstillväxt slår ofta hög men stagnerad direktavkastning. En utdelning som växer 10% per år fördubblas på 7 år.",
    },
    {
      nr: 5,
      text: "ISK eller kapitalförsäkring är oftast skattemässigt fördelaktigt för utdelningsaktier jämfört med vanligt aktiekonto.",
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

export default function DirektavkastningGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Vad är direktavkastning?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Allt du behöver veta om direktavkastning och utdelningsaktier – hur du beräknar
          det, vad som är en bra nivå, och hur du bygger en portfölj med passiv inkomst.
        </p>
      </header>

      <KeyPoints />

      {/* ── 1. VAD ÄR DIREKTAVKASTNING ─────────── */}
      <SectionTitle number={1} title="Vad är direktavkastning?" />

      <InfoBox variant="neutral" title="Formeln">
        <p className="font-mono bg-white/60 rounded px-3 py-2 text-sm border border-gray-200">
          Direktavkastning = Utdelning per aktie ÷ Aktiekurs × 100
        </p>
        <p className="mt-2">
          Direktavkastning (DA) är den procentuella avkastning du får i form av utdelning
          i förhållande till aktiekursen. Det visar hur mycket kontantavkastning du får
          per år utan hänsyn till kursutveckling.
        </p>
      </InfoBox>

      <InfoBox variant="example" title="Räkneexempel">
        <ExampleRow
          name="Aktie med 4% direktavkastning"
          details="Kurs: 200 kr, Utdelning: 8 kr → DA = 8 ÷ 200 × 100 = 4%"
          verdict="Du får 4 kr per 100 kr investerat varje år i kontant utdelning."
        />
        <ExampleRow
          name="Yield on cost efter 10 år"
          details="Köpte till 200 kr, utdelningen har växt till 15 kr"
          verdict="Yield on cost = 15 ÷ 200 = 7,5% – baserat på ditt inköpspris."
        />
      </InfoBox>

      {/* ── 2. VAD ÄR EN BRA NIVÅ ──────────────── */}
      <SectionTitle number={2} title="Vad är en bra direktavkastning?" />

      <TwoCol
        left={
          <RulesTable
            title="Tumregler"
            rows={[
              { range: "Under 1,5 %", label: "Mycket lågt – tillväxtfokus" },
              { range: "1,5–3 %",     label: "Lågt men hållbart" },
              { range: "3–5 %",       label: "Attraktivt",     highlight: true },
              { range: "5–7 %",       label: "Högt – kolla payout ratio" },
              { range: "Över 8 %",    label: "Varningssignal" },
            ]}
          />
        }
        right={
          <InfoBox variant="warning" title="Hög DA kan vara en fälla">
            <p>
              En direktavkastning över 7–8% är ofta en varningssignal. Det kan betyda
              att marknaden prisar in en kommande utdelningssänkning. Undersök alltid
              om den höga avkastningen beror på att kursen har fallit kraftigt.
            </p>
            <p className="mt-2">
              Jämför också mot tioåriga statsobligationer. Om räntan är 3% och aktien
              ger 4% DA är riskpremien relativt liten. Kräv mer kompensation för den
              extra risken i aktier.
            </p>
          </InfoBox>
        }
      />

      {/* ── 3. PAYOUT RATIO ────────────────────── */}
      <SectionTitle number={3} title="Utdelningsandel (payout ratio)" />

      <InfoBox variant="neutral" title="Formeln">
        <p className="font-mono bg-white/60 rounded px-3 py-2 text-sm border border-gray-200">
          Payout ratio = Utdelning per aktie ÷ Vinst per aktie × 100
        </p>
        <p className="mt-2">
          Lika viktigt som direktavkastningen är utdelningsandelen – hur stor del av
          vinsten som delas ut. En hög payout ratio gör utdelningen sårbar om vinsten faller.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <RulesTable
            title="Payout ratio – tumregler"
            rows={[
              { range: "Under 30 %", label: "Lågt – tillväxt prioriteras" },
              { range: "30–60 %",    label: "Hållbart balanserat", highlight: true },
              { range: "60–80 %",    label: "Acceptabelt" },
              { range: "Över 80 %",  label: "Risk för sänkning" },
              { range: "Över 100 %", label: "Ohållbart" },
            ]}
          />
        }
        right={
          <InfoBox variant="example" title="Jämförelse">
            <ExampleRow
              name="Hållbar utdelning"
              details="Vinst: 10 kr/aktie, Utdelning: 5 kr → Payout: 50%"
              verdict="God marginal – utdelningen klarar vinstfall på 50%."
            />
            <ExampleRow
              name="Sårbar utdelning"
              details="Vinst: 10 kr/aktie, Utdelning: 9 kr → Payout: 90%"
              verdict="Litet utrymme – ett vinstfall på 10% kan tvinga fram sänkning."
            />
          </InfoBox>
        }
      />

      {/* ── 4. UTDELNINGSTILLVÄXT ──────────────── */}
      <SectionTitle number={4} title="Utdelningstillväxt är viktigare än direktavkastning" />

      <InfoBox variant="insight" title="Ränta-på-ränta för utdelningar">
        <p>
          En aktie med 2% direktavkastning som höjer utdelningen med 10% per år är ofta
          ett bättre val än en aktie med 6% direktavkastning men stagnerade utbetalningar.
          Om du håller aktien i 10 år kan yield-on-cost (din direktavkastning baserad på
          inköpspriset) för den förstnämnda vara betydligt högre tack vare tillväxten.
        </p>
      </InfoBox>

      <InfoBox variant="example" title="Utdelningstillväxt i siffror">
        <ExampleRow
          name="2% DA med 10% tillväxt"
          details="År 1: 2%, År 5: 2,9%, År 10: 4,7%, År 15: 7,6%"
          verdict="Yield on cost överstiger det stagnerande alternativet efter ca 9 år."
        />
        <ExampleRow
          name="6% DA med 0% tillväxt"
          details="År 1: 6%, År 5: 6%, År 10: 6%, År 15: 6%"
          verdict="Hög men statisk – ingen tillväxt i utbetalningarna."
        />
      </InfoBox>

      <KeyInsight>
        Leta efter bolag med lång historik av utdelningshöjningar, starkt fritt kassaflöde
        och en hållbar payout ratio. Det är kombinationen av rimlig DA och konsekvent
        tillväxt som bygger passiv inkomst på lång sikt.
      </KeyInsight>

      {/* ── 5. SKATTEASPEKTER ──────────────────── */}
      <SectionTitle number={5} title="Skatteaspekter på utdelning" />

      <TwoCol
        left={
          <MetricBox
            title="Vanligt aktie-/fondkonto"
            description="Utdelning beskattas med 30% kapitalskatt det år den betalas ut. Enkelt men ofta minst fördelaktigt för utdelningsinvesterare med hög direktavkastning."
            badges={[{ label: "30% kapitalskatt", variant: "ok" }]}
          />
        }
        right={
          <MetricBox
            title="ISK eller Kapitalförsäkring"
            description="Ingen skatt på utdelningen direkt. Istället betalas en schablonintäkt på hela portföljens värde. Vanligtvis fördelaktigt när direktavkastningen överstiger schablonräntan."
            badges={[{ label: "Schablonintäkt", variant: "mycketbra" }]}
          />
        }
      />

      <InfoBox variant="neutral" title="Praktisk tumregel">
        <p>
          ISK eller kapitalförsäkring är generellt fördelaktigt om du förväntar dig
          avkastning (utdelning + kursuppgång) som överstiger schablonräntan. För
          utdelningsportföljer med 4–6% DA är ISK nästan alltid ett bättre alternativ
          än vanligt aktiekonto.
        </p>
        <p className="mt-2">
          Välj kontotyp utifrån din totala situation, eventuella förlustportföljer
          (kapitalförluster kan kvittas mot vinster på vanligt konto men inte i ISK)
          och förväntad direktavkastning.
        </p>
      </InfoBox>

    </article>
  );
}
