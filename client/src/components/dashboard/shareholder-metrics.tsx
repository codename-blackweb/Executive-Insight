import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ShareholderMetric } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ShareholderMetricsProps {
  data: ShareholderMetric[];
  className?: string;
}

export function ShareholderMetrics({ data, className }: ShareholderMetricsProps) {
  const formatValue = (value: number, unit: string) => {
    if (unit === '$') return `$${value.toLocaleString()}`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    if (unit === 'days') return `${value} days`;
    return value.toLocaleString();
  };

  return (
    <Card className={className} data-testid="panel-shareholder-metrics">
      <div className="p-6 pb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Shareholder Intelligence</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Strategic workforce metrics and ROI</p>
      </div>
      <div className="px-6 pb-6 space-y-5">
        {data.map((metric) => (
          <div key={metric.id} data-testid={`metric-shareholder-${metric.id}`}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate" data-testid={`text-metric-name-${metric.id}`}>{metric.metric}</div>
                <div className="text-xs text-muted-foreground" data-testid={`text-metric-category-${metric.id}`}>{metric.category}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-display text-lg font-bold text-foreground" data-testid={`text-metric-value-${metric.id}`}>
                  {formatValue(metric.currentValue, metric.unit)}
                </span>
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  metric.trend >= 0 ? "text-emerald-500" : "text-rose-500"
                )} data-testid={`indicator-trend-${metric.id}`}>
                  {metric.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{Math.abs(metric.trend).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress 
                value={metric.progress} 
                className="h-2 flex-1"
              />
              <span className="text-xs text-muted-foreground w-20 text-right">
                Target: {formatValue(metric.targetValue, metric.unit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
