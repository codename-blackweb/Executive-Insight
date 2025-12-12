import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { PipelineStage } from "@shared/schema";

interface PipelineChartProps {
  data: PipelineStage[];
  className?: string;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function PipelineChart({ data, className }: PipelineChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className={className} data-testid="chart-pipeline-stages">
      <div className="p-6 pb-2">
        <h3 className="font-display text-lg font-semibold text-foreground">Pipeline Stages</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Active candidates by stage</p>
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {data.map((stage, index) => (
              <div key={stage.name} className="flex items-center justify-between gap-2" data-testid={`row-pipeline-${index}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground truncate" data-testid={`text-pipeline-name-${index}`}>{stage.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-semibold text-foreground" data-testid={`text-pipeline-count-${index}`}>{stage.count}</span>
                  <span className="text-xs text-muted-foreground" data-testid={`text-pipeline-percentage-${index}`}>
                    ({((stage.count / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
