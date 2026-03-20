import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const NewWaveAnalysis = dynamic(() => import("./NewWaveAnalysis"));

export const metadata = createMetadata({
  title: "New Wave Group – Strategi och värdering 2025",
  description:
    "Analys av New Wave Groups varumärkesportfölj, tillväxtstrategi och värdering på Stockholmsbörsen.",
  path: "/analyser/new-wave-2025",
  type: "article",
  publishedTime: "2025-09-28",
  author: "Carl Fredrik Thor",
});

export default function NewWavePage() {
  return <NewWaveAnalysis />;
}
