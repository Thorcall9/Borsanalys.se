"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { analyses } from "@/lib/analyses";
import { guides } from "@/lib/guides";
import { verdictColor } from "@/lib/utils";

interface SearchResult {
  type: "analys" | "guide";
  title: string;
  description: string;
  href: string;
  ticker?: string;
  verdict?: string;
}

function search(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const a of analyses) {
    if (
      a.title.toLowerCase().includes(q) ||
      (a.ticker && a.ticker.toLowerCase().includes(q)) ||
      a.excerpt.toLowerCase().includes(q)
    ) {
      results.push({
        type: "analys",
        title: a.title,
        description: a.excerpt,
        href: `/analyser/${a.slug}`,
        ticker: a.ticker,
        verdict: a.verdict,
      });
    }
  }

  for (const g of guides) {
    if (
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    ) {
      results.push({
        type: "guide",
        title: g.title,
        description: g.description,
        href: `/guider/${g.slug}`,
      });
    }
  }

  return results;
}

export function openSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-search"));
  }
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = search(query);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") close();
    };

    window.addEventListener("open-search", onOpen);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-search", onOpen);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      router.push(results[activeIndex].href);
      close();
    }
  };

  if (!open) return null;

  const analyserResults = results.filter((r) => r.type === "analys");
  const guideResults = results.filter((r) => r.type === "guide");

  let globalIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <svg className="w-5 h-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Sök efter företag eller guider..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <button
            onClick={close}
            className="text-xs text-muted border border-border rounded px-1.5 py-0.5 font-mono hover:border-foreground/30 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        {query.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted">
                Inga resultat för &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-2">
                {analyserResults.length > 0 && (
                  <div>
                    <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
                      Analyser
                    </div>
                    {analyserResults.map((r) => {
                      const idx = globalIndex++;
                      return (
                        <Link
                          key={r.href}
                          href={r.href}
                          onClick={close}
                          className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                            idx === activeIndex ? "bg-primary/8" : "hover:bg-card-hover"
                          }`}
                          onMouseEnter={() => setActiveIndex(idx)}
                        >
                          <svg className="w-4 h-4 text-muted mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium leading-snug line-clamp-1">{r.title}</span>
                              {r.verdict && (
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${verdictColor(r.verdict)}`}>
                                  {r.verdict}
                                </span>
                              )}
                            </div>
                            {r.ticker && (
                              <span className="text-xs font-mono text-muted">{r.ticker}</span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {guideResults.length > 0 && (
                  <div>
                    <div className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
                      Guider
                    </div>
                    {guideResults.map((r) => {
                      const idx = globalIndex++;
                      return (
                        <Link
                          key={r.href}
                          href={r.href}
                          onClick={close}
                          className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                            idx === activeIndex ? "bg-primary/8" : "hover:bg-card-hover"
                          }`}
                          onMouseEnter={() => setActiveIndex(idx)}
                        >
                          <svg className="w-4 h-4 text-muted mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium leading-snug mb-0.5 line-clamp-1">{r.title}</div>
                            <div className="text-xs text-muted line-clamp-1">{r.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty state / hints */}
        {query.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-muted">
            Sök på bolag, ticker eller guider
          </div>
        )}
      </div>
    </div>
  );
}
