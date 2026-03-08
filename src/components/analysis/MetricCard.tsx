interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  valueColor?: string;
}

export default function MetricCard({ label, value, trend, valueColor = "text-primary" }: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">{label}</div>
      <div className={`font-serif text-3xl font-bold leading-none mb-1 ${valueColor}`}>{value}</div>
      {trend && <div className="text-[11px] font-mono text-muted">{trend}</div>}
    </div>
  );
}
