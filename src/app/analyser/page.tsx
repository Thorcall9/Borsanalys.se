import { createMetadata } from "@/lib/seo";
import { analyses } from "@/lib/analyses";
import AnalyserFilter from "./AnalyserFilter";

export const metadata = createMetadata({
  title: "Analyser",
  description:
    "Alla aktieanalyser på Börsanalys.se — djupgående analyser med Bear, Base och Bull-scenarion.",
  path: "/analyser",
});

export default function Analyser() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">Analyser</h1>
          <p className="text-muted">
            Djupgående aktieanalyser med detaljerade finansiella mått, värderingsmodeller
            och Bear/Base/Bull-scenarion.
          </p>
        </div>

        <AnalyserFilter analyses={analyses} />
      </div>
    </section>
  );
}
