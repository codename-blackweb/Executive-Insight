# Executive Analytics Dashboard Design Guidelines

## Design Approach: Premium Enterprise Analytics

**Selected Approach:** Custom system inspired by Linear's precision, Stripe's data clarity, and Carbon Design's enterprise sophistication.

**Rationale:** Executive dashboards demand information density with visual elegance. This is a utility-focused, data-heavy application requiring stability, professional credibility, and instant comprehension of complex metrics.

**Core Principles:**
- Data First: Maximize information density without clutter
- Hierarchical Clarity: Instant visual distinction between primary/secondary metrics
- Executive Polish: Subtle sophistication that commands authority
- Actionable Insights: Every visualization drives decision-making

---

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts) - body text, labels, standard UI
- Display: Space Grotesk (via Google Fonts) - large numbers, dashboard titles, section headers

**Hierarchy:**
- Dashboard Title: Space Grotesk, 32px, 600 weight
- Section Headers: Space Grotesk, 24px, 600 weight
- KPI Numbers: Space Grotesk, 48-64px, 700 weight (large metrics)
- Subsection Headers: Inter, 16px, 600 weight
- Body/Labels: Inter, 14px, 400-500 weight
- Small Labels/Captions: Inter, 12px, 400 weight
- Table Headers: Inter, 13px, 600 weight, uppercase tracking

---

## Spacing & Layout System

**Tailwind Units:** Consistent use of 4, 6, 8, 12, 16, 24 (as in p-4, gap-6, mb-8, etc.)

**Grid Structure:**
- Container: max-w-[1920px] with px-8
- Dashboard Grid: 12-column responsive grid
- Card Spacing: gap-6 between cards
- Section Padding: py-12 for major sections, py-6 for subsections
- Inner Card Padding: p-6 for cards, p-8 for prominent panels

**Layout Zones:**
1. Top Navigation Bar: Fixed header with global controls (h-16)
2. Sidebar Navigation: Fixed left sidebar (w-64) with collapsible state
3. Main Dashboard Area: Scrollable content with section-based organization
4. Insight Panel: Right sidebar (w-80, collapsible) for AI commentary

---

## Component Library

### Navigation
- **Top Bar:** Logo left, date range selector center, profile/export controls right, subtle bottom border
- **Sidebar:** Icon + label navigation items, active state indication, collapsible categories for metric layers

### Dashboard Cards
- **Metric Cards:** Rounded corners (rounded-lg), subtle shadow, padding p-6, header with icon + title, large number display, trend indicator (up/down arrow + percentage), sparkline chart underneath
- **Chart Cards:** Similar styling, larger p-8 padding, title bar with export icon, full-width charts with proper axis labels
- **Insight Cards:** Distinct treatment with border accent, icon indicator, heading + body text, timestamp footer

### Data Visualizations
Use Chart.js via CDN for all charts:
- **Line Charts:** Multi-series for trends over time (traffic, conversions)
- **Area Charts:** Stacked for funnel visualization and cumulative metrics
- **Bar Charts:** Horizontal for comparative metrics (source attribution), vertical for time-based comparisons
- **Donut Charts:** Pipeline stages, offer acceptance breakdown
- **Gauge Charts:** Progress toward targets, efficiency scores
- **Tables:** Sortable headers, hover row highlight, alternating row treatment, sticky headers for long lists

### Interactive Controls
- **Date Range Picker:** Dropdown with presets (Last 7 Days, Last 30 Days, Last Quarter, Custom) + calendar interface
- **Filter Pills:** Removable tag-style filters with x-close button
- **Dropdown Selectors:** Subtle border, hover state, checkboxes for multi-select
- **Export Button:** Icon + label, primary treatment

### Stat Displays
- **KPI Blocks:** Large number (Space Grotesk), label above, change percentage below with directional indicator
- **Comparison Metrics:** Side-by-side values with vs. separator
- **Progress Bars:** Thin (h-2), rounded ends, labeled with percentage
- **Badges:** Pill-shaped status indicators (Active, Pending, Completed)

### Insight Panel Components
- **AI Commentary Box:** Distinct border treatment, robot/AI icon, bold insight headline, body text, timestamp
- **Alert Cards:** Warning/success/info variants with appropriate iconography
- **Recommendation Lists:** Numbered or bulleted action items with priority indicators

---

## Dashboard Sections (Top to Bottom)

1. **Executive Overview Row:** 4-card grid displaying total visitors, conversion rate, active candidates, time-to-hire (each with trend)
2. **Traffic Analytics Section:** Large area chart showing visitor trends + source attribution donut chart side-by-side
3. **Conversion Funnel:** Horizontal funnel visualization showing drop-off at each stage with percentages
4. **Recruitment Intelligence Grid:** 3-column grid with pipeline stages (donut), offer acceptance (gauge), cost-per-hire (comparison metric)
5. **Performance Dashboard:** Line chart tracking team productivity + bar chart showing recruiter performance rankings
6. **Engagement Metrics:** Heatmap-style visualization of touchpoint interactions + table of top-performing channels
7. **Behavioral Analytics:** Journey flow diagram showing paths and drop-offs + key behavioral insights cards
8. **Shareholder Intelligence:** ROI calculations, workforce planning projections (line chart forecasts), strategic hiring metrics

---

## Icons
**Library:** Heroicons (outline and solid variants via CDN)
- Navigation: outline variants
- Metrics/status: solid variants for visual weight
- Chart headers: outline for subtlety

---

## Interactions & Animations
**Minimize:** This is a professional data tool - avoid flashy animations

**Permitted:**
- Smooth transitions on hover states (0.2s ease)
- Chart load animations (subtle fade-in)
- Number counting animations for KPI updates
- Tooltip appearances on chart hover

**Forbidden:**
- Page transitions
- Elaborate loading states
- Decorative animations

---

## Responsive Behavior
- **Desktop (1920px+):** Full 12-column grid, sidebar expanded, insight panel visible
- **Laptop (1280-1920px):** 12-column grid, sidebar icons-only collapsed, insight panel collapsible
- **Tablet (768-1280px):** Stack charts vertically, hide insight panel, hamburger menu for sidebar
- **Not optimized for mobile:** This is an executive desktop tool