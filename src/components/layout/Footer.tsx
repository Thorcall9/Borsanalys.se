import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-section-alt border-t border-border">
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-[#4a85d6] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h3 className="text-xl font-serif mb-2">
            Håll dig uppdaterad
          </h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
            Prenumerera för att få nyhetsbrev och de senaste analyserna direkt i din mejl.
          </p>
          <form className="flex gap-2 max-w-md mx-auto" action="/api/newsletter" method="POST" suppressHydrationWarning>
            <label htmlFor="newsletter-email" className="sr-only">E-postadress</label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              required
              maxLength={254}
              placeholder="Din e-postadress"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white/15 border border-white/25 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-medium transition-colors shadow-md"
            >
              Prenumerera
            </button>
          </form>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h4 className="font-serif text-lg mb-3 text-foreground">Börsanalys.se</h4>
            <p className="text-muted text-sm leading-relaxed">
              AI-driven aktieanalys för smartare investeringar.
              Detaljerade analyser, värderingsmodeller och finansiella verktyg.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-3 text-foreground/80">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/analyser" className="text-muted hover:text-primary transition-colors">Analyser</Link></li>
              <li><Link href="/verktyg/rantakalkylator" className="text-muted hover:text-primary transition-colors">Ränta-på-ränta kalkylator</Link></li>
              <li><Link href="/verktyg/malsparandekalkylator" className="text-muted hover:text-primary transition-colors">Målsparandekalkylator</Link></li>
              <li><Link href="/om-oss" className="text-muted hover:text-primary transition-colors">Om oss</Link></li>
              <li><Link href="/kontakt" className="text-muted hover:text-primary transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-3 text-foreground/80">Följ oss</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
            <div className="space-y-1 text-sm">
              <Link href="/anvandarvillkor" className="block text-muted hover:text-primary transition-colors">Användarvillkor</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-muted text-xs" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Börsanalys.se. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
