"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { Chart as ChartJS } from 'chart.js';

export default function NvidiaAnalysis() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeQuarter, setActiveQuarter] = useState('q3');

  // Refs for all chart canvases
  const chartRefs = useRef<{[key: string]: ChartJS}>({});
  const revenueQuarterChartRef = useRef(null);
  const marginChartRef = useRef(null);
  const cfChartRef = useRef(null);
  const multiplesChartRef = useRef(null);
  const epsChartRef = useRef(null);
  const segmentChartRef = useRef(null);
  const buybackChartRef = useRef(null);
  const toneTrendChartRef = useRef(null);
  const scenarioChartRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // Basic smooth scroll for navigation
    const targetElement = document.getElementById(targetId.substring(1));
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  };

  const showQuarterTab = (quarter: string) => {
    setActiveQuarter(quarter);
  };

  useEffect(() => {
    const NVIDIA_GREEN = '#76B900';
    const NVIDIA_GREEN_ALPHA = 'rgba(118,185,0,0.15)';
    const RED = '#e84040';
    const AMBER = '#f5a623';
    const BLUE = '#60a5fa';

    Chart.defaults.color = '#6a6a6a';
    Chart.defaults.font.family = `"'Courier New', monospace"`;
    Chart.defaults.font.size = 11;

    const gridOpts = { color: 'rgba(255,255,255,0.05)', drawBorder: false };
    const axisOpts = { grid: gridOpts, border: { display: false }, ticks: { color: '#5a5a5a' } };
    
    const chartsToCreate = {
      revenueQuarterChart: {
        ref: revenueQuarterChartRef,
        type: 'bar',
        data: {
          labels: ['Q1 FY25', 'Q2 FY25', 'Q3 FY25', 'Q4 FY25', 'Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26e'],
          datasets: [{
            label: 'Omsättning ($B)',
            data: [26.0, 30.0, 35.1, 39.3, 44.1, 46.7, 57.0, 65.0],
            backgroundColor: (ctx: any) => {
              const i = ctx.dataIndex;
              if (i === 7) return 'rgba(118,185,0,0.35)';
              return i >= 4 ? NVIDIA_GREEN : 'rgba(118,185,0,0.3)';
            },
            borderColor: NVIDIA_GREEN,
            borderWidth: 1,
            borderRadius: 4,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}B` } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}B` } } }
        }
      },
      marginChart: {
        ref: marginChartRef,
        type: 'line',
        data: {
          labels: ['Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26e'],
          datasets: [
            { label: 'Bruttomarginal (Non-GAAP)', data: [71.3, 72.7, 73.6, 75.0], borderColor: NVIDIA_GREEN, backgroundColor: NVIDIA_GREEN_ALPHA, borderWidth: 2.5, pointBackgroundColor: NVIDIA_GREEN, pointRadius: 5, fill: true, tension: 0.3 },
            { label: 'EBIT-marginal (GAAP)', data: [49.1, 60.8, 63.2, null], borderColor: BLUE, backgroundColor: 'rgba(96,165,250,0.06)', borderWidth: 2, pointBackgroundColor: BLUE, pointRadius: 4, fill: false, tension: 0.3, borderDash: [4, 3] }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#7a7a7a', boxWidth: 12, font: { size: 10 } } }, tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}%` } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `${v}%` }, min: 45, max: 80 } }
        }
      },
      cfChart: {
        ref: cfChartRef,
        type: 'bar',
        data: {
          labels: ['Q1 FY26', 'Q2 FY26', 'Q3 FY26'],
          datasets: [
            { label: 'Operativt CF', data: [27.4, 15.4, 23.8], backgroundColor: NVIDIA_GREEN, borderRadius: 4 },
            { label: 'Fritt CF', data: [26.1, 13.5, 22.1], backgroundColor: 'rgba(118,185,0,0.4)', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#7a7a7a', boxWidth: 12, font: { size: 10 } } }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}B` } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}B` } } }
        }
      },
      multiplesChart: {
        ref: multiplesChartRef,
        type: 'line',
        data: {
          labels: ['FY2024', 'FY2025', 'Nuv.', '2026e', '2027e'],
          datasets: [
            { label: 'P/E', data: [48.53, 38.31, 36.97, 22.11, 16.75], borderColor: NVIDIA_GREEN, pointBackgroundColor: NVIDIA_GREEN, borderWidth: 2.5, pointRadius: 5, fill: false, tension: 0.3 },
            { label: 'EV/EBIT', data: [43.00, 34.86, 34.75, null, null], borderColor: BLUE, pointBackgroundColor: BLUE, borderWidth: 2, pointRadius: 4, fill: false, tension: 0.3, borderDash: [4, 3] },
            { label: 'P/S', data: [27.10, 21.30, 20.71, null, null], borderColor: AMBER, pointBackgroundColor: AMBER, borderWidth: 2, pointRadius: 4, fill: false, tension: 0.3, borderDash: [6, 3] }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#7a7a7a', boxWidth: 12, font: { size: 10 } } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a' } } }
        }
      },
      epsChart: {
        ref: epsChartRef,
        type: 'bar',
        data: {
          labels: ['FY2024', 'FY2025', '2026e', '2027e'],
          datasets: [{
            label: 'EPS ($)',
            data: [2.96, 4.92, 8.24, 10.88],
            backgroundColor: (ctx: any) => ['rgba(118,185,0,0.5)', NVIDIA_GREEN, 'rgba(118,185,0,0.7)', 'rgba(118,185,0,0.5)'][ctx.dataIndex],
            borderColor: NVIDIA_GREEN, borderWidth: 1, borderRadius: 6,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}` } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}` } } }
        }
      },
      segmentChart: {
        ref: segmentChartRef,
        type: 'bar',
        data: {
          labels: ['Q1 FY26', 'Q2 FY26', 'Q3 FY26'],
          datasets: [
            { label: 'Data Center', data: [39.1, 41.1, 51.2], backgroundColor: NVIDIA_GREEN, borderRadius: 3 },
            { label: 'Gaming', data: [3.8, 4.3, 4.3], backgroundColor: BLUE, borderRadius: 3 },
            { label: 'Pro Viz', data: [0.5, 0.6, 0.8], backgroundColor: AMBER, borderRadius: 3 },
            { label: 'Automotive', data: [0.6, 0.6, 0.6], backgroundColor: RED, borderRadius: 3 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#7a7a7a', boxWidth: 12, font: { size: 10 } } }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}B` } } },
          scales: { x: axisOpts, y: { ...axisOpts, stacked: false, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}B` } } }
        }
      },
      buybackChart: {
        ref: buybackChartRef,
        type: 'bar',
        data: {
          labels: ['FY2024', 'FY2025', 'Q1 FY26', 'Q2 FY26', 'Q3 FY26'],
          datasets: [{
            label: 'Aktieåterköp ($B)',
            data: [33.7, 40.1, 14.1, 9.7, 12.5],
            backgroundColor: ['rgba(118,185,0,0.35)', 'rgba(118,185,0,0.5)', NVIDIA_GREEN, NVIDIA_GREEN, NVIDIA_GREEN],
            borderColor: NVIDIA_GREEN, borderWidth: 1, borderRadius: 4,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}B` } } },
          scales: { x: axisOpts, y: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}B` } } }
        }
      },
      toneTrendChart: {
        ref: toneTrendChartRef,
        type: 'line',
        data: {
          labels: ['Q1 FY26', 'Q2 FY26', 'Q3 FY26'],
          datasets: [
            { label: 'Optimism-index (0–10)', data: [6.0, 7.5, 9.2], borderColor: NVIDIA_GREEN, backgroundColor: NVIDIA_GREEN_ALPHA, borderWidth: 3, pointBackgroundColor: NVIDIA_GREEN, pointRadius: 8, fill: true, tension: 0.4 },
            { label: 'Riskspråk-intensitet (0–10)', data: [8.5, 5.0, 2.5], borderColor: RED, backgroundColor: 'rgba(232,64,64,0.08)', borderWidth: 3, pointBackgroundColor: RED, pointRadius: 8, fill: true, tension: 0.4 },
            { label: 'Konkretion i guidance (0–10)', data: [7.0, 8.0, 9.0], borderColor: BLUE, backgroundColor: 'transparent', borderWidth: 2, pointBackgroundColor: BLUE, pointRadius: 6, fill: false, tension: 0.4, borderDash: [5, 3] }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: '#7a7a7a', boxWidth: 12, font: { size: 11 } } }, tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.raw}/10` } } },
          scales: { x: axisOpts, y: { ...axisOpts, min: 0, max: 10, ticks: { color: '#5a5a5a', stepSize: 2 } } }
        }
      },
      scenarioChart: {
        ref: scenarioChartRef,
        type: 'bar',
        data: {
          labels: ['Bear Case', 'Nuv. Kurs', 'Base Case', 'Bull Case'],
          datasets: [{
            label: 'Aktiekurs (USD)',
            data: [120, 182, 230, 320],
            backgroundColor: [RED, AMBER, BLUE, NVIDIA_GREEN],
            borderColor: [RED, AMBER, BLUE, NVIDIA_GREEN],
            borderWidth: 1,
            borderRadius: 6,
          }]
        },
        options: {
          indexAxis: 'y', responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: any) => ` $${ctx.raw}` } } },
          scales: { x: { ...axisOpts, ticks: { color: '#5a5a5a', callback: (v: any) => `$${v}` } }, y: axisOpts }
        }
      },
    } as const;

    Object.entries(chartsToCreate).forEach(([id, chartConfig]) => {
      const canvas = chartConfig.ref.current;
      if (canvas) {
        if (chartRefs.current[id]) {
          chartRefs.current[id].destroy();
        }
        chartRefs.current[id] = new Chart(canvas, {
          type: chartConfig.type,
          data: chartConfig.data,
          options: chartConfig.options,
        });
      }
    });
    
    // Intersection Observer for nav highlight
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + id) {
              item.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));

    return () => {
      Object.values(chartRefs.current).forEach(chart => chart?.destroy());
      observer.disconnect();
    };
  }, []);

  const StarRating = ({ rating, text }: { rating: number, text: string }) => (
    <div className="rating-box">
      <div className="rating-label">{text}</div>
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < rating ? '' : 'empty'}`}>★</span>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        :root {
          --nvidia-green: #76B900;
          --nvidia-green-dim: #5a8c00;
          --nvidia-green-glow: rgba(118,185,0,0.15);
          --bg-primary: #0f0f0f;
          --bg-secondary: #161616;
          --bg-card: #1a1a1a;
          --bg-card-hover: #202020;
          --bg-elevated: #222222;
          --border: rgba(118,185,0,0.18);
          --border-dim: rgba(255,255,255,0.07);
          --text-primary: #f0f0f0;
          --text-secondary: #9a9a9a;
          --text-muted: #5a5a5a;
          --red: #e84040;
          --red-dim: rgba(232,64,64,0.15);
          --green-dim: rgba(118,185,0,0.12);
          --amber: #f5a623;
          --amber-dim: rgba(245,166,35,0.15);
          --sidebar-w: 260px;
        }
        .nvidia-analysis-body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          display: flex;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .sidebar { width: var(--sidebar-w); background: #111111; border-right: 1px solid rgba(118,185,0,0.25); position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto; z-index: 100; display: flex; flex-direction: column; transition: transform 0.3s ease; }
        .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid var(--border-dim); }
        .logo-nvidia { font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; letter-spacing: 5px; text-transform: uppercase; font-weight: bold; color: var(--nvidia-green); line-height: 1; }
        .logo-sub { font-size: 10px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; font-family: 'Courier New', Courier, monospace; }
        .sidebar-nav { padding: 16px 0; flex: 1; }
        .nav-section-title { font-size: 9px; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; padding: 12px 24px 6px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 24px; color: #9a9a9a !important; text-decoration: none !important; font-size: 13px; font-weight: 400; transition: all 0.2s; border-left: 2px solid transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .nav-item:visited { color: #9a9a9a !important; text-decoration: none !important; }
        .nav-item:hover, .nav-item.active { color: #f0f0f0 !important; background: var(--nvidia-green-glow); border-left-color: var(--nvidia-green); text-decoration: none !important; }
        .nav-item .nav-num { font-family: 'Courier New', Courier, monospace; font-size: 10px; color: var(--nvidia-green); min-width: 18px; }
        .sidebar-footer { padding: 16px 24px; border-top: 1px solid var(--border-dim); font-size: 10px; color: var(--text-muted); font-family: 'Courier New', Courier, monospace; line-height: 1.8; }
        .main { margin-left: var(--sidebar-w); flex: 1; min-width: 0; }
        .header { background: #1c2b00; border-bottom: 2px solid rgba(118,185,0,0.5); padding: 48px 48px 40px; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(160deg, rgba(118,185,0,0.14) 0%, rgba(0,0,0,0) 70%); pointer-events: none; }
        .header-chip { display: inline-flex; align-items: center; gap: 8px; background: rgba(118,185,0,0.2); border: 1px solid rgba(118,185,0,0.5); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-family: 'Courier New', Courier, monospace; color: var(--nvidia-green); margin-bottom: 16px; letter-spacing: 1px; }
        .pulse { width: 7px; height: 7px; background: var(--nvidia-green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.7); } }
        .header h1 { font-family: 'Georgia', 'Times New Roman', serif; font-size: 54px; letter-spacing: 6px; text-transform: uppercase; font-weight: bold; line-height: 1; margin-bottom: 8px; color: #ffffff; }
        .header-subtitle { font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 32px; letter-spacing: 0.3px; }
        .header-kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 8px; }
        .header-kpi { background: rgba(118,185,0,0.12); border: 1px solid rgba(118,185,0,0.4); border-radius: 10px; padding: 16px; }
        .kpi-label { font-size: 10px; font-family: 'Courier New', Courier, monospace; color: rgba(118,185,0,0.8); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
        .kpi-value { font-family: 'Georgia', 'Times New Roman', serif; font-size: 28px; line-height: 1.1; color: #fff; font-weight: bold; }
        .kpi-change { font-size: 11px; font-family: 'Courier New', Courier, monospace; margin-top: 4px; }
        .kpi-change.up { color: var(--nvidia-green); }
        .kpi-change.down { color: var(--red); }
        .kpi-change.neutral { color: var(--text-muted); }
        .content { padding: 0 48px 80px; }
        .section { padding-top: 56px; }
        .section-header { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid var(--border-dim); }
        .section-num { font-family: 'Georgia', 'Times New Roman', serif; font-size: 42px; color: var(--nvidia-green); opacity: 0.5; line-height: 1; font-weight: bold; }
        .section-title { font-family: 'Georgia', 'Times New Roman', serif; font-size: 26px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; color: var(--text-primary); }
        .card { background: var(--bg-card); border: 1px solid var(--border-dim); border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
        .card:hover { border-color: var(--border); }
        .card-title { font-size: 11px; font-family: 'Courier New', Courier, monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--nvidia-green); margin-bottom: 16px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .data-table th { text-align: right; padding: 8px 12px; font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 1px; color: var(--text-muted); border-bottom: 1px solid var(--border-dim); font-weight: 400; }
        .data-table th:first-child { text-align: left; }
        .data-table td { text-align: right; padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,0.03); font-family: 'Courier New', Courier, monospace; font-size: 12px; color: var(--text-secondary); }
        .data-table td:first-child { text-align: left; color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; }
        .data-table tr:hover td { background: rgba(118,185,0,0.04); }
        .data-table .td-green { color: var(--nvidia-green) !important; }
        .data-table .td-red { color: var(--red) !important; }
        .data-table .td-amber { color: var(--amber) !important; }
        .arrow-up::before { content: '↑ '; color: var(--nvidia-green); }
        .arrow-down::before { content: '↓ '; color: var(--red); }
        .arrow-neutral::before { content: '→ '; color: var(--amber); }
        .star-rating { display: inline-flex; gap: 3px; align-items: center; }
        .star { color: var(--nvidia-green); font-size: 14px; }
        .star.empty { color: var(--border-dim); }
        .rating-box { background: var(--nvidia-green-glow); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 16px; }
        .rating-label { font-size: 12px; color: var(--text-secondary); flex: 1; font-style: italic; line-height: 1.5; }
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; font-family: 'Courier New', Courier, monospace; }
        .badge-green { background: var(--green-dim); color: var(--nvidia-green); border: 1px solid rgba(118,185,0,0.3); }
        .badge-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(232,64,64,0.3); }
        .badge-amber { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
        .badge-blue { background: rgba(96,165,250,0.1); color: #60a5fa; border: 1px solid rgba(96,165,250,0.3); }
        .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-dim); }
        .swot-cell { padding: 20px; border: 1px solid var(--border-dim); }
        .swot-title { font-family: 'Georgia', 'Times New Roman', serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; }
        .swot-s .swot-title { color: var(--nvidia-green); }
        .swot-w .swot-title { color: var(--red); }
        .swot-o .swot-title { color: #60a5fa; }
        .swot-t .swot-title { color: var(--amber); }
        .swot-cell ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .swot-cell li { font-size: 12.5px; color: var(--text-secondary); padding-left: 14px; position: relative; line-height: 1.5; }
        .swot-cell li::before { content: '—'; position: absolute; left: 0; color: var(--text-muted); font-size: 10px; }
        .scenario-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .scenario-card { border-radius: 12px; padding: 24px; border: 1px solid; }
        .scenario-bull { background: rgba(118,185,0,0.06); border-color: rgba(118,185,0,0.3); }
        .scenario-base { background: rgba(96,165,250,0.06); border-color: rgba(96,165,250,0.3); }
        .scenario-bear { background: rgba(232,64,64,0.06); border-color: rgba(232,64,64,0.3); }
        .scenario-icon { font-size: 28px; margin-bottom: 10px; }
        .scenario-title { font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
        .scenario-bull .scenario-title { color: var(--nvidia-green); }
        .scenario-base .scenario-title { color: #60a5fa; }
        .scenario-bear .scenario-title { color: var(--red); }
        .scenario-price { font-family: 'Georgia', 'Times New Roman', serif; font-size: 32px; font-weight: bold; margin: 12px 0; line-height: 1; }
        .scenario-bull .scenario-price { color: var(--nvidia-green); }
        .scenario-base .scenario-price { color: #60a5fa; }
        .scenario-bear .scenario-price { color: var(--red); }
        .scenario-desc { font-size: 12.5px; color: var(--text-secondary); line-height: 1.7; }
        .quarter-tab-row { display: flex; gap: 8px; margin-bottom: 20px; }
        .quarter-tab { padding: 8px 18px; border-radius: 8px; font-size: 12px; font-family: 'Courier New', Courier, monospace; cursor: pointer; border: 1px solid var(--border-dim); background: transparent; color: var(--text-secondary); transition: all 0.2s; }
        .quarter-tab.active { background: var(--nvidia-green-glow); border-color: var(--nvidia-green); color: var(--nvidia-green); }
        .quarter-panel { display: none; }
        .quarter-panel.active { display: block; }
        .tone-meter { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .tone-bar { flex: 1; height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
        .tone-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--red), var(--amber), var(--nvidia-green)); transition: width 0.5s ease; }
        .confidence-bars { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px; }
        .conf-item { background: var(--bg-elevated); border-radius: 8px; padding: 12px; text-align: center; }
        .conf-count { font-family: 'Georgia', 'Times New Roman', serif; font-size: 32px; font-weight: bold; line-height: 1; }
        .conf-high .conf-count { color: var(--nvidia-green); }
        .conf-mid .conf-count { color: var(--amber); }
        .conf-low .conf-count { color: var(--red); }
        .conf-label { font-size: 10px; font-family: 'Courier New', Courier, monospace; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .risk-flag { background: var(--red-dim); border: 1px solid rgba(232,64,64,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--red); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .signal-flag { background: var(--green-dim); border: 1px solid rgba(118,185,0,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--nvidia-green); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .info-flag { background: var(--amber-dim); border: 1px solid rgba(245,166,35,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--amber); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .metric-tile { background: var(--bg-card); border: 1px solid var(--border-dim); border-radius: 10px; padding: 18px; }
        .metric-value { font-family: 'Georgia', 'Times New Roman', serif; font-size: 30px; font-weight: bold; line-height: 1; margin: 6px 0 4px; }
        .metric-label { font-size: 10px; font-family: 'Courier New', Courier, monospace; color: var(--text-muted); letter-spacing: 1.5px; text-transform: uppercase; }
        .metric-trend { font-size: 11px; font-family: 'Courier New', Courier, monospace; color: var(--text-muted); }
        .chart-wrap { position: relative; height: 260px; }
        .chart-wrap-tall { position: relative; height: 320px; }
        .verdict-box { background: linear-gradient(135deg, rgba(118,185,0,0.08) 0%, rgba(118,185,0,0.04) 100%); border: 1px solid var(--border); border-radius: 14px; padding: 32px; text-align: center; position: relative; overflow: hidden; }
        .verdict-box::before { content: ''; position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(118,185,0,0.1) 0%, transparent 70%); }
        .verdict-label { font-size: 11px; font-family: 'Courier New', Courier, monospace; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; }
        .verdict-decision { font-family: 'Georgia', 'Times New Roman', serif; font-size: 68px; letter-spacing: 8px; text-transform: uppercase; font-weight: bold; color: var(--nvidia-green); line-height: 1; }
        .verdict-price { font-family: 'Georgia', 'Times New Roman', serif; font-size: 30px; font-weight: bold; color: var(--nvidia-green); margin-top: 8px; }
        .verdict-desc { max-width: 600px; margin: 16px auto 0; font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; }
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 10px; top: 6px; bottom: 6px; width: 1px; background: var(--border-dim); }
        .timeline-item { position: relative; padding: 12px 0; }
        .timeline-item::before { content: ''; position: absolute; left: -26px; top: 18px; width: 9px; height: 9px; border-radius: 50%; background: var(--nvidia-green); border: 2px solid var(--bg-card); }
        .timeline-date { font-family: 'Courier New', Courier, monospace; font-size: 10px; color: var(--nvidia-green); letter-spacing: 1px; margin-bottom: 4px; }
        .timeline-text { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
        .progress-row { margin-bottom: 12px; }
        .progress-label-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .progress-name { font-size: 12px; color: var(--text-secondary); }
        .progress-val { font-family: 'Courier New', Courier, monospace; font-size: 11px; color: var(--text-primary); }
        .progress-track { height: 5px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--nvidia-green-dim), var(--nvidia-green)); }
        .divider { height: 1px; background: var(--border-dim); margin: 20px 0; }
        .menu-toggle { display: none; position: fixed; top: 16px; right: 16px; z-index: 200; background: #1a1a1a; border: 1px solid rgba(118,185,0,0.4); border-radius: 8px; width: 42px; height: 42px; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; color: var(--nvidia-green); box-shadow: 0 4px 16px rgba(0,0,0,0.5); -webkit-tap-highlight-color: transparent; }
        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 99; backdrop-filter: blur(2px); }
        .sidebar-overlay.open { display: block; }
        p { font-size: 13.5px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 12px; }
        p:last-child { margin-bottom: 0; }
        strong { color: var(--text-primary); font-weight: 500; }
        h4 { font-size: 14px; color: var(--text-primary); font-weight: 500; margin: 16px 0 8px; }
        h4:first-child { margin-top: 0; }
        ul.std-list { list-style: none; display: flex; flex-direction: column; gap: 7px; margin: 8px 0; }
        ul.std-list li { font-size: 13px; color: var(--text-secondary); padding-left: 16px; position: relative; line-height: 1.6; }
        ul.std-list li::before { content: '›'; position: absolute; left: 0; color: var(--nvidia-green); font-size: 14px; }
        .note { font-size: 11px; color: var(--text-muted); font-style: italic; }
        @media (max-width: 1200px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .header-kpi-row { grid-template-columns: repeat(3, 1fr); }
          .header { padding: 36px 36px 32px; }
          .content { padding: 0 36px 80px; }
        }
        @media (max-width: 1024px) {
          :root { --sidebar-w: 240px; }
          .header-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) {
          :root { --sidebar-w: 0px; }
          .sidebar { transform: translateX(-260px); --sidebar-w: 260px; box-shadow: 4px 0 24px rgba(0,0,0,0.6); }
          .sidebar.open { transform: translateX(0); }
          .main { margin-left: 0; }
          .menu-toggle { display: flex; }
          .header { padding: 32px 20px 24px; }
          .content { padding: 0 20px 60px; }
          .header h1 { font-size: 40px; }
          .grid-2, .grid-3, .scenario-grid { grid-template-columns: 1fr; }
          .swot-grid { grid-template-columns: 1fr; }
          .header-kpi-row { grid-template-columns: repeat(2, 1fr); }
          .confidence-bars { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .header-kpi-row { grid-template-columns: 1fr 1fr; }
          .grid-4 { grid-template-columns: 1fr 1fr; }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-primary); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>
      <div className="nvidia-analysis-body">
        <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Meny">{isSidebarOpen ? '✕' : '☰'}</button>

        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
          <div className="sidebar-logo">
            <div className="logo-nvidia">NVIDIA</div>
            <div className="logo-sub">Finansiell Analys · FY2026</div>
          </div>
          <div className="sidebar-nav">
            <div className="nav-section-title">Rapport</div>
            {[
              {id: 'overview', name: 'Företagsöversikt'}, 
              {id: 'strategy', name: 'Strategisk Analys'}, 
              {id: 'financials', name: 'Finansiell Analys'}, 
              {id: 'valuation', name: 'Värdering'}, 
              {id: 'growth', name: 'Tillväxt'}, 
              {id: 'risk', name: 'Riskprofil'}, 
              {id: 'esg', name: 'ESG & Makro'}, 
              {id: 'ai-obs', name: 'CFO-analys'}, 
              {id: 'verdict', name: 'Beslut'}, 
              {id: 'scenarios', name: 'Scenarier'}
            ].map((item, index) => (
              <a key={item.id} className="nav-item" href={`#${item.id}`} onClick={(e) => handleNavClick(e, `#${item.id}`)}>
                <span className="nav-num">{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index]}</span>
                {item.name}
              </a>
            ))}
          </div>
          <div className="sidebar-footer">
            Analys: 3 mars 2026<br />
            Data: FY2024–FY2027e<br />
            Källa: CFO Commentaries<br />
            Q1–Q3 FY2026
          </div>
        </nav>

        <main className="main">
          <header className="header">
            <div className="header-chip"><span className="pulse"></span> AKTIV ANALYS · NVDA · NASDAQ</div>
            <h1>NVIDIA CORPORATION</h1>
            <div className="header-subtitle">Fullständig finansiell analys — Räkenskapsår FY2025–FY2026 · Q1–Q3 FY2026</div>
            <div className="header-kpi-row">
              <div className="header-kpi">
                <div className="kpi-label">Börsvärde</div>
                <div className="kpi-value">$4,43T</div>
                <div className="kpi-change neutral">→ Nuvarande</div>
              </div>
              <div className="header-kpi">
                <div className="kpi-label">Omsättning FY25</div>
                <div className="kpi-value">$216B</div>
                <div className="kpi-change up">↑ +66% YoY</div>
              </div>
              <div className="header-kpi">
                <div className="kpi-label">EPS FY25</div>
                <div className="kpi-value">$4,92</div>
                <div className="kpi-change up">↑ +66% YoY</div>
              </div>
              <div className="header-kpi">
                <div className="kpi-label">Nettomarginal</div>
                <div className="kpi-value">55,6%</div>
                <div className="kpi-change neutral">→ Best-in-class</div>
              </div>
              <div className="header-kpi">
                <div className="kpi-label">Q3 FY26 Rev.</div>
                <div className="kpi-value">$57B</div>
                <div className="kpi-change up">↑ +62% YoY</div>
              </div>
            </div>
          </header>

          <div className="content">
            <section className="section" id="overview">
              <div className="section-header">
                <span className="section-num">I</span>
                <h2 className="section-title">Företagsöversikt</h2>
              </div>
              <div className="grid-3" style={{ marginBottom: '20px' }}>
                <div className="metric-tile">
                  <div className="metric-label">Börskurs (approx.)</div>
                  <div className="metric-value" style={{ color: 'var(--nvidia-green)' }}>~$182</div>
                  <div className="metric-trend">Börsvärde $4,43 biljoner USD</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">Ticker / Börs</div>
                  <div className="metric-value">NVDA</div>
                  <div className="metric-trend">NASDAQ · S&P 500 / NDX</div>
                </div>
                <div className="metric-tile">
                  <div className="metric-label">Anställda</div>
                  <div className="metric-value">42 000</div>
                  <div className="metric-trend">↑ +17% från 36 000 (FY24)</div>
                </div>
              </div>
              <div className="card">
                <div className="grid-2">
                  <div>
                    <h4>Affärsidé &amp; Affärsmodell</h4>
                    <p>NVIDIA designar och levererar accelererad beräkning (GPU/AI-chip), systemprogramvara (CUDA/ekosystem) och nätverkslösningar (NVLink, InfiniBand) för datacenters, gaming och autonoma fordon.</p>
                    <p>Intäktsmodellen bygger på tre ben: (1) Hårdvaruförsäljning (GPU-system som HGX, DGX, GB200/GB300 Blackwell), (2) Mjukvara & plattform (CUDA-ekosystem som skapar inlåsning), samt (3) Tjänster & moln (DGX Cloud). Fabless-modellen innebär att tillverkning outsourcas till TSMC, vilket ger hög ROIC med lågt kapitalbehov.</p>
                    <h4>Geografisk spridning</h4>
                    <p>Global verksamhet men kritisk exponering mot Asien för tillverkning (TSMC Taiwan). Kina utgör en hög-risksmarknad efter H20-exportkontrollerna (april 2025). USA och Europa dominerar kundbasen.</p>
                  </div>
                  <div>
                    <h4>Ledning &amp; Ägarstruktur</h4>
                    <p><strong>Jensen Huang — VD & Medgrundare:</strong> Medgrundade NVIDIA 1993. En av techbranschens mest framgångsrika VD:ar med 30+ år av konsekventa strategiska vägval. Hans beslut att dubbla ner på CUDA (2006) och AI-acceleratorer (2012+) är nu bolagets fundament.</p>
                    <p><strong>Colette Kress — CFO:</strong> Erfaren teknisk CFO med gedigen track record inom finansiell kommunikation och kapitalallokering.</p>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Insynsägande</span><span className="progress-val">3,79%</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '3.79%' }}></div></div>
                    </div>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Institutionellt ägande (est.)</span><span className="progress-val">&gt;65%</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '65%' }}></div></div>
                    </div>
                     <p className="note">⚠️ Insynsägande sjönk från 4,01% (FY24) till 3,79% (FY25) — en marginell minskning att bevaka.</p>
                  </div>
                </div>
                 <StarRating rating={5} text="Affärsmodellen är exceptionellt uthållig tack vare CUDA-ekosystemets inlåsningseffekt, fabless-modellens kapitaleffektivitet och Jensens visionära ledarskap. Ledningen är branschens starkaste." />
              </div>
            </section>
            
            <section className="section" id="strategy">
              <div className="section-header">
                  <span className="section-num">II</span>
                  <h2 className="section-title">Strategisk Analys & Moat</h2>
              </div>
              <div className="card" style={{ marginBottom: '20px' }}>
                <div className="grid-2">
                  <div>
                    <h4>Marknadsstorlek & Drivkrafter</h4>
                    <p>AI-infrastrukturinvesteringarna driver en sekulär supercykel. Tre parallella plattformsskiften identifieras i Q3 FY26-rapporten: accelererad beräkning, kraftfulla AI-modeller och agentiska applikationer. Hyperscalers (Microsoft/Azure, Google, Amazon/AWS, Meta) spenderar hundratals miljarder på data center-kapacitet.</p>
                    <ul className="std-list">
                      <li>Total adresserbar marknad för AI-acceleratorer estimeras till $500B+ till 2028</li>
                      <li>Networking-segmentet exploderar: +162% YoY i Q3 FY26 — NVLink-fabric driver systemförsäljning</li>
                      <li>Automotive ökar 72% YoY (Q1 FY26) — självkörande plattformar börjar ta fart</li>
                      <li>Agentic AI kräver inferens-kapacitet: ny och långsiktig efterfrågekälla</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Konkurrensfördelar (Moat)</h4>
                     <ul className="std-list">
                        <li><strong>CUDA-ekosystem:</strong> 20+ år av programvara, bibliotek och verktyg. Miljontals tränade ingenjörer. Omöjligt att replikera på kort sikt.</li>
                        <li><strong>Full-stack-strategi:</strong> Chip + Interconnect (NVLink/InfiniBand) + System (DGX/HGX) + Mjukvara + Moln (DGX Cloud) — konkurrenter levererar delar, NVIDIA levererar hela stacken.</li>
                        <li><strong>Nätverkseffekter:</strong> Fler modeller tränas på CUDA → fler verktyg → fler ingenjörer → fler kunder.</li>
                        <li><strong>Supply-chain fördel:</strong> Exklusiva/prioriterade TSMC-kapacitetsavtal.</li>
                        <li><strong>Arkitekturöverlägsenhet:</strong> Blackwell-plattformen tar marknadsandelar från Hopper — NVIDIA kanibaliserar sig självt kontrollerat.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">SWOT-analys</div>
                <div className="swot-grid">
                  <div className="swot-cell swot-s">
                    <h5 className="swot-title">Styrkor</h5>
                    <ul>
                      <li>CUDA-ekosystem, starkaste moat i tech</li>
                      <li>73,6% bruttomarginal (Non-GAAP Q3)</li>
                      <li>ROE 101%, ROIC 93% — extrem kapitaleffektivitet</li>
                      <li>Data Center dominans: ~90% av omsättningen</li>
                      <li>Blackwell-arkitekturens snabba ramp</li>
                      <li>Rekordfritt kassaflöde varje kvartal</li>
                    </ul>
                  </div>
                  <div className="swot-cell swot-w">
                    <h5 className="swot-title">Svagheter</h5>
                    <ul>
                      <li>Kina-exponering (H20 = strukturell $8B/kv risk)</li>
                      <li>Kundkoncentration: ~50% av DC-rev från CSPs</li>
                      <li>Bruttomarginal under press vid systemövergångar</li>
                      <li>Fabless-modell = sårbarhet mot TSMC-störningar</li>
                      <li>Insynsägande svagt sjunkande</li>
                    </ul>
                  </div>
                  <div className="swot-cell swot-o">
                    <h5 className="swot-title">Möjligheter</h5>
                    <ul>
                      <li>Agentic AI = ny, massiv inferenscykel</li>
                      <li>Automotive/robotics: mångårig tillväxtmotor</li>
                      <li>Sovereign AI: länder bygger egna AI-infrastrukturer</li>
                      <li>DGX Spark (desktop AI) öppnar ny marknad</li>
                      <li>Blackwell Ultra → Rubin-arkitektur pipeline</li>
                      <li>Ethernet for AI: ny nätverksmarknad</li>
                    </ul>
                  </div>
                  <div className="swot-cell swot-t">
                    <h5 className="swot-title">Hot</h5>
                    <ul>
                      <li>US exportkontroller (H20-ban, eskalering risk)</li>
                      <li>AMD MI300X, Intel Gaudi — växande alternativ</li>
                      <li>Custom ASIC (Google TPU, Amazon Trainium)</li>
                      <li>Kina inhemsk konkurrens (Huawei Ascend)</li>
                      <li>TSMC supply-chain sårbarhet (geopolitik Taiwan)</li>
                      <li>Regulatoriska antitrust-risker (EU/USA)</li>
                    </ul>
                  </div>
                </div>
                <StarRating rating={5} text="NVIDIA:s moat är branschens starkaste. CUDA-ekosystemet, full-stack-strategin och nätverkseffekterna skapar en konkurrenswall som är extremt svår att bryta ner. Geopolitiska risker är den primära osäkerhetsfaktorn." />
              </div>
            </section>

            <section className="section" id="financials">
                <div className="section-header">
                    <span className="section-num">III</span>
                    <h2 className="section-title">Finansiell Analys</h2>
                </div>
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card">
                        <div className="card-title">Kvartalsomsättning FY26 ($B)</div>
                        <div className="chart-wrap"><canvas ref={revenueQuarterChartRef}></canvas></div>
                    </div>
                    <div className="card">
                        <div className="card-title">Marginaler — Trend (%)</div>
                        <div className="chart-wrap"><canvas ref={marginChartRef}></canvas></div>
                    </div>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                  <div className="card-title">Resultaträkning — Yoy-analys (MUSD)</div>
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead><tr><th>Nyckeltal</th><th>FY2024</th><th>FY2025</th><th>YoY %</th><th>2026e</th><th>2027e</th><th>Trend</th></tr></thead>
                        <tbody>
                          <tr><td>Omsättning</td><td>130 497</td><td>215 938</td><td className="td-green">+65,5%</td><td>362 878</td><td>470 709</td><td><span className="badge badge-green">Exceptionell</span></td></tr>
                          <tr><td>Bruttoresultat</td><td>97 858</td><td>153 463</td><td className="td-green">+56,8%</td><td>—</td><td>—</td><td><span className="badge badge-green">Stark</span></td></tr>
                          <tr><td>EBIT</td><td>81 453</td><td>130 387</td><td className="td-green">+60,1%</td><td>239 148</td><td>310 884</td><td><span className="badge badge-green">Stark</span></td></tr>
                          <tr><td>Nettoresultat</td><td>72 880</td><td>120 067</td><td className="td-green">+64,7%</td><td>199 926</td><td>257 725</td><td><span className="badge badge-green">Exceptionell</span></td></tr>
                          <tr><td>EPS (utspädd)</td><td>2,96</td><td>4,92</td><td className="td-green">+66,2%</td><td>8,24</td><td>10,88</td><td><span className="badge badge-green">Accelererar</span></td></tr>
                          <tr><td>R&D</td><td>12 914</td><td>18 497</td><td className="td-green">+43,2%</td><td>26 660</td><td>32 561</td><td><span className="badge badge-blue">Ökar (positivt)</span></td></tr>
                        </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card">
                      <div className="card-title">Marginaler — FY24 vs FY25 (%)</div>
                        <table className="data-table">
                            <thead><tr><th>Marginal</th><th>FY2024</th><th>FY2025</th><th>YoY</th></tr></thead>
                            <tbody>
                              <tr><td>Bruttomarginal</td><td>74,99</td><td>71,07</td><td className="td-red">−3,9 pp</td></tr>
                              <tr><td>EBIT-marginal</td><td>62,42</td><td>60,38</td><td className="td-red">−2,0 pp</td></tr>
                              <tr><td>Nettomarginal</td><td>55,85</td><td>55,60</td><td className="td-red">−0,3 pp</td></tr>
                              <tr><td>EBITDA-marginal</td><td>63,85</td><td>61,70</td><td className="td-red">−2,2 pp</td></tr>
                              <tr><td>Marginal f. skatt</td><td>64,39</td><td>65,50</td><td className="td-green">+1,1 pp</td></tr>
                            </tbody>
                        </table>
                        <p className="note" style={{marginTop: '12px'}}>⚠️ Marginalpress FY24→FY25 beror på systemövergången Hopper→Blackwell (komplex full-stack leverans). Q3 FY26 Non-GAAP bruttomarginal = 73,6% — recovery pågår mot guidance 75% (mid-70s).</p>
                    </div>
                    <div className="card">
                      <div className="card-title">Kassaflöde (MUSD)</div>
                      <table className="data-table">
                          <thead><tr><th>Post</th><th>FY2024</th><th>FY2025</th><th>YoY</th></tr></thead>
                          <tbody>
                            <tr><td>Operativt CF</td><td>73 472</td><td>118 667</td><td className="td-green">+61,5%</td></tr>
                            <tr><td>Operativt CF (adj.)</td><td>64 089</td><td>102 718</td><td className="td-green">+60,3%</td></tr>
                            <tr><td>Investeringar CF</td><td>−20 421</td><td>−52 228</td><td className="td-red">−155,8%</td></tr>
                            <tr><td>Capex</td><td>3 236</td><td>19 042</td><td className="td-red">+488%</td></tr>
                            <tr><td>Finansiering CF</td><td>−42 359</td><td>−48 474</td><td className="td-red">−14,4%</td></tr>
                            <tr><td>CF/Sales (%)</td><td>56,30</td><td>54,95</td><td className="td-red">−1,4 pp</td></tr>
                          </tbody>
                      </table>
                      <p className="note" style={{marginTop: '12px'}}>📌 Capex steg +488% FY24→FY25 — primärt multi-year cloud service agreements ($26B i Q3 FY26). Bevaka: om investeringarna ger avkastning i linje med ROIC ~94%.</p>
                    </div>
                </div>
                <div className="grid-2">
                  <div className="card">
                      <div className="card-title">Kassaflöde — Kvartal FY26 ($B)</div>
                      <div className="chart-wrap"><canvas ref={cfChartRef}></canvas></div>
                  </div>
                   <div className="card">
                      <div className="card-title">Balansräkning & Nyckeltal</div>
                       <div className="grid-2" style={{gap: '12px', marginBottom: '12px'}}>
                         <div className="metric-tile" style={{padding: '12px'}}>
                            <div className="metric-label">ROE FY25</div>
                            <div className="metric-value">101%</div>
                            <div className="metric-trend"><span className="arrow-down">från 119% (FY24)</span></div>
                          </div>
                          <div className="metric-tile" style={{padding: '12px'}}>
                            <div className="metric-label">ROIC FY25</div>
                            <div className="metric-value">93,6%</div>
                            <div className="metric-trend"><span className="arrow-down">från 103% (FY24)</span></div>
                          </div>
                         <div className="metric-tile" style={{padding: '12px'}}>
                            <div className="metric-label">Nettoskuld</div>
                            <div className="metric-value">Neg.</div>
                            <div className="metric-trend">Kassa $60,6B (Q3 FY26)</div>
                          </div>
                           <div className="metric-tile" style={{padding: '12px'}}>
                            <div className="metric-label">Fritt Kassaflöde</div>
                            <div className="metric-value">$22B</div>
                            <div className="metric-trend">Q3 FY26 FCF</div>
                          </div>
                       </div>
                        <p className="note">⚠️ ROE/ROIC sjunker trots rekordomsättning — eget kapital växer snabbare än vinsten. Goodwill +301%: troligtvis relaterat till förvärvsaktivitet — kräver bevakning.</p>
                  </div>
                </div>
                <StarRating rating={5} text="NVIDIA:s finansiella profil är enastående: 55%+ nettomarginal, massiv kassageneration, nettokassa och ROE >100%. Den enda noten är marginalpress under arkitekturovergångar och accelererande Capex/investeringar som behöver ge avkastning." />
            </section>

            <section className="section" id="valuation">
                <div className="section-header">
                    <span className="section-num">IV</span>
                    <h2 className="section-title">Värdering & Jämförelse</h2>
                </div>
                 <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card">
                        <div className="card-title">Värderingsmultiplar — Trend</div>
                        <div className="chart-wrap-tall"><canvas ref={multiplesChartRef}></canvas></div>
                    </div>
                    <div className="card">
                        <div className="card-title">EPS-trend & Forward-estimat</div>
                        <div className="chart-wrap-tall"><canvas ref={epsChartRef}></canvas></div>
                    </div>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                  <div className="card-title">Fullständig multipeltabell</div>
                   <table className="data-table">
                      <thead><tr><th>Multipel</th><th>FY2024</th><th>FY2025</th><th>Nuv.</th><th>2026e</th><th>2027e</th><th>Trend</th></tr></thead>
                      <tbody>
                        <tr><td>P/E</td><td>48,53</td><td>38,31</td><td>36,97</td><td>22,11</td><td>16,75</td><td><span className="badge badge-blue">Komprimeras snabbt</span></td></tr>
                        <tr><td>EV/EBIT</td><td>43,00</td><td>34,86</td><td>34,75</td><td>—</td><td>—</td><td><span className="badge badge-blue">Komprimeras</span></td></tr>
                        <tr><td>EV/EBITDA</td><td>42,04</td><td>34,12</td><td>34,00</td><td>—</td><td>—</td><td><span className="badge badge-blue">Komprimeras</span></td></tr>
                        <tr><td>P/S</td><td>27,10</td><td>21,30</td><td>20,71</td><td>—</td><td>—</td><td><span className="badge badge-blue">Komprimeras</span></td></tr>
                        <tr><td>P/B</td><td>44,00</td><td>28,99</td><td>28,19</td><td>—</td><td>—</td><td><span className="badge badge-blue">Komprimeras</span></td></tr>
                        <tr><td>Price/CF</td><td>55,20</td><td>44,79</td><td>43,54</td><td>—</td><td>—</td><td><span className="badge badge-blue">Komprimeras</span></td></tr>
                      </tbody>
                  </table>
                </div>
                <div className="grid-2">
                  <div className="card">
                      <div className="card-title">DCF-resonemang (Indikativt)</div>
                      <p>Med 2026e EPS på $8,24 och ett motiverat P/E på 25–30x (för ett AI-plattformsbolag med 60%+ tillväxt) ger ett indikativt värdeintervall på $206–247 per aktie.</p>
                      <p>Bear case med P/E 18x (motgångsklimat): ~$148/aktie. Bull case med P/E 35x (premium för AI-dominans): ~$288/aktie.</p>
                      <p>2027e EPS $10,88 × P/E 20x = $218. Vid 25x = $272. De nuvarande multiplarna ser premiumprissatta ut på 12-månaders basis, men sjunker snabbt mot attraktiva nivåer om tillväxten håller.</p>
                      <div className="signal-flag">✅ P/E 2026e = 22x för ett bolag med 60%+ EPS-tillväxt innebär ett PEG-tal under 0,4 — strukturellt attraktivt för kvalitetsaktier.</div>
                  </div>
                  <div className="card">
                      <div className="card-title">Relativ Värdering</div>
                      <p>NVIDIA handlas till P/E 37x (NTM) vs. en sektormultipel på ~20x för halvledare — premie motiverad av unik AI-exponering och monopolliknande positioner.</p>
                      <p>Jämförbart med MSFT (~30x), AAPL (~28x) men med 3–5× högre tillväxttakt. Jämfört med AMD (~25x forward P/E) är NVIDIA-premien 30–40% — fullt motiverad av ROIC-differensen och CUDA-moaten.</p>
                      <div className="info-flag">📌 Värderingen är "rättvis för ett fantastiskt bolag" snarare än "billig". Nedsida finns vid multipelkompression om tillväxt bromsar oväntat snabbt.</div>
                  </div>
                </div>
                <StarRating rating={4} text="Värderingen är hög på absoluta tal men motiveras av kvaliteten. Forward 2026e P/E ~22x är attraktivt givet EPS-tillväxten. Inte 'billigt' — men ett rimligt pris för ett exceptionellt bolag." />
            </section>
            
            <section className="section" id="growth">
                <div className="section-header">
                    <span className="section-num">V</span>
                    <h2 className="section-title">Tillväxtmotorer & Triggers</h2>
                </div>
                 <div className="grid-3" style={{ marginBottom: '20px' }}>
                    <div className="metric-tile">
                      <div className="metric-label">Data Center</div>
                      <div className="metric-value" style={{color: 'var(--nvidia-green)'}}>$51,2B</div>
                      <div className="metric-trend">Q3 FY26 · REKORD · +66% YoY</div>
                    </div>
                    <div className="metric-tile">
                      <div className="metric-label">Networking</div>
                      <div className="metric-value" style={{color: 'var(--nvidia-green)'}}>$8,2B</div>
                      <div className="metric-trend">+162% YoY Q3 FY26 · REKORD</div>
                    </div>
                    <div className="metric-tile">
                      <div className="metric-label">Automotive & Pro Viz</div>
                      <div className="metric-value" style={{color: 'var(--nvidia-green)'}}>+72%</div>
                      <div className="metric-trend">Automotive YoY Q1 FY26</div>
                    </div>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-title">Intäkter per Plattform — Kvartalstrend FY26 ($B)</div>
                    <div className="chart-wrap-tall"><canvas ref={segmentChartRef}></canvas></div>
                </div>
                 <div className="grid-2">
                    <div className="card">
                         <div className="card-title">Teknologiska Katalysatorer</div>
                         <div className="timeline">
                          <div className="timeline-item">
                            <div className="timeline-date">Nu — Q1 FY26</div>
                            <div className="timeline-text">Blackwell-arkitektur rampas som "fastest ramp in company history". H20-exportkontroll skapar $4,5B engångskostnad men röjer väg för Blackwell-dominans.</div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-date">Q2–Q3 FY26</div>
                            <div className="timeline-text">Blackwell Ultra lanseras och tar positionen som "leading architecture across all customer categories". NVLink-nätverksomsättning exploderar till $8,2B.</div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-date">Q4 FY26 Outlook</div>
                            <div className="timeline-text">Guidance $65B (+14% QoQ). Gross margin guidat till 74,8%/75,0% — bekräftar återgång mot mid-70s.</div>
                          </div>
                           <div className="timeline-item">
                            <div className="timeline-date">FY27+ Estimat</div>
                            <div className="timeline-text">Rubin-arkitektur i pipeline. Agentic AI-inferens som ny supercykel. Automotive mångdubblas. Sovereign AI accelererar.</div>
                          </div>
                         </div>
                    </div>
                    <div className="card">
                         <div className="card-title">Kapitalallokering — Aktieåterköp</div>
                         <p>Styrelsen godkände ytterligare $60B återköpsmandat (aug 2025, utan löptid). FY26 Q1–Q3: ~$36,3B återköpt. Aggressiv kapitalretur signalerar ledningens tilltro till framtida kassaflöden.</p>
                        <div className="chart-wrap"><canvas ref={buybackChartRef}></canvas></div>
                    </div>
                </div>
            </section>

             <section className="section" id="risk">
                <div className="section-header">
                    <span className="section-num">VI</span>
                    <h2 className="section-title">Riskprofil</h2>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                  <div className="card-title">Kritiska Risker</div>
                   <div className="risk-flag">🚨 <strong>Exportkontroller (HÖG PRIORITET):</strong> US-regeringen krävde licensiering för H20-export till Kina (9 april 2025). Direkt intäktsförlust ~$8B/kv i Q1 FY26. Eskaleringsrisk till andra produkter. Strukturellt ohanterbar utan politisk upplösning.</div>
                  <div className="info-flag">⚠️ <strong>Kundkoncentration (MEDEL):</strong> ~50% av Data Center-intäkter från stora CSPs (Amazon, Google, Microsoft, Meta). Om en hyperscaler pausar investeringar = omedelbar intäktseffekt.</div>
                  <div className="info-flag">⚠️ <strong>TSMC-sårbarhet (MEDEL-HÖG):</strong> 100% fabless → fullständigt beroende av TSMC. Geopolitisk Taiwan-risk, kapacitetsbegränsningar och konkurrens om kapacitet med Apple/AMD.</div>
                  <div className="info-flag">⚠️ <strong>Marginalpress vid arkitekturovergång (MEDEL):</strong> Hopper→Blackwell tryckte ner bruttomarginal med ~4pp. Nästa arkitekturövergång (Rubin) kan upprepa mönstret.</div>
                </div>
                <div className="card">
                  <div className="card-title">Riskscore & Indikatorer</div>
                   <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Geopolitisk/Exportrisk</span><span className="progress-val">9/10 (HÖG)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '90%', background: 'var(--red)' }}></div></div>
                    </div>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Konkurrensrisk (AMD/Custom ASIC)</span><span className="progress-val">5/10 (MEDEL)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '50%', background: 'var(--amber)' }}></div></div>
                    </div>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Supply-chain/TSMC-risk</span><span className="progress-val">6/10 (MEDEL)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '60%', background: 'var(--amber)' }}></div></div>
                    </div>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Regulatorisk/Antitrustrisk</span><span className="progress-val">5/10 (MEDEL)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '50%', background: 'var(--amber)' }}></div></div>
                    </div>
                    <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">Finansiell/Balansräkningsrisk</span><span className="progress-val">2/10 (LÅG)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '20%' }}></div></div>
                    </div>
                     <div className="progress-row">
                      <div className="progress-label-row"><span className="progress-name">AI-efterfrågan cyklisk-risk</span><span className="progress-val">5/10 (MEDEL)</span></div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: '50%', background: 'var(--amber)' }}></div></div>
                    </div>
                  <div className="rating-box" style={{background: 'var(--red-dim)', borderColor: 'var(--red)'}}>
                    <div className="rating-label" style={{color: 'var(--red)'}}>Risk-score: 5,3/10 aggregerat. Finansiell risk låg — geopolitik dominerar riskbilden.</div>
                    <div style={{color: 'var(--red)', fontFamily: `'Georgia', serif`, fontWeight: 'bold', fontSize: '20px'}}>MEDEL–HÖG RISK</div>
                  </div>
                </div>
             </section>

              <section className="section" id="esg">
                <div className="section-header">
                    <span className="section-num">VII</span>
                    <h2 className="section-title">ESG & Makroekonomiska Faktorer</h2>
                </div>
                <div className="grid-2" style={{marginBottom: '20px'}}>
                  <div className="card">
                    <div className="card-title">ESG-faktorer</div>
                    <h4>Miljö (E)</h4>
                    <p>AI-datacenter är energiintensiva — NVIDIA:s kunder (hyperscalers) under press att nå klimatmål. Blackwell-arkitekturen erbjuder bättre prestanda/watt vs. föregångare. Regulatorisk risk: EU AI Act & datacenter-energikrav kan påverka.</p>
                     <h4>Socialt (S)</h4>
                    <p>42 000 anställda (+17% YoY). Aktiebaserad ersättning (SBC) är hög: ~$4,6B/kv. Insynsägande sjunker marginellt.</p>
                     <h4>Styrning (G)</h4>
                    <p>Jensen Huangs starka ägarandel ger alignement. $60B återköpsmandat signalerar aktionärsvänlighet. Transparent rapportering av H20-charges.</p>
                  </div>
                   <div className="card">
                    <div className="card-title">Makroekonomiska Faktorer</div>
                     <h4>Positiva Makrofaktorer</h4>
                     <ul className="std-list">
                      <li>AI-investeringscykel är ränteokänslig.</li>
                      <li>Sovereign AI: stater bygger nationell AI-infrastruktur.</li>
                      <li>USD-styrka gynnar relativt: NVIDIA säljer i USD.</li>
                     </ul>
                      <h4>Negativa Makrofaktorer</h4>
                     <ul className="std-list" style={{'--nvidia-green': 'var(--red)'}}>
                      <li>Ränteuppgång pressar techvärderingar.</li>
                      <li>Geopolitisk eskalering (Taiwan, Kina-handel).</li>
                      <li>OBBBA (US-skattelag) höjer effektiv skattesats.</li>
                      <li>Global recession minskar IT-capex.</li>
                     </ul>
                  </div>
                </div>
                 <div className="card">
                   <div className="card-title">Utdelning & Aktieåterköp</div>
                   <div style={{ overflowX: 'auto' }}>
                      <table className="data-table">
                          <thead><tr><th>Post</th><th>FY2024</th><th>FY2025</th><th>YoY</th><th>2026e Återköp</th></tr></thead>
                          <tbody>
                            <tr><td>Utdelning/aktie</td><td>$0,03</td><td>$0,04</td><td className="td-green">+33%</td><td>-</td></tr>
                            <tr><td>Direktavkastning</td><td>0,02%</td><td>0,02%</td><td className="td-amber">→</td><td>-</td></tr>
                            <tr><td>Utdelningsandel</td><td>1,16%</td><td>0,82%</td><td className="td-green">Sjunkande</td><td>-</td></tr>
                            <tr><td>Aktieåterköp</td><td>33 706</td><td>40 086</td><td className="td-green">+18,9%</td><td>104 133e</td></tr>
                          </tbody>
                      </table>
                    </div>
                    <p className="note" style={{marginTop: '12px'}}>Direktavkastningen är nominell (0,02%) — bolaget prioriterar kapitalretur via återköp. 2026e återköp ~$104B = 2,3% av börsvärdet — kraftfullt aktieägarvärde.</p>
                 </div>
              </section>

             <section className="section" id="ai-obs">
                <div className="section-header">
                    <span className="section-num">VIII</span>
                    <h2 className="section-title">AI-Observationer & CFO-ordsanalys 🔍</h2>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-title">Kvantitativa avvikelser & Varningssignaler</div>
                    <div className="grid-2">
                      <div>
                        <div className="signal-flag">✅ <strong>Positiv anomali: Networking-explosion.</strong> Networking +162% YoY (Q3 FY26). NVLink-fabric driver systembundna affärer — tecken på att NVIDIA låser in kunder i hela infrastrukturen.</div>
                        <div className="signal-flag">✅ <strong>Positiv: FCF-kassaflöde Q3 = $22B.</strong> Trots massiva investeringsutgifter genererar NVIDIA $22B FCF per kvartal.</div>
                        <div className="signal-flag">✅ <strong>Positiv: Bruttomarginal-recovery pågår.</strong> Non-GAAP GM: Q1=71,3% → Q2=72,7% → Q3=73,6% → Q4 guidat 75,0%.</div>
                      </div>
                      <div>
                        <div className="risk-flag">🔴 <strong>Varning: ROE/ROIC sjunker trots rekordvinster.</strong> ROE 119%→101%, ROIC 103%→94%. Eget kapital växer snabbare (+98%) än nettoresultat (+65%).</div>
                        <div className="risk-flag">🔴 <strong>Varning: Goodwill +301% YoY.</strong> Goodwill $5,2B→$20,8B. Indikerar förvärvsaktivitet. Bevaka nedskrivningsrisk.</div>
                        <div className="info-flag">📌 <strong>Bevaka: Capex +488% FY24→FY25.</strong> $3,2B→$19B. Multi-year cloud service agreements. Avkastningen mäts i framtida licensintäkter.</div>
                      </div>
                    </div>
                </div>
                <div className="card">
                  <div className="card-title">CFO-ordsanalys — Kolette Kress (Q1–Q3 FY2026)</div>
                    <div className="quarter-tab-row">
                        <button className={`quarter-tab ${activeQuarter === 'q1' ? 'active' : ''}`} onClick={() => showQuarterTab('q1')}>Q1 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'q2' ? 'active' : ''}`} onClick={() => showQuarterTab('q2')}>Q2 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'q3' ? 'active' : ''}`} onClick={() => showQuarterTab('q3')}>Q3 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'compare' ? 'active' : ''}`} onClick={() => showQuarterTab('compare')}>Jämförelse</button>
                    </div>
                    <div id="panel-q1" className={`quarter-panel ${activeQuarter === 'q1' ? 'active' : ''}`}>
                      <p>Tonen är defensivt optimistisk. H20-chocken ($4,5B) hanteras transparent. Parallellt lyfts Blackwell-rampens rekordtakt fram. Risken ramas in som engångshändelse.</p>
                      <p>🔴 Riskspråket eskalerar kraftigt. Hela Non-GAAP-redovisningen omskrivs. "U.S. government informing NVIDIA on April 9, 2025..." — formellt och exakt.</p>
                    </div>
                    <div id="panel-q2" className={`quarter-panel ${activeQuarter === 'q2' ? 'active' : ''}`}>
                      <p>Fokus skiftar från H20-skadan till Blackwell-dominans. "Leading architecture" blir ett nyckeluttryck. Konfidensen ökar markant.</p>
                    </div>
                    <div id="panel-q3" className={`quarter-panel ${activeQuarter === 'q3' ? 'active' : ''}`}>
                      <p>Extremt självsäker ton. Networking-explosionen på +162% YoY blir huvudnumret. H20-risken beskrivs nu som "insignificant". Framåtblickande och expansivt språk.</p>
                    </div>
                    <div id="panel-compare" className={`quarter-panel ${activeQuarter === 'compare' ? 'active' : ''}`}>
                        <div className="chart-wrap-tall"><canvas ref={toneTrendChartRef}></canvas></div>
                        <p className="note" style={{marginTop: '12px'}}>⚠️ Notering: Analysen baseras på CFO Commentaries, inte Jensens VD-ord. Jensens visionära retorik syns bäst i press releases/earnings calls.</p>
                    </div>
                </div>
            </section>
            
             <section className="section" id="verdict">
                 <div className="section-header">
                    <span className="section-num">IX</span>
                    <h2 className="section-title">Sammanfattning & Investeringsbeslut</h2>
                </div>
                <div className="card" style={{marginBottom: '20px'}}>
                  <div className="card-title">Kriteriecheck — Kvalitetsbolag</div>
                  <ul className="std-list">
                    <li>Uthållig affärsmodell: ✅ Ja</li>
                    <li>Starka konkurrensfördelar (Moat): ✅ Exceptionell (CUDA)</li>
                    <li>Konsistent lönsamhetsutveckling: ✅ 55%+ nettomarginal</li>
                    <li>Stark balansräkning: ✅ Nettokassa $60,6B</li>
                    <li>Tillväxt 5–10 år framåt: ✅ AI-supercykel</li>
                    <li>Förtroendeingivande ledning: ✅ Jensen Huang</li>
                    <li>Rimlig värdering: ⚠️ Premiumprissatt (motiverat)</li>
                    <li>Hanterbara risker: ⚠️ Exportkontroller = strukturell risk</li>
                    <li>Ägbarhet 5–10 år: ✅ Starkt Ja</li>
                  </ul>
                </div>
                 <div className="verdict-box" style={{marginBottom: '20px'}}>
                  <div className="verdict-label">Investeringsbeslut</div>
                  <div className="verdict-decision">KÖP</div>
                  <div className="verdict-price">Målpris: $230–250 (12 mån)</div>
                  <p className="verdict-desc">NVIDIA är ett av de starkaste kvalitetsbolagen i börskurshistorien. AI-supercykeln, CUDA-ekosystemets moat och Blackwell-arkitekturens dominans skapar en ovanlig kombination av hög tillväxt och extrem lönsamhet. Primär risk: geopolitiska exportkontroller — men dessa är nu delvis prissatta. Lämplig för ett 5–10-års investeringshorisont.</p>
                </div>
                <div className="card">
                    <div className="card-title">Sammanvägd Motivering</div>
                    <p>NVIDIA uppfyller alla kriterier för ett exceptionellt kvalitetsbolag. Affärsmodellen är uthållig tack vare CUDA-ekosystemets inlåsningseffekt. Blackwell-arkitekturens snabba ramp, bekräftad i Q1–Q3 FY26, demonstrerar att bolaget behåller tekniköverlägsenhet.</p>
                    <p>Det enda reella bekymret är geopolitiska exportkontroller. H20-incidenten visar att politiska beslut kan stänga av en hel produktlinje med 24-timmars varsel. Denna risk är strukturellt svår att hedga.</p>
                    <p>Värderingen är premium men motiveras av PEG-talets attraktivitet: P/E 2026e ~22x / EPS-tillväxt ~67% = PEG ~0,33. För ett bolag med denna kvalitetsprofil är det ett rimligt pris. Ej billigt — men ett rimligt pris för det bästa.</p>
                </div>
             </section>

            <section className="section" id="scenarios">
                <div className="section-header">
                    <span className="section-num">X</span>
                    <h2 className="section-title">Scenarier: Bull · Base · Bear 📈📉</h2>
                </div>
                <div className="scenario-grid" style={{marginBottom: '20px'}}>
                  <div className="scenario-card scenario-bear">
                    <div className="scenario-icon">🐻</div>
                    <h4 className="scenario-title">Bear Case</h4>
                     <div className="scenario-price">$120</div>
                    <p className="scenario-desc"><strong>(-34%)</strong> Eskalerade exportkontroller, CSP-investeringspaus, AMD/Custom ASIC tar 10%+ marknadsandel, TSMC-störning. EPS 2026e: $6–7, P/E 18-20x.</p>
                  </div>
                   <div className="scenario-card scenario-base">
                    <div className="scenario-icon">📊</div>
                    <h4 className="scenario-title">Base Case</h4>
                     <div className="scenario-price">$230</div>
                    <p className="scenario-desc"><strong>(+26%)</strong> Stabil Blackwell-ramp per guidance, Q4 $65B-målsättning nås, GM ~75%, inga nya exportkontroll-eskaleringar. EPS 2026e: $8,24, P/E 24-26x.</p>
                  </div>
                   <div className="scenario-card scenario-bull">
                    <div className="scenario-icon">🚀</div>
                    <h4 className="scenario-title">Bull Case</h4>
                     <div className="scenario-price">$320</div>
                    <p className="scenario-desc"><strong>(+76%)</strong> Agentic AI-inferenscykel exploderar, sovereign AI-investeringar accelererar, exportkontroller lättas, Rubin-arkitekturen tar över sömlöst. EPS 2027e: $12-14, P/E 28-30x.</p>
                  </div>
                </div>
                 <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-title">Scenarioprisintervall</div>
                    <div className="chart-wrap"><canvas ref={scenarioChartRef}></canvas></div>
                </div>
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card">
                      <div className="card-title">Signaler att bevaka</div>
                      <div className="risk-flag">🔴 Om bruttomarginal (Non-GAAP) stannar under 73% i Q4 FY26.</div>
                      <div className="risk-flag">🔴 Om Blackwell/GB200 inkluderas i US-exportrestriktioner.</div>
                      <div className="signal-flag">✅ Om Q4-intäkter slår $65B-guidance och GM når 75%+.</div>
                      <div className="signal-flag">✅ Konkreta namngivna kunder för inferens-workloads.</div>
                    </div>
                     <div className="card">
                      <div className="card-title">Sammanfattande Scorecard</div>
                      <table className="data-table">
                        <tbody>
                            <tr><td>Affärsmodellskvalitet</td><td><StarRating rating={5} text="" /></td></tr>
                            <tr><td>Konkurrensfördelar (Moat)</td><td><StarRating rating={5} text="" /></td></tr>
                            <tr><td>Finansiell styrka</td><td><StarRating rating={5} text="" /></td></tr>
                            <tr><td>Värdering</td><td><StarRating rating={4} text="" /></td></tr>
                            <tr><td>Riskprofil (inverterat)</td><td><StarRating rating={3} text="" /></td></tr>
                            <tr><td>CFO-kommunikationston</td><td><StarRating rating={5} text="" /></td></tr>
                            <tr><td>Tillväxtutsikter</td><td><StarRating rating={5} text="" /></td></tr>
                        </tbody>
                        <tfoot>
                          <tr style={{fontWeight: 'bold', color: 'var(--text-primary)'}}><td>TOTALT</td><td>32/35 = 4.6/5 🏆</td></tr>
                        </tfoot>
                      </table>
                    </div>
                </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}