// ============================================================
// src/app/guider/hur-fungerar-dcf/page.tsx
// "Hur fungerar DCF-analys?" – komplett guide-sida
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
      text: "DCF beräknar nuvärdet av alla framtida fria kassaflöden – en krona idag är värd mer än en krona imorgon.",
    },
    {
      nr: 2,
      text: "Tre steg: prognostisera FCF för 5–10 år, beräkna terminalvärdet, och diskontera allt tillbaka med WACC.",
    },
    {
      nr: 3,
      text: "Hög WACC ger lägre värdering – det är därför räntehöjningar slår hårt mot tillväxtaktier vars kassaflöden ligger långt fram i tiden.",
    },
    {
      nr: 4,
      text: "Modellen är känslig för antaganden. Presentera alltid resultatet som ett intervall med bull/base/bear-scenarion.",
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

function DCFSteps() {
  const steps = [
    {
      nr: 1,
      title: "Prognostisera fria kassaflöden (FCF)",
      desc: "Uppskatta bolagets fria kassaflöde för de kommande 5–10 åren baserat på historisk tillväxt och branschtrender.",
    },
    {
      nr: 2,
      title: "Beräkna terminalvärdet",
      desc: "Eftersom bolaget inte upphör att existera efter prognosperioden beräknas ett terminalvärde med Gordon Growth Model.",
    },
    {
      nr: 3,
      title: "Diskontera med WACC",
      desc: "Alla kassaflöden och terminalvärdet diskonteras tillbaka till idag med WACC. Summan ger Enterprise Value.",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
      <p className="font-semibold text-gray-800 mb-4">DCF-modellens tre steg</p>
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.nr} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
              {s.nr}
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{s.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DCFGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Hur fungerar DCF-analys?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          DCF (Discounted Cash Flow) är den mest grundläggande metoden för att beräkna ett
          bolags inneboende värde baserat på framtida kassaflöden. Lär dig hur modellen
          fungerar steg för steg.
        </p>
      </header>

      <KeyPoints />

      {/* ── 1. GRUNDIDÉN ───────────────────────── */}
      <SectionTitle number={1} title="Grundidén bakom DCF" />

      <InfoBox variant="neutral" title="En krona idag är värd mer än en krona imorgon">
        <p>
          Det är grundprincipen i DCF. Metoden beräknar nuvärdet av alla framtida kassaflöden
          ett bolag förväntas generera och summerar dem till ett totalt företagsvärde.
        </p>
        <p className="mt-2">
          DCF är kraftfullt eftersom det tvingar analytikern att explicit specificera
          antaganden om tillväxt, lönsamhet och risk – istället för att blint jämföra
          multiplar. Det är den metod Warren Buffett och andra värdeinvesterare föredrar.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="Vad modellen beräknar"
            description="Summan av alla framtida fria kassaflöden diskonterade till dagens penningvärde. Resultatet är bolagets Enterprise Value."
          />
        }
        right={
          <MetricBox
            title="Varför diskontera?"
            description="Framtida pengar är osäkra och har lägre köpkraft. Diskonteringsräntan (WACC) speglar risken – ju högre risk, desto mer diskonteras framtida kassaflöden."
          />
        }
      />

      {/* ── 2. TRE STEG ────────────────────────── */}
      <SectionTitle number={2} title="Tre steg i en DCF-modell" />

      <DCFSteps />

      <InfoBox variant="example" title="Steg 2 i detalj – terminalvärdet">
        <p className="text-sm text-gray-700 mb-3">
          Gordon Growth Model är den vanligaste metoden för att beräkna terminalvärdet:
        </p>
        <p className="font-mono bg-white rounded px-3 py-2 text-sm border border-gray-200 mb-3">
          TV = FCF × (1 + g) ÷ (WACC − g)
        </p>
        <ExampleRow
          name="Exempel"
          details="FCF: 100, g (långsiktig tillväxt): 2%, WACC: 9%"
          verdict="TV = 100 × 1,02 ÷ (0,09 − 0,02) = 100 × 1,02 ÷ 0,07 ≈ 1 457"
        />
      </InfoBox>

      <KeyInsight>
        Terminalvärdet representerar ofta 60–80% av DCF-värdet. Det gör modellen
        mycket känslig för antagandet om långsiktig tillväxttakt (g). En skillnad på
        0,5 procentenhet i g kan ändra värdet med 10–20%.
      </KeyInsight>

      {/* ── 3. WACC ────────────────────────────── */}
      <SectionTitle number={3} title="Vad är WACC?" />

      <InfoBox variant="neutral" title="Weighted Average Cost of Capital">
        <p>
          WACC är den avkastning bolaget måste ge för att rättfärdiga investeringen, givet
          dess finansieringsmix av eget kapital och skulder. Det är den ränta med vilken
          alla framtida kassaflöden diskonteras.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <RulesTable
            title="Typiska WACC-nivåer"
            rows={[
              { range: "6–8 %",   label: "Stabila, lågrisksbolag", highlight: true },
              { range: "8–10 %",  label: "Normala industribolag", highlight: true },
              { range: "10–12 %", label: "Cykliska bolag" },
              { range: "12–15 %", label: "Tillväxtbolag" },
              { range: "15 %+",   label: "Högriskbolag" },
            ]}
          />
        }
        right={
          <InfoBox variant="example" title="Räntor och WACC">
            <ExampleRow
              name="Lågräntemiljö (0,5 %)"
              details="WACC typiskt 6–8 %"
              verdict="Framtida kassaflöden diskonteras lite – höga värderingar motiveras."
            />
            <ExampleRow
              name="Högräntemiljö (4 %)"
              details="WACC typiskt 9–12 %"
              verdict="Framtida kassaflöden diskonteras mer – värderingar pressas ned."
            />
          </InfoBox>
        }
      />

      <InfoBox variant="insight" title="Varför räntehöjningar slår mot tillväxtaktier">
        <p>
          Ju högre WACC, desto mer diskonteras framtida kassaflöden och desto lägre blir
          det beräknade värdet. Tillväxtbolag har de flesta av sina kassaflöden långt fram
          i tiden – vilket gör dem extra känsliga för ränteförändringar. Ett stabilt bolag
          med kassaflöden nära i tid påverkas betydligt mindre.
        </p>
      </InfoBox>

      {/* ── 4. SVAGHETER ───────────────────────── */}
      <SectionTitle number={4} title="Svagheter och fallgropar" />

      <InfoBox variant="warning" title="Garbage in, garbage out">
        <p>
          DCF är extremt känslig för antagandena om tillväxt och WACC. En skillnad på
          1 procentenhet i WACC kan ändra det beräknade värdet med 20–40%. Det kallas
          modellrisk – felaktiga antaganden ger felaktiga svar, hur korrekt matematiken
          än är.
        </p>
        <p className="mt-2">
          Resultatet bör alltid presenteras som ett intervall (bull/base/bear-scenario)
          snarare än en enskild siffra. Kombinera DCF med relativ värdering (P/E, EV/EBIT)
          för en mer robust analys.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="Scenario-analys">
            <ExampleRow
              name="Bull-scenario"
              details="Tillväxt 15%, WACC 8%"
              verdict="Värde: 150 kr per aktie"
            />
            <ExampleRow
              name="Base-scenario"
              details="Tillväxt 10%, WACC 10%"
              verdict="Värde: 100 kr per aktie"
            />
            <ExampleRow
              name="Bear-scenario"
              details="Tillväxt 5%, WACC 12%"
              verdict="Värde: 65 kr per aktie"
            />
          </InfoBox>
        }
        right={
          <KeyInsight>
            Presentera alltid DCF som ett intervall. Om aktiekursen är 80 kr och
            bear-scenariot ger 65 kr finns begränsad margin of safety. Om bear-scenariot
            ger 95 kr är risken/belönings-profilen betydligt bättre.
          </KeyInsight>
        }
      />

    </article>
  );
}
