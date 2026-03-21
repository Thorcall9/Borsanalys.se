import { NextResponse } from "next/server";

const TICKERS: Record<string, string> = {
  "VOLV-B": "VOLV-B.ST",
  "INVE-B": "INVE-B.ST",
  NVDA: "NVDA",
  MSFT: "MSFT",
  GOOGL: "GOOGL",
};

let cache: { data: StockData[]; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000;

export interface StockData {
  ticker: string;
  name: string;
  price: number | null;
  pe: number | null;
  eps: number | null;
  marketCap: number | null;
  dividendYield: number | null;
  change: number | null;
  changePercent: number | null;
  currency: string;
  error?: boolean;
}

async function fetchQuote(fmpTicker: string, apiKey: string) {
  const res = await fetch(
    `https://financialmodelingprep.com/stable/quote?symbol=${fmpTicker}&apikey=${apiKey}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function fetchProfile(fmpTicker: string, apiKey: string) {
  const res = await fetch(
    `https://financialmodelingprep.com/stable/profile?symbol=${fmpTicker}&apikey=${apiKey}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function fetchStockData(
  displayTicker: string,
  fmpTicker: string,
  apiKey: string
): Promise<StockData> {
  try {
    const [quote, profile] = await Promise.all([
      fetchQuote(fmpTicker, apiKey),
      fetchProfile(fmpTicker, apiKey),
    ]);

    if (!quote) {
      throw new Error("Ingen quote-data");
    }

    const currency =
      profile?.currency ?? (fmpTicker.endsWith(".ST") ? "SEK" : "USD");

    const dividendYield =
      profile?.lastDiv && quote.price
        ? (profile.lastDiv / quote.price) * 100
        : null;

    return {
      ticker: displayTicker,
      name: profile?.companyName ?? quote.name ?? displayTicker,
      price: quote.price ?? null,
      pe: profile?.pe ?? null,
      eps: profile?.eps ?? null,
      marketCap: quote.marketCap ?? null,
      dividendYield,
      change: quote.change ?? null,
      changePercent: quote.changePercentage ?? null,
      currency,
      error: false,
    };
  } catch {
    return {
      ticker: displayTicker,
      name: displayTicker,
      price: null,
      pe: null,
      eps: null,
      marketCap: null,
      dividendYield: null,
      change: null,
      changePercent: null,
      currency: fmpTicker.endsWith(".ST") ? "SEK" : "USD",
      error: true,
    };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("reset") === "true") {
    cache = null;
  }

  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({
      data: cache.data,
      cached: true,
      updatedAt: new Date(cache.timestamp).toISOString(),
    });
  }

  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "FMP_API_KEY saknas i miljövariabler" },
      { status: 500 }
    );
  }

  const results = await Promise.all(
    Object.entries(TICKERS).map(([displayTicker, fmpTicker]) =>
      fetchStockData(displayTicker, fmpTicker, apiKey)
    )
  );

  cache = { data: results, timestamp: Date.now() };

  return NextResponse.json({
    data: results,
    cached: false,
    updatedAt: new Date(cache.timestamp).toISOString(),
  });
}
