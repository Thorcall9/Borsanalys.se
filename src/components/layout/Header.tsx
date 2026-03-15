"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
// Vi hämtar din lista med analyser här
import { analyses } from "@/lib/analyses";

const navItems = [
  { href: "/", label: "Hem" },
  { href: "/analyser", label: "Analyser" },
  {
    label: "Verktyg",
    children: [
      { href: "/verktyg/rantakalkylator", label: "Ränta-på-ränta kalkylator" },
      { href: "/verktyg/malsparandekalkylator", label: "Målsparandekalkylator" },
    ],
  },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  // Vi hämtar den allra senaste analysen (den som ligger överst i analyses.ts)
  const latestAnalysis = analyses[0];

  // Hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolsMenuRef]);


  return (
    <>
      {/* Announcement bar - NU HELT AUTOMATISK */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white text-center text-sm py-2 px-4 transition-all">
        <Link href={`/analyser/${latestAnalysis.slug}`} className="hover:underline">
          Ny analys ute nu: <span className="font-semibold">{latestAnalysis.title}</span>
        </Link>
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold font-serif text-primary">
                Börsanalys
              </span>
              <span className="text-xs text-muted">.se</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative" ref={toolsMenuRef}>
                    <button
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-card transition-colors"
                      onClick={() => setToolsOpen(!toolsOpen)}
                    >
                      {item.label}
                      <svg
                        className="inline-block ml-1 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`absolute left-0 top-full mt-1 w-56 bg-card border border-border rounded-lg shadow-lg transition-all ${toolsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-card-hover first:rounded-t-lg last:rounded-b-lg transition-colors"
                          onClick={() => setToolsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-card transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Meny"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      className="w-full text-left px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-card"
                      onClick={() => setToolsOpen(!toolsOpen)}
                    >
                      {item.label}
                    </button>
                    {toolsOpen &&
                      item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block pl-6 pr-3 py-2 text-sm text-foreground/70 hover:text-foreground"
                          onClick={() => {
                            setMobileOpen(false);
                            setToolsOpen(false);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-card"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
