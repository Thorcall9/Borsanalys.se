import { createMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";

const VolvoQ2Analysis = dynamic(() => import("./VolvoQ2Analysis"));

export const metadata = createMetadata({
  title: "Volvo – Premiumvärdering under press (H1 2025)",
  description:
    "Historisk analys av AB Volvo baserat på H1 2025-data. Se vår uppdaterade analys med FY2025-data för den senaste bedömningen.",
  path: "/analyser/volvo-2025-q2",
  type: "article",
  publishedTime: "2025-10-07",
  author: "Carl Fredrik Thor",
});

export default function VolvoQ2Page() {
  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
        Denna analys baseras på H1 2025-data.{" "}
        <Link href="/analyser/volvo-2026" className="font-semibold underline hover:text-amber-900">
          Se vår uppdaterade FY2025-analys →
        </Link>
      </div>
      <VolvoQ2Analysis />
    </>
  );
}
