import { describe, it, expect } from "vitest";
import { formatSek } from "@/lib/formatters";

describe("formatSek", () => {
  it("formats a positive number as SEK currency", () => {
    const result = formatSek(1234);
    // sv-SE format: non-breaking space before "kr"
    expect(result).toMatch(/1[\s\u00a0]?234[\s\u00a0]?kr/);
  });

  it("formats zero", () => {
    const result = formatSek(0);
    expect(result).toMatch(/0[\s\u00a0]?kr/);
  });

  it("formats a large number with thousand separators", () => {
    const result = formatSek(1000000);
    expect(result).toMatch(/1[\s\u00a0]?000[\s\u00a0]?000[\s\u00a0]?kr/);
  });

  it("rounds to zero fraction digits", () => {
    const result = formatSek(99.99);
    expect(result).toMatch(/100[\s\u00a0]?kr/);
  });

  it("formats a negative number", () => {
    const result = formatSek(-500);
    expect(result).toContain("500");
    expect(result).toMatch(/kr/);
  });
});
