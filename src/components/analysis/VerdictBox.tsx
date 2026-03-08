interface VerdictBoxProps {
  verdict: string;
  target: string;
  description: string;
  date: string;
  accentColor?: string;
}

export default function VerdictBox({ verdict, target, description, date, accentColor = "text-success" }: VerdictBoxProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/[0.02] p-8 text-center">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-radial from-primary/10 to-transparent rounded-full" />
      <div className="relative">
        <div className="text-[11px] font-mono uppercase tracking-[3px] text-muted mb-3">
          INVESTERINGSBESLUT
        </div>
        <div className={`font-serif text-5xl sm:text-6xl uppercase tracking-[8px] font-bold leading-none ${accentColor}`}>
          {verdict}
        </div>
        <div className={`font-serif text-2xl font-bold mt-2 ${accentColor}`}>
          {target}
        </div>
        <p className="max-w-xl mx-auto mt-4 text-sm text-muted leading-relaxed">
          {description}
        </p>
        <div className="mt-5 text-[11px] font-mono text-muted uppercase tracking-wider">
          ANALYS DATUM: {date} &middot; EJ FINANSIELL RÅDGIVNING
        </div>
      </div>
    </div>
  );
}
