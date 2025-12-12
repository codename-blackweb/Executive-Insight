import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDashboardData } from "./mockData";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Dashboard data endpoint (supports both query param and path param)
  app.get("/api/dashboard/:preset?", (req, res) => {
    const preset = req.params.preset || (req.query.preset as string) || '30d';
    const data = generateDashboardData(preset);
    res.json(data);
  });

  // KPIs endpoint
  app.get("/api/kpis", (req, res) => {
    const data = generateDashboardData();
    res.json(data.kpis);
  });

  // Traffic analytics endpoint
  app.get("/api/traffic", (req, res) => {
    const preset = (req.query.preset as string) || '30d';
    const data = generateDashboardData(preset);
    res.json({
      trend: data.trafficTrend,
      sources: data.trafficSources,
    });
  });

  // Conversion funnel endpoint
  app.get("/api/funnel", (req, res) => {
    const data = generateDashboardData();
    res.json(data.conversionFunnel);
  });

  // Recruitment data endpoint
  app.get("/api/recruitment", (req, res) => {
    const data = generateDashboardData();
    res.json({
      pipeline: data.pipelineStages,
      recruiters: data.recruiterPerformance,
    });
  });

  // Engagement metrics endpoint
  app.get("/api/engagement", (req, res) => {
    const data = generateDashboardData();
    res.json(data.engagementMetrics);
  });

  // Behavioral insights endpoint
  app.get("/api/behavior", (req, res) => {
    const data = generateDashboardData();
    res.json(data.behavioralInsights);
  });

  // Shareholder metrics endpoint
  app.get("/api/shareholder", (req, res) => {
    const data = generateDashboardData();
    res.json(data.shareholderMetrics);
  });

  // AI insights endpoint
  app.get("/api/insights", (req, res) => {
    const data = generateDashboardData();
    res.json(data.aiInsights);
  });

  // Export endpoint (returns CSV data)
  app.get("/api/export", (req, res) => {
    const format = req.query.format || 'csv';
    const data = generateDashboardData();
    
    if (format === 'csv') {
      const csvHeader = 'Metric,Value,Change,Change Type\n';
      const csvData = data.kpis.map(kpi => 
        `${kpi.label},${kpi.formattedValue},${kpi.change}%,${kpi.changeType}`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=rcg-analytics-export.csv');
      res.send(csvHeader + csvData);
    } else {
      res.json(data);
    }
  });

  return httpServer;
}
