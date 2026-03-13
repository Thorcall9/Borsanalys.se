export const metadata = {
  title: "Investor AB — Aktieanalys 2026",
  description: "Djupgående analys av Investor AB. Riktkurs 370 kr. NAV 355 kr. BEHÅLL-rekommendation.",
  openGraph: {
    title: "Investor AB — Aktieanalys 2026 | Börsanalys.se",
    description: "Riktkurs 370 kr. Wallenbergsfärens flaggskepp med 15% årsavkastning senaste 20 åren.",
    images: ["/investor_analys_hero.png"],
    url: "https://www.borsanalys.se/analyser/investor",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
