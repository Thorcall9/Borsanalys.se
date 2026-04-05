"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { logger } from "@/lib/logger";
// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
export interface AnalysisSection {
  id: string;
  number: string;
  title: string;
}

export interface AnalysisLayoutProps {
  children: React.ReactNode;
  sections: AnalysisSection[];
  companyName: string;
  ticker?: string;
  exchange?: string;
  subtitle?: string;
  date?: string;
  dataSources?: string;
  accentColor?: string;
  theme?: "dark" | "light";
  heroImage?: string;
  heroAlt?: string;
  // Nyckeltal visas i toppen — fyll i det du vet, resten hämtas live
  targetPrice?: string;
  recommendation?: "KOP" | "BEHALL" | "BEVAKA" | "SALJ";
  analystTargetPrice?: string;
  // Valfria statiska nyckeltal om live-data saknas
  staticPE?: string;
  staticEPS?: string;
  staticMarketCap?: string;
  staticDividendYield?: string;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const REC_CONFIG = {
  KOP:    { label: "KÖP",    bg: "bg-emerald-600", text: "text-white" },
  BEHALL: { label: "BEHÅLL", bg: "bg-amber-500",   text: "text-white" },
  BEVAKA: { label: "BEVAKA", bg: "bg-blue-600",    text: "text-white" },
  SALJ:   { label: "SÄLJ",   bg: "bg-red-600",     text: "text-white" },
};

function formatPrice(price: number, currency: string) {
  if (currency === "SEK")
    return price.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " SEK";
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─────────────────────────────────────────────────────────────
// LIVE PRICE HOOK — hämtar från vår egen /api/stock-data
// ─────────────────────────────────────────────────────────────
interface LiveData {
  price: number | null;
  change: number | null;
  changePercent: number | null;
  high52: number | null;
  low52: number | null;
  volume: number | null;
  pe: number | null;
  eps: number | null;
  marketCap: number | null;
  dividendYield: number | null;
  currency: string;
  name: string;
}

function useLiveData(ticker: string): { data: LiveData | null; loading: boolean } {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!ticker) { setLoading(false); return; }
      try {
        const res = await fetch(
          `/api/stock-chart?ticker=${encodeURIComponent(ticker)}&range=1d&interval=1d`
        );
        if (!res.ok) throw new Error("API fel");
        const json = await res.json();
        const meta = json?.meta;
        if (!meta) throw new Error("Ingen meta");

        const price = meta.regularMarketPrice ?? null;
        const prev = meta.previousClose ?? null;
        const change = price && prev ? price - prev : null;
        const changePct = change && prev ? (change / prev) * 100 : null;

        setData({
          price,
          change,
          changePercent: changePct,
          high52: meta.fiftyTwoWeekHigh ?? null,
          low52: meta.fiftyTwoWeekLow ?? null,
          volume: meta.regularMarketVolume ?? null,
          pe: null,
          eps: null,
          marketCap: null,
          dividendYield: null,
          currency: meta.currency ?? "SEK",
          name: meta.longName ?? meta.shortName ?? ticker,
        });
      } catch (error: unknown) {
        logger.warn("Failed to fetch live data", { ticker, error: error instanceof Error ? error.message : String(error) });
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [ticker]);

  return { data, loading };
}

// ─────────────────────────────────────────────────────────────
// MINI SPARKLINE (Chart.js)
// ─────────────────────────────────────────────────────────────
function Sparkline({ ticker, positive }: { ticker: string; positive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: any = null;
    async function draw() {
      try {
        const { Chart, registerables } = await import("chart.js");
        Chart.register(...registerables);

        const res = await fetch(
          `/api/stock-chart?ticker=${encodeURIComponent(ticker)}&range=3mo&interval=1d`
        );
        const json = await res.json();
        const closes = json?.closes ?? [];
        const timestamps = json?.timestamps ?? [];

        if (!canvasRef.current || closes.length === 0) return;

        const color = positive ? "#16a34a" : "#dc2626";
        const labels = timestamps.map((t: number) =>
          new Date(t * 1000).toLocaleDateString("sv-SE", { month: "short", day: "numeric" })
        );

        chart = new Chart(canvasRef.current, {
          type: "line",
          data: {
            labels,
            datasets: [{
              data: closes,
              borderColor: color,
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              backgroundColor: positive
                ? "rgba(22,163,74,0.08)"
                : "rgba(220,38,38,0.08)",
              tension: 0.4,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
            scales: {
              x: { display: true, grid: { display: false }, ticks: { maxTicksLimit: 6, font: { size: 10 } } },
              y: { display: true, grid: { color: "rgba(0,0,0,0.04)" }, ticks: { font: { size: 10 } } },
            },
          },
        });
      } catch (error: unknown) {
        logger.warn("Failed to draw sparkline", { ticker, error: error instanceof Error ? error.message : String(error) });
      }
    }
    draw();
    return () => { chart?.destroy(); };
  }, [ticker, positive]);

  return (
    <div className="relative h-32">
      <canvas ref={canvasRef} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NYCKELTAL CARD
// ─────────────────────────────────────────────────────────────
function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${highlight ? "bg-[#1a3c6e] text-white" : "bg-white border border-gray-200"}`}>
      <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${highlight ? "text-blue-200" : "text-gray-400"}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? "text-white" : "text-[#1a3c6e]"}`} style={{ fontFamily: "Georgia, serif" }}>
        {value}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR NAV
// ─────────────────────────────────────────────────────────────
function SidebarNav({ sections, activeId }: { sections: AnalysisSection[]; activeId: string }) {
  return (
    <nav className="sticky top-24 hidden lg:block">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Innehåll</p>
      <ul className="space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                activeId === s.id
                  ? "bg-[#1a3c6e] text-white font-semibold"
                  : "text-gray-500 hover:text-[#1a3c6e] hover:bg-gray-100"
              }`}
            >
              <span className={`text-xs font-mono w-5 text-center ${activeId === s.id ? "text-blue-300" : "text-gray-300"}`}>
                {s.number}
              </span>
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN LAYOUT
// ─────────────────────────────────────────────────────────────
export function AnalysisLayout({
  children,
  sections,
  ticker = "",
  companyName,
  exchange,
  heroImage,
  heroAlt,
  targetPrice,
  recommendation,
  staticPE,
  staticEPS,
  staticMarketCap,
  staticDividendYield,
}: AnalysisLayoutProps) {
  const { data: live, loading } = useLiveData(ticker);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const up = (live?.changePercent ?? 0) >= 0;
  const rec = recommendation ? REC_CONFIG[recommendation] : null;

  const pe = staticPE ?? (live?.pe ? live.pe.toFixed(1) + "x" : null);
  const eps = staticEPS ?? (live?.eps ? live.eps.toFixed(2) + " " + (live?.currency ?? "") : null);
  const mcap = staticMarketCap ?? null;
  const divYield = staticDividendYield ?? (live?.dividendYield ? live.dividendYield.toFixed(2) + "%" : null);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* ── TOP HEADER — bolagsinfo + live kurs ── */}
      <div className="bg-white border-b border-gray-200 sticky top-24 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Vänster: logga + namn */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a3c6e] flex items-center justify-center text-white font-bold text-lg">
              {companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-[#1a3c6e] text-base leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {companyName}
                </h1>
                {!loading && live && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">{ticker} · {exchange}</p>
            </div>
          </div>

          {/* Höger: kurs */}
          <div className="text-right">
            {loading ? (
              <div className="h-8 w-28 bg-gray-100 rounded animate-pulse" />
            ) : live?.price ? (
              <>
                <p className="text-2xl font-bold text-[#1a3c6e] leading-none" style={{ fontFamily: "Georgia, serif" }}>
                  {formatPrice(live.price, live.currency)}
                </p>
                <p className={`text-sm font-semibold mt-0.5 ${up ? "text-emerald-600" : "text-red-600"}`}>
                  {up ? "▲" : "▼"} {Math.abs(live.changePercent ?? 0).toFixed(2)}%
                  {live.change !== null && (
                    <span className="ml-1 font-normal opacity-70">
                      ({up ? "+" : ""}{live.change.toFixed(2)})
                    </span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Kurs ej tillgänglig</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── NYCKELTAL + SPARKLINE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Nyckeltalskort */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-3">
            {rec && (
              <div className={`col-span-2 rounded-2xl p-4 ${rec.bg} ${rec.text} flex items-center justify-between`}>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-80 mb-0.5">Rekommendation</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>{rec.label}</p>
                </div>
                {targetPrice && (
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest font-semibold opacity-80 mb-0.5">Riktkurs</p>
                    <p className="text-xl font-bold">{targetPrice}</p>
                  </div>
                )}
              </div>
            )}
            {live?.high52 && <StatCard label="52v Högsta" value={formatPrice(live.high52, live.currency)} />}
            {live?.low52 && <StatCard label="52v Lägsta" value={formatPrice(live.low52, live.currency)} />}
            {pe && <StatCard label="P/E" value={pe} />}
            {eps && <StatCard label="EPS" value={eps} />}
            {divYield && <StatCard label="Direktavk." value={divYield} />}
            {mcap && <StatCard label="Börsvärde" value={mcap} />}
            {live?.volume && (
              <StatCard label="Volym" value={live.volume.toLocaleString("sv-SE")} />
            )}
          </div>

          {/* Sparkline — 3 månaders kursgraf */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kursutveckling — 3 månader</p>
              <span className={`text-xs font-semibold ${up ? "text-emerald-600" : "text-red-600"}`}>
                {up ? "▲" : "▼"} {Math.abs(live?.changePercent ?? 0).toFixed(2)}% idag
              </span>
            </div>
            <Sparkline ticker={ticker} positive={up} />
          </div>
        </div>

        {/* ── HERO-BILD (om den finns) ── */}
        {heroImage && (
          <div className="mb-6 rounded-2xl overflow-hidden">
            <Image src={heroImage} alt={heroAlt ?? companyName} width={1200} height={400} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        {/* ── HUVUD: SIDEBAR + INNEHÅLL ── */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <SidebarNav sections={sections} activeId={activeId} />
          </aside>

          {/* Analysinnehåll */}
          <main className="flex-1 min-w-0 space-y-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AnalysisLayout;
