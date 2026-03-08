interface TimelineItem {
  date: string;
  text: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-2.5 top-1.5 bottom-1.5 w-px bg-border" />
      {items.map((item, i) => (
        <div key={i} className="relative pb-4">
          <div className="absolute -left-[22px] top-1.5 w-2 h-2 rounded-full bg-primary border-2 border-card" />
          <div className="text-[10px] font-mono text-primary tracking-wider mb-1">{item.date}</div>
          <div className="text-xs text-muted leading-relaxed">{item.text}</div>
        </div>
      ))}
    </div>
  );
}
