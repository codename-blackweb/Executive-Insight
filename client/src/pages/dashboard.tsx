import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { KPICard } from "@/components/dashboard/kpi-card";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { SourceDonut } from "@/components/dashboard/source-donut";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import { PipelineChart } from "@/components/dashboard/pipeline-chart";
import { GaugeChart } from "@/components/dashboard/gauge-chart";
import { MetricComparison } from "@/components/dashboard/metric-comparison";
import { RecruiterTable } from "@/components/dashboard/recruiter-table";
import { EngagementHeatmap } from "@/components/dashboard/engagement-heatmap";
import { BehavioralInsights } from "@/components/dashboard/behavioral-insights";
import { ShareholderMetrics } from "@/components/dashboard/shareholder-metrics";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import type { DashboardData, DateRange } from "@shared/schema";

function LoadingState() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[140px] rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[360px] lg:col-span-2 rounded-lg" />
        <Skeleton className="h-[360px] rounded-lg" />
      </div>
      <Skeleton className="h-[300px] rounded-lg" />
    </div>
  );
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
    preset: '30d',
  });

  const { data, isLoading, refetch, isFetching } = useQuery<DashboardData>({
    queryKey: ['/api/dashboard', dateRange.preset],
  });

  const performanceData = [
    { month: 'Jan', hires: 42, target: 45, efficiency: 93 },
    { month: 'Feb', hires: 38, target: 40, efficiency: 95 },
    { month: 'Mar', hires: 55, target: 50, efficiency: 110 },
    { month: 'Apr', hires: 47, target: 48, efficiency: 98 },
    { month: 'May', hires: 52, target: 50, efficiency: 104 },
    { month: 'Jun', hires: 61, target: 55, efficiency: 111 },
  ];

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Unable to load dashboard data</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6 max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Executive Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Royal Caribbean Group - Talent Acquisition Analytics
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => refetch()}
              disabled={isFetching}
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="default" data-testid="button-export">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.kpis.map((kpi) => (
            <KPICard key={kpi.id} metric={kpi} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Content - 3 columns */}
          <div className="xl:col-span-3 space-y-6">
            {/* Traffic Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TrafficChart data={data.trafficTrend} className="lg:col-span-2" />
              <SourceDonut data={data.trafficSources} />
            </div>

            {/* Conversion Funnel */}
            <ConversionFunnel data={data.conversionFunnel} />

            {/* Recruitment Intelligence Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PipelineChart data={data.pipelineStages} />
              <GaugeChart 
                value={78.5} 
                target={85} 
                label="Offer Acceptance Rate"
                sublabel="Target achievement"
              />
              <MetricComparison 
                label="Cost Per Hire"
                currentValue={4250}
                previousValue={4800}
                format="currency"
              />
            </div>

            {/* Performance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart data={performanceData} />
              <RecruiterTable data={data.recruiterPerformance} />
            </div>

            {/* Engagement & Behavioral Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngagementHeatmap data={data.engagementMetrics} />
              <BehavioralInsights data={data.behavioralInsights} />
            </div>

            {/* Shareholder Intelligence */}
            <ShareholderMetrics data={data.shareholderMetrics} />
          </div>

          {/* Right Sidebar - AI Insights */}
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <AIInsightsPanel data={data.aiInsights} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
          <span>Last updated: {new Date(data.lastUpdated).toLocaleString()}</span>
          <span>Royal Caribbean Group - Confidential</span>
        </div>
      </div>
    </ScrollArea>
  );
}
