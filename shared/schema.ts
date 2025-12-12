import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Dashboard Analytics Types
export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  unit?: string;
  icon: string;
}

export interface TrafficDataPoint {
  date: string;
  visitors: number;
  uniqueVisitors: number;
  pageViews: number;
  sessions: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  percentage: number;
  dropOff: number;
  conversionRate: number;
}

export interface PipelineStage {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RecruiterPerformance {
  id: string;
  name: string;
  avatar?: string;
  hires: number;
  interviews: number;
  offers: number;
  acceptanceRate: number;
  avgTimeToHire: number;
  trend: 'up' | 'down' | 'stable';
}

export interface EngagementMetric {
  channel: string;
  interactions: number;
  conversionRate: number;
  avgTimeSpent: string;
  bounceRate: number;
}

export interface BehavioralInsight {
  id: string;
  type: 'pattern' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface ShareholderMetric {
  id: string;
  category: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  progress: number;
  trend: number;
  unit: string;
}

export interface AIInsight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'alert';
  headline: string;
  body: string;
  recommendations: string[];
  timestamp: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface DashboardData {
  kpis: KPIMetric[];
  trafficTrend: TrafficDataPoint[];
  trafficSources: TrafficSource[];
  conversionFunnel: FunnelStage[];
  pipelineStages: PipelineStage[];
  recruiterPerformance: RecruiterPerformance[];
  engagementMetrics: EngagementMetric[];
  behavioralInsights: BehavioralInsight[];
  shareholderMetrics: ShareholderMetric[];
  aiInsights: AIInsight[];
  lastUpdated: string;
}

export interface DateRange {
  start: string;
  end: string;
  preset?: 'today' | '7d' | '30d' | '90d' | 'ytd' | 'custom';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}
