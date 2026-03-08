interface ProgressBarProps {
  label: string;
  value: string;
  percentage: number;
  color?: "green" | "amber" | "red";
}

const barColor = {
  green: "from-success/80 to-success",
  amber: "from-accent/50 to-accent",
  red: "from-danger/80 to-danger",
};

const textColor = {
  green: "text-success",
  amber: "text-accent",
  red: "text-danger",
};

export default function ProgressBar({ label, value, percentage, color = "green" }: ProgressBarProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-muted">{label}</span>
        <span className={`text-xs font-mono ${textColor[color]}`}>{value}</span>
      </div>
      <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor[color]}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
