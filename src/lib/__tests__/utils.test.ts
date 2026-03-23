import { describe, it, expect } from "vitest";
import { formatDate, verdictColor } from "@/lib/utils";

describe("formatDate", () => {
  it("formats a standard ISO date string", () => {
    const result = formatDate("2026-03-14");
    expect(result).toBe("14 mars 2026");
  });

  it("formats a date at the start of the year", () => {
    const result = formatDate("2025-01-01");
    expect(result).toBe("1 januari 2025");
  });

  it("formats a date at the end of the year", () => {
    const result = formatDate("2025-12-31");
    expect(result).toBe("31 december 2025");
  });

  it("formats a date with a different month", () => {
    const result = formatDate("2025-06-15");
    expect(result).toBe("15 juni 2025");
  });
});

describe("verdictColor", () => {
  it('returns success colors for "KÖP"', () => {
    expect(verdictColor("KÖP")).toBe("bg-success text-white");
  });

  it('returns danger colors for "SÄLJ"', () => {
    expect(verdictColor("SÄLJ")).toBe("bg-danger text-white");
  });

  it('returns accent colors for "BEVAKA" (default case)', () => {
    expect(verdictColor("BEVAKA")).toBe("bg-accent text-white");
  });

  it('returns accent colors for "BEHÅLL" (default case)', () => {
    expect(verdictColor("BEHÅLL")).toBe("bg-accent text-white");
  });

  it("returns accent colors for unknown verdicts", () => {
    expect(verdictColor("UNKNOWN")).toBe("bg-accent text-white");
  });
});
