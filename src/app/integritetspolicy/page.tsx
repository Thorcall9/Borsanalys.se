import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Integritetspolicy",
  description: "Integritetspolicy för Börsanalys.se – hur vi hanterar dina personuppgifter.",
  path: "/integritetspolicy",
});

export default function Integritetspolicy() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Integritetspolicy</h1>
        <p className="text-muted text-sm mb-10">Senast uppdaterad: mars 2026</p>

        <div className="prose max-w-none space-y-6 text-foreground/80 leading-relaxed">
          <p>
            Börsanalys.se värnar om din integritet. Den här policyn förklarar vilka
            personuppgifter vi samlar in, varför vi gör det och hur vi skyddar dem.
            Vi följer EU:s dataskyddsförordning (GDPR).
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Personuppgiftsansvarig</h2>
          <p>
            Börsanalys.se är personuppgiftsansvarig för behandlingen av dina
            personuppgifter. Har du frågor om hur vi hanterar dina uppgifter är
            du välkommen att kontakta oss via{" "}
            <a href="/kontakt" className="text-primary hover:underline">kontaktsidan</a>.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Vilka uppgifter vi samlar in</h2>
          <p>Vi samlar in personuppgifter i följande situationer:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Nyhetsbrev</strong> – När du prenumererar på vårt nyhetsbrev
              sparar vi din e-postadress för att kunna skicka dig analyser och uppdateringar.
            </li>
            <li>
              <strong>Kontaktformulär</strong> – När du skickar ett meddelande via
              kontaktsidan sparar vi ditt namn, din e-postadress och ditt meddelande
              för att kunna svara dig.
            </li>
            <li>
              <strong>Besöksstatistik</strong> – Vi kan samla in anonymiserad
              statistik om hur webbplatsen används (t.ex. sidvisningar) för att
              förbättra tjänsten. Ingen information kopplas till dig som individ.
            </li>
          </ul>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Hur vi använder uppgifterna</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Skicka nyhetsbrev med analyser och marknadsuppdateringar.</li>
            <li>Svara på förfrågningar som skickas via kontaktformuläret.</li>
            <li>Förbättra webbplatsens innehåll och användarupplevelse.</li>
          </ul>
          <p>
            Vi säljer eller delar aldrig dina personuppgifter med tredje part i
            marknadsföringssyfte.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Rättslig grund</h2>
          <p>
            Behandlingen av dina uppgifter grundar sig på ditt samtycke (t.ex. när
            du prenumererar på nyhetsbrevet) eller på berättigat intresse (t.ex.
            när du kontaktar oss och förväntar dig ett svar).
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Lagring och radering</h2>
          <p>
            Vi sparar dina uppgifter så länge de behövs för det angivna ändamålet.
            Din e-postadress i nyhetsbrevet sparas tills du avregistrerar dig.
            Meddelanden via kontaktformuläret sparas i upp till 12 månader.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Dina rättigheter</h2>
          <p>Enligt GDPR har du rätt att:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Begära tillgång till de personuppgifter vi har om dig.</li>
            <li>Begära rättelse av felaktiga uppgifter.</li>
            <li>Begära radering av dina uppgifter ("rätten att bli glömd").</li>
            <li>Invända mot eller begränsa behandlingen av dina uppgifter.</li>
            <li>Återkalla ditt samtycke när som helst utan att det påverkar tidigare behandling.</li>
          </ul>
          <p>
            Kontakta oss via{" "}
            <a href="/kontakt" className="text-primary hover:underline">kontaktsidan</a>{" "}
            för att utöva dina rättigheter. Du har också rätt att lämna klagomål
            till Integritetsskyddsmyndigheten (IMY) på{" "}
            <a
              href="https://www.imy.se"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              imy.se
            </a>.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Cookies</h2>
          <p>
            Vi använder enbart tekniskt nödvändiga cookies för att webbplatsen
            ska fungera korrekt. Vi använder inga spårningscookies från tredje
            part i marknadsföringssyfte.
          </p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-foreground">Ändringar i policyn</h2>
          <p>
            Vi kan komma att uppdatera den här integritetspolicyn. Vid väsentliga
            förändringar meddelar vi dig via nyhetsbrevet eller med ett meddelande
            på webbplatsen. Datumet för senaste uppdatering visas längst upp på
            sidan.
          </p>
        </div>
      </div>
    </section>
  );
}
