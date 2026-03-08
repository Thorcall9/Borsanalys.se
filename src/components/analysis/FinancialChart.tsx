"use client";

import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
  type ChartType,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FinancialChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  title?: string;
  height?: string;
}

export default function FinancialChart({ type, data, options, title, height = "260px" }: FinancialChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const defaultOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { boxWidth: 12, font: { size: 10 } },
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(0,0,0,0.05)" },
          border: { display: false },
        },
        y: {
          grid: { color: "rgba(0,0,0,0.05)" },
          border: { display: false },
        },
      },
    };

    chartRef.current = new ChartJS(canvasRef.current, {
      type,
      data,
      options: options || defaultOptions,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [type, data, options]);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {title && (
        <div className="text-[11px] font-mono uppercase tracking-wider text-primary mb-4">{title}</div>
      )}
      <div style={{ height, position: "relative" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
