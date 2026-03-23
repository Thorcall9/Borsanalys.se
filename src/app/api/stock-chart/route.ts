import { NextRequest, NextResponse } from "next/server";
import { toYahooSymbol } from "@/lib/ticker-mappings";

/**
 * Per-range in-memory cache.
 * Key format: "SYMBOL:range:interval"
 */
const cache = new Map<string, { data: unknown; timestamp: number }>();

/** Cache TTL per range: 1 hour for longer ranges, 5 minutes for intraday */
function getCacheTtl(range: string): number {
  if (range === "1d" || range === "5d") return 5 * 60 * 1000; // 5 min
  return 60 * 60 * 1000; // 1 hour
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const ticker = searchParams.get("ticker");
  if (!ticker) {
    return NextResponse.json(
      { error: "Missing required query parameter: ticker" },
      { status: 400 }
    );
  }

  const range = searchParams.get("range") ?? "3mo";
  const interval = searchParams.get("interval") ?? "1d";

  const yahooSymbol = toYahooSymbol(ticker);
  const cacheKey = `${yahooSymbol}:${range}:${interval}`;

  // Return cached data if still fresh
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < getCacheTtl(range)) {
    return NextResponse.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(range)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Yahoo Finance returned ${res.status}` },
        { status: 502 }
      );
    }

    const json = await res.json();
    const result = json?.chart?.result?.[0];

    if (!result) {
      return NextResponse.json(
        { error: "No chart data returned from Yahoo Finance" },
        { status: 404 }
      );
    }

    const meta = result.meta ?? {};
    const timestamps: number[] = result.timestamp ?? [];
    const closes: (number | null)[] =
      result.indicators?.quote?.[0]?.close ?? [];

    const payload = {
      meta: {
        symbol: meta.symbol ?? yahooSymbol,
        currency: meta.currency ?? "SEK",
        regularMarketPrice: meta.regularMarketPrice ?? null,
        previousClose: meta.previousClose ?? meta.chartPreviousClose ?? null,
        fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh ?? null,
        fiftyTwoWeekLow: meta.fiftyTwoWeekLow ?? null,
        regularMarketVolume: meta.regularMarketVolume ?? null,
        longName: meta.longName ?? null,
        shortName: meta.shortName ?? null,
      },
      timestamps,
      closes,
    };

    // Store in cache
    cache.set(cacheKey, { data: payload, timestamp: Date.now() });

    return NextResponse.json(payload, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error: unknown) {
    console.error(
      `stock-chart API error for ${ticker}:`,
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
