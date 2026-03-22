"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
export interface AnalysisSection {
  id: string;
  number: string;
  title: string;
}

export interface Scenario {
  type: "bull" | "base" | "bear";
  probability: string;
  price: string;
  change: string;
  assumptions: string;
  requires: string;
}

export interface AnalysisLayoutProps {
  children: React.ReactNode;
  sections: AnalysisSection[];
  ticker: string;
  companyName: string;
  exchange: string;
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

// Mappa display-ticker till Yahoo-symbol
function toYahooSymbol(ticker: string): string {
  const map: Record<string, string> = {
    "INVE B": "INVE-B.ST",
    "VOLV B": "VOLV-B.ST",
    "NVDA":   "NVDA",
    "MSFT":   "MSFT",
    "GOOGL":  "GOOGL",
  };
  return map[ticker] ?? ticker.replace(" ", "-") + ".ST";
}

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
      try {
        // Försök hämta från Yahoo direkt för 52v high/low och volym
        const yahooSymbol = toYahooSymbol(ticker);
        const res = await fetch(
          `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`
        );
        if (!res.ok) throw new Error("Yahoo fel");
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        if (!meta) throw new Error("Ingen meta");

        const price = meta.regularMarketPrice ?? null;
        const prev = meta.previousClose ?? meta.chartPreviousClose ?? null;
        const change = price && prev ? price - prev : null;
        const changePct = change && prev ? (change / prev) * 100 : null;

        setData({
          price,
          change,
          changePercent: changePct,
          high52: meta.fiftyTwoWeekHigh ?? null,
          low52: meta.fiftyTwoWeekLow ?? null,
          volume: meta.regularMarketVolume ?? null,
          pe: null, // hämtas separat om möjligt
          eps: null,
          marketCap: null,
          dividendYield: null,
          currency: meta.currency ?? "SEK",
          name: meta.longName ?? meta.shortName ?? ticker,
        });
      } catch {
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

        const yahooSymbol = toYahooSymbol(ticker);
        const res = await fetch(
          `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=3mo`
        );
        const json = await res.json();
        const closes = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
        const timestamps = json?.chart?.result?.[0]?.timestamp ?? [];

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
      } catch {}
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
// EXPORTED SUBCOMPONENTS (används i page.tsx)
// ─────────────────────────────────────────────────────────────
export function SectionHeader({ number, title, accent }: { number: string; title: string; accent?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono text-gray-300 w-6">{number}</span>
      <h2 className="text-xl font-bold text-[#1a3c6e]" style={{ fontFamily: "Georgia, serif" }}>
        {title}
      </h2>
    </div>
  );
}

export function MetricCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="bg-[#f5f5f0] rounded-2xl p-4 border border-gray-200">
      <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-lg font-bold text-[#1a3c6e]" style={{ fontFamily: "Georgia, serif" }}>{value}</p>
    </div>
  );
}

export function AlertBox({ type, children }: { type: "info" | "warning" | "signal"; children: React.ReactNode }) {
  const config = {
    info:    { bg: "bg-blue-50",   border: "border-blue-200",  icon: "ℹ",  text: "text-blue-800" },
    warning: { bg: "bg-amber-50",  border: "border-amber-200", icon: "⚠",  text: "text-amber-800" },
    signal:  { bg: "bg-green-50",  border: "border-green-200", icon: "●",  text: "text-green-800" },
  }[type];
  return (
    <div className={`${config.bg} ${config.border} border rounded-2xl p-4 my-4`}>
      <p className={`text-sm leading-relaxed ${config.text}`}>{children}</p>
    </div>
  );
}

export function RatingBox({ rating, currentPrice, targetPrice, upside, accent }: {
  rating: string; currentPrice: string; targetPrice: string; upside: string; accent?: string;
}) {
  const rec = REC_CONFIG[rating as keyof typeof REC_CONFIG] ?? REC_CONFIG.BEHALL;
  return (
    <div className="bg-[#f5f5f0] border border-gray-200 rounded-2xl p-6 flex flex-wrap gap-6 items-center">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Rekommendation</p>
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${rec.bg} ${rec.text}`}>
          {rec.label}
        </span>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Nuvarande kurs</p>
        <p className="text-xl font-bold text-[#1a3c6e]" style={{ fontFamily: "Georgia, serif" }}>{currentPrice}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Riktkurs</p>
        <p className="text-xl font-bold text-[#1a3c6e]" style={{ fontFamily: "Georgia, serif" }}>{targetPrice}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Uppsida</p>
        <p className="text-xl font-bold text-emerald-600" style={{ fontFamily: "Georgia, serif" }}>{upside}</p>
      </div>
    </div>
  );
}

export function FinancialTable({ rows, years }: {
  rows: { metric: string; fy2023: string; fy2024: string; fy2025: string }[];
  years: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#1a3c6e] text-white">
            <th className="text-left p-3 font-semibold">Nyckeltal</th>
            {years.map((y) => <th key={y} className="text-right p-3 font-semibold">{y}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-[#f5f5f0]" : "bg-white"}>
              <td className="p-3 font-medium text-gray-700">{row.metric}</td>
              <td className="p-3 text-right">{row.fy2023}</td>
              <td className="p-3 text-right">{row.fy2024}</td>
              <td className="p-3 text-right font-semibold text-[#1a3c6e]">{row.fy2025}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SwotGrid({ data, accent }: {
  data: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  accent?: string;
}) {
  const sections = [
    { key: "strengths",     label: "Styrkor",     color: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
    { key: "weaknesses",    label: "Svagheter",   color: "bg-red-50 border-red-200",         dot: "bg-red-500" },
    { key: "opportunities", label: "Möjligheter", color: "bg-blue-50 border-blue-200",       dot: "bg-blue-500" },
    { key: "threats",       label: "Hot",         color: "bg-amber-50 border-amber-200",     dot: "bg-amber-500" },
  ] as const;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sections.map(({ key, label, color, dot }) => (
        <div key={key} className={`${color} border rounded-2xl p-4`}>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-3">{label}</p>
          <ul className="space-y-2">
            {data[key].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ScenarioCards({ scenarios }: { scenarios: Scenario[] }) {
  const config = {
    bull: { label: "Bull", color: "#16a34a", bg: "bg-emerald-50", border: "border-emerald-200" },
    base: { label: "Base", color: "#b5892a", bg: "bg-amber-50",   border: "border-amber-200" },
    bear: { label: "Bear", color: "#dc2626", bg: "bg-red-50",     border: "border-red-200" },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {scenarios.map((s) => {
        const c = config[s.type];
        return (
          <div key={s.type} className={`${c.bg} ${c.border} border rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: c.color }}>{c.label}</span>
              <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                {s.probability}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#1a3c6e] mb-0.5" style={{ fontFamily: "Georgia, serif" }}>{s.price}</p>
            <p className="text-sm font-semibold mb-3" style={{ color: c.color }}>{s.change}</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Antaganden</p>
                <p className="text-xs text-gray-600 whitespace-pre-line">{s.assumptions}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Kräver</p>
                <p className="text-xs text-gray-600">{s.requires}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN LAYOUT
// ─────────────────────────────────────────────────────────────
export function AnalysisLayout({
  children,
  sections,
  ticker,
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
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
            <img src={heroImage} alt={heroAlt ?? companyName} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        {/* ── HUVUD: SIDEBAR + INNEHÅLL ── */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0">
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
