import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Lightbulb, Activity } from "lucide-react";
import type { BehavioralInsight } from "@shared/schema";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, parseISO } from "date-fns";

interface BehavioralInsightsProps {
  data: BehavioralInsight[];
  className?: string;
}

export function BehavioralInsights({ data, className }: BehavioralInsightsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pattern':
        return <TrendingUp className="h-4 w-4" />;
      case 'anomaly':
        return <AlertTriangle className="h-4 w-4" />;
      case 'recommendation':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'pattern':
        return 'bg-chart-1/10 text-chart-1 border-chart-1/20';
      case 'anomaly':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'recommendation':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-0">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">Medium Impact</Badge>;
      default:
        return <Badge className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-0">Low Impact</Badge>;
    }
  };

  return (
    <Card className={className} data-testid="panel-behavioral-insights">
      <div className="p-6 pb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Behavioral Insights</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Patterns, anomalies, and recommendations</p>
      </div>
      <div className="px-6 pb-6 space-y-3">
        {data.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "p-4 rounded-lg border",
              getTypeStyles(insight.type)
            )}
            data-testid={`insight-${insight.id}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-medium text-foreground" data-testid={`text-behavior-title-${insight.id}`}>{insight.title}</h4>
                  {getImpactBadge(insight.impact)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-behavior-description-${insight.id}`}>
                  {insight.description}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(parseISO(insight.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
