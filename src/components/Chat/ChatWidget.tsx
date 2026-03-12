"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ role: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChatLog((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChatLog((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch (err) {
      setChatLog((prev) => [...prev, { role: "ai", text: "Oj, något gick fel. Försök igen snart!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chatt-bubbla knapp */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary-light text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Själva fönstret */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          <div className="bg-primary p-4 text-white font-serif">
            <h3 className="font-bold">Börsanalys AI</h3>
            <p className="text-xs opacity-80">Ställ frågor om aktier & analyser</p>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
            {chatLog.length === 0 && (
              <p className="text-sm text-muted text-center mt-10 italic">
                Hej! Jag är din AI-analytiker. Vad vill du veta mer om idag?
              </p>
            )}
            {chatLog.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === "user" ? "bg-primary text-white" : "bg-section-alt border border-border text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-muted animate-pulse">Tänker...</div>}
          </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Skriv din fråga..."
              className="flex-1 p-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="bg-primary hover:bg-primary-light disabled:opacity-40 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
