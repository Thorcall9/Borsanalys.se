// ============================================================
// src/app/guider/vad-ar-intrinsic-value/page.tsx
// "Vad är intrinsic value?" – komplett guide-sida
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
      text: "Intrinsic value är ett bolags verkliga, fundamentala värde baserat på framtida kassaflöden – oberoende av aktiekursen.",
    },
    {
      nr: 2,
      text: "Aktiekursen divergerar kortsiktigt men konvergerar mot intrinsic value på lång sikt. Det skapar möjligheter för tålmodiga investerare.",
    },
    {
      nr: 3,
      text: "Margin of safety: köp bara när kursen är klart under ditt beräknade intrinsic value – buffert mot felaktiga antaganden.",
    },
    {
      nr: 4,
      text: "Värdet är en uppskattning, inte ett exakt tal. Presentera alltid som ett intervall och omvärdera regelbundet.",
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

export default function IntrinsicValueGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Vad är intrinsic value?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Intrinsic value – eller inneboende värde – är ett bolags verkliga värde baserat
          på fundamenta, till skillnad från vad marknaden för tillfället betalar.
          Konceptet är centralt inom värdeinvestering.
        </p>
      </header>

      <KeyPoints />

      {/* ── 1. DEFINITIONEN ────────────────────── */}
      <SectionTitle number={1} title="Definitionen av intrinsic value" />

      <InfoBox variant="neutral" title="Det verkliga värdet">
        <p>
          Intrinsic value är ett bolags verkliga, fundamentala värde – oberoende av
          aktiekursen. Konceptet populariserades av Benjamin Graham och vidareutvecklades
          av Warren Buffett, som definierar det som nuvärdet av alla kassaflöden ett
          bolag kan generera under sin livstid.
        </p>
        <p className="mt-2">
          Tanken är att aktiekursen på kort sikt kan avvika kraftigt från det inneboende
          värdet på grund av sentiment, panik eller eufori – men på lång sikt tenderar
          kursen att konvergera mot det verkliga värdet.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="Marknadspris"
            description="Vad investerare för tillfället är villiga att betala. Påverkas av sentiment, nyhetsflöde och makro. Kan avvika kraftigt från det verkliga värdet."
            badges={[{ label: "Kortsiktigt", variant: "ok" }]}
          />
        }
        right={
          <MetricBox
            title="Intrinsic value"
            description="Bolagets verkliga värde baserat på fundamenta: framtida kassaflöden, konkurrensfördel, lönsamhet och tillväxt. Förändras långsamt."
            badges={[{ label: "Långsiktigt", variant: "mycketbra" }]}
          />
        }
      />

      {/* ── 2. HUR BERÄKNAR MAN ────────────────── */}
      <SectionTitle number={2} title="Hur beräknar man intrinsic value?" />

      <InfoBox variant="insight" title="Det finns ingen enda formel">
        <p>
          Det finns ingen universell formel. Resultatet är alltid en uppskattning –
          inte ett exakt tal. De vanligaste metoderna är DCF-analys, Graham-formeln och
          sum-of-the-parts för konglomerat.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="DCF-analys (mest rigoröst)"
            description="Diskonterar alla framtida fria kassaflöden till nuvärde med WACC. Mest teoretiskt korrekta metoden men känslig för antaganden om tillväxt och diskonteringsränta."
          />
        }
        right={
          <MetricBox
            title="Graham-formeln (enkel tumregel)"
            description="IV = EPS × (8,5 + 2g) där g är förväntad tillväxt i procent. Förenklad men ger en snabb uppskattning. Ursprungligen anpassad för en 4,4% obligationsränta."
          />
        }
      />

      <InfoBox variant="example" title="Graham-formeln i praktiken">
        <ExampleRow
          name="Tillväxtbolag"
          details="EPS: 10 kr, förväntad tillväxt g: 12%"
          verdict="IV = 10 × (8,5 + 24) = 10 × 32,5 = 325 kr per aktie"
        />
        <ExampleRow
          name="Moget bolag"
          details="EPS: 10 kr, förväntad tillväxt g: 3%"
          verdict="IV = 10 × (8,5 + 6) = 10 × 14,5 = 145 kr per aktie"
        />
      </InfoBox>

      {/* ── 3. MARGIN OF SAFETY ────────────────── */}
      <SectionTitle number={3} title="Margin of safety" />

      <InfoBox variant="insight" title="Bufferts viktigaste princip">
        <p>
          Margin of safety är skillnaden mellan aktiekursen och ditt beräknade intrinsic
          value. Om du beräknar att ett bolag är värt 100 kr per aktie och kursen är 70 kr
          har du 30% margin of safety.
        </p>
        <p className="mt-2">
          Benjamin Graham rekommenderade en margin of safety på minst 33%. Det skyddar
          mot analytikerns misstag, oförutsedda händelser och modellernas inneboende
          osäkerhet. Ju mer osäker beräkningen är, desto större marginal krävs.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="Margin of safety i praktiken">
            <ExampleRow
              name="Stark margin of safety"
              details="Intrinsic value: 100 kr, Kurs: 65 kr → 35% rabatt"
              verdict="Attraktivt – stor buffert mot felaktiga antaganden."
            />
            <ExampleRow
              name="Ingen margin of safety"
              details="Intrinsic value: 100 kr, Kurs: 105 kr → 5% premium"
              verdict="Riskabelt – inget utrymme om antaganden är fel."
            />
          </InfoBox>
        }
        right={
          <KeyInsight>
            Margin of safety skyddar mot tre saker: fel i din analys, oförutsedda
            negativa händelser, och marknadens irrationella beteende. En stor marginal
            gör investeringen robust mot alla tre.
          </KeyInsight>
        }
      />

      {/* ── 4. INTRINSIC VALUE VS MARKNADSPRIS ─── */}
      <SectionTitle number={4} title="Intrinsic value vs. marknadspris" />

      <InfoBox variant="neutral" title="Marknaden på kort och lång sikt">
        <p>
          Marknaden är effektiv på lång sikt men ineffektiv på kort sikt. Det skapar
          möjligheter för tålmodiga investerare. En aktie kan handlas långt under intrinsic
          value under månader eller år innan marknaden &quot;upptäcker&quot; värdet.
        </p>
        <p className="mt-2">
          Viktigt: intrinsic value förändras kontinuerligt i takt med att bolagets utsikter,
          konkurrensläge och räntemiljö förändras. Det är inte ett statiskt tal utan kräver
          regelbunden omvärdering.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <InfoBox variant="example" title="Scenarios">
            <ExampleRow
              name="Kurs under intrinsic value"
              details="Aktie handlas till 70 kr, IV = 100 kr"
              verdict="Potentiell köpmöjlighet om analysen är korrekt."
            />
            <ExampleRow
              name="Kurs över intrinsic value"
              details="Aktie handlas till 130 kr, IV = 100 kr"
              verdict="Överprisat – marknaden prisar in orealistisk optimism."
            />
          </InfoBox>
        }
        right={
          <InfoBox variant="warning" title="Tålamod krävs">
            <p>
              Även om en aktie är klart undervärderad kan det ta lång tid innan
              marknaden omvärderar den. Det krävs tålamod och övertygelse i analysen.
              &quot;Marknaden kan förbli irrationell längre än du kan förbli solvent&quot;
              – John Maynard Keynes.
            </p>
          </InfoBox>
        }
      />

      <KeyInsight>
        Intrinsic value är inte ett exakt svar – det är ett tankesätt. Målet är inte
        att hitta det exakta värdet utan att avgöra om aktien är tillräckligt billig
        relativt en rimlig uppskattning. Margin of safety tar hand om resten.
      </KeyInsight>

    </article>
  );
}
