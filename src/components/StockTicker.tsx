"use client";

import { useEffect, useState, useRef } from "react";

interface Stock {
  ticker: string;
  name: string;
  price: number | null;
  change: number | null;
  changePercent: number | null;
  currency: string;
  error?: boolean;
}

function formatPrice(price: number, currency: string): string {
  const locale = currency === "SEK" ? "sv-SE" : "en-US";
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatChange(change: number): string {
  return (change >= 0 ? "+" : "") + change.toFixed(2);
}

function formatPercent(pct: number): string {
  return (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
}

export default function StockTicker() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const POLL_INTERVAL_MS = 60_000;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    async function fetchStocks() {
      try {
        const res = await fetch("/api/stock-data");
        if (res.ok) {
          const data = await res.json();
          setStocks(data.data ?? []);
        }
      } finally {
        setLoading(false);
      }
    }

    function startPolling() {
      fetchStocks();
      intervalId = setInterval(fetchStocks, POLL_INTERVAL_MS);
    }

    function stopPolling() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    function handleVisibility() {
      if (document.hidden) { stopPolling(); } else { startPolling(); }
    }

    startPolling();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const validStocks = stocks.filter((s) => !s.error && s.price !== null);

  if (loading || validStocks.length === 0) return null;

  // Duplicate list for seamless loop
  const items = [...validStocks, ...validStocks];

  return (
    <div className="bg-card border-b border-border overflow-hidden select-none">
      <div className="relative flex">
        <div
          ref={trackRef}
          className="flex gap-0 animate-ticker whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {items.map((stock, i) => (
            <div
              key={`${stock.ticker}-${i}`}
              className="inline-flex items-center gap-2 px-5 py-2 border-r border-border/50 shrink-0"
            >
              <span className="text-xs font-semibold text-foreground">
                {stock.ticker}
              </span>
              <span className="text-xs font-mono text-muted">
                {formatPrice(stock.price!, stock.currency)}{" "}
                {stock.currency === "SEK" ? "kr" : "$"}
              </span>
              <span
                className={`text-xs font-mono font-medium ${
                  (stock.changePercent ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {formatChange(stock.change ?? 0)} ({formatPercent(stock.changePercent ?? 0)})
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
