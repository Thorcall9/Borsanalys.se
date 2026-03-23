import { describe, it, expect } from "vitest";
import { createMetadata, SITE_URL } from "@/lib/seo";

describe("createMetadata", () => {
  it("returns title with site name when title is provided", () => {
    const meta = createMetadata({ title: "Test Page" });
    expect(meta.title).toBe("Test Page — Börsanalys.se");
  });

  it("returns just the site name when no title is provided", () => {
    const meta = createMetadata({});
    expect(meta.title).toBe("Börsanalys.se");
  });

  it("returns default description when none is provided", () => {
    const meta = createMetadata({});
    expect(meta.description).toContain("AI-driven aktieanalys");
  });

  it("uses custom description when provided", () => {
    const meta = createMetadata({ description: "Custom description" });
    expect(meta.description).toBe("Custom description");
  });

  it("includes OpenGraph data", () => {
    const meta = createMetadata({ title: "OG Test", path: "/test" });
    expect(meta.openGraph).toBeDefined();
    expect(meta.openGraph!.title).toBe("OG Test — Börsanalys.se");
    expect(meta.openGraph!.url).toBe(`${SITE_URL}/test`);
    expect(meta.openGraph!.siteName).toBe("Börsanalys.se");
    expect(meta.openGraph!.locale).toBe("sv_SE");
  });

  it("defaults OpenGraph type to website", () => {
    const meta = createMetadata({});
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
  });

  it("supports article type with published time", () => {
    const meta = createMetadata({
      type: "article",
      publishedTime: "2026-03-14",
      author: "Test Author",
    });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe("article");
    expect(og.publishedTime).toBe("2026-03-14");
    expect(og.authors).toEqual(["Test Author"]);
  });

  it("includes Twitter card data", () => {
    const meta = createMetadata({ title: "Twitter Test" });
    expect(meta.twitter).toBeDefined();
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.card).toBe("summary_large_image");
    expect(tw.title).toBe("Twitter Test — Börsanalys.se");
  });

  it("includes canonical URL in alternates", () => {
    const meta = createMetadata({ path: "/analyser/volvo" });
    expect(meta.alternates!.canonical).toBe(`${SITE_URL}/analyser/volvo`);
  });

  it("uses base URL when no path is provided", () => {
    const meta = createMetadata({});
    expect(meta.alternates!.canonical).toBe(SITE_URL);
  });
});
