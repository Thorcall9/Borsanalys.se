interface AlertBoxProps {
  type: "risk" | "signal" | "info";
  icon?: string;
  children: React.ReactNode;
}

const alertConfig = {
  risk: {
    defaultIcon: "\uD83D\uDD34",
    bg: "bg-danger/5",
    border: "border-danger/20",
    text: "text-danger",
  },
  signal: {
    defaultIcon: "\u2705",
    bg: "bg-success/5",
    border: "border-success/20",
    text: "text-success",
  },
  info: {
    defaultIcon: "\u26A0\uFE0F",
    bg: "bg-accent/5",
    border: "border-accent/20",
    text: "text-accent",
  },
};

export default function AlertBox({ type, icon, children }: AlertBoxProps) {
  const config = alertConfig[type];
  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-3 flex gap-3 items-start mb-2.5 text-xs ${config.text} leading-relaxed`}>
      <span className="shrink-0">{icon || config.defaultIcon}</span>
      <div>{children}</div>
    </div>
  );
}
