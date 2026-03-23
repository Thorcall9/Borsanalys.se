"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { analyses } from "@/lib/analyses";
import { companies } from "@/lib/stocks";
import { guides } from "@/lib/guides";

interface SearchResult {
  type: "analys" | "aktie" | "guide";
  title: string;
  subtitle: string;
  href: string;
}

function buildResults(query: string): SearchResult[] {
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
        subtitle: [a.ticker, a.verdict].filter(Boolean).join(" · "),
        href: `/analyser/${a.slug}`,
      });
    }
  }

  for (const c of companies) {
    if (
      c.name.toLowerCase().includes(q) ||
      c.ticker.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q)
    ) {
      results.push({
        type: "aktie",
        title: c.name,
        subtitle: `${c.ticker} · ${c.sector}`,
        href: `/aktier/${c.slug}`,
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
        subtitle: `${g.category} · ${g.readTime}`,
        href: `/guider/${g.slug}`,
      });
    }
  }

  return results;
}

const typeLabel: Record<SearchResult["type"], string> = {
  analys: "Analys",
  aktie: "Aktie",
  guide: "Guide",
};

const typeBadge: Record<SearchResult["type"], string> = {
  analys: "bg-primary/10 text-primary",
  aktie: "bg-emerald-100 text-emerald-700",
  guide: "bg-amber-100 text-amber-700",
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = buildResults(query);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        navigate(results[activeIndex].href);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, results, activeIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <svg
            className="w-5 h-5 text-muted shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök efter företag, analyser eller guider..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-xs text-muted border border-border rounded px-1.5 py-0.5 hover:text-foreground"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="text-sm text-muted text-center py-10">
              Inga resultat för &quot;{query}&quot;
            </p>
          )}

          {!query && (
            <p className="text-xs text-muted text-center py-8">
              Börja skriv för att söka...
            </p>
          )}

          {results.length > 0 && (
            <ul>
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      i === activeIndex
                        ? "bg-card"
                        : "hover:bg-card/60"
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => navigate(r.href)}
                  >
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${typeBadge[r.type]}`}
                    >
                      {typeLabel[r.type]}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">
                        {r.title}
                      </span>
                      {r.subtitle && (
                        <span className="block text-xs text-muted truncate">
                          {r.subtitle}
                        </span>
                      )}
                    </span>
                    <svg
                      className="w-4 h-4 text-muted shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted">
            <span>↑↓ navigera</span>
            <span>↵ välj</span>
            <span>Esc stäng</span>
          </div>
        )}
      </div>
    </div>
  );
}
