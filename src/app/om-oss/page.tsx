import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Om oss",
  description:
    "Lär känna personen bakom Börsanalys.se — AI-driven aktieanalys för smartare investeringar.",
  path: "/om-oss",
});

export default function OmOss() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Om Börsanalys.se</h1>

        <div className="prose max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Hej! Jag heter <strong>Carl</strong>, är 31 år och driver Börsanalys.se.
            Aktier och investeringar har varit mitt stora intresse sedan 2018, och
            jag startade den här sidan för att hjälpa andra att navigera börsen
            på ett strukturerat sätt.
          </p>

          <p>
            Till vardags jobbar jag heltid och lever med min sambo och våra barn.
            Att balansera familjeliv med ett genuint intresse för finansmarknaden
            motiverade mig att skapa en plattform som gör det enklare att
            snabbt få en överblick av intressanta bolag.
          </p>

          <h2 className="text-xl font-serif mt-10 mb-4 text-foreground">Mitt mål</h2>
          <p>
            Mitt mål är att hjälpa både nya och erfarna investerare att fatta
            bättre beslut. Genom detaljerade bolagsanalyser, långsiktiga
            värderingsmodeller och aktuella marknadstrender vill jag ge dig
            verktygen du behöver.
          </p>

          <h2 className="text-xl font-serif mt-10 mb-4 text-foreground">Investeringsfilosofi</h2>
          <p>
            Jag följer en <strong>Buy and Hold-strategi</strong> med fokus på
            fundamentala faktorer. Det innebär att jag letar efter
            kvalitetsbolag med starka konkurrensfördelar, god tillväxt och
            rimlig värdering — och sedan behåller dem långsiktigt.
          </p>
          <p>
            Min portfölj är primärt exponerad mot den svenska marknaden, med viss
            allokering mot amerikanska bolag.
          </p>

          <h2 className="text-xl font-serif mt-10 mb-4 text-foreground">Metodik</h2>
          <p>
            Analyserna kombinerar kvantitativ data med kvalitativ bedömning.
            AI-verktyg används för att effektivisera research och identifiera
            mönster, men varje analys granskas och kvalitetssäkras manuellt
            innan publicering.
          </p>

          <h2 className="text-xl font-serif mt-10 mb-4 text-foreground">Vad vi erbjuder</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Detaljerade bolagsanalyser med Bear/Base/Bull-scenarion</li>
            <li>Långsiktiga värderingsmodeller</li>
            <li>Aktuella nyheter och marknadstrender</li>
            <li>Finansiella verktyg och kalkylatorer</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
