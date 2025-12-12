import { Card } from "@/components/ui/card";
import type { EngagementMetric } from "@shared/schema";
import { cn } from "@/lib/utils";

interface EngagementHeatmapProps {
  data: EngagementMetric[];
  className?: string;
}

export function EngagementHeatmap({ data, className }: EngagementHeatmapProps) {
  const maxInteractions = Math.max(...data.map(d => d.interactions));

  const getIntensity = (value: number) => {
    const ratio = value / maxInteractions;
    if (ratio >= 0.8) return 'bg-chart-1/90';
    if (ratio >= 0.6) return 'bg-chart-1/70';
    if (ratio >= 0.4) return 'bg-chart-1/50';
    if (ratio >= 0.2) return 'bg-chart-1/30';
    return 'bg-chart-1/15';
  };

  return (
    <Card className={className} data-testid="chart-engagement-heatmap">
      <div className="p-6 pb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Channel Engagement</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Interaction intensity by channel</p>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {data.map((metric, index) => (
            <div key={metric.channel} className="flex items-center gap-4" data-testid={`row-engagement-${index}`}>
              <div className="w-24 text-sm font-medium text-muted-foreground truncate" data-testid={`text-channel-${index}`}>
                {metric.channel}
              </div>
              <div className="flex-1 h-10 rounded-md overflow-hidden bg-muted/30 relative">
                <div
                  className={cn(
                    "h-full rounded-md transition-all duration-500",
                    getIntensity(metric.interactions)
                  )}
                  style={{ width: `${(metric.interactions / maxInteractions) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-xs font-medium text-foreground" data-testid={`text-interactions-${index}`}>
                    {metric.interactions.toLocaleString()} interactions
                  </span>
                  <span className="text-xs text-muted-foreground" data-testid={`text-cvr-${index}`}>
                    {metric.conversionRate.toFixed(1)}% CVR
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-1">
            {[15, 30, 50, 70, 90].map((opacity) => (
              <div
                key={opacity}
                className={`w-4 h-4 rounded-sm bg-chart-1/${opacity}`}
                style={{ opacity: opacity / 100 + 0.1 }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </Card>
  );
}
