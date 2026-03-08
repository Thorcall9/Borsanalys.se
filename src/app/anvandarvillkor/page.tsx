import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Användarvillkor",
  description: "Användarvillkor för Börsanalys.se",
  path: "/anvandarvillkor",
});

export default function Anvandarvillkor() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-8">Användarvillkor</h1>

        <div className="prose max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Ansvarsfriskrivning</h2>
          <p>
            Informationen på Börsanalys.se utgör inte finansiell rådgivning.
            Allt innehåll är framtaget i informationssyfte och ska inte tolkas
            som rekommendationer att köpa eller sälja värdepapper.
          </p>
          <p>
            Historisk avkastning är ingen garanti för framtida resultat.
            Investeringar i aktier och andra värdepapper innebär alltid en risk.
            Du kan förlora hela eller delar av ditt investerade kapital.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Användning av webbplatsen</h2>
          <p>
            Genom att använda Börsanalys.se godkänner du dessa villkor.
            Vi förbehåller oss rätten att ändra villkoren utan föregående meddelande.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Upphovsrätt</h2>
          <p>
            Allt innehåll på Börsanalys.se, inklusive text, bilder, diagram och
            analyser, är upphovsrättsskyddat. Materialet får inte kopieras,
            distribueras eller publiceras utan skriftligt tillstånd.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Personuppgifter</h2>
          <p>
            Vi behandlar personuppgifter i enlighet med GDPR. E-postadresser
            som lämnas via nyhetsbrevet används enbart för att skicka analyser
            och uppdateringar. Du kan avregistrera dig när som helst.
          </p>
        </div>
      </div>
    </section>
  );
}
