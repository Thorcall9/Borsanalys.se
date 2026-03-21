import { NextResponse } from "next/server";

const FMP_TICKERS: Record<string, string> = {
  NVDA: "NVDA",
  MSFT: "MSFT",
  GOOGL: "GOOGL",
};

const YAHOO_TICKERS: Record<string, string> = {
  "VOLV-B": "VOLV-B.ST",
  "INVE-B": "INVE-B.ST",
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

async function fetchYahooData(
  displayTicker: string,
  yahooSymbol: string
): Promise<StockData> {
  try {
    const res = await fetch(
      `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      }
    );

    if (!res.ok) throw new Error("Yahoo fetch misslyckades");

    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;

    if (!meta) throw new Error("Ingen meta-data fran Yahoo");

    const price = meta.regularMarketPrice ?? null;
    const previousClose = meta.previousClose ?? meta.chartPreviousClose ?? null;
    const change = price !== null && previousClose !== null ? price - previousClose : null;
    const changePercent = change !== null && previousClose ? (change / previousClose) * 100 : null;

    return {
      ticker: displayTicker,
      name: meta.longName ?? meta.shortName ?? displayTicker,
      price,
      pe: null,
      eps: null,
      marketCap: null,
      dividendYield: null,
      change,
      changePercent,
      currency: meta.currency ?? "SEK",
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
      currency: "SEK",
      error: true,
    };
  }
}

async function fetchFmpData(
  displayTicker: string,
  fmpTicker: string,
  apiKey: string
): Promise<StockData> {
  try {
    const [quoteRes, profileRes] = await Promise.all([
      fetch(`https://financialmodelingprep.com/stable/quote?symbol=${fmpTicker}&apikey=${apiKey}`),
      fetch(`https://financialmodelingprep.com/stable/profile?symbol=${fmpTicker}&apikey=${apiKey}`),
    ]);

    if (!quoteRes.ok || !profileRes.ok) throw new Error("FMP fetch misslyckades");

    const quoteData = await quoteRes.json();
    const profileData = await profileRes.json();

    const quote = Array.isArray(quoteData) ? quoteData[0] : null;
    const profile = Array.isArray(profileData) ? profileData[0] : null;

    if (!quote) throw new Error("Ingen quote-data");

    const dividendYield =
      profile?.lastDiv && quote.price ? (profile.lastDiv / quote.price) * 100 : null;

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
      currency: profile?.currency ?? "USD",
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
      currency: "USD",
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
      { error: "FMP_API_KEY saknas i miljovariabler" },
      { status: 500 }
    );
  }

  const [yahooResults, fmpResults] = await Promise.all([
    Promise.all(
      Object.entries(YAHOO_TICKERS).map(([displayTicker, yahooSymbol]) =>
        fetchYahooData(displayTicker, yahooSymbol)
      )
    ),
    Promise.all(
      Object.entries(FMP_TICKERS).map(([displayTicker, fmpTicker]) =>
        fetchFmpData(displayTicker, fmpTicker, apiKey)
      )
    ),
  ]);

  const results = [...yahooResults, ...fmpResults];
  cache = { data: results, timestamp: Date.now() };

  return NextResponse.json({
    data: results,
    cached: false,
    updatedAt: new Date(cache.timestamp).toISOString(),
  });
}
