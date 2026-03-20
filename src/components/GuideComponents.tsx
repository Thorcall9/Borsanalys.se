// ============================================================
// GuideComponents.tsx – Börsanalys.se Guide Komponentbibliotek
// Kopiera hela filen till src/components/GuideComponents.tsx
// ============================================================

import React from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type BadgeVariant = "ok" | "bra" | "mycketbra" | "lagRisk" | "normal" | "hogRisk";
type BoxVariant = "example" | "warning" | "insight" | "neutral";

interface RuleRow {
  range: string;
  label: string;
  highlight?: boolean;
}

interface ExampleItem {
  name: string;
  details: string;
  verdict: string;
}

// ─────────────────────────────────────────────
// 1. BADGE
// ─────────────────────────────────────────────

const badgeStyles: Record<BadgeVariant, string> = {
  ok:        "bg-gray-100 text-gray-600 border border-gray-300",
  bra:       "bg-blue-100 text-blue-700 border border-blue-200",
  mycketbra: "bg-blue-600 text-white border border-blue-700",
  lagRisk:   "bg-gray-100 text-gray-600 border border-gray-300",
  normal:    "bg-gray-100 text-gray-600 border border-gray-300",
  hogRisk:   "bg-red-600 text-white border border-red-700",
};

export function Badge({ label, variant }: { label: string; variant: BadgeVariant }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${badgeStyles[variant]}`}>
      {label}
    </span>
  );
}

export function BadgeRow({ badges }: { badges: { label: string; variant: BadgeVariant }[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {badges.map((b, i) => <Badge key={i} label={b.label} variant={b.variant} />)}
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. TUMREGELSTABELL
// ─────────────────────────────────────────────

export function RulesTable({ title, rows }: { title?: string; rows: RuleRow[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      {title && (
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{title}</p>
      )}
      <div className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-between items-center py-2 px-1">
            <span className="text-sm text-gray-700 font-medium">{row.range}</span>
            <span className={`text-sm font-semibold ${row.highlight ? "text-blue-600" : "text-gray-400"}`}>
              {row.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. METRIKBOX
// ─────────────────────────────────────────────

export function MetricBox({
  title,
  description,
  badges,
  accent = "default",
}: {
  title: string;
  description?: string;
  badges?: { label: string; variant: BadgeVariant }[];
  accent?: "default" | "red";
}) {
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${accent === "red" ? "bg-red-50 border-red-100" : "bg-white border-gray-200"}`}>
      <p className={`font-bold ${accent === "red" ? "text-red-600" : "text-gray-800"}`}>{title}</p>
      {description && (
        <p className={`text-sm mt-1 ${accent === "red" ? "text-red-500" : "text-gray-500"}`}>{description}</p>
      )}
      {badges && <BadgeRow badges={badges} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. VÄRDERINGSRAD
// ─────────────────────────────────────────────

export function ValuationBar({ metric, low, mid, high }: { metric: string; low: string; mid: string; high: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <p className="font-semibold text-amber-700 mb-4">{metric}</p>
      <div className="grid grid-cols-3 text-center gap-2">
        {[
          { value: low,  label: "BILLIGT", color: "text-green-600" },
          { value: mid,  label: "NORMALT", color: "text-yellow-600" },
          { value: high, label: "DYRT",    color: "text-red-500" },
        ].map((col) => (
          <div key={col.label}>
            <p className="text-xl font-bold text-gray-800">{col.value}</p>
            <p className={`text-xs font-semibold tracking-widest mt-1 ${col.color}`}>{col.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. INFOBOX
// ─────────────────────────────────────────────

const boxStyles: Record<BoxVariant, { wrapper: string; titleColor: string }> = {
  example: { wrapper: "bg-white border border-gray-200 shadow-sm",   titleColor: "text-gray-800" },
  warning: { wrapper: "bg-amber-50 border border-amber-200",         titleColor: "text-amber-700" },
  insight: { wrapper: "bg-white border border-gray-200 shadow-sm",   titleColor: "text-gray-700" },
  neutral: { wrapper: "bg-gray-50 border border-gray-200",           titleColor: "text-gray-600" },
};

export function InfoBox({ variant = "example", title, children }: {
  variant?: BoxVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const s = boxStyles[variant];
  return (
    <div className={`rounded-xl p-4 ${s.wrapper}`}>
      {title && <p className={`font-semibold mb-2 ${s.titleColor}`}>{title}</p>}
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

export function ExampleRow({ name, details, verdict }: ExampleItem) {
  return (
    <p>
      <strong>{name}:</strong> {details} – {verdict}
    </p>
  );
}

// ─────────────────────────────────────────────
// 6. VIKTIG INSIKT
// ─────────────────────────────────────────────

export function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Viktig insikt</p>
      <p className="text-sm italic text-gray-600">"{children}"</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. SEKTIONSRUBRIK  (utan emoji)
// ─────────────────────────────────────────────

export function SectionTitle({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
      {number}. {title}
    </h2>
  );
}

// ─────────────────────────────────────────────
// 8. TVÅKOLUMNSLAYOUT
// ─────────────────────────────────────────────

export function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 9. BLÅ ANALYSFLÖDESBOX  ("Så sätter du ihop allt")
// ─────────────────────────────────────────────

interface FlowStep { number: string; label: string; question: string }

export function AnalysisFlow({ title, steps }: { title: string; steps: FlowStep[] }) {
  return (
    <div className="rounded-xl bg-blue-700 text-white p-6">
      <h3 className="text-xl font-bold text-center mb-6">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {steps.map((s) => (
          <div key={s.number} className="text-center">
            <p className="text-blue-300 text-sm font-semibold mb-1">{s.number}</p>
            <p className="font-bold text-white">{s.label}</p>
            <p className="text-blue-200 text-xs mt-1">{s.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 10. CHECKLISTA / MISSTAG-BOX
// ─────────────────────────────────────────────

export function ChecklistBox({ title, subtitle, items, variant }: {
  title: string;
  subtitle?: string;
  items: string[];
  variant: "green" | "red";
}) {
  const c = variant === "green"
    ? { wrapper: "bg-emerald-50 border-emerald-200", title: "text-emerald-700", icon: "✅", sub: "text-emerald-600" }
    : { wrapper: "bg-red-50 border-red-200",         title: "text-red-600",     icon: "❌", sub: "text-red-500" };

  return (
    <div className={`rounded-xl border p-5 ${c.wrapper}`}>
      <p className={`font-bold text-lg mb-1 ${c.title}`}>{title}</p>
      {subtitle && <p className={`text-sm mb-3 ${c.sub}`}>{subtitle}</p>}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-700 flex gap-2 items-start">
            <span className="mt-0.5 flex-shrink-0">{c.icon}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────
// 11. SLUTSATS med blockquote
// ─────────────────────────────────────────────

export function Conclusion({ heading, body, quote, footer }: {
  heading: string;
  body: string;
  quote?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
      <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
      {quote && (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 text-sm leading-relaxed">
          {quote}
        </blockquote>
      )}
      {footer && <div className="text-sm text-gray-600">{footer}</div>}
    </div>
  );
}
