import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PerformanceDataPoint {
  month: string;
  hires: number;
  target: number;
  efficiency: number;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  className?: string;
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  return (
    <Card className={className} data-testid="chart-performance-trends">
      <div className="p-6 pb-2">
        <h3 className="font-display text-lg font-semibold text-foreground">Hiring Performance</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Monthly hires vs targets with efficiency tracking</p>
      </div>
      <div className="px-2 pb-6">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
            <XAxis 
              dataKey="month" 
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
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              className="text-xs fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              dx={10}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="hires"
              name="Actual Hires"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name="Target"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              name="Efficiency %"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              yAxisId="right"
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 0, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
