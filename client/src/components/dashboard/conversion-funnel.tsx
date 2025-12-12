import { Card } from "@/components/ui/card";
import type { FunnelStage } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ConversionFunnelProps {
  data: FunnelStage[];
  className?: string;
}

export function ConversionFunnel({ data, className }: ConversionFunnelProps) {
  const maxCount = Math.max(...data.map(s => s.count));

  return (
    <Card className={className} data-testid="chart-conversion-funnel">
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Conversion Funnel</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Candidate journey from awareness to hire</p>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between gap-2">
          {data.map((stage, index) => {
            const height = (stage.count / maxCount) * 180;
            const isLast = index === data.length - 1;
            
            return (
              <div key={stage.id} className="flex-1 flex flex-col items-center" data-testid={`funnel-stage-${stage.id}`}>
                <div className="text-center mb-3">
                  <div className="font-display text-2xl font-bold text-foreground" data-testid={`text-funnel-count-${stage.id}`}>
                    {stage.count.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5" data-testid={`text-funnel-percentage-${stage.id}`}>
                    {stage.percentage.toFixed(1)}%
                  </div>
                </div>
                <div className="relative w-full flex items-end justify-center">
                  <div
                    className={cn(
                      "w-full max-w-20 rounded-t-md transition-all duration-500",
                      index === 0 ? "bg-chart-1" : 
                      index === 1 ? "bg-chart-2" : 
                      index === 2 ? "bg-chart-3" : 
                      index === 3 ? "bg-chart-4" : "bg-chart-5"
                    )}
                    style={{ height: `${Math.max(height, 40)}px` }}
                  />
                  {!isLast && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="flex items-center gap-0.5 text-xs text-rose-500 dark:text-rose-400 font-medium bg-background px-1 rounded">
                        <ArrowRight className="h-3 w-3" />
                        <span>-{stage.dropOff.toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-3 text-center" data-testid={`text-funnel-name-${stage.id}`}>
                  {stage.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
