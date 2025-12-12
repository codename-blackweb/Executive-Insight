import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { TrafficDataPoint } from "@shared/schema";
import { format, parseISO } from "date-fns";

interface TrafficChartProps {
  data: TrafficDataPoint[];
  className?: string;
}

export function TrafficChart({ data, className }: TrafficChartProps) {
  const formattedData = data.map(point => ({
    ...point,
    formattedDate: format(parseISO(point.date), 'MMM dd'),
  }));

  return (
    <Card className={className} data-testid="chart-traffic-trends">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Visitor Traffic Trends</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Daily traffic patterns and engagement metrics</p>
          </div>
        </div>
      </div>
      <div className="px-2 pb-6">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis 
              dataKey="formattedDate" 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dx={-10}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingBottom: '10px' }}
              formatter={(value) => <span data-testid={`legend-${value.toLowerCase().replace(/\s/g, '-')}`}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Total Visitors"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisitors)"
            />
            <Area
              type="monotone"
              dataKey="uniqueVisitors"
              name="Unique Visitors"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUnique)"
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              name="Page Views"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPageViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
