export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedDate: string;
  sections: GuideSection[];
  keyTakeaways: string[];
}

export const guides: Guide[] = [
  {
    slug: "vad-ar-pe-tal",
    title: "Vad är P/E-tal?",
    description:
      "P/E-talet är ett av de vanligaste måtten för att värdera aktier. Lär dig hur du beräknar och tolkar P/E-tal för att hitta rätt pris på en aktie.",
    category: "Värdering",
    readTime: "5 min",
    publishedDate: "2026-03-20",
    sections: [
      {
        heading: "Vad betyder P/E?",
        paragraphs: [
          "P/E står för Price-to-Earnings, eller pris i förhållande till vinst på svenska. Talet visar hur mycket du betalar per krona vinst som bolaget genererar. Formeln är enkel: dela aktiekursen med vinsten per aktie (EPS).",
          "Exempel: Om en aktie handlas till 200 kr och bolaget tjänar 10 kr per aktie är P/E-talet 20. Det innebär att du betalar 20 kronor för varje krona i vinst — eller att det tar 20 år att få tillbaka din investering om vinsten är konstant.",
        ],
      },
      {
        heading: "Hur tolkar man P/E-talet?",
        paragraphs: [
          "Ett lågt P/E-tal (under 15) tyder ofta på att marknaden värderar bolaget lågt, antingen för att tillväxten är låg, riskerna är höga, eller för att aktien är undervärderad. Ett högt P/E-tal (över 30) signalerar att investerarna förväntar sig stark tillväxt i framtiden.",
          "Det är viktigt att alltid jämföra P/E med branschkollegor. Ett P/E på 25 kan vara billigt för ett teknikbolag men dyrt för ett fastighetsbolag. Historiska snitt för börsen som helhet brukar ligga runt 15–18.",
        ],
      },
      {
        heading: "Trailing vs. Forward P/E",
        paragraphs: [
          "Trailing P/E baseras på de senaste 12 månadernas faktiska vinst — det är historiska data. Forward P/E baseras istället på analytikernas vinstprognoser för kommande år, vilket gör det mer framåtblickande men också mer osäkert.",
          "Vid värdering av snabbväxande bolag är forward P/E mer relevant eftersom historisk vinst kan vara låg eller negativ. För stabila, mogna bolag ger trailing P/E en mer tillförlitlig bild.",
        ],
      },
      {
        heading: "Begränsningar med P/E-talet",
        paragraphs: [
          "P/E-talet fungerar dåligt för bolag med negativ vinst, cykliska bolag vars vinster svänger kraftigt, och bolag som redovisar stora engångsposter. En hög avskrivning kan pressa vinsten temporärt och ge ett missvisande högt P/E.",
          "Måttet tar heller inte hänsyn till skuldsättning. Två bolag med identiskt P/E kan ha vitt skilda riskprofiler beroende på hur mycket lån de har. Komplettera därför alltid P/E med andra nyckeltal som EV/EBIT eller skuldsättningsgrad.",
        ],
      },
    ],
    keyTakeaways: [
      "P/E = aktiekurs ÷ vinst per aktie",
      "Jämför alltid P/E inom samma bransch",
      "Trailing P/E är historiskt — forward P/E är framåtblickande",
      "Fungerar dåligt för bolag med negativ vinst eller stor skuldsättning",
    ],
  },
  {
    slug: "vad-ar-ev-ebit",
    title: "Vad är EV/EBIT?",
    description:
      "EV/EBIT är ett värderingsmått som tar hänsyn till skuldsättning och är mer rättvisande än P/E för att jämföra bolag med olika kapitalstruktur.",
    category: "Värdering",
    readTime: "6 min",
    publishedDate: "2026-03-20",
    sections: [
      {
        heading: "Vad är EV och EBIT?",
        paragraphs: [
          "EV (Enterprise Value) är bolagets totala värde — inte bara börsvärdet utan hela kapitalbas. Formeln är: EV = börsvärde + räntebärande skulder − kassa. Det representerar vad det faktiskt kostar att köpa hela bolaget, inklusive att ta över skulderna.",
          "EBIT (Earnings Before Interest and Taxes) är rörelseresultatet — vinsten före räntor och skatt. Det visar hur lönsam kärnverksamheten är, oavsett hur bolaget är finansierat.",
        ],
      },
      {
        heading: "Varför är EV/EBIT bättre än P/E?",
        paragraphs: [
          "P/E jämför bara aktiekursen mot vinsten efter räntor och skatt, vilket gör det känsligt för kapitalstruktur. Ett högt belånat bolag kan se billigt ut på P/E om räntekostnaderna är låga, men är i verkligheten mer riskfyllt.",
          "EV/EBIT sätter hela bolagets värde i relation till rörelsevinsten, vilket gör jämförelser mellan bolag med olika skuldsättning mer rättvisa. Det är det föredragna måttet inom professionell aktieanalys för att screena och jämföra bolag.",
        ],
      },
      {
        heading: "Hur tolkar man EV/EBIT?",
        paragraphs: [
          "Ett EV/EBIT under 10 anses generellt lågt och kan indikera en undervärderad aktie eller ett bolag med låg tillväxt och höga risker. Över 20 innebär att marknaden prisar in stark framtida tillväxt.",
          "Precis som P/E varierar rimliga nivåer kraftigt mellan branscher. Industribolag handlas typiskt till 8–12x EV/EBIT, medan teknikbolag med hög tillväxt kan motivera 20–30x. Jämför alltid mot sektorsgenomsnittet.",
        ],
      },
      {
        heading: "EV/EBITDA — en vanlig variant",
        paragraphs: [
          "EBITDA lägger tillbaka avskrivningar (Depreciation & Amortization) på EBIT, vilket ger ett mått som bättre speglar kassaflöde i kapitalintensiva branscher som telekom, fastighet och industri.",
          "EV/EBITDA är populärt för bolag med stora materiella tillgångar och höga avskrivningar. EV/EBIT är att föredra när man vill ta med den ekonomiska kostnaden för kapitalförslitning i värderingen.",
        ],
      },
    ],
    keyTakeaways: [
      "EV = börsvärde + skulder − kassa",
      "EV/EBIT tar hänsyn till skuldsättning — mer rättvisande än P/E",
      "Under 10x är generellt lågt, över 20x indikerar tillväxtbolag",
      "EV/EBITDA används ofta för kapitalintensiva branscher",
    ],
  },
  {
    slug: "hur-fungerar-dcf",
    title: "Hur fungerar DCF-analys?",
    description:
      "DCF (Discounted Cash Flow) är den mest grundläggande metoden för att beräkna ett bolags inneboende värde baserat på framtida kassaflöden. Lär dig hur modellen fungerar steg för steg.",
    category: "Värdering",
    readTime: "8 min",
    publishedDate: "2026-03-20",
    sections: [
      {
        heading: "Grundidén bakom DCF",
        paragraphs: [
          "En krona idag är värd mer än en krona imorgon. Det är grundprincipen i DCF. Metoden beräknar nuvärdet av alla framtida kassaflöden ett bolag förväntas generera och summerar dem till ett totalt företagsvärde.",
          "DCF är kraftfullt eftersom det tvingar analytikern att explicit specificera antaganden om tillväxt, lönsamhet och risk — istället för att blint jämföra multiplar. Det är den metod Warren Buffett och andra värde-investerare föredrar.",
        ],
      },
      {
        heading: "Tre steg i en DCF-modell",
        paragraphs: [
          "Steg 1 — Prognostisera fria kassaflöden (FCF): Uppskatta bolagets fria kassaflöde (rörelseresultat efter skatt minus investeringar) för de kommande 5–10 åren, baserat på historisk tillväxt och branschtrender.",
          "Steg 2 — Beräkna terminalvärdet: Eftersom ett bolag inte upphör att existera efter prognosperioden beräknas ett terminalvärde som representerar alla kassaflöden därefter. Vanligaste metoden är Gordon Growth Model: Terminalvärde = FCF × (1 + g) ÷ (WACC − g), där g är långsiktig tillväxttakt.",
          "Steg 3 — Diskontera med WACC: Alla kassaflöden och terminalvärdet diskonteras tillbaka till idag med WACC (Weighted Average Cost of Capital) — den vägda kapitalkostnaden som speglar bolagets riskprofil. Summan ger Enterprise Value.",
        ],
      },
      {
        heading: "Vad är WACC?",
        paragraphs: [
          "WACC är den avkastning bolaget måste ge för att rättfärdiga investeringen, givet dess finansieringsmix av eget kapital och skulder. En typisk WACC för ett stabilt bolag ligger runt 8–10%, medan riskfyllda tillväxtbolag kan ha 12–15%.",
          "Ju högre WACC, desto mer diskonteras framtida kassaflöden och desto lägre blir det beräknade värdet. Det är därför räntehöjningar sänker värderingen på tillväxtaktier kraftigt — de flesta av deras kassaflöden ligger långt fram i tiden.",
        ],
      },
      {
        heading: "Svagheter med DCF",
        paragraphs: [
          "DCF är extremt känslig för antagandena om tillväxt och WACC. En skillnad på 1 procentenhet i WACC kan ändra det beräknade värdet med 20–40%. Det kallas modellrisk — garbage in, garbage out.",
          "Resultatet bör alltid presenteras som ett intervall (bull/base/bear-scenario) snarare än en enskild siffra. Kombinera DCF med relativ värdering (P/E, EV/EBIT) för en mer robust analys.",
        ],
      },
    ],
    keyTakeaways: [
      "DCF beräknar nuvärdet av alla framtida fria kassaflöden",
      "Tre steg: prognostisera FCF → beräkna terminalvärde → diskontera med WACC",
      "Hög WACC = lägre värdering (känsligt för ränteförändringar)",
      "Alltid presentera som ett intervall — modellen är känslig för antaganden",
    ],
  },
  {
    slug: "vad-ar-intrinsic-value",
    title: "Vad är intrinsic value?",
    description:
      "Intrinsic value — eller inneboende värde — är ett bolags verkliga värde baserat på fundamenta, till skillnad från vad marknaden för tillfället betalar. Konceptet är centralt inom värdeinvestering.",
    category: "Värdering",
    readTime: "5 min",
    publishedDate: "2026-03-20",
    sections: [
      {
        heading: "Definitionen av intrinsic value",
        paragraphs: [
          "Intrinsic value är ett bolags verkliga, fundamentala värde — oberoende av aktiekursen. Konceptet populariserades av Benjamin Graham och vidareutvecklades av Warren Buffett, som definierar det som nuvärdet av alla kassaflöden ett bolag kan generera under sin livstid.",
          "Tanken är att aktiekursen på kort sikt kan avvika kraftigt från det inneboende värdet på grund av sentiment, panik eller eufori — men på lång sikt tenderar kursen att konvergera mot det verkliga värdet.",
        ],
      },
      {
        heading: "Hur beräknar man intrinsic value?",
        paragraphs: [
          "Det finns ingen enda formel. De vanligaste metoderna är DCF-analys (diskonterade kassaflöden), Graham-formeln (ofta förenklad som: Intrinsic Value = EPS × (8.5 + 2g) där g är förväntad tillväxt), och sum-of-the-parts-värdering för konglomerat.",
          "Resultatet är alltid en uppskattning — inte ett exakt tal. Buffett pratar om 'margin of safety': köp bara om kursen är betydligt under ditt beräknade intrinsic value, för att ha en buffert om dina antaganden är fel.",
        ],
      },
      {
        heading: "Margin of safety",
        paragraphs: [
          "Margin of safety är skillnaden mellan aktiekursen och intrinsic value. Om du beräknar att ett bolag är värt 100 kr per aktie och kursen är 70 kr har du 30% margin of safety.",
          "Benjamin Graham rekommenderade en margin of safety på minst 33%. Det skyddar mot analytikernas misstag, oförutsedda händelser och modellernas inneboende osäkerhet. Ju mer osäker beräkningen är, desto större marginal krävs.",
        ],
      },
      {
        heading: "Intrinsic value vs. marknadspris",
        paragraphs: [
          "Marknaden är effektiv på lång sikt men ineffektiv på kort sikt. Det skapar möjligheter för tålmodiga investerare. En aktie kan handlas långt under intrinsic value under månader eller år innan marknaden 'upptäcker' värdet.",
          "Viktigt: intrinsic value förändras kontinuerligt i takt med att bolagets utsikter, konkurrensläge och räntemiljö förändras. Det är inte ett statiskt tal utan kräver regelbunden omvärdering.",
        ],
      },
    ],
    keyTakeaways: [
      "Intrinsic value = bolagets verkliga värde baserat på framtida kassaflöden",
      "Aktiekursen divergerar kortsiktigt men konvergerar mot intrinsic value långsiktigt",
      "Margin of safety = köp till kurs klart under intrinsic value för att ha buffert",
      "Värdet är en uppskattning — alltid presentera som ett intervall",
    ],
  },
  {
    slug: "hur-analyserar-man-en-aktie",
    title: "Hur analyserar man en aktie?",
    description:
      "En strukturerad guide till aktieanalys — från att förstå affärsmodellen till att beräkna en rimlig värdering. Lär dig den process som professionella analytiker använder.",
    category: "Analys",
    readTime: "10 min",
    publishedDate: "2026-03-20",
    sections: [
      {
        heading: "1. Förstå affärsmodellen",
        paragraphs: [
          "Börja alltid med att förstå hur bolaget tjänar pengar. Vad säljer de? Till vem? Hur ser prissättningen ut? Är det en återkommande intäktsmodell (SaaS, prenumerationer) eller engångsförsäljning? Kan du förklara affärsmodellen på 30 sekunder?",
          "Buffett kallar detta 'circle of competence' — analysera bara bolag du verkligen förstår. En komplicerad affärsmodell du inte begriper är en röd flagg i sig.",
        ],
      },
      {
        heading: "2. Analysera competitive moat",
        paragraphs: [
          "En moat (vallgrav) är den konkurrensfördel som skyddar bolaget från konkurrenter. Vanliga typer: nätverkseffekter (Facebook, Visa), switching costs (SAP, Salesforce), kostnadsfördelar (Amazon), immateriella tillgångar (patent, varumärken) och skalfördelar.",
          "Fråga dig: varför väljer kunder det här bolaget framför konkurrenterna? Och hur länge kan den fördelen bestå? Bolag med starka moats kan ta ut prispremium och försvara sina marginaler under lång tid.",
        ],
      },
      {
        heading: "3. Granska finanserna",
        paragraphs: [
          "Studera resultaträkning, balansräkning och kassaflödesanalys för minst 5 år bakåt. Nyckeltal att titta på: intäktstillväxt, bruttomarginal, rörelsemarginal, avkastning på eget kapital (ROE), skuldsättningsgrad och fritt kassaflöde.",
          "Kassaflödet är viktigare än redovisningsvinsten. Ett bolag som visar hög vinst men negativt fritt kassaflöde år efter år är ett varningstecken. Vinsten kan manipuleras med redovisningsprinciper — kassaflödet är svårare att bluffa.",
        ],
      },
      {
        heading: "4. Bedöm ledning och ägare",
        paragraphs: [
          "Ledningens kapitalallokering avgör ofta om en investering lyckas. Återinvesterar de i lönsam tillväxt, betalar de utdelning, genomför de aktieåterköp, eller gör de dyra förvärv? Studera historiken.",
          "Insiderägande är en positiv signal — när ledning och styrelse har signifikant eget kapital i bolaget är deras intressen i linje med aktieägarnas. Kolla också om insiders köper eller säljer aktier.",
        ],
      },
      {
        heading: "5. Värdera aktien",
        paragraphs: [
          "Använd minst två värderingsmetoder: relativa multiplar (P/E, EV/EBIT mot historiska snitt och konkurrenter) och absolut värdering (DCF). Bygg ett base-scenario, ett bull-scenario och ett bear-scenario med olika antaganden.",
          "Jämför det beräknade värdet med aktiekursen. Är det en tillräcklig margin of safety? Att köpa ett fantastiskt bolag till ett absurt pris ger dålig avkastning. Priset du betalar avgör din avkastning.",
        ],
      },
      {
        heading: "6. Identifiera riskerna",
        paragraphs: [
          "Vad kan gå fel? Tänk på: regulatoriska risker, teknologisk disruption, konjunkturkänslighet, valutarisker, konkurrensintensitet och balansräkningsrisker. Bedöm sannolikheten och konsekvensen av varje risk.",
          "Den bästa analysen är inte den som förutspår framtida uppgångar — det är den som identifierar vad som kan förstöra investeringstesen. Om du vet varför tesen kan vara fel kan du bevaka rätt signaler.",
        ],
      },
    ],
    keyTakeaways: [
      "Börja med affärsmodellen — förstå hur bolaget tjänar pengar",
      "Identifiera competitive moat: vad skyddar bolaget från konkurrenter?",
      "Kassaflöde är mer tillförlitligt än redovisningsvinst",
      "Värdera med minst två metoder och bygg bull/base/bear-scenarion",
      "Identifiera aktivt vad som kan förstöra investeringstesen",
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
