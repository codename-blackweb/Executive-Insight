import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, Users, Eye, Clock, Target, DollarSign, Percent, UserCheck, Briefcase } from "lucide-react";
import type { KPIMetric } from "@shared/schema";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  eye: Eye,
  clock: Clock,
  target: Target,
  dollar: DollarSign,
  percent: Percent,
  usercheck: UserCheck,
  briefcase: Briefcase,
};

interface KPICardProps {
  metric: KPIMetric;
  className?: string;
}

export function KPICard({ metric, className }: KPICardProps) {
  const Icon = iconMap[metric.icon] || Users;
  
  const getTrendIcon = () => {
    switch (metric.changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.changeType) {
      case 'increase':
        return 'text-emerald-500 dark:text-emerald-400';
      case 'decrease':
        return 'text-rose-500 dark:text-rose-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn("p-6 relative overflow-visible", className)} data-testid={`kpi-card-${metric.id}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-muted-foreground truncate">
              {metric.label}
            </span>
          </div>
          <div className="font-display text-3xl font-bold tracking-tight text-foreground">
            {metric.formattedValue}
          </div>
          <div className={cn("flex items-center gap-1 mt-2 text-sm font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(metric.change).toFixed(1)}%</span>
            <span className="text-muted-foreground font-normal ml-1">vs last period</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
