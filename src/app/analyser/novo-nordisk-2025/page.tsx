import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const NovoNordiskAnalysis = dynamic(() => import("./NovoNordiskAnalysis"));

export const metadata = createMetadata({
  title: "Novo Nordisk: Från hypertillväxt till hård konkurrens – vad hände nu?",
  description:
    "Analys av konkurrensläget inom GLP-1, pipeline-uppdateringar och värdering av Novo Nordisk efter 2024 års kursfall.",
  path: "/analyser/novo-nordisk-2025",
  type: "article",
  publishedTime: "2025-10-20",
  author: "Carl Fredrik Thor",
});

export default function NovoNordiskPage() {
  return <NovoNordiskAnalysis />;
}
