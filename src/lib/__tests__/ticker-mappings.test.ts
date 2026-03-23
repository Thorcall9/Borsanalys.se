import { describe, it, expect } from "vitest";
import { toYahooSymbol, TICKER_TO_YAHOO } from "@/lib/ticker-mappings";

describe("toYahooSymbol", () => {
  it("maps known Nordic tickers with space-separated format", () => {
    expect(toYahooSymbol("INVE B")).toBe("INVE-B.ST");
    expect(toYahooSymbol("VOLV B")).toBe("VOLV-B.ST");
  });

  it("maps known US tickers directly", () => {
    expect(toYahooSymbol("NVDA")).toBe("NVDA");
    expect(toYahooSymbol("MSFT")).toBe("MSFT");
    expect(toYahooSymbol("GOOGL")).toBe("GOOGL");
  });

  it("maps known Nordic ticker NOVO B to Copenhagen exchange", () => {
    expect(toYahooSymbol("NOVO B")).toBe("NOVO-B.CO");
  });

  it("maps EVO to Stockholm exchange", () => {
    expect(toYahooSymbol("EVO")).toBe("EVO.ST");
  });

  it("falls back to .ST suffix for unknown Nordic-style tickers", () => {
    expect(toYahooSymbol("ABC B")).toBe("ABC-B.ST");
  });

  it("falls back to .ST suffix for unknown single-word tickers", () => {
    expect(toYahooSymbol("UNKNOWN")).toBe("UNKNOWN.ST");
  });
});

describe("TICKER_TO_YAHOO", () => {
  it("contains expected entries", () => {
    expect(TICKER_TO_YAHOO["NVDA"]).toBe("NVDA");
    expect(TICKER_TO_YAHOO["INVE-B"]).toBe("INVE-B.ST");
    expect(TICKER_TO_YAHOO["NOVO-B"]).toBe("NOVO-B.CO");
  });
});
