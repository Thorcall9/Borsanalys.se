// ============================================================
// src/app/guider/nyckeltal/page.tsx
// "De viktigaste nyckeltalen" – komplett guide-sida
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

// ─── Viktiga punkter-lista längst upp ──────────────────────

function KeyPoints() {
  const points = [
    {
      nr: 1,
      text: "Tillväxt driver aktien – sikta på stabil omsättningstillväxt på 10 %+ och kontrollera att vinsttillväxten inte löper iväg från omsättningen.",
    },
    {
      nr: 2,
      text: "Lönsamhet skapar värde – ROE på 15 %+ och konsekvent hög vinstmarginal indikerar ett kvalitetsbolag med konkurrensfördel.",
    },
    {
      nr: 3,
      text: "Värdering avgör din avkastning – analysera alltid P/E i kontext med tillväxt; ett högt P/E kan vara motiverat och ett lågt kan vara en fälla.",
    },
    {
      nr: 4,
      text: "Skuldsättning (nettoskuld/EBIT) under 3x ger finansiell stabilitet och motståndskraft i svåra tider.",
    },
    {
      nr: 5,
      text: "Kassaflöde avslöjar sanningen – FCF nära vinsten år efter år är ett av de starkaste tecknen på ett riktigt kvalitetsbolag.",
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

// ─── Checklista längst ned ──────────────────────────────────

function Checklist() {
  const strong = [
    "Stabil tillväxt på 10 %+",
    "Hög ROE på 15 %+ med bra marginaler",
    "Rimlig värdering i linje med historiken",
    "Låg eller kontrollerad skuldsättning",
    "Stark FCF som speglar vinsten",
  ];
  const mistakes = [
    "Titta bara på P/E",
    "Ignorera skulder",
    "Fokusera på vinst utan att kolla kassaflöde",
    "Inte jämföra historiskt",
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-5">
      <p className="font-semibold text-gray-800">Snabb checklista</p>

      <div>
        <p className="text-sm font-semibold text-green-700 mb-2">
          Ett starkt bolag har ofta:
        </p>
        <ul className="space-y-1">
          {strong.map((s) => (
            <li key={s} className="text-sm text-gray-700 flex gap-2">
              <span className="text-green-500">•</span> {s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-red-600 mb-2">
          Vanliga misstag att undvika:
        </p>
        <ul className="space-y-1">
          {mistakes.map((m) => (
            <li key={m} className="text-sm text-gray-700 flex gap-2">
              <span className="text-red-400">•</span> {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Analysordning-box ──────────────────────────────────────

function AnalysisFlow() {
  const steps = [
    { label: "Tillväxt",      question: "Växer bolaget?" },
    { label: "Lönsamhet",     question: "Är det ett kvalitetsbolag?" },
    { label: "Värdering",     question: "Betalar du ett rimligt pris?" },
    { label: "Skuldsättning", question: "Klarar det en kris?" },
    { label: "Kassaflöde",    question: "Är vinsten verklig?" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
      <p className="font-semibold text-gray-800 mb-4">Analysera i den här ordningen</p>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-sm font-semibold text-gray-800 w-28">{s.label}</span>
            <span className="text-sm text-gray-500">{s.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────

export default function NyckeltalGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-10">

      {/* Rubrik */}
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          De viktigaste nyckeltalen – så analyserar du en aktie som ett proffs
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Du behöver inte 50 nyckeltal för att analysera en aktie. Den här guiden visar
          de fem viktigaste – tillväxt, lönsamhet, värdering, skuld och kassaflöde –
          och hur de tillsammans ger en träffsäker bild av ett bolag.
        </p>
      </header>

      {/* Viktiga punkter */}
      <KeyPoints />

      {/* Intro */}
      <InfoBox variant="neutral" title="Den enkla modellen">
        <p>
          Att analysera en aktie kan kännas överväldigande. Det finns hundratals nyckeltal –
          men sanningen är att du bara behöver förstå ett fåtal riktigt bra. En träffsäker
          analys bygger på fem frågor: Växer bolaget? Är det lönsamt? Är det billigt eller
          dyrt? Är det finansiellt stabilt? Och är vinsten faktiskt &quot;på riktigt&quot;?
        </p>
        <p className="mt-2">
          Den här guiden går igenom varje steg och de nyckeltal som hör till. Målet är att
          du snabbt ska kunna sålla bort svaga bolag och identifiera kvalitetsbolag – utan
          att drunkna i detaljer.
        </p>
      </InfoBox>

      {/* ── 1. TILLVÄXT ────────────────────────── */}
      <SectionTitle number={1} title="Tillväxt – motorn i aktien" />

      <TwoCol
        left={
          <MetricBox
            title="Nyckeltal:"
            description="Omsättningstillväxt (3–5 år) och vinsttillväxt (5 år). Tillsammans visar de hur snabbt bolaget växer och om tillväxten är hållbar."
          />
        }
        right={
          <RulesTable
            title="Tumregler:"
            rows={[
              { range: "0–5 %",   label: "Låg tillväxt" },
              { range: "5–10 %",  label: "Stabilt" },
              { range: "10–20 %", label: "Bra",          highlight: true },
              { range: "20 %+",   label: "Hög tillväxt", highlight: true },
            ]}
          />
        }
      />

      <InfoBox variant="warning" title="Varningssignal att hålla koll på">
        <p>
          När vinsttillväxten är betydligt högre än omsättningstillväxten kan det indikera
          att kostnadsbesparingar driver vinsten snarare än verklig affärstillväxt – vilket
          är svårare att upprätthålla över tid. Starka bolag visar konsekvent tillväxt i
          båda måtten.
        </p>
      </InfoBox>

      <InfoBox variant="example" title="Exempel">
        <ExampleRow
          name="Bolag A"
          details="12 % omsättningstillväxt & 15 % vinsttillväxt"
          verdict="Stark och hälsosam tillväxt."
        />
        <ExampleRow
          name="Bolag B"
          details="2 % omsättningstillväxt & 20 % vinsttillväxt"
          verdict="Varningssignal – vinsten växer snabbare än omsättningen (kan vara tillfälligt)."
        />
      </InfoBox>

      {/* ── 2. LÖNSAMHET ───────────────────────── */}
      <SectionTitle number={2} title="Lönsamhet – hur effektivt bolaget skapar värde" />

      <TwoCol
        left={
          <div className="space-y-3">
            <MetricBox
              title="ROE – avkastning på eget kapital"
              description="Helst som 7-årssnitt. Visar hur effektivt bolaget använder kapital."
              badges={[
                { label: "10 % Okej",        variant: "ok" },
                { label: "15 % Bra",         variant: "bra" },
                { label: "20 %+ Mycket bra", variant: "mycketbra" },
              ]}
            />
            <MetricBox
              title="Vinstmarginal"
              description="5-årssnitt. Visar hur stor del av omsättningen som faktiskt blir vinst. 20 % marginal är dubbelt så effektivt som 10 %."
            />
          </div>
        }
        right={
          <InfoBox variant="example" title="Exempel">
            <ExampleRow
              name="Bolag A (Kvalitet)"
              details="ROE: 22 %, Marginal: 18 %"
              verdict="Starkt kvalitetsbolag."
            />
            <ExampleRow
              name="Bolag B (Svagt)"
              details="ROE: 8 %, Marginal: 5 %"
              verdict="Svårt att skapa värde för aktieägarna."
            />
          </InfoBox>
        }
      />

      <KeyInsight>
        Historiska snitt är avgörande – ett bolag med konsekvent hög lönsamhet under
        många år har sannolikt en konkurrensfördel som skyddar marginalerna.
      </KeyInsight>

      {/* ── 3. VÄRDERING ───────────────────────── */}
      <SectionTitle number={3} title="Värdering – vad betalar du?" />

      <p className="text-sm text-gray-600">
        Jämför alltid nuvarande P/E med bolagets eget 5-årssnitt för att se om aktien är
        dyrare eller billigare än normalt.
      </p>

      <ValuationBar
        metric="P/E – pris i relation till vinst"
        low="10–15"
        mid="15–25"
        high="25+"
      />

      <TwoCol
        left={
          <KeyInsight>
            Ett högt P/E är inte alltid dåligt, och ett lågt P/E är inte alltid billigt –
            det beror helt på tillväxten.
          </KeyInsight>
        }
        right={
          <InfoBox variant="example" title="Exempel">
            <ExampleRow
              name="Bolag A"
              details="P/E 30, Tillväxt 25 %"
              verdict="Rimligt – hög tillväxt motiverar priset."
            />
            <ExampleRow
              name="Bolag B"
              details="P/E 10, Tillväxt 0 %"
              verdict={`"Value trap" – billigt av en anledning.`}
            />
          </InfoBox>
        }
      />

      {/* ── 4. FINANSIELL STABILITET ───────────── */}
      <SectionTitle number={4} title="Finansiell stabilitet – klarar bolaget en kris?" />

      <TwoCol
        left={
          <RulesTable
            title="Nettoskuld / EBIT"
            rows={[
              { range: "Under 1x", label: "Låg risk",    highlight: true },
              { range: "1–3x",     label: "Normalt" },
              { range: "Över 3x",  label: "Riskabelt" },
            ]}
          />
        }
        right={
          <InfoBox variant="example" title="Exempel">
            <ExampleRow
              name="Bolag A"
              details="Nettoskuld/EBIT: 0,5x"
              verdict="Väldigt trygg skuldsättning."
            />
            <ExampleRow
              name="Bolag B"
              details="Nettoskuld/EBIT: 4x"
              verdict="Känsligt för konjunkturnedgångar och räntehöjningar."
            />
          </InfoBox>
        }
      />

      <InfoBox variant="warning" title="Tänk på detta om skuldsättning">
        <p>
          Skuldsättning är inte alltid negativt – det beror på verksamhetens stabilitet.
          En stabil kassaflödesgenererande verksamhet kan bära mer skuld än ett cykliskt
          bolag med ryckiga intäkter. Men högt belånade bolag i svåra tider kan tvingas
          till utspädande nyemissioner eller utdelningssänkningar.
        </p>
      </InfoBox>

      {/* ── 5. KASSAFLÖDE ──────────────────────── */}
      <SectionTitle number={5} title="Kassaflöde – sanningen bakom vinsten" />

      <InfoBox variant="insight" title="Varför kassaflöde är viktigast">
        <p>
          Kassaflöde är det nyckeltal som flest amatörinvesterare ignorerar – och det som
          professionella analytiker lägger störst vikt vid. Vinst är en
          redovisningskonstruktion. Kassaflöde är riktiga pengar.
        </p>
      </InfoBox>

      <TwoCol
        left={
          <MetricBox
            title="Free Cash Flow (FCF)"
            description="Hur mycket faktiska pengar bolaget genererar efter investeringar."
          />
        }
        right={
          <MetricBox
            title="FCF / Vinst"
            description="Hur stor andel av den redovisade vinsten som faktiskt är kontanter. Nära 100 % är utmärkt."
          />
        }
      />

      <InfoBox variant="example" title="Exempel">
        <ExampleRow
          name="Bolag A"
          details="Vinst: 100, FCF: 95"
          verdict="Konverterar nästan hela vinsten till faktiska pengar – stark kvalitetssignal."
        />
        <ExampleRow
          name="Bolag B"
          details="Vinst: 100, FCF: 20"
          verdict="Binder upp kapital i investeringar eller rörelsekapital – vinsten är illusorisk."
        />
      </InfoBox>

      <KeyInsight>
        Stabilt och växande kassaflöde är ett av de tydligaste tecknen på ett
        kvalitetsbolag.
      </KeyInsight>

      {/* ── AVSLUTNING ─────────────────────────── */}
      <SectionTitle number={6} title="Sätt ihop allt" />

      <AnalysisFlow />

      <Checklist />

    </article>
  );
}
