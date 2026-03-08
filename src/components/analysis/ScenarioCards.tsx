export interface Scenario {
  type: "bull" | "base" | "bear";
  probability: string;
  price: string;
  change: string;
  assumptions: string;
  requires: string;
}

interface ScenarioCardsProps {
  scenarios: Scenario[];
}

const scenarioConfig = {
  bull: {
    icon: "\uD83D\uDE80",
    label: "BULL CASE",
    borderColor: "border-success/30",
    bgColor: "bg-success/5",
    textColor: "text-success",
  },
  base: {
    icon: "\uD83D\uDCCA",
    label: "BASE CASE",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/5",
    textColor: "text-blue-500",
  },
  bear: {
    icon: "\uD83D\uDC3B",
    label: "BEAR CASE",
    borderColor: "border-danger/30",
    bgColor: "bg-danger/5",
    textColor: "text-danger",
  },
};

export default function ScenarioCards({ scenarios }: ScenarioCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {scenarios.map((scenario) => {
        const config = scenarioConfig[scenario.type];
        return (
          <div
            key={scenario.type}
            className={`rounded-xl p-6 border ${config.borderColor} ${config.bgColor}`}
          >
            <div className="text-3xl mb-2">{config.icon}</div>
            <h3 className={`font-serif text-lg uppercase tracking-wider font-bold mb-1 ${config.textColor}`}>
              {config.label}
            </h3>
            <div className="text-[11px] font-mono text-muted mb-2">
              SANNOLIKHET: {scenario.probability}
            </div>
            <div className={`font-serif text-3xl font-bold mb-1 ${config.textColor}`}>
              {scenario.price}
            </div>
            <div className="text-[11px] text-muted mb-4">{scenario.change}</div>
            <div className="text-xs text-muted leading-relaxed">
              <strong className="text-foreground">Antaganden:</strong>
              <br />
              {scenario.assumptions}
              <br /><br />
              <strong className="text-foreground">Kräver:</strong>
              <br />
              {scenario.requires}
            </div>
          </div>
        );
      })}
    </div>
  );
}
