import type { DashboardData, KPIMetric, TrafficDataPoint, TrafficSource, FunnelStage, PipelineStage, RecruiterPerformance, EngagementMetric, BehavioralInsight, ShareholderMetric, AIInsight } from "@shared/schema";
import { subDays, format } from "date-fns";

// Seeded random number generator for deterministic data
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function generateTrafficData(days: number): TrafficDataPoint[] {
  const data: TrafficDataPoint[] = [];
  const now = new Date();
  const random = seededRandom(12345);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    const baseVisitors = 2500 + random() * 1500;
    const uniqueMultiplier = 0.65 + random() * 0.15;
    const pageViewMultiplier = 2.5 + random() * 1.5;
    
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      visitors: Math.round(baseVisitors),
      uniqueVisitors: Math.round(baseVisitors * uniqueMultiplier),
      pageViews: Math.round(baseVisitors * pageViewMultiplier),
      sessions: Math.round(baseVisitors * 1.2),
    });
  }
  
  return data;
}

function generateKPIs(): KPIMetric[] {
  return [
    {
      id: 'total-visitors',
      label: 'Total Visitors',
      value: 127482,
      formattedValue: '127.5K',
      previousValue: 118234,
      change: 7.8,
      changeType: 'increase',
      icon: 'eye',
    },
    {
      id: 'conversion-rate',
      label: 'Conversion Rate',
      value: 4.2,
      formattedValue: '4.2%',
      previousValue: 3.8,
      change: 10.5,
      changeType: 'increase',
      unit: '%',
      icon: 'percent',
    },
    {
      id: 'active-candidates',
      label: 'Active Candidates',
      value: 3847,
      formattedValue: '3,847',
      previousValue: 3654,
      change: 5.3,
      changeType: 'increase',
      icon: 'users',
    },
    {
      id: 'time-to-hire',
      label: 'Avg Time to Hire',
      value: 28,
      formattedValue: '28 days',
      previousValue: 32,
      change: -12.5,
      changeType: 'decrease',
      unit: 'days',
      icon: 'clock',
    },
  ];
}

function generateTrafficSources(): TrafficSource[] {
  return [
    { name: 'LinkedIn', value: 45200, percentage: 35.4, color: 'hsl(var(--chart-1))' },
    { name: 'Indeed', value: 32100, percentage: 25.2, color: 'hsl(var(--chart-2))' },
    { name: 'Organic Search', value: 24800, percentage: 19.4, color: 'hsl(var(--chart-3))' },
    { name: 'Direct', value: 15400, percentage: 12.1, color: 'hsl(var(--chart-4))' },
    { name: 'Referral', value: 9982, percentage: 7.8, color: 'hsl(var(--chart-5))' },
  ];
}

function generateConversionFunnel(): FunnelStage[] {
  return [
    { id: 'awareness', name: 'Awareness', count: 127482, percentage: 100, dropOff: 0, conversionRate: 100 },
    { id: 'interest', name: 'Interest', count: 48243, percentage: 37.8, dropOff: 62.2, conversionRate: 37.8 },
    { id: 'consideration', name: 'Apply', count: 12847, percentage: 10.1, dropOff: 73.4, conversionRate: 26.6 },
    { id: 'interview', name: 'Interview', count: 3847, percentage: 3.0, dropOff: 70.1, conversionRate: 29.9 },
    { id: 'hire', name: 'Hire', count: 847, percentage: 0.7, dropOff: 78.0, conversionRate: 22.0 },
  ];
}

function generatePipelineStages(): PipelineStage[] {
  return [
    { name: 'Screening', count: 1245, percentage: 32.4, color: 'hsl(var(--chart-1))' },
    { name: 'Phone Interview', count: 892, percentage: 23.2, color: 'hsl(var(--chart-2))' },
    { name: 'Technical', count: 654, percentage: 17.0, color: 'hsl(var(--chart-3))' },
    { name: 'Final Round', count: 421, percentage: 10.9, color: 'hsl(var(--chart-4))' },
    { name: 'Offer', count: 635, percentage: 16.5, color: 'hsl(var(--chart-5))' },
  ];
}

function generateRecruiterPerformance(): RecruiterPerformance[] {
  return [
    { id: '1', name: 'Sarah Chen', hires: 24, interviews: 156, offers: 32, acceptanceRate: 75, avgTimeToHire: 26, trend: 'up' },
    { id: '2', name: 'Michael Torres', hires: 21, interviews: 142, offers: 28, acceptanceRate: 75, avgTimeToHire: 29, trend: 'up' },
    { id: '3', name: 'Emily Johnson', hires: 19, interviews: 128, offers: 24, acceptanceRate: 79, avgTimeToHire: 24, trend: 'stable' },
    { id: '4', name: 'David Kim', hires: 17, interviews: 118, offers: 22, acceptanceRate: 77, avgTimeToHire: 31, trend: 'down' },
    { id: '5', name: 'Jessica Williams', hires: 16, interviews: 108, offers: 21, acceptanceRate: 76, avgTimeToHire: 27, trend: 'up' },
  ];
}

function generateEngagementMetrics(): EngagementMetric[] {
  return [
    { channel: 'Career Page', interactions: 45230, conversionRate: 8.2, avgTimeSpent: '4:32', bounceRate: 34.2 },
    { channel: 'Job Listings', interactions: 38420, conversionRate: 12.5, avgTimeSpent: '6:18', bounceRate: 28.5 },
    { channel: 'Company Culture', interactions: 22180, conversionRate: 5.8, avgTimeSpent: '3:45', bounceRate: 42.1 },
    { channel: 'Benefits Page', interactions: 18940, conversionRate: 7.3, avgTimeSpent: '5:12', bounceRate: 31.8 },
    { channel: 'Application Portal', interactions: 12847, conversionRate: 24.8, avgTimeSpent: '12:45', bounceRate: 15.2 },
  ];
}

function generateBehavioralInsights(): BehavioralInsight[] {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'pattern',
      title: 'Mobile Application Surge',
      description: 'Mobile applications increased 34% this week, with peak activity between 7-9 PM EST. Consider optimizing mobile application flow.',
      impact: 'high',
      timestamp: subDays(now, 0).toISOString(),
    },
    {
      id: '2',
      type: 'anomaly',
      title: 'Drop-off at Benefits Section',
      description: 'Unusual 45% drop-off detected on the benefits page. Users spending 80% less time than average before exiting.',
      impact: 'high',
      timestamp: subDays(now, 1).toISOString(),
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Optimize Interview Scheduling',
      description: 'Analysis shows 23% of candidates abandon after interview scheduling. Implementing same-day scheduling could improve conversion.',
      impact: 'medium',
      timestamp: subDays(now, 2).toISOString(),
    },
  ];
}

function generateShareholderMetrics(): ShareholderMetric[] {
  return [
    { id: '1', category: 'Financial', metric: 'Cost Per Hire', currentValue: 4250, targetValue: 4000, progress: 94, trend: -11.2, unit: '$' },
    { id: '2', category: 'Efficiency', metric: 'Time to Fill', currentValue: 28, targetValue: 25, progress: 89, trend: -12.5, unit: 'days' },
    { id: '3', category: 'Quality', metric: '90-Day Retention', currentValue: 92.4, targetValue: 95, progress: 97, trend: 2.8, unit: '%' },
    { id: '4', category: 'ROI', metric: 'Talent ROI Index', currentValue: 287, targetValue: 300, progress: 96, trend: 8.4, unit: '%' },
  ];
}

function generateAIInsights(): AIInsight[] {
  const now = new Date();
  return [
    {
      id: '1',
      type: 'success',
      headline: 'Engineering Pipeline Exceeds Target',
      body: 'The software engineering talent pipeline is 23% ahead of Q4 targets. Current velocity suggests we will meet all technical hiring goals 2 weeks early.',
      recommendations: [
        'Consider accelerating hospitality tech roles',
        'Reallocate recruiting resources to customer experience positions',
      ],
      timestamp: subDays(now, 0).toISOString(),
      priority: 'high',
    },
    {
      id: '2',
      type: 'warning',
      headline: 'Cruise Staff Hiring Velocity Declining',
      body: 'Week-over-week applications for cruise staff positions have decreased 18%. Competitor analysis shows Royal Caribbean pricing is now 8% below market for entry-level positions.',
      recommendations: [
        'Review compensation packages for cruise operations',
        'Increase social media recruitment campaigns',
        'Partner with maritime academies for talent pipeline',
      ],
      timestamp: subDays(now, 1).toISOString(),
      priority: 'critical',
    },
    {
      id: '3',
      type: 'info',
      headline: 'LinkedIn Campaign ROI Analysis',
      body: 'The "Adventure Awaits" LinkedIn campaign generated 3.2x ROI compared to traditional job boards. Video content performed 47% better than static posts.',
      recommendations: [
        'Increase video content production',
        'A/B test employee testimonial formats',
      ],
      timestamp: subDays(now, 2).toISOString(),
      priority: 'medium',
    },
    {
      id: '4',
      type: 'alert',
      headline: 'Interview No-Show Rate Elevated',
      body: 'Phone interview no-show rate reached 24% this week, up from 15% baseline. Most affected: Food & Beverage and Entertainment departments.',
      recommendations: [
        'Implement SMS reminders 24 hours before',
        'Offer flexible scheduling options',
        'Review candidate communication flow',
      ],
      timestamp: subDays(now, 0).toISOString(),
      priority: 'high',
    },
  ];
}

export function generateDashboardData(preset: string = '30d'): DashboardData {
  const daysMap: Record<string, number> = {
    'today': 1,
    '7d': 7,
    '30d': 30,
    '90d': 90,
    'ytd': Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)),
  };

  const days = daysMap[preset] || 30;

  return {
    kpis: generateKPIs(),
    trafficTrend: generateTrafficData(days),
    trafficSources: generateTrafficSources(),
    conversionFunnel: generateConversionFunnel(),
    pipelineStages: generatePipelineStages(),
    recruiterPerformance: generateRecruiterPerformance(),
    engagementMetrics: generateEngagementMetrics(),
    behavioralInsights: generateBehavioralInsights(),
    shareholderMetrics: generateShareholderMetrics(),
    aiInsights: generateAIInsights(),
    lastUpdated: new Date().toISOString(),
  };
}
