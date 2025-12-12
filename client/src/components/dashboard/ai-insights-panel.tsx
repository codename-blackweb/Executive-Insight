import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle, CheckCircle2, Info, ChevronRight } from "lucide-react";
import type { AIInsight } from "@shared/schema";
import { cn } from "@/lib/utils";
import { formatDistanceToNow, parseISO } from "date-fns";

interface AIInsightsPanelProps {
  data: AIInsight[];
  className?: string;
}

export function AIInsightsPanel({ data, className }: AIInsightsPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <Info className="h-4 w-4 text-chart-1" />;
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-rose-500 bg-rose-500/5';
      case 'high':
        return 'border-l-amber-500 bg-amber-500/5';
      case 'medium':
        return 'border-l-chart-1 bg-chart-1/5';
      default:
        return 'border-l-muted-foreground bg-muted/30';
    }
  };

  return (
    <div className={cn("space-y-4", className)} data-testid="panel-ai-insights">
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-semibold text-foreground">AI Insights</h2>
      </div>
      <div className="space-y-3">
        {data.map((insight) => (
          <Card 
            key={insight.id}
            className={cn(
              "border-l-4 overflow-visible",
              getPriorityStyles(insight.priority)
            )}
            data-testid={`ai-insight-${insight.id}`}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {getTypeIcon(insight.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight" data-testid={`text-insight-headline-${insight.id}`}>
                      {insight.headline}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] uppercase tracking-wider px-1.5 py-0"
                      data-testid={`badge-priority-${insight.id}`}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3" data-testid={`text-insight-body-${insight.id}`}>
                    {insight.body}
                  </p>
                  {insight.recommendations.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Recommendations
                      </div>
                      {insight.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-3">
                    {formatDistanceToNow(parseISO(insight.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
