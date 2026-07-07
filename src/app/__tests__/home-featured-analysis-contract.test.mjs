import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const homeUrl = new URL("../page.tsx", import.meta.url);

test("home page promotes RevolutionRace instead of Evolution in popular stocks", async () => {
  const source = await readFile(homeUrl, "utf8");

  assert.match(source, /RevolutionRace/);
  assert.match(source, /RVRC/);
  assert.match(source, /revolutionrace-2026/);
  assert.doesNotMatch(source, /\{ name: "Evolution", ticker: "EVO", slug: "evolution-2025" \}/);
});
