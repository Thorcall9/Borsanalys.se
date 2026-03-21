export interface LiveMetrics {
  pe: string | null;
  marketCap: string | null;
  dividend: string | null;
  currency: string | null;
  updatedAt: string | null;
}

const TICKER_TO_YAHOO: Record<string, string> = {
  NVDA: "NVDA",
  MSFT: "MSFT",
  GOOGL: "GOOGL",
  "INVE-B": "INVE-B.ST",
  "VOLV-B": "VOLV-B.ST",
  "NOVO-B": "NOVO-B.CO",
  "NEWA-B": "NEWA-B.ST",
  FREET: "FREET.ST",
  EVO: "EVO.ST",
};

function formatMarketCap(raw: number, currency: string): string {
  const isNordic = ["SEK", "DKK", "NOK"].includes(currency);
  if (isNordic) {
    const mdr = raw / 1_000_000_000;
    return `~${Math.round(mdr)} mdr ${currency}`;
  }
  const trillion = raw / 1_000_000_000_000;
  if (trillion >= 1) {
    return `~$${(Math.round(trillion * 10) / 10).toFixed(1)} T`;
  }
  const billion = raw / 1_000_000_000;
  return `~$${Math.round(billion)} B`;
}

export async function fetchStockMetrics(ticker: string): Promise<LiveMetrics | null> {
  const symbol = TICKER_TO_YAHOO[ticker];
  if (!symbol) return null;

  try {
    const res = await fetch(
      `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=summaryDetail`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 86400 }, // Cache 24 hours via Next.js fetch cache
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    const detail = json?.quoteSummary?.result?.[0]?.summaryDetail;
    if (!detail) return null;

    const currency: string | null = detail.currency ?? null;
    const peRaw: number | null = detail.trailingPE?.raw ?? null;
    const marketCapRaw: number | null = detail.marketCap?.raw ?? null;
    const dividendYieldRaw: number | null =
      detail.trailingAnnualDividendYield?.raw ?? detail.dividendYield?.raw ?? null;

    return {
      pe: peRaw !== null ? `~${Math.round(peRaw)}x` : null,
      marketCap:
        marketCapRaw !== null && currency ? formatMarketCap(marketCapRaw, currency) : null,
      dividend:
        dividendYieldRaw !== null ? `~${(dividendYieldRaw * 100).toFixed(1)}%` : null,
      currency,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
