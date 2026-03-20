// ============================================================
// src/app/guider/nyckeltal/page.tsx
// "De viktigaste nyckeltalen" – komplett guide-sida, utan emojis
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
  AnalysisFlow,
  ChecklistBox,
  Conclusion,
} from "@/components/GuideComponents";

// ─── Viktiga punkter-lista ──────────────────────────────────

function KeyPoints() {
  const points = [
    "Tillväxt driver aktien – sikta på stabil omsättningstillväxt på 10 %+ och kontrollera att vinsttillväxten inte löper iväg från omsättningen.",
    "Lönsamhet skapar värde – ROE på 15 %+ och konsekvent hög vinstmarginal indikerar ett kvalitetsbolag med konkurrensfördel.",
    "Värdering avgör din avkastning – analysera alltid P/E i kontext med tillväxt; ett högt P/E kan vara motiverat och ett lågt kan vara en fälla.",
    "Skuldsättning (nettoskuld/EBIT) under 3x ger finansiell stabilitet och motståndskraft i svåra tider.",
    "Kassaflöde avslöjar sanningen – FCF nära vinsten år efter år är ett av de starkaste tecknen på ett riktigt kvalitetsbolag.",
  ];

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-3">
      <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Viktiga punkter</p>
      {points.map((text, i) => (
        <div key={i} className="flex gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      ))}
    </div>
  );
}

// ─── "Vad du vill se"-box (kassaflöde) ─────────────────────

function CashflowChecklist() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      <p className="font-semibold text-gray-800 mb-3">Vad du vill se:</p>
      <ul className="space-y-2">
        {["Stabilt och växande kassaflöde", "FCF som liknar vinsten över tid"].map((item) => (
          <li key={item} className="text-sm text-gray-700 flex gap-2">
            <span>✅</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────

export default function NyckeltalGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-8">

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
          dyrt? Är det finansiellt stabilt? Och är vinsten faktiskt på riktigt?
        </p>
        <p className="mt-2">
          Den här guiden går igenom varje steg och de nyckeltal som hör till. Målet är att
          du snabbt ska kunna sålla bort svaga bolag och identifiera kvalitetsbolag – utan
          att drunkna i detaljer.
        </p>
      </InfoBox>

      {/* ── 1. TILLVÄXT ──────────────────────────── */}
      <SectionTitle number={1} title="Tillväxt – motorn i aktien" />

      <TwoCol
        left={
          <MetricBox
            title="Nyckeltal:"
            description="Omsättningstillväxt (3–5 år) och vinsttillväxt (5 år). Visar hur snabbt bolaget växer och om tillväxten är hållbar."
          />
        }
        right={
          <RulesTable
            title="Tumregler:"
            rows={[
              { range: "0–5 %",   label: "Låg tillväxt" },
              { range: "5–10 %",  label: "Stabilt" },
              { range: "10–20 %", label: "Bra",           highlight: true },
              { range: "20 %+",   label: "Hög tillväxt",  highlight: true },
            ]}
          />
        }
      />

      <InfoBox variant="warning" title="Varningssignal">
        <p>
          När vinsttillväxten är betydligt högre än omsättningstillväxten kan det indikera
          att kostnadsbesparingar driver vinsten snarare än verklig affärstillväxt – vilket
          är svårare att upprätthålla över tid.
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

      {/* ── 2. LÖNSAMHET ─────────────────────────── */}
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
              description="5-årssnitt. Visar hur stor del av omsättningen som faktiskt blir vinst."
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

      {/* ── 3. VÄRDERING ─────────────────────────── */}
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

      {/* ── 4. RISK / SKULDSÄTTNING ──────────────── */}
      <SectionTitle number={4} title="Risk – hur stabilt bolaget är" />

      <MetricBox
        accent="red"
        title="Nettoskuld / EBIT"
        description="Visar hur många år det tar att betala av skulden med nuvarande vinst."
        badges={[
          { label: "< 1 Låg risk", variant: "lagRisk" },
          { label: "1–3 Normal",   variant: "normal" },
          { label: "3+ Hög risk",  variant: "hogRisk" },
        ]}
      />

      <InfoBox variant="example" title="Exempel">
        <ExampleRow
          name="Bolag A"
          details="Nettoskuld / EBIT: 0,5"
          verdict="Väldigt tryggt."
        />
        <ExampleRow
          name="Bolag B"
          details="Nettoskuld / EBIT: 4"
          verdict="Riskabelt – känsligt för nedgångar."
        />
      </InfoBox>

      <InfoBox variant="warning" title="Tänk på detta">
        <p>
          Skuldsättning är inte alltid negativt – det beror på verksamhetens stabilitet.
          En stabil kassaflödesgenererande verksamhet kan bära mer skuld än ett cykliskt
          bolag med ryckiga intäkter. Högt belånade bolag kan i svåra tider tvingas till
          utspädande nyemissioner eller utdelningssänkningar.
        </p>
      </InfoBox>

      {/* ── 5. KASSAFLÖDE ────────────────────────── */}
      <SectionTitle number={5} title="Kassaflöde – sanningen bakom vinsten" />

      <p className="text-sm text-gray-700">
        Vinst ≠ pengar. Ett bolag kan visa hög vinst men ändå ha tomt i kassan.
      </p>

      <TwoCol
        left={<CashflowChecklist />}
        right={
          <InfoBox variant="example" title="Exempel">
            <ExampleRow
              name="Bolag A"
              details="Vinst 100, FCF 95"
              verdict="Stark kvalitet."
            />
            <ExampleRow
              name="Bolag B"
              details="Vinst 100, FCF 20"
              verdict="Varningssignal – vinsten omvandlas inte till pengar."
            />
          </InfoBox>
        }
      />

      <KeyInsight>
        Kassaflöde är det nyckeltal som flest amatörinvesterare ignorerar – och det som
        professionella analytiker lägger störst vikt vid.
      </KeyInsight>

      {/* ── SÅ SÄTTER DU IHOP ALLT ───────────────── */}
      <AnalysisFlow
        title="Så sätter du ihop allt"
        steps={[
          { number: "01", label: "Tillväxt",   question: "Växer bolaget?" },
          { number: "02", label: "Lönsamhet",  question: "Är det kvalitet?" },
          { number: "03", label: "Värdering",  question: "Rimligt pris?" },
          { number: "04", label: "Skuld",      question: "Klarar en kris?" },
          { number: "05", label: "Kassaflöde", question: "Är vinsten verklig?" },
        ]}
      />

      {/* ── CHECKLISTA + MISSTAG ─────────────────── */}
      <TwoCol
        left={
          <ChecklistBox
            variant="green"
            title="Snabb checklista"
            subtitle="Ett starkt bolag har ofta:"
            items={[
              "Stabil tillväxt (10 %+)",
              "Hög ROE (15 %+)",
              "Bra marginaler",
              "Rimlig värdering",
              "Låg eller kontrollerad skuld",
              "Stark FCF",
            ]}
          />
        }
        right={
          <ChecklistBox
            variant="red"
            title="Vanliga misstag"
            items={[
              "Titta bara på P/E",
              "Ignorera skulder",
              "Fokusera bara på vinst (inte kassaflöde)",
              "Inte jämföra historiskt",
            ]}
          />
        }
      />

      {/* ── SLUTSATS ─────────────────────────────── */}
      <Conclusion
        heading="Slutsats"
        body="Du behöver inte 50 nyckeltal. Med dessa få kan du snabbt sålla bort dåliga bolag och hitta riktiga kvalitetsinvesteringar."
        quote="Tillväxt driver aktien. Lönsamhet skapar värde. Värdering avgör din avkastning. Kassaflöde avslöjar sanningen."
        footer={
          <p>
            Vill du ta nästa steg? Kombinera detta med en djupare värderingsmetod som{" "}
            <a href="/guider/dcf" className="text-blue-600 underline hover:text-blue-800">
              DCF
            </a>{" "}
            – så är du redan långt före många investerare.
          </p>
        }
      />

    </article>
  );
}
