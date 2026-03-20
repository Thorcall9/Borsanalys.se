// ============================================================
// src/app/guider/vad-ar-ev-ebit/page.tsx
// "Vad är EV/EBIT?" – komplett guide-sida
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
      text: "EV (Enterprise Value) = börsvärde + räntebärande skulder − kassa. Det är vad det faktiskt kostar att köpa hela bolaget.",
    },
    {
      nr: 2,
      text: "EV/EBIT tar hänsyn till skuldsättning och är mer rättvisande än P/E för att jämföra bolag med olika kapitalstruktur.",
    },
    {
      nr: 3,
      text: "Under 10x är generellt lågt och kan indikera undervärdering. Över 20x signalerar att marknaden prisar in stark tillväxt.",
    },
    {
      nr: 4,
      text: "EV/EBITDA är en variant som används i kapitalintensiva branscher som telekom, fastighet och industri.",
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

export default function EVEBITGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Vad är EV/EBIT?
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          EV/EBIT är ett värderingsmått som tar hänsyn till skuldsättning och är mer
          rättvisande än P/E för att jämföra bolag med olika kapitalstruktur.
        </p>
      </header>

      <KeyPoints />

      {/* ── 1. VAD ÄR EV OCH EBIT ─────────────── */}
      <SectionTitle number={1} title="Vad är EV och EBIT?" />

      <TwoCol
        left={
          <MetricBox
            title="EV – Enterprise Value"
            description="Bolagets totala värde. Formeln: EV = börsvärde + räntebärande skulder − kassa. Representerar vad det faktiskt kostar att köpa hela bolaget inklusive skulderna."
            badges={[{ label: "Totalt bolagsvärde", variant: "bra" }]}
          />
        }
        right={
          <MetricBox
            title="EBIT – rörelseresultat"
            description="Earnings Before Interest and Taxes – vinsten före räntor och skatt. Visar hur lönsam kärnverksamheten är, oavsett hur bolaget är finansierat."
            badges={[{ label: "Operativ lönsamhet", variant: "bra" }]}
          />
        }
      />

      <InfoBox variant="neutral" title="Formeln">
        <p className="font-mono bg-white/60 rounded px-3 py-2 text-sm border border-gray-200">
          EV/EBIT = (Börsvärde + Skulder − Kassa) ÷ Rörelseresultat
        </p>
        <p className="mt-2">
          Jämfört med P/E sätter EV/EBIT hela bolagets värde i relation till rörelsevinsten,
          vilket gör jämförelser mellan bolag med olika skuldsättning mer rättvisa.
        </p>
      </InfoBox>

      {/* ── 2. VARFÖR BÄTTRE ÄN P/E ───────────── */}
      <SectionTitle number={2} title="Varför är EV/EBIT bättre än P/E?" />

      <TwoCol
        left={
          <InfoBox variant="example" title="P/E kan vara missvisande">
            <ExampleRow
              name="Högt belånat bolag"
              details="Låga räntekostnader → hög vinst → lågt P/E"
              verdict="Ser billigt ut men är riskfyllt med hög skuld."
            />
            <ExampleRow
              name="Skuldfritt bolag"
              details="Ingen hävstång → lägre vinst → högre P/E"
              verdict="Ser dyrare ut men är finansiellt stabilt."
            />
          </InfoBox>
        }
        right={
          <KeyInsight>
            EV/EBIT normaliserar för skuldsättning. Två bolag med identisk
            rörelselönsamhet får samma EV/EBIT-multipel oavsett kapitalstruktur –
            vilket ger en rättvisare jämförelse.
          </KeyInsight>
        }
      />

      <InfoBox variant="insight" title="Professionell standard">
        <p>
          EV/EBIT är det föredragna måttet inom professionell aktieanalys för att screena
          och jämföra bolag. P/E jämför aktiekursen mot vinsten efter räntor och skatt,
          vilket gör det känsligt för kapitalstruktur och skattesats. EV/EBIT undviker
          båda dessa problem.
        </p>
      </InfoBox>

      {/* ── 3. HUR TOLKAR MAN EV/EBIT ─────────── */}
      <SectionTitle number={3} title="Hur tolkar man EV/EBIT?" />

      <ValuationBar
        metric="EV/EBIT – generella riktlinjer"
        low="Under 10x"
        mid="10–20x"
        high="Över 20x"
      />

      <TwoCol
        left={
          <RulesTable
            title="Tumregler per nivå"
            rows={[
              { range: "Under 7x",  label: "Väldigt lågt – undersök varför", },
              { range: "7–10x",     label: "Lågt – möjlig undervärdering", highlight: true },
              { range: "10–15x",    label: "Normalt för stabila bolag", highlight: true },
              { range: "15–20x",    label: "Normalt för tillväxtbolag" },
              { range: "Över 20x",  label: "Hög tillväxt krävs" },
            ]}
          />
        }
        right={
          <RulesTable
            title="Typiska nivåer per bransch"
            rows={[
              { range: "8–12x",   label: "Industribolag" },
              { range: "8–14x",   label: "Konsumentvaror" },
              { range: "12–18x",  label: "Hälsovård", highlight: true },
              { range: "15–30x",  label: "Teknik/SaaS" },
              { range: "6–10x",   label: "Bank/Finans" },
            ]}
          />
        }
      />

      <InfoBox variant="example" title="Räkneexempel">
        <ExampleRow
          name="Industribolag med EV/EBIT 9x"
          details="EV: 900 Mkr, EBIT: 100 Mkr"
          verdict="Rimlig värdering för branschen – potentiellt intressant."
        />
        <ExampleRow
          name="Techbolag med EV/EBIT 25x"
          details="EV: 2 500 Mkr, EBIT: 100 Mkr"
          verdict="Högt men kan vara motiverat om tillväxten är 20%+."
        />
      </InfoBox>

      {/* ── 4. EV/EBITDA ───────────────────────── */}
      <SectionTitle number={4} title="EV/EBITDA – en vanlig variant" />

      <TwoCol
        left={
          <MetricBox
            title="EV/EBIT"
            description="Inkluderar avskrivningar. Bättre för bolag med begränsade materiella tillgångar, som techbolag och konsultföretag. Tar med den ekonomiska kostnaden för kapitalförslitning."
            badges={[{ label: "Föredras generellt", variant: "mycketbra" }]}
          />
        }
        right={
          <MetricBox
            title="EV/EBITDA"
            description="Lägger tillbaka avskrivningar (D&A) på EBIT. Bättre speglar kassaflöde i kapitalintensiva branscher som telekom, fastighet och industri med höga avskrivningar."
            badges={[{ label: "Kapitalintensiva branscher", variant: "ok" }]}
          />
        }
      />

      <KeyInsight>
        Använd EV/EBIT som standard. Byt till EV/EBITDA när du analyserar bolag i
        kapitalintensiva branscher med höga och regelbundna avskrivningar – men var
        medveten om att avskrivningar är en verklig kostnad som inte ska ignoreras helt.
      </KeyInsight>

      <InfoBox variant="warning" title="Vanligt misstag">
        <p>
          Många analytiker föredrar EV/EBITDA utan att reflektera över varför. I branscher
          med låga investeringsbehov gör måttet att bolagen ser billigare ut än de är.
          Ett bolag med stora reinvesteringsbehov för att upprätthålla sin verksamhet
          bör inte värderas på EBITDA – använd då istället FCF-yield.
        </p>
      </InfoBox>

    </article>
  );
}
