interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface SwotGridProps {
  data: SwotData;
  title?: string;
}

export default function SwotGrid({ data, title }: SwotGridProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {title && (
        <div className="text-[11px] font-mono uppercase tracking-wider text-primary mb-4">{title}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl overflow-hidden border border-border">
        <SwotCell label="Styrkor" items={data.strengths} color="text-success" />
        <SwotCell label="Svagheter" items={data.weaknesses} color="text-danger" />
        <SwotCell label="Möjligheter" items={data.opportunities} color="text-blue-500" />
        <SwotCell label="Hot" items={data.threats} color="text-accent" />
      </div>
    </div>
  );
}

function SwotCell({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="p-5 border border-border/50">
      <h4 className={`font-serif text-sm uppercase tracking-wider font-bold mb-3 ${color}`}>
        {label}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-muted leading-relaxed pl-3.5 relative before:content-['—'] before:absolute before:left-0 before:text-muted/50 before:text-[10px]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
