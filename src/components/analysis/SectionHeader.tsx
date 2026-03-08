interface SectionHeaderProps {
  number: string;
  title: string;
  accentColor?: string;
}

export default function SectionHeader({ number, title, accentColor }: SectionHeaderProps) {
  return (
    <div className="flex items-end gap-4 mb-7 pb-4 border-b border-border">
      <span
        className={`font-serif text-4xl font-bold opacity-50 leading-none ${accentColor ? "" : "text-primary"}`}
        style={accentColor ? { color: accentColor } : undefined}
      >
        {number}
      </span>
      <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}
