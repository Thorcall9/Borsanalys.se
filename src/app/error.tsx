"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-20 text-center">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold mb-4">Något gick fel</h2>
        <p className="text-muted mb-6 text-sm">
          Ett oväntat fel uppstod. Försök att ladda om sidan.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors text-sm font-medium"
        >
          Försök igen
        </button>
      </div>
    </section>
  );
}
