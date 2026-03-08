"use client";

import { useState, useMemo } from "react";
import SliderInput from "@/components/ui/SliderInput";

const sekFormatter = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 });
const formatSek = (n: number) => sekFormatter.format(n);

export default function CompoundCalculator() {
  const [startAmount, setStartAmount] = useState(50000);
  const [monthlyAmount, setMonthlyAmount] = useState(2000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const monthlyRate = annualReturn / 100 / 12;

    let balance = startAmount;
    const yearData: { year: number; invested: number; total: number }[] = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthlyAmount;
      }
      const invested = startAmount + monthlyAmount * 12 * y;
      yearData.push({ year: y, invested, total: Math.round(balance) });
    }

    const totalInvested = startAmount + monthlyAmount * 12 * years;
    const totalValue = Math.round(balance);
    const totalReturn = totalValue - totalInvested;

    return { totalInvested, totalValue, totalReturn, yearData };
  }, [startAmount, monthlyAmount, annualReturn, years]);

  const maxTotal = result.yearData.length > 0 ? result.yearData[result.yearData.length - 1].total : 1;

  return (
    <div>
      {/* Sliders */}
      <div className="space-y-6 mb-8">
        <SliderInput label="Startbelopp" value={startAmount} onChange={setStartAmount} min={0} max={1000000} step={5000} format={formatSek} />
        <SliderInput label="Månadssparande" value={monthlyAmount} onChange={setMonthlyAmount} min={0} max={50000} step={500} format={formatSek} />
        <SliderInput label="Avkastning per år" value={annualReturn} onChange={setAnnualReturn} min={0} max={20} step={0.5} format={(v) => `${v}%`} />
        <SliderInput label="Tid (år)" value={years} onChange={setYears} min={1} max={50} step={1} format={(v) => `${v} år`} />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 text-center">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Totalt investerat</div>
          <div className="font-serif text-xl font-bold">{formatSek(result.totalInvested)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Avkastning</div>
          <div className="font-serif text-xl font-bold text-success">{formatSek(result.totalReturn)}</div>
        </div>
        <div className="bg-primary text-white rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider mb-1 text-white/70">Totalt kapital</div>
          <div className="font-serif text-2xl font-bold">{formatSek(result.totalValue)}</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-medium mb-4">Kapitalutveckling per år</h3>
        <div className="space-y-1.5">
          {result.yearData.filter((_, i) => {
            if (years <= 10) return true;
            if (years <= 20) return i % 2 === 1 || i === 0;
            return i % 5 === 4 || i === 0;
          }).map((d) => {
            const investedPct = (d.invested / maxTotal) * 100;
            const returnPct = ((d.total - d.invested) / maxTotal) * 100;
            return (
              <div key={d.year} className="flex items-center gap-3">
                <span className="text-xs text-muted w-8 text-right shrink-0">{d.year}</span>
                <div className="flex-1 flex h-5 rounded-sm overflow-hidden bg-border/20">
                  <div className="bg-primary/40 h-full" style={{ width: `${investedPct}%` }} title={`Insatt: ${formatSek(d.invested)}`} />
                  <div className="bg-success h-full" style={{ width: `${returnPct}%` }} title={`Avkastning: ${formatSek(d.total - d.invested)}`} />
                </div>
                <span className="text-xs font-mono text-muted w-24 text-right shrink-0">{formatSek(d.total)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary/40 rounded-sm" />Insatt belopp</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-success rounded-sm" />Avkastning</span>
        </div>
      </div>
    </div>
  );
}
