interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 ${className}`}>
      {title && (
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-4">{title}</div>
      )}
      {children}
    </div>
  );
}
