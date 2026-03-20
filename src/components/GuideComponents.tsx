// ============================================================
// src/components/GuideComponents.tsx
// Shared UI primitives for guide pages
// ============================================================

import React from "react";

// ─── SectionTitle ───────────────────────────────────────────

interface SectionTitleProps {
  number: number;
  title: string;
  /** Kept for API compatibility – rendered as nothing */
  emoji?: string;
}

export function SectionTitle({ number, title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
        {number}
      </span>
      <h2 className="text-xl font-serif font-semibold text-foreground">{title}</h2>
    </div>
  );
}

// ─── TwoCol ─────────────────────────────────────────────────

interface TwoColProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function TwoCol({ left, right }: TwoColProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ─── MetricBox ──────────────────────────────────────────────

type BadgeVariant = "ok" | "bra" | "mycketbra";

const badgeStyles: Record<BadgeVariant, string> = {
  ok: "bg-amber-100 text-amber-700",
  bra: "bg-emerald-100 text-emerald-700",
  mycketbra: "bg-blue-100 text-blue-700",
};

interface MetricBoxProps {
  title: string;
  description: string;
  badges?: Array<{ label: string; variant: BadgeVariant }>;
}

export function MetricBox({ title, description, badges }: MetricBoxProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2 h-full">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
      {badges && (
        <div className="flex flex-wrap gap-2 pt-1">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`text-xs font-medium px-2 py-0.5 rounded ${badgeStyles[b.variant]}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── RulesTable ─────────────────────────────────────────────

interface RulesTableRow {
  range: string;
  label: string;
  highlight?: boolean;
}

interface RulesTableProps {
  title: string;
  rows: RulesTableRow[];
}

export function RulesTable({ title, rows }: RulesTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2 h-full">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <table className="w-full text-sm">
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.range} className={r.highlight ? "text-emerald-700 font-medium" : "text-muted"}>
              <td className="py-1.5 pr-3 font-mono text-xs">{r.range}</td>
              <td className="py-1.5">{r.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── InfoBox ────────────────────────────────────────────────

type InfoBoxVariant = "neutral" | "warning" | "example" | "insight";

const infoBoxStyles: Record<InfoBoxVariant, { wrapper: string; heading: string }> = {
  neutral: {
    wrapper: "bg-card border border-border",
    heading: "text-foreground",
  },
  warning: {
    wrapper: "bg-amber-50 border border-amber-200",
    heading: "text-amber-800",
  },
  example: {
    wrapper: "bg-section-alt border border-border",
    heading: "text-foreground",
  },
  insight: {
    wrapper: "bg-blue-50 border border-blue-200",
    heading: "text-blue-800",
  },
};

interface InfoBoxProps {
  variant: InfoBoxVariant;
  title: string;
  children: React.ReactNode;
}

export function InfoBox({ variant, title, children }: InfoBoxProps) {
  const s = infoBoxStyles[variant];
  return (
    <div className={`rounded-xl p-5 space-y-2 ${s.wrapper}`}>
      <p className={`text-sm font-semibold ${s.heading}`}>{title}</p>
      <div className="text-sm text-foreground/80 leading-relaxed space-y-1">{children}</div>
    </div>
  );
}

// ─── ExampleRow ─────────────────────────────────────────────

interface ExampleRowProps {
  name: string;
  details: string;
  verdict: string;
}

export function ExampleRow({ name, details, verdict }: ExampleRowProps) {
  return (
    <div className="py-2 border-b border-border last:border-0 space-y-0.5">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted">{details}</p>
      <p className="text-xs text-foreground/70 italic">{verdict}</p>
    </div>
  );
}

// ─── ValuationBar ───────────────────────────────────────────

interface ValuationBarProps {
  metric: string;
  low: string;
  mid: string;
  high: string;
}

export function ValuationBar({ metric, low, mid, high }: ValuationBarProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <p className="text-sm font-semibold text-foreground">{metric}</p>
      <div className="flex rounded overflow-hidden text-xs font-medium">
        <div className="flex-1 bg-emerald-100 text-emerald-800 px-3 py-2 text-center">{low}</div>
        <div className="flex-1 bg-amber-100 text-amber-800 px-3 py-2 text-center">{mid}</div>
        <div className="flex-1 bg-red-100 text-red-800 px-3 py-2 text-center">{high}</div>
      </div>
      <div className="flex text-xs text-muted justify-between px-1">
        <span>Lågt</span>
        <span>Normalt</span>
        <span>Högt</span>
      </div>
    </div>
  );
}

// ─── KeyInsight ─────────────────────────────────────────────

export function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4">
      <p className="text-sm text-foreground/80 leading-relaxed">{children}</p>
    </div>
  );
}

// ─── BadgeRow ───────────────────────────────────────────────

interface BadgeRowProps {
  badges: Array<{ label: string; variant: BadgeVariant }>;
}

export function BadgeRow({ badges }: BadgeRowProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b.label}
          className={`text-xs font-medium px-2 py-0.5 rounded ${badgeStyles[b.variant]}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}
