interface RatingBoxProps {
  rating: number;
  maxRating?: number;
  children: React.ReactNode;
}

export default function RatingBox({ rating, maxRating = 5, children }: RatingBoxProps) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4 mt-4">
      <div className="flex gap-0.5 shrink-0">
        {Array.from({ length: maxRating }).map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? "text-primary" : "text-border"}`}>
            {"\u2605"}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted italic leading-relaxed">{children}</p>
    </div>
  );
}
