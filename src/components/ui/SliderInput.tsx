import { useId } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

export default function SliderInput({ label, value, onChange, min, max, step, format }: SliderInputProps) {
  const id = useId();
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <span className="text-sm font-bold">{format(value)}</span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}
