"use client";

import FinancialChart from "@/components/analysis/FinancialChart";
import type { ChartData, ChartOptions } from "chart.js";

const GREEN = "#76B900";
const GREEN_ALPHA = "rgba(118,185,0,0.15)";
const BLUE = "#60a5fa";

const gridOpts = { color: "rgba(255,255,255,0.05)" };
const axisOpts = {
  grid: gridOpts,
  border: { display: false as const },
  ticks: { color: "#5a5a5a" },
};

const revenueData: ChartData = {
  labels: ["Q1 FY25", "Q2 FY25", "Q3 FY25", "Q4 FY25", "Q1 FY26", "Q2 FY26", "Q3 FY26", "Q4 FY26e"],
  datasets: [{
    label: "Omsättning ($B)",
    data: [26.0, 30.0, 35.1, 39.3, 44.1, 46.7, 57.0, 65.0],
    backgroundColor: [
      "rgba(118,185,0,0.3)", "rgba(118,185,0,0.3)", "rgba(118,185,0,0.3)", "rgba(118,185,0,0.3)",
      GREEN, GREEN, GREEN, "rgba(118,185,0,0.35)",
    ],
    borderColor: GREEN,
    borderWidth: 1,
    borderRadius: 4,
  }],
};

const revenueOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: { raw: unknown }) => ` $${ctx.raw}B` } } },
  scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: "#5a5a5a", callback: (v: string | number) => `$${v}B` } } },
};

const marginData: ChartData = {
  labels: ["Q1 FY26", "Q2 FY26", "Q3 FY26", "Q4 FY26e"],
  datasets: [
    {
      label: "Bruttomarginal (Non-GAAP)",
      data: [71.3, 72.7, 73.6, 75.0],
      borderColor: GREEN,
      backgroundColor: GREEN_ALPHA,
      borderWidth: 2.5,
      pointBackgroundColor: GREEN,
      pointRadius: 5,
      fill: true,
      tension: 0.3,
    },
    {
      label: "EBIT-marginal (GAAP)",
      data: [49.1, 60.8, 63.2, null],
      borderColor: BLUE,
      borderWidth: 2,
      pointBackgroundColor: BLUE,
      pointRadius: 4,
      fill: false,
      tension: 0.3,
      borderDash: [4, 3],
    },
  ],
};

const marginOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true, labels: { color: "#7a7a7a", boxWidth: 12, font: { size: 10 } } } },
  scales: { x: axisOpts, y: { ...axisOpts, min: 45, max: 80, ticks: { color: "#5a5a5a", callback: (v: string | number) => `${v}%` } } },
};

const cashFlowData: ChartData = {
  labels: ["Q1 FY26", "Q2 FY26", "Q3 FY26"],
  datasets: [
    { label: "Operativt CF", data: [27.4, 15.4, 23.8], backgroundColor: GREEN, borderRadius: 4 },
    { label: "Fritt CF", data: [26.1, 13.5, 22.1], backgroundColor: "rgba(118,185,0,0.4)", borderRadius: 4 },
  ],
};

const cashFlowOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true, labels: { color: "#7a7a7a", boxWidth: 12, font: { size: 10 } } } },
  scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: "#5a5a5a", callback: (v: string | number) => `$${v}B` } } },
};

const epsData: ChartData = {
  labels: ["FY2024", "FY2025", "2026e", "2027e"],
  datasets: [{
    label: "EPS ($)",
    data: [2.96, 4.92, 8.24, 10.88],
    backgroundColor: ["rgba(118,185,0,0.5)", GREEN, "rgba(118,185,0,0.7)", "rgba(118,185,0,0.5)"],
    borderColor: GREEN,
    borderWidth: 1,
    borderRadius: 6,
  }],
};

const epsOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: { raw: unknown }) => ` $${ctx.raw}` } } },
  scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: "#5a5a5a", callback: (v: string | number) => `$${v}` } } },
};

export default function NvidiaCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FinancialChart title="Kvartalsomsättning FY26 ($B)" type="bar" data={revenueData} options={revenueOptions} />
      <FinancialChart title="Marginaler — Trend (%)" type="line" data={marginData} options={marginOptions} />
      <FinancialChart title="Kassaflöde — Kvartal FY26 ($B)" type="bar" data={cashFlowData} options={cashFlowOptions} />
      <FinancialChart title="EPS-trend & Forward-estimat" type="bar" data={epsData} options={epsOptions} />
    </div>
  );
}
