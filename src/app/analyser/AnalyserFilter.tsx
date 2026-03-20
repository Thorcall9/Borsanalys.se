"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Analysis } from "@/lib/analyses";
import { formatDate, verdictColor } from "@/lib/utils";

const VERDICTS = ["KÖP", "BEVAKA", "SÄLJ"];

export default function AnalyserFilter({ analyses }: { analyses: Analysis[] }) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [verdict, setVerdict] = useState("");

  const sectors = useMemo(
    () => Array.from(new Set(analyses.map((a) => a.sector))).sort(),
    [analyses]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return analyses.filter((a) => {
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        (a.ticker ?? "").toLowerCase().includes(q);
      const matchSector = !sector || a.sector === sector;
      const matchVerdict = !verdict || a.verdict === verdict;
      return matchSearch && matchSector && matchVerdict;
    });
  }, [analyses, search, sector, verdict]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="search"
            placeholder="Sök bolag eller ticker…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-colors"
          />
        </div>

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="py-2 px-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-colors text-foreground"
        >
          <option value="">Alla branscher</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={verdict}
          onChange={(e) => setVerdict(e.target.value)}
          className="py-2 px-3 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition-colors text-foreground"
        >
          <option value="">Alla rekommendationer</option>
          {VERDICTS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-muted text-sm">Inga analyser matchar din sökning.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((analysis) => (
            <Link
              key={analysis.slug}
              href={`/analyser/${analysis.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-shadow transition-colors"
            >
              <div className="h-1.5 bg-primary group-hover:bg-accent transition-colors" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted">{formatDate(analysis.date)}</span>
                  {analysis.verdict && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${verdictColor(analysis.verdict)}`}
                    >
                      {analysis.verdict}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {analysis.title}
                </h2>

                <p className="text-sm text-muted leading-relaxed mb-3">{analysis.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{analysis.author}</span>
                  {analysis.target && (
                    <span>
                      Riktkurs:{" "}
                      <span className="font-semibold text-foreground">{analysis.target}</span>
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
