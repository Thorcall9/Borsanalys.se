"use client";

import { useState, useEffect } from "react";

export interface AnalysisSection {
  id: string;
  number: string;
  title: string;
}

interface AnalysisLayoutProps {
  companyName: string;
  subtitle: string;
  date: string;
  dataSources: string;
  sections: AnalysisSection[];
  children: React.ReactNode;
  accentColor?: string;
  theme?: "dark" | "light";
}

export default function AnalysisLayout({
  companyName,
  subtitle,
  date,
  dataSources,
  sections,
  children,
  accentColor = "#1a3c6e",
  theme = "light",
}: AnalysisLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const sectionEls = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-section") || "");
          }
        });
      },
      { threshold: 0.2, rootMargin: "-80px 0px -60% 0px" }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#0f0f0f] text-[#f0f0f0]" : "bg-[#faf8f3] text-[#0f0f0f]";
  const sidebarBg = isDark ? "bg-[#111111]" : "bg-white";
  const sidebarBorder = isDark ? "border-r border-white/10" : "border-r border-border";

  return (
    <div className={`${bgClass} flex min-h-screen relative`}>
      {/* Mobile toggle */}
      <button
        className="fixed top-20 right-4 z-[200] md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow-lg border"
        style={{ backgroundColor: accentColor, color: "white", borderColor: accentColor }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Meny"
      >
        {sidebarOpen ? "\u2715" : "\u2630"}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[99] md:hidden backdrop-blur-sm"
          role="button"
          tabIndex={0}
          aria-label="Stäng meny"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " " || e.key === "Escape") setSidebarOpen(false); }}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-[260px] ${sidebarBg} ${sidebarBorder} z-[100] flex flex-col overflow-y-auto transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 pb-4 border-b border-inherit">
          <div className="font-serif text-xl font-bold uppercase tracking-[5px]" style={{ color: accentColor }}>
            {companyName}
          </div>
          <div className="text-[10px] text-muted font-mono tracking-wider mt-1 uppercase">{subtitle}</div>
        </div>
        <div className="flex-1 py-4">
          <div className="text-[9px] font-mono tracking-wider text-muted uppercase px-6 pb-1.5 pt-3">Rapport</div>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-6 py-2 text-sm transition-all border-l-2 ${
                activeSection === section.id
                  ? "border-l-current font-medium"
                  : "border-l-transparent text-muted hover:text-foreground"
              }`}
              style={activeSection === section.id ? { color: accentColor, backgroundColor: `${accentColor}10` } : {}}
            >
              <span className="font-mono text-[10px] min-w-[18px]" style={{ color: accentColor }}>
                {section.number}
              </span>
              {section.title}
            </a>
          ))}
        </div>
        <div className="p-6 pt-4 border-t border-inherit text-[10px] font-mono text-muted leading-relaxed">
          Analys: {date}<br />
          {dataSources}
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 md:ml-[260px] min-w-0">
        {children}
      </div>
    </div>
  );
}
