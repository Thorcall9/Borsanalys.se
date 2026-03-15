'use client';

import { useState } from 'react';
import { createMetadata } from "@/lib/seo";

// Metadata remains a server-side concept, but we keep it for context.
// In a real App Router scenario, this page would be a client component imported by a server component layout.
// For simplicity, we'll manage it all here.

export default function Kontakt() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Något gick fel. Försök igen.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      const error = err as Error;
      setStatus('error');
      setError(error.message);
    }
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Kontakta oss</h1>
        <p className="text-muted mb-8">
          Har du frågor, förslag eller feedback? Hör gärna av dig via formuläret nedan.
        </p>

        {status === 'success' && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            Tack för ditt meddelande! Vi återkommer så snart vi kan.
          </div>
        )}

        {status === 'error' && (
            <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm">
                <strong>Fel:</strong> {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Namn
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={200}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              E-post
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              disabled={status === 'submitting'}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              Meddelande
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
              disabled={status === 'submitting'}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors disabled:bg-muted disabled:cursor-not-allowed flex items-center justify-center"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Skickar...' : 'Skicka meddelande'}
          </button>
        </form>
      </div>
    </section>
  );
}
