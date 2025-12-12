import { Router, Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

// Main dashboard and fallback
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

// Additional route pages
import TrafficPage from "@/pages/traffic";
import FunnelPage from "@/pages/funnel";
import EngagementPage from "@/pages/engagement";
import BehaviorPage from "@/pages/behavior";
import RecruitmentPage from "@/pages/recruitment";
import ShareholderPage from "@/pages/shareholder";
import PerformancePage from "@/pages/performance";
import SettingsPage from "@/pages/settings";
import HelpPage from "@/pages/help";

function Routes() {
  return (
    <Switch>
      {/* Primary dashboard */}
      <Route path="/" component={Dashboard} />

      {/* Analytics */}
      <Route path="/traffic" component={TrafficPage} />
      <Route path="/funnel" component={FunnelPage} />
      <Route path="/engagement" component={EngagementPage} />
      <Route path="/behavior" component={BehaviorPage} />

      {/* Intelligence */}
      <Route path="/recruitment" component={RecruitmentPage} />
      <Route path="/shareholder" component={ShareholderPage} />
      <Route path="/performance" component={PerformancePage} />

      {/* System / Utility */}
      <Route path="/settings" component={SettingsPage} />
      <Route path="/help" component={HelpPage} />

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider style={sidebarStyle as React.CSSProperties}>
            <div className="flex h-screen w-full bg-background">
              
              {/* Sidebar */}
              <AppSidebar />

              {/* Main Panel */}
              <div className="flex flex-col flex-1 min-w-0">

                {/* Header */}
                <header className="flex items-center justify-between gap-4 px-4 h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                      Talent Acquisition Intelligence
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                  </div>
                </header>

                {/* Routed Content */}
                <main className="flex-1 overflow-hidden">
                  <Routes />
                </main>

              </div>
            </div>
          </SidebarProvider>

          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
