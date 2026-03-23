/**
 * Centralized ticker mapping configuration.
 * Single source of truth for all ticker-to-symbol mappings across the app.
 */

/** Yahoo Finance symbol mappings (used for live price data and charts) */
export const TICKER_TO_YAHOO: Record<string, string> = {
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

/** Financial Modeling Prep tickers (used for US stock fundamentals) */
export const FMP_TICKERS: Record<string, string> = {
  NVDA: "NVDA",
  MSFT: "MSFT",
  GOOGL: "GOOGL",
};

/** Yahoo Finance tickers used in the stock ticker widget */
export const YAHOO_WIDGET_TICKERS: Record<string, string> = {
  "VOLV-B": "VOLV-B.ST",
  "INVE-B": "INVE-B.ST",
};

/**
 * Maps a display ticker (e.g., "INVE B", "VOLV B") to a Yahoo Finance symbol.
 * Falls back to replacing spaces with dashes and appending .ST for Nordic tickers.
 */
export function toYahooSymbol(ticker: string): string {
  // Try direct lookup with display format (space-separated)
  const displayKey = ticker.replace(" ", "-");
  if (TICKER_TO_YAHOO[displayKey]) return TICKER_TO_YAHOO[displayKey];
  if (TICKER_TO_YAHOO[ticker]) return TICKER_TO_YAHOO[ticker];
  // Default: assume Nordic ticker
  return ticker.replace(" ", "-") + ".ST";
}
