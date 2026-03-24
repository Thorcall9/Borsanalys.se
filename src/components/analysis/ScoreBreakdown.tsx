"use client";

import RadarChart from "./RadarChart";

// ─────────────────────────────────────────────────────────────
// LABEL MAP — camelCase key → display label
// ─────────────────────────────────────────────────────────────
const SCORE_LABELS: Record<string, string> = {
  affarsmodell: "Affärsmodell",
  strategiskMoat: "Strategisk Moat",
  finansiellKvalitet: "Finansiell Kvalitet",
  vardering: "Värdering",
  tillvaxtutsikter: "Tillväxtutsikter",
  riskprofil: "Riskprofil",
  esgMakro: "ESG / Makro",
  aiObservationer: "AI-Observationer",
};

export interface ScoreBreakdownProps {
  scores: {
    affarsmodell: number;
    strategiskMoat: number;
    finansiellKvalitet: number;
    vardering: number;
    tillvaxtutsikter: number;
    riskprofil: number;
    esgMakro: number;
    aiObservationer: number;
  };
  accentColor?: string;
  theme?: "light" | "dark";
  /** Category keys to hide from the bar list (e.g. ["aiObservationer"]) */
  hideCategories?: string[];
  /** Extra summary rows rendered below the score bars */
  children?: React.ReactNode;
}

const MAX_PER_CATEGORY = 5;
const MAX_TOTAL = 40;

export default function ScoreBreakdown({
  scores,
  accentColor = "#1a3c6e",
  theme = "light",
  hideCategories,
  children,
}: ScoreBreakdownProps) {
  const totaltPoang = Object.values(scores).reduce((sum, s) => sum + s, 0);
  const rating = (totaltPoang / MAX_TOTAL) * MAX_PER_CATEGORY;

  const hiddenSet = hideCategories ? new Set(hideCategories) : null;

  const isDark = theme === "dark";
  const borderColor = isDark ? "border-[#333]" : "border-[#e8e4da]";
  const labelColor = isDark ? "text-[#999]" : "text-[#5a5a4a]";
  const trackColor = isDark ? "bg-[#333]" : "bg-[#e8e4da]";
  const totalColor = isDark ? "" : "text-[#1a3c6e]";
  const totalStyle = isDark ? { color: accentColor } : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
      <div>
        <RadarChart scores={scores} />
      </div>
      <div className="space-y-2">
        {/* Total + weighted rating */}
        <div className={`flex justify-between items-center py-2 border-b ${borderColor}`}>
          <span className="text-sm font-bold">Total poäng:</span>
          <span className={`text-xl font-bold font-serif ${totalColor}`} style={totalStyle}>
            {totaltPoang} / {MAX_TOTAL}
          </span>
        </div>
        <div className={`flex justify-between items-center py-2 border-b ${borderColor} mb-3`}>
          <span className="text-sm font-bold">Viktat betyg:</span>
          <span className={`text-xl font-bold font-serif ${totalColor}`} style={totalStyle}>
            {rating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Per-category progress bars */}
        <div className="pt-2 space-y-1">
          {Object.entries(scores).map(([key, value]) => {
            if (hiddenSet?.has(key)) return null;
            const label = SCORE_LABELS[key] ?? key;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className={`text-xs ${labelColor} w-32 flex-shrink-0`}>
                  {label}
                </span>
                <div className={`flex-grow ${trackColor} rounded h-2.5 overflow-hidden`}>
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${(value / MAX_PER_CATEGORY) * 100}%`,
                      backgroundColor: accentColor,
                    }}
                  />
                </div>
                <span className={`text-xs font-bold font-serif w-8 text-right ${isDark ? "" : "text-[#1a3c6e]"}`} style={isDark ? { color: accentColor } : undefined}>
                  {value}/{MAX_PER_CATEGORY}
                </span>
              </div>
            );
          })}
        </div>

        {/* Optional extra rows (recommendation, target price, etc.) */}
        {children}
      </div>
    </div>
  );
}
