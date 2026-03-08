import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Kontakt",
  description: "Kontakta oss på Börsanalys.se — vi svarar gärna på dina frågor.",
  path: "/kontakt",
});

export default async function Kontakt({
  searchParams,
}: {
  searchParams: Promise<{ skickat?: string }>;
}) {
  const { skickat } = await searchParams;
  const submitted = skickat === "true";

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Kontakta oss</h1>
        <p className="text-muted mb-8">
          Har du frågor, förslag eller feedback? Hör gärna av dig via formuläret nedan.
        </p>

        {submitted && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            Tack för ditt meddelande! Vi återkommer så snart vi kan.
          </div>
        )}

        <form action="/api/contact" method="POST" className="space-y-5">
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
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
          >
            Skicka meddelande
          </button>
        </form>
      </div>
    </section>
  );
}
