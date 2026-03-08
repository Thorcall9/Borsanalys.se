import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const MicrosoftAnalysis = dynamic(() => import("./MicrosoftAnalysis"));

export const metadata = createMetadata({
  title: "Microsoft 2026 – Är AI-giganten fortfarande köpvärd?",
  description: "Djupanalys av Microsofts AI-strategi, Azure-tillväxt, Copilot-monetarisering och värdering inför 2026.",
  path: "/analyser/microsoft-2026",
  type: "article",
  publishedTime: "2026-03-02",
  author: "Carl Fredrik Thor",
});

export default function MicrosoftPage() {
  return <MicrosoftAnalysis />;
}
