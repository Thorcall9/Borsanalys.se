"use client";

import { useState, useMemo } from "react";
import SliderInput from "@/components/ui/SliderInput";

const sekFormatter = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumFractionDigits: 0 });
const formatSek = (n: number) => sekFormatter.format(n);

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [startAmount, setStartAmount] = useState(50000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(15);

  const result = useMemo(() => {
    const r = annualReturn / 100;
    const monthlyRate = r / 12;
    const months = years * 12;

    // Future value of start amount
    const fvStart = startAmount * Math.pow(1 + monthlyRate, months);
    const remaining = goalAmount - fvStart;

    let monthlyNeeded = 0;
    if (remaining > 0 && monthlyRate > 0) {
      monthlyNeeded = remaining / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (remaining > 0 && monthlyRate === 0) {
      monthlyNeeded = remaining / months;
    }

    const totalInvested = startAmount + monthlyNeeded * months;
    const totalReturn = goalAmount - totalInvested;

    return {
      monthlyNeeded: Math.max(0, Math.round(monthlyNeeded)),
      totalInvested: Math.round(totalInvested),
      totalReturn: Math.round(totalReturn),
      alreadyCovered: remaining <= 0,
    };
  }, [goalAmount, startAmount, annualReturn, years]);

  return (
    <div>
      <div className="space-y-6 mb-8">
        <SliderInput label="Sparmål" value={goalAmount} onChange={setGoalAmount} min={50000} max={10000000} step={50000} format={formatSek} />
        <SliderInput label="Startkapital" value={startAmount} onChange={setStartAmount} min={0} max={5000000} step={10000} format={formatSek} />
        <SliderInput label="Förväntad avkastning per år" value={annualReturn} onChange={setAnnualReturn} min={0} max={20} step={0.5} format={(v) => `${v}%`} />
        <SliderInput label="Sparhorisont" value={years} onChange={setYears} min={1} max={50} step={1} format={(v) => `${v} år`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary text-white rounded-xl p-5 text-center">
          <div className="text-xs uppercase tracking-wider mb-1 text-white/70">Månadssparande</div>
          <div className="font-serif text-2xl font-bold">
            {result.alreadyCovered ? "0 kr" : formatSek(result.monthlyNeeded)}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Totalt investerat</div>
          <div className="font-serif text-xl font-bold">{formatSek(result.totalInvested)}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 text-center">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Avkastning</div>
          <div className="font-serif text-xl font-bold text-success">{formatSek(result.totalReturn)}</div>
        </div>
      </div>

      {result.alreadyCovered && (
        <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
          Ditt startkapital räcker för att nå målet med den angivna avkastningen och tidsperioden!
        </div>
      )}

      {!result.alreadyCovered && (
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium mb-3">Fördelning</h3>
          <div className="flex h-6 rounded-sm overflow-hidden">
            <div
              className="bg-primary/40 h-full"
              style={{ width: `${(result.totalInvested / goalAmount) * 100}%` }}
            />
            <div
              className="bg-success h-full"
              style={{ width: `${(result.totalReturn / goalAmount) * 100}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary/40 rounded-sm" />Insatt: {formatSek(result.totalInvested)}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-success rounded-sm" />Avkastning: {formatSek(result.totalReturn)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
