import { NextResponse } from "next/server";

const TICKERS = [
  { symbol: "NVDA", display: "NVIDIA" },
  { symbol: "MSFT", display: "Microsoft" },
  { symbol: "AAPL", display: "Apple" },
  { symbol: "TSLA", display: "Tesla" },
  { symbol: "GOOGL", display: "Alphabet" },
  { symbol: "INVE-B.ST", display: "Investor B" },
  { symbol: "VOLV-B.ST", display: "Volvo B" },
  { symbol: "EVO.ST", display: "Evolution" },
];

export async function GET() {
  try {
    const symbols = TICKERS.map((t) => t.symbol).join(",");
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&fields=symbol,regularMarketPrice,regularMarketChangePercent,regularMarketChange,currency`;

    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Yahoo Finance fetch failed");

    const data = await res.json();
    const quotes = data?.quoteResponse?.result ?? [];

    const stocks = quotes.map((q: Record<string, unknown>) => {
      const ticker = TICKERS.find((t) => t.symbol === q.symbol);
      return {
        symbol: q.symbol as string,
        display: ticker?.display ?? (q.symbol as string),
        price: q.regularMarketPrice as number,
        change: q.regularMarketChange as number,
        changePercent: q.regularMarketChangePercent as number,
        currency: q.currency as string,
      };
    });

    return NextResponse.json({ stocks });
  } catch {
    return NextResponse.json({ stocks: [] }, { status: 500 });
  }
}
