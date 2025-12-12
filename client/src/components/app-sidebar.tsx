import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Briefcase,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// -------------------------
// NAVIGATION DEFINITIONS
// -------------------------
const overviewItems = [
  { title: "Executive Dashboard", url: "/", icon: LayoutDashboard },
];

const analyticsItems = [
  { title: "Traffic Analytics", url: "/traffic", icon: TrendingUp },
  { title: "Conversion Funnel", url: "/funnel", icon: Target },
  { title: "Engagement", url: "/engagement", icon: Activity },
  { title: "Behavior", url: "/behavior", icon: BarChart3 },
];

const intelligenceItems = [
  { title: "Recruitment", url: "/recruitment", icon: Users },
  { title: "Shareholder", url: "/shareholder", icon: Briefcase },
  { title: "Performance", url: "/performance", icon: PieChart },
];

// -------------------------
// NAVIGATION ITEM COMPONENT
// -------------------------
const NavItem = ({
  item,
  activePath,
}: {
  item: { title: string; url: string; icon: any };
  activePath: string;
}) => {
  const isActive = activePath === item.url;

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild data-active={isActive} data-testid={`nav-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
        <Link href={item.url}>
          <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
          <span data-testid={`text-nav-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
            {item.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// -------------------------
// SIDEBAR COMPONENT
// -------------------------
export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-sidebar-foreground">
              RCG Analytics
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Talent Intelligence
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* MAIN NAVIGATION */}
      <SidebarContent>

        {/* Overview */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <NavItem key={item.title} item={item} activePath={location} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <NavItem key={item.title} item={item} activePath={location} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Intelligence */}
        <SidebarGroup>
          <SidebarGroupLabel>Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {intelligenceItems.map((item) => (
                <NavItem key={item.title} item={item} activePath={location} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>

          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-active={location === "/settings"}>
              <Link href="/settings" data-testid="nav-settings">
                <Settings className={cn("h-4 w-4", location === "/settings" && "text-primary")} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Help */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-active={location === "/help"}>
              <Link href="/help" data-testid="nav-help">
                <HelpCircle className={cn("h-4 w-4", location === "/help" && "text-primary")} />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
