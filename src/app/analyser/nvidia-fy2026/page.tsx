import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const NvidiaAnalysis = dynamic(() => import("./NvidiaAnalysis"));

export const metadata = createMetadata({
  title: "NVIDIA FY2026 – Finansiell analys",
  description: "Komplett analys av NVIDIAs dominans inom AI-chip, Blackwell-plattformen, värdering och framtidsutsikter.",
  path: "/analyser/nvidia-fy2026",
  type: "article",
  publishedTime: "2026-03-03",
  author: "Carl Fredrik Thor",
});

export default function NvidiaPage() {
  return <NvidiaAnalysis />;
}
