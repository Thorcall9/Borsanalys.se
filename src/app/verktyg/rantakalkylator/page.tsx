import { createMetadata } from "@/lib/seo";
import CompoundCalculator from "./CompoundCalculator";

export const metadata = createMetadata({
  title: "Ränta-på-ränta kalkylator",
  description: "Beräkna hur ditt sparande växer över tid med ränta-på-ränta-effekten. Visualisera tillväxten med interaktiva diagram.",
  path: "/verktyg/rantakalkylator",
});

export default function RantaKalkylator() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Ränta-på-ränta kalkylator</h1>
        <p className="text-muted mb-8">
          Se hur ditt sparande kan växa över tid tack vare ränta-på-ränta-effekten.
          Justera parametrarna nedan för att se resultatet.
        </p>
        <CompoundCalculator />
        <p className="text-xs text-muted mt-8">
          Observera: Kalkylatorn visar en förenklad beräkning. Historisk avkastning är ingen garanti för framtida resultat.
          Investeringar innebär alltid risk.
        </p>
      </div>
    </section>
  );
}
