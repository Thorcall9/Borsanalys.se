import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AB Volvo – Aktieanalys 2026 | Börsanalys.se",
  description:
    "Djupanalys av AB Volvo med FY2025-data. Nettokassa 63 mdr SEK, marknadsledare i Europa för tunga lastbilar. BEVAKA med riktkurs 345 kr — utdelning 13 kr ger 4,0% direktavkastning.",
};

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
