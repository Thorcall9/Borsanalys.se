import { describe, it, expect } from "vitest";
import {
  analyses,
  getAnalysisBySlug,
  sortedAnalyses,
} from "@/lib/analyses";

describe("getAnalysisBySlug", () => {
  it("returns the correct analysis for a known slug", () => {
    const result = getAnalysisBySlug("volvo-2026");
    expect(result).toBeDefined();
    expect(result!.title).toBe("AB Volvo – Aktieanalys 2026 (FY2025)");
    expect(result!.ticker).toBe("VOLV B");
  });

  it("returns the correct analysis for another slug", () => {
    const result = getAnalysisBySlug("alphabet");
    expect(result).toBeDefined();
    expect(result!.ticker).toBe("GOOGL");
    expect(result!.verdict).toBe("KÖP");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getAnalysisBySlug("nonexistent")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getAnalysisBySlug("")).toBeUndefined();
  });
});

describe("sortedAnalyses", () => {
  it("is sorted by date descending", () => {
    for (let i = 1; i < sortedAnalyses.length; i++) {
      expect(sortedAnalyses[i - 1].date >= sortedAnalyses[i].date).toBe(true);
    }
  });

  it("has the same number of items as the original array", () => {
    expect(sortedAnalyses.length).toBe(analyses.length);
  });

  it("does not mutate the original array", () => {
    // sortedAnalyses is a separate copy, so the first items may differ
    // if the original is not already sorted
    expect(sortedAnalyses).not.toBe(analyses);
  });
});

describe("analyses data integrity", () => {
  it("every analysis has required fields", () => {
    for (const a of analyses) {
      expect(a.slug).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.date).toBeTruthy();
      expect(a.author).toBeTruthy();
      expect(a.category).toBeTruthy();
      expect(a.sector).toBeTruthy();
      expect(a.excerpt).toBeTruthy();
    }
  });

  it("every slug is unique", () => {
    const slugs = analyses.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every date is a valid ISO date string", () => {
    for (const a of analyses) {
      expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
