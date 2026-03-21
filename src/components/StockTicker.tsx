"use client";

import { useEffect, useState, useRef } from "react";

interface Stock {
  symbol: string;
  display: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
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
    async function fetchStocks() {
      try {
        const res = await fetch("/api/stock-data");
        if (res.ok) {
          const data = await res.json();
          setStocks(data.stocks ?? []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
    const interval = setInterval(fetchStocks, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (loading || stocks.length === 0) return null;

  // Duplicate list for seamless loop
  const items = [...stocks, ...stocks];

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
              key={`${stock.symbol}-${i}`}
              className="inline-flex items-center gap-2 px-5 py-2 border-r border-border/50 shrink-0"
            >
              <span className="text-xs font-semibold text-foreground">
                {stock.display}
              </span>
              <span className="text-xs font-mono text-muted">
                {formatPrice(stock.price, stock.currency)}{" "}
                {stock.currency === "SEK" ? "kr" : "$"}
              </span>
              <span
                className={`text-xs font-mono font-medium ${
                  stock.changePercent >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {formatChange(stock.change)} ({formatPercent(stock.changePercent)})
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
