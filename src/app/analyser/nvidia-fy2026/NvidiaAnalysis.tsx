"use client";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { Chart as ChartJS } from 'chart.js';

export default function NvidiaAnalysis() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeQuarter, setActiveQuarter] = useState('q1');

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
    Chart.defaults.font.family = "'Courier New', monospace";
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
          font-family: -apple-system, BlinkMacSystemFont, ‘Segoe UI’, Helvetica, Arial, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          display: flex;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .sidebar { width: var(--sidebar-w); background: #111111; border-right: 1px solid rgba(118,185,0,0.25); position: fixed; top: 0; left: 0; height: 100vh; overflow-y: auto; z-index: 100; display: flex; flex-direction: column; transition: transform 0.3s ease; }
        .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid var(--border-dim); }
        .logo-nvidia { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 20px; letter-spacing: 5px; text-transform: uppercase; font-weight: bold; color: var(--nvidia-green); line-height: 1; }
        .logo-sub { font-size: 10px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; font-family: ‘Courier New’, Courier, monospace; }
        .sidebar-nav { padding: 16px 0; flex: 1; }
        .nav-section-title { font-size: 9px; font-family: ‘Courier New’, Courier, monospace; letter-spacing: 2px; color: var(--text-muted); text-transform: uppercase; padding: 12px 24px 6px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 24px; color: #9a9a9a !important; text-decoration: none !important; font-size: 13px; font-weight: 400; transition: all 0.2s; border-left: 2px solid transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
        .nav-item:visited { color: #9a9a9a !important; text-decoration: none !important; }
        .nav-item:hover, .nav-item.active { color: #f0f0f0 !important; background: var(--nvidia-green-glow); border-left-color: var(--nvidia-green); text-decoration: none !important; }
        .nav-item .nav-num { font-family: ‘Courier New’, Courier, monospace; font-size: 10px; color: var(--nvidia-green); min-width: 18px; }
        .sidebar-footer { padding: 16px 24px; border-top: 1px solid var(--border-dim); font-size: 10px; color: var(--text-muted); font-family: ‘Courier New’, Courier, monospace; line-height: 1.8; }
        .main { margin-left: var(--sidebar-w); flex: 1; min-width: 0; }
        .header { background: #1c2b00; border-bottom: 2px solid rgba(118,185,0,0.5); padding: 48px 48px 40px; position: relative; overflow: hidden; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(160deg, rgba(118,185,0,0.14) 0%, rgba(0,0,0,0) 70%); pointer-events: none; }
        .header-chip { display: inline-flex; align-items: center; gap: 8px; background: rgba(118,185,0,0.2); border: 1px solid rgba(118,185,0,0.5); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-family: ‘Courier New’, Courier, monospace; color: var(--nvidia-green); margin-bottom: 16px; letter-spacing: 1px; }
        .pulse { width: 7px; height: 7px; background: var(--nvidia-green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.7); } }
        .header h1 { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 54px; letter-spacing: 6px; text-transform: uppercase; font-weight: bold; line-height: 1; margin-bottom: 8px; color: #ffffff; }
        .header-subtitle { font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 300; margin-bottom: 32px; letter-spacing: 0.3px; }
        .header-kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 8px; }
        .header-kpi { background: rgba(118,185,0,0.12); border: 1px solid rgba(118,185,0,0.4); border-radius: 10px; padding: 16px; }
        .kpi-label { font-size: 10px; font-family: ‘Courier New’, Courier, monospace; color: rgba(118,185,0,0.8); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
        .kpi-change { font-size: 11px; font-family: ‘Courier New’, Courier, monospace; margin-top: 4px; }
        .kpi-change.up { color: var(--nvidia-green); }
        .kpi-change.down { color: var(--red); }
        .kpi-change.neutral { color: var(--text-muted); }
        .content { padding: 0 48px 80px; }
        .section { padding-top: 56px; }
        .section-header { display: flex; align-items: flex-end; gap: 16px; margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid var(--border-dim); }
        .section-num { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 42px; color: var(--nvidia-green); opacity: 0.5; line-height: 1; font-weight: bold; }
        .section-title { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 26px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; color: var(--text-primary); }
        .card { background: var(--bg-card); border: 1px solid var(--border-dim); border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
        .card:hover { border-color: var(--border); }
        .card-title { font-size: 11px; font-family: ‘Courier New’, Courier, monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--nvidia-green); margin-bottom: 16px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .data-table th { text-align: right; padding: 8px 12px; font-family: ‘Courier New’, Courier, monospace; font-size: 10px; letter-spacing: 1px; color: var(--text-muted); border-bottom: 1px solid var(--border-dim); font-weight: 400; }
        .data-table th:first-child { text-align: left; }
        .data-table td { text-align: right; padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,0.03); font-family: ‘Courier New’, Courier, monospace; font-size: 12px; color: var(--text-secondary); }
        .data-table td:first-child { text-align: left; color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, ‘Segoe UI’, Helvetica, Arial, sans-serif; font-size: 13px; }
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
        .rating-box { background: var(--nvidia-green-glow); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; gap: 16px; margin-top: 16px; }
        .rating-label { font-size: 12px; color: var(--text-secondary); flex: 1; font-style: italic; }
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; font-family: ‘Courier New’, Courier, monospace; }
        .badge-green { background: var(--green-dim); color: var(--nvidia-green); border: 1px solid rgba(118,185,0,0.3); }
        .badge-red { background: var(--red-dim); color: var(--red); border: 1px solid rgba(232,64,64,0.3); }
        .badge-amber { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
        .badge-blue { background: rgba(96,165,250,0.1); color: #60a5fa; border: 1px solid rgba(96,165,250,0.3); }
        .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-dim); }
        .swot-cell { padding: 20px; border: 1px solid var(--border-dim); }
        .swot-title { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; }
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
        .scenario-title { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 20px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
        .scenario-bull .scenario-title { color: var(--nvidia-green); }
        .scenario-base .scenario-title { color: #60a5fa; }
        .scenario-bear .scenario-title { color: var(--red); }
        .scenario-price { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 32px; font-weight: bold; margin: 12px 0; line-height: 1; }
        .scenario-bull .scenario-price { color: var(--nvidia-green); }
        .scenario-base .scenario-price { color: #60a5fa; }
        .scenario-bear .scenario-price { color: var(--red); }
        .scenario-desc { font-size: 12.5px; color: var(--text-secondary); line-height: 1.7; }
        .quarter-tab-row { display: flex; gap: 8px; margin-bottom: 20px; }
        .quarter-tab { padding: 8px 18px; border-radius: 8px; font-size: 12px; font-family: ‘Courier New’, Courier, monospace; cursor: pointer; border: 1px solid var(--border-dim); background: transparent; color: var(--text-secondary); transition: all 0.2s; }
        .quarter-tab.active { background: var(--nvidia-green-glow); border-color: var(--nvidia-green); color: var(--nvidia-green); }
        .quarter-panel { display: none; }
        .quarter-panel.active { display: block; }
        .tone-meter { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .tone-bar { flex: 1; height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
        .tone-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--red), var(--amber), var(--nvidia-green)); transition: width 0.5s ease; }
        .confidence-bars { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px; }
        .conf-item { background: var(--bg-elevated); border-radius: 8px; padding: 12px; text-align: center; }
        .conf-count { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 32px; font-weight: bold; line-height: 1; }
        .conf-high .conf-count { color: var(--nvidia-green); }
        .conf-mid .conf-count { color: var(--amber); }
        .conf-low .conf-count { color: var(--red); }
        .conf-label { font-size: 10px; font-family: ‘Courier New’, Courier, monospace; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .risk-flag { background: var(--red-dim); border: 1px solid rgba(232,64,64,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--red); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .signal-flag { background: var(--green-dim); border: 1px solid rgba(118,185,0,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--nvidia-green); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .info-flag { background: var(--amber-dim); border: 1px solid rgba(245,166,35,0.3); border-radius: 8px; padding: 12px 16px; font-size: 12.5px; color: var(--amber); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
        .metric-tile { background: var(--bg-card); border: 1px solid var(--border-dim); border-radius: 10px; padding: 18px; }
        .metric-value { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 30px; font-weight: bold; line-height: 1; margin: 6px 0 4px; }
        .metric-label { font-size: 10px; font-family: ‘Courier New’, Courier, monospace; color: var(--text-muted); letter-spacing: 1.5px; text-transform: uppercase; }
        .metric-trend { font-size: 11px; font-family: ‘Courier New’, Courier, monospace; color: var(--text-muted); }
        .chart-wrap { position: relative; height: 260px; }
        .chart-wrap-tall { position: relative; height: 320px; }
        .verdict-box { background: linear-gradient(135deg, rgba(118,185,0,0.08) 0%, rgba(118,185,0,0.04) 100%); border: 1px solid var(--border); border-radius: 14px; padding: 32px; text-align: center; position: relative; overflow: hidden; }
        .verdict-box::before { content: ''; position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: radial-gradient(circle, rgba(118,185,0,0.1) 0%, transparent 70%); }
        .verdict-label { font-size: 11px; font-family: ‘Courier New’, Courier, monospace; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; }
        .verdict-decision { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 68px; letter-spacing: 8px; text-transform: uppercase; font-weight: bold; color: var(--nvidia-green); line-height: 1; }
        .verdict-price { font-family: ‘Georgia’, ‘Times New Roman’, serif; font-size: 30px; font-weight: bold; color: var(--nvidia-green); margin-top: 8px; }
        .verdict-desc { max-width: 600px; margin: 16px auto 0; font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; }
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 10px; top: 6px; bottom: 6px; width: 1px; background: var(--border-dim); }
        .timeline-item { position: relative; padding: 12px 0; }
        .timeline-item::before { content: ''; position: absolute; left: -26px; top: 18px; width: 9px; height: 9px; border-radius: 50%; background: var(--nvidia-green); border: 2px solid var(--bg-card); }
        .timeline-date { font-family: ‘Courier New’, Courier, monospace; font-size: 10px; color: var(--nvidia-green); letter-spacing: 1px; margin-bottom: 4px; }
        .timeline-text { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
        .progress-row { margin-bottom: 12px; }
        .progress-label-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .progress-name { font-size: 12px; color: var(--text-secondary); }
        .progress-val { font-family: ‘Courier New’, Courier, monospace; font-size: 11px; color: var(--text-primary); }
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
            {['overview', 'strategy', 'financials', 'valuation', 'growth', 'risk', 'esg', 'ai-obs', 'verdict', 'scenarios'].map((id, index) => (
              <a key={id} className="nav-item" href={`#${id}`} onClick={(e) => handleNavClick(e, `#${id}`)}>
                <span className="nav-num">{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index]}</span>
                {id.replace('-', ' ')}
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

        <div className="main">
          <div className="header">
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
          </div>

          <div className="content">
            <div className="section" id="overview">
              <div className="section-header">
                <span className="section-num">I</span>
                <span className="section-title">Företagsöversikt</span>
              </div>
              {/* ... Content from HTML body ... */}
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
              {/* ... more content ... */}
            </div>
            
            <div className="section" id="strategy">
                {/* Section II content */}
            </div>

            <div className="section" id="financials">
                <div className="section-header">
                    <span className="section-num">III</span>
                    <span className="section-title">Finansiell Analys</span>
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
                    <div className="card-title">Kassaflöde — Kvartal FY26 ($B)</div>
                    <div className="chart-wrap"><canvas ref={cfChartRef}></canvas></div>
                </div>
            </div>

            <div className="section" id="valuation">
                <div className="section-header">
                    <span className="section-num">IV</span>
                    <span className="section-title">Värdering & Jämförelse</span>
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
            </div>

            <div className="section" id="growth">
                <div className="section-header">
                    <span className="section-num">V</span>
                    <span className="section-title">Tillväxtmotorer & Triggers</span>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-title">Intäkter per Plattform — Kvartalstrend FY26 ($B)</div>
                    <div className="chart-wrap-tall"><canvas ref={segmentChartRef}></canvas></div>
                </div>
                 <div className="grid-2" style={{ marginBottom: '20px' }}>
                    <div className="card">
                         <div className="card-title">Kapitalallokering — Aktieåterköp</div>
                        <div className="chart-wrap"><canvas ref={buybackChartRef}></canvas></div>
                    </div>
                </div>
            </div>
             <div className="section" id="ai-obs">
                <div className="section-header">
                    <span className="section-num">VIII</span>
                    <span className="section-title">AI-Observationer & CFO-ordsanalys 🔍</span>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="quarter-tab-row">
                        <button className={`quarter-tab ${activeQuarter === 'q1' ? 'active' : ''}`} onClick={() => showQuarterTab('q1')}>Q1 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'q2' ? 'active' : ''}`} onClick={() => showQuarterTab('q2')}>Q2 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'q3' ? 'active' : ''}`} onClick={() => showQuarterTab('q3')}>Q3 FY26</button>
                        <button className={`quarter-tab ${activeQuarter === 'compare' ? 'active' : ''}`} onClick={() => showQuarterTab('compare')}>Jämförelse</button>
                    </div>

                    <div id="panel-q1" className={`quarter-panel ${activeQuarter === 'q1' ? 'active' : ''}`}>
                        {/* Q1 content */}
                    </div>
                    <div id="panel-q2" className={`quarter-panel ${activeQuarter === 'q2' ? 'active' : ''}`}>
                        {/* Q2 content */}
                    </div>
                    <div id="panel-q3" className={`quarter-panel ${activeQuarter === 'q3' ? 'active' : ''}`}>
                        {/* Q3 content */}
                    </div>
                    <div id="panel-compare" className={`quarter-panel ${activeQuarter === 'compare' ? 'active' : ''}`}>
                        <div className="chart-wrap" style={{ marginBottom: '20px' }}><canvas ref={toneTrendChartRef}></canvas></div>
                    </div>
                </div>
            </div>
            
            <div className="section" id="scenarios">
                <div className="section-header">
                    <span className="section-num">X</span>
                    <span className="section-title">Scenarier: Bull · Base · Bear 📈📉</span>
                </div>
                <div className="card" style={{ marginBottom: '20px' }}>
                    <div className="card-title">Scenarioprisintervall</div>
                    <div className="chart-wrap"><canvas ref={scenarioChartRef}></canvas></div>
                </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}
