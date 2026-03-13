import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor AB – Aktieanalys 2026 | Börsanalys.se",
  description: "Djupanalys av Investor AB med fokus på NAV-tillväxt, Patricia Industries och substansrabatt.",
};

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
