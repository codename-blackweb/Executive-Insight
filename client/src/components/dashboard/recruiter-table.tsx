import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { RecruiterPerformance } from "@shared/schema";
import { cn } from "@/lib/utils";

interface RecruiterTableProps {
  data: RecruiterPerformance[];
  className?: string;
}

export function RecruiterTable({ data, className }: RecruiterTableProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="h-3.5 w-3.5 text-rose-500" />;
      default:
        return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className={className} data-testid="table-recruiter-performance">
      <div className="p-6 pb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Recruiter Performance</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Team productivity and hiring metrics</p>
      </div>
      <div className="px-6 pb-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Recruiter
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Hires
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Interviews
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Offers
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Accept Rate
              </th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Avg TTH
              </th>
              <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((recruiter, index) => (
              <tr 
                key={recruiter.id} 
                className={cn(
                  "hover-elevate",
                  index < data.length - 1 && "border-b border-border/50"
                )}
                data-testid={`row-recruiter-${recruiter.id}`}
              >
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8" data-testid={`avatar-recruiter-${recruiter.id}`}>
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {getInitials(recruiter.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground" data-testid={`text-recruiter-name-${recruiter.id}`}>{recruiter.name}</span>
                  </div>
                </td>
                <td className="text-right py-3">
                  <span className="font-semibold text-foreground" data-testid={`text-hires-${recruiter.id}`}>{recruiter.hires}</span>
                </td>
                <td className="text-right py-3">
                  <span className="text-muted-foreground" data-testid={`text-interviews-${recruiter.id}`}>{recruiter.interviews}</span>
                </td>
                <td className="text-right py-3">
                  <span className="text-muted-foreground" data-testid={`text-offers-${recruiter.id}`}>{recruiter.offers}</span>
                </td>
                <td className="text-right py-3">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "font-medium",
                      recruiter.acceptanceRate >= 80 && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      recruiter.acceptanceRate >= 60 && recruiter.acceptanceRate < 80 && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      recruiter.acceptanceRate < 60 && "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {recruiter.acceptanceRate}%
                  </Badge>
                </td>
                <td className="text-right py-3">
                  <span className="text-muted-foreground">{recruiter.avgTimeToHire}d</span>
                </td>
                <td className="text-center py-3">
                  {getTrendIcon(recruiter.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
