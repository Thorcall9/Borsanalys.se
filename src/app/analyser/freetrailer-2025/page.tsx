import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const FreetrailerAnalysis = dynamic(() => import("./FreetrailerAnalysis"));

export const metadata = createMetadata({
  title: "Freetrailer – Tillväxtanalys 2025",
  description:
    "Analys av Freetrailers plattformsaffär, tillväxtstrategi i Norden och expansion till Europa.",
  path: "/analyser/freetrailer-2025",
  type: "article",
  publishedTime: "2025-09-18",
  author: "Carl Fredrik Thor",
});

export default function FreetrailerPage() {
  return <FreetrailerAnalysis />;
}
