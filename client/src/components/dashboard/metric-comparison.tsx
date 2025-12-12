import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricComparisonProps {
  label: string;
  currentValue: number;
  previousValue: number;
  unit?: string;
  format?: 'currency' | 'number' | 'time';
  className?: string;
}

export function MetricComparison({ 
  label, 
  currentValue, 
  previousValue, 
  unit = "",
  format = 'number',
  className 
}: MetricComparisonProps) {
  const change = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isPositive = change > 0;
  const isImproved = label.toLowerCase().includes('cost') || label.toLowerCase().includes('time') 
    ? change < 0 
    : change > 0;

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return `$${val.toLocaleString()}`;
      case 'time':
        return `${val} ${unit}`;
      default:
        return `${val.toLocaleString()}${unit}`;
    }
  };

  return (
    <Card className={className} data-testid={`metric-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">{label}</h3>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-display text-3xl font-bold text-foreground">
              {formatValue(currentValue)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              vs. {formatValue(previousValue)} prior
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md",
            isImproved 
              ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" 
              : "text-rose-600 bg-rose-500/10 dark:text-rose-400"
          )}>
            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
