import { createMetadata } from "@/lib/seo";
import SavingsGoalCalculator from "./SavingsGoalCalculator";

export const metadata = createMetadata({
  title: "Målsparandekalkylator",
  description: "Beräkna hur mycket du behöver spara per månad för att nå ditt finansiella mål.",
  path: "/verktyg/malsparandekalkylator",
});

export default function MalsparandeKalkylator() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Målsparandekalkylator</h1>
        <p className="text-muted mb-8">
          Ange ditt sparmål och se hur mycket du behöver spara per månad för att nå det.
        </p>
        <SavingsGoalCalculator />
        <p className="text-xs text-muted mt-8">
          Observera: Beräkningen är förenklad och tar inte hänsyn till skatter, inflation eller avgifter.
        </p>
      </div>
    </section>
  );
}
