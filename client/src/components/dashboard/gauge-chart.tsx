import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  target: number;
  label: string;
  sublabel?: string;
  unit?: string;
  className?: string;
}

export function GaugeChart({ value, target, label, sublabel, unit = "%", className }: GaugeChartProps) {
  const percentage = Math.min((value / target) * 100, 100);
  const circumference = 2 * Math.PI * 60;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;
  
  const getColor = () => {
    if (percentage >= 90) return 'text-emerald-500';
    if (percentage >= 70) return 'text-chart-1';
    if (percentage >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <Card className={className} data-testid={`gauge-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="p-6 pb-2">
        <h3 className="font-display text-lg font-semibold text-foreground">{label}</h3>
        {sublabel && <p className="text-sm text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex flex-col items-center justify-center pb-6 pt-2">
        <div className="relative w-[150px] h-[100px]">
          <svg
            viewBox="0 0 140 100"
            className="w-full h-full"
          >
            <path
              d="M 20 80 A 60 60 0 0 1 120 80"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 60 60 0 0 1 120 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className={cn("transition-all duration-700", getColor())}
              strokeDasharray={`${percentage * 1.57} 157`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="font-display text-3xl font-bold text-foreground">
              {value.toFixed(1)}{unit}
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          Target: {target}{unit}
        </div>
      </div>
    </Card>
  );
}
