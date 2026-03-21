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

async function fetchStockData(fmpTicker: string): Promise<StockData | null> {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) return null;

  try {
    const [quoteRes, profileRes] = await Promise.all([
      fetch(`https://financialmodelingprep.com/api/v3/quote/${fmpTicker}?apikey=${apiKey}`),
      fetch(`https://financialmodelingprep.com/api/v3/profile/${fmpTicker}?apikey=${apiKey}`),
    ]);

    if (!quoteRes.ok || !profileRes.ok) return null;

    const quoteData = await quoteRes.json();
    const profileData = await profileRes.json();

    const quote = Array.isArray(quoteData) ? quoteData[0] : null;
    const profile = Array.isArray(profileData) ? profileData[0] : null;

    if (!quote) return null;

    return {
      ticker: fmpTicker,
      name: profile?.companyName ?? quote.name ?? fmpTicker,
      price: quote.price ?? null,
      pe: quote.pe ?? null,
      eps: quote.eps ?? null,
      marketCap: quote.marketCap ?? null,
      dividendYield: profile?.lastDiv
        ? (profile.lastDiv / quote.price) * 100
        : null,
      change: quote.change ?? null,
      changePercent: quote.changesPercentage ?? null,
      currency: profile?.currency ?? (fmpTicker.endsWith(".ST") ? "SEK" : "USD"),
      error: false,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ?reset=true rensar cachen
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
  console.log("API key length:", apiKey?.length, "First 4 chars:", apiKey?.substring(0, 4));

  // TEMPORÄRT — ta bort efter felsökning
  if (searchParams.get("debug") === "true") {
    return NextResponse.json({
      keyExists: !!apiKey,
      keyLength: apiKey?.length ?? 0,
      keyStart: apiKey?.substring(0, 6) ?? "saknas",
    });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "FMP_API_KEY saknas i miljövariabler" },
      { status: 500 }
    );
  }

  const results = await Promise.all(
    Object.entries(TICKERS).map(async ([displayTicker, fmpTicker]) => {
      const data = await fetchStockData(fmpTicker);
      if (!data) {
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
        } as StockData;
      }
      return { ...data, ticker: displayTicker };
    })
  );

  cache = { data: results, timestamp: Date.now() };

  return NextResponse.json({
    data: results,
    cached: false,
    updatedAt: new Date(cache.timestamp).toISOString(),
  });
}
