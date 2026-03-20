import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const EvolutionAnalysis = dynamic(() => import("./EvolutionAnalysis"));

export const metadata = createMetadata({
  title: "Evolution – Marknadsposition 2025",
  description:
    "Analys av Evolutions dominerande position inom live casino, marginalutveckling, regulatoriska risker och värdering.",
  path: "/analyser/evolution-2025",
  type: "article",
  publishedTime: "2025-08-27",
  author: "Carl Fredrik Thor",
});

export default function EvolutionPage() {
  return <EvolutionAnalysis />;
}
