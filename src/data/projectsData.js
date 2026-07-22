export const projectsData = [
  {
    id: 1,
    title: 'Supermarket ERP',
    category: 'Enterprise Solution',
    tech: ['Flutter', '.NET Web API', 'SQL Server (SSMS)', 'Dapper'],
    summary: 'A complete enterprise supermarket ERP solution featuring inventory management, billing, sales analytics, and business intelligence dashboards.',
    problem: 'Retail managers struggled with fragmented inventory databases, high latency during peak checkout hours, inaccurate daily financial reports, and manual stock tracking leading to significant annual revenue leakage.',
    goal: 'Design a unified, real-time enterprise resource platform that streamlines checkout speeds, automates multi-warehouse inventory updates, and provides instant financial business intelligence dashboards.',
    research: 'Conducted workflow studies across 12 high-traffic supermarket branches. Discovered that manual cashier entries took an average of 42 seconds per customer, and stock inventory discrepancies occurred in 8% of all product lines weekly.',
    architecture: 'Layered architecture model: Flutter client for cross-platform desktop/mobile checkout terminals; high-throughput .NET Web API serving transactional commands; clustered SQL Server database utilizing index-optimized stored procedures for low latency.',
    features: [
      'POS Billing Terminal: High-performance checkout supporting offline buffering.',
      'Inventory Sync: Real-time stock counting across multiple warehouses.',
      'Employee Role Management: Secure role-based access control and commission auditing.',
      'Financial Analytics: Direct P&L reporting engine and real-time sales dashboards.'
    ],
    challenges: 'Ensuring absolute database consistency when multiple cashiers concurrently checkout items, especially during poor network conditions or offline intervals.',
    solution: 'Designed an offline-first transactional queue in Flutter that buffers checkout logs locally, and synchronized it with the .NET server using an idempotent bulk-upsert process that resolves concurrency clashes.',
    metrics: {
      latency: '< 180ms transaction lookup',
      throughput: '12,000+ checkout logs/hr',
      accuracy: '99.98% inventory precision'
    },
    timeline: '5 Months (Design, Database Architecture, Integration, Testing)',
    results: 'Accelerated branch checkout speeds by 65%, reduced inventory discrepancies to < 0.2%, and prevented an estimated 14% of annual inventory waste.',
    future: 'Introduce machine learning models to forecast purchase patterns and automate warehouse re-ordering pipelines.'
  },
  {
    id: 2,
    title: 'Leaf Intel System',
    category: 'Workflow Optimization',
    tech: ['Flutter', '.NET Core', 'SQL Server', 'Entity Framework'],
    summary: 'A business management platform developed for enterprise workflow optimization, secure reporting, and operational automation.',
    problem: 'Operations managers had no real-time visibility into employee timesheets, plant quality data, and logistical milestones, leading to delayed decision making and misallocated resources.',
    goal: 'Create an automated, role-secure plant workflow dashboard providing granular metrics tracking, automated quality alerts, and live operational optimization logs.',
    research: 'Evaluated legacy spreadsheet trackers. Discovered that manual data updates suffered from an average 36-hour delay, rendering weekly reports obsolete before review.',
    architecture: 'Micro-services framework connecting secure mobile data-entry terminals to a central .NET Core orchestrator with SQL Server transaction logs.',
    features: [
      'Quality Log Tracker: Instant quality reports from production floors.',
      'Operational Timelines: Real-time milestone tracing and task allocation.',
      'Automated PDF Reports: Daily financial and operation summaries sent automatically.',
      'Role-Secure Dashboards: Custom visual reports filtered by organizational rank.'
    ],
    challenges: 'Synchronizing high-frequency plant data entries from remote, low-connectivity zones without causing API timeouts.',
    solution: 'Implemented a localized Sqlite sync adapter in Flutter that batches data transfers during high-connectivity windows using compression codecs.',
    metrics: {
      syncTime: '< 1.5s background synchronization',
      dataDelay: 'Reduced from 36 hours to real-time',
      alertRate: '98% critical issue alert rate'
    },
    timeline: '4 Months',
    results: 'Enabled plant managers to make data-driven decisions on staffing and logistics, boosting overall operational throughput by 22% in the first quarter.',
    future: 'Embed AI vision scanners to detect leaf anomalies directly from the mobile application.'
  },
  {
    id: 3,
    title: 'Lunudehi Web Platform',
    category: 'Corporate Presence',
    tech: ['React', 'JSX', 'Tailwind CSS', 'Vite'],
    summary: 'A modern corporate website focused on clean UI, responsive design, premium branding, and optimized performance.',
    problem: 'The client’s legacy site had slow load speeds (FCP > 4s), lacked mobile accessibility, and didn’t represent the premium status of their corporate brand.',
    goal: 'Build a blazing-fast, responsive web interface that communicates luxury brand values and optimizes customer conversion funnel metrics.',
    research: 'Audited user behavior on the old platform. Found a bounce rate of 74% on mobile viewports, primarily due to layout shifting and poor font choices.',
    architecture: 'Single Page React Application utilizing code splitting, lazy-loaded components, and responsive grid layouts designed via Tailwind CSS.',
    features: [
      'Bespoke Visual Layouts: High-fidelity grid structures and gold accents.',
      'Accessibility Audit: Complied with WCAG AA standard guidelines.',
      'Dynamic Contact Module: Responsive inquiry collection form.'
    ],
    challenges: 'Optimizing heavy, high-resolution media assets for fast loading on lower-end mobile connections without losing premium visual quality.',
    solution: 'Implemented progressive image loading with modern WebP compression, lazy-loading thresholds, and a custom CSS skeleton placeholder layer.',
    metrics: {
      lighthouse: '99/100 performance score',
      bounceRate: 'Reduced from 74% to 18%',
      fcp: 'First Contentful Paint under 0.8s'
    },
    timeline: '1.5 Months',
    results: 'Transformed online brand perception, leading to a 140% increase in corporate inquiries within 6 weeks of launch.',
    future: 'Integrate a WebGL interactive 3D product showcase section.'
  },
  {
    id: 4,
    title: 'Gym Management System',
    category: 'Platform Engineering',
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'JWT Auth'],
    summary: 'A modern gym management platform supporting memberships, attendance tracking, payments, and analytical administration.',
    problem: 'Facility managers spent excessive hours manually cross-checking member subscriptions, tracking trainer schedules, and auditing monthly membership dues.',
    goal: 'Build a secure, centralized administration platform that automates subscription renewals, audits trainer sessions, and generates real-time revenue analytics.',
    research: 'Discovered that gyms lost approximately 9% of potential revenue due to late subscription renewals and un-tracked entry visits.',
    architecture: 'Dual-module system: React dashboard for administrators; secure Spring Boot REST API backed by an ACID-compliant PostgreSQL database.',
    features: [
      'Subscription Automation: Automated email and SMS billing notifications.',
      'Attendance Tracking: QR-code scanning module for instant member entry check.',
      'Revenue Dashboards: Visual graphs displaying recurring revenue models.'
    ],
    challenges: 'Handling membership subscription states dynamically, especially when dealing with cancellations, refunds, and freezes.',
    solution: 'Designed a state-machine model in the database that manages membership states cleanly, triggering billing webhooks accordingly.',
    metrics: {
      renewals: 'Automated 92% of monthly renewals',
      checkIn: '< 0.5s QR check-in latency',
      revenue: 'Recovered 8.5% of leaked revenue'
    },
    timeline: '3 Months',
    results: 'Streamlined facility operations, allowing administrative staff to refocus on customer acquisition, and eliminated renewal leaks entirely.',
    future: 'Add wearable device API integrations to sync member workout performance metrics.'
  },
  {
    id: 5,
    title: 'Gymnish SaaS Web',
    category: 'Luxury Marketing Website',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Lenis'],
    summary: 'A luxury SaaS marketing website showcasing the Gym Management platform using cinematic visuals and conversion design.',
    problem: 'The SaaS platform had excellent utility but lacked a high-end marketing website that could attract premium, enterprise-level gym franchises.',
    goal: 'Create an emotional, cinematic marketing presence with high-impact scroll storytelling, smooth animations, and premium visual layouts.',
    research: 'Studied premium SaaS websites like Linear and Stripe. Found that smooth kinetic typography and dynamic scroll-reveals increased user engagement time by 3x.',
    architecture: 'Modern React application utilizing Framer Motion for scroll-driven choreographies and Lenis for unified smooth-scrolling experience.',
    features: [
      'Cinematic Hero: Interactive typography and scale-up reveals.',
      'Kinetic Feature Stories: Scroll-triggered visual feature walkthroughs.',
      'Interactive Price Calculator: Dynamic subscription cost sliders.'
    ],
    challenges: 'Maintaining flawless 60fps scroll animations on mobile devices while rendering heavy graphics and nested motion elements.',
    solution: 'Utilized hardware-accelerated CSS properties, avoided layout shifts, and decoupled scroll triggers using React refs and requestAnimationFrame.',
    metrics: {
      fps: 'Constant 60fps on mobile viewports',
      engagement: 'User time-on-site increased by 210%',
      conversions: '35% lift in demo booking clicks'
    },
    timeline: '2 Months',
    results: 'Positioned the SaaS as a premier market solution, securing partnership pilots with 4 international premium gym chains within 30 days.',
    future: 'Incorporate localized currency matching and interactive video testimonials.'
  },
  {
    id: 6,
    title: 'Supersonic System',
    category: 'Inventory Architecture',
    tech: ['Flutter', '.NET Core', 'SQL Server', 'REST API'],
    summary: 'A vehicle dismantling and spare parts inventory system designed for Japanese auction vehicle imports.',
    problem: 'Spare parts importers faced massive backlogs trying to catalog thousands of unique components from dismantled vehicles, resulting in lost sales and unorganized warehouses.',
    goal: 'Develop a high-performance inventory catalog system that scans, tracks, and locations-maps every single spare part from auction purchase to warehouse shelf.',
    research: 'Observed mechanics cataloging vehicles. Found it took 45 minutes to manually list a dismantled car, with frequent errors in parts classification.',
    architecture: 'REST-based ecosystem connecting mobile barcode scanner clients to a .NET Core API and index-optimized SQL Server database.',
    features: [
      'Part Scanner: Instant photo upload and automatic part barcode generation.',
      'Auction Tracker: Logs vehicle purchase price, transport fees, and import status.',
      'Warehouse Mapping: Interactive shelf-location mapping utility.'
    ],
    challenges: 'Generating unique, collision-free SKU codes and barcodes for millions of unique spare parts in real-time.',
    solution: 'Designed an algorithmic SKU generator using vehicle make, model, part category, and auction batch codes, preventing any database duplication.',
    metrics: {
      catalogTime: 'Reduced catalog time by 75%',
      tracking: '100% warehouse location accuracy',
      skus: 'Managed over 40,000 active SKUs'
    },
    timeline: '4.5 Months',
    results: 'Halved cataloging backlogs, allowed parts to be listed online immediately, and increased sales fulfillment rates by 38%.',
    future: 'Introduce OCR scanners to automatically extract vehicle chassis numbers from imported auction sheets.'
  },
  {
    id: 7,
    title: 'Knight Agency Site',
    category: 'Creative Studio Web',
    tech: ['React', 'TypeScript', 'GSAP', 'Lenis'],
    summary: 'A premium luxury creative agency website with editorial layouts, immersive animations, and cinematic branding.',
    problem: 'The agency had a standard, static portfolio that did not convey their technical creative capabilities, leaving potential enterprise clients un-wowed.',
    goal: 'Create an Awwwards-standard portfolio website demonstrating high-end typography, GSAP animations, and interactive agency showcase panels.',
    research: 'Studied award-winning agency portfolios. Found that custom cursors and magnetic navigation structures created a high psychological value for the brand.',
    architecture: 'React web application powered by GSAP scroll triggers, magnetic button controllers, and clean component routing.',
    features: [
      'GSAP Scroll Animations: Immersive parallax panels and text scrambles.',
      'Magnetic Navigations: Navigation elements that stick to the user cursor.',
      'Grid Light Accents: Glowing border grids reacting to scroll coordinates.'
    ],
    challenges: 'Preventing scroll animations from lagging on devices with varying refresh rates (e.g., 60Hz vs 120Hz displays).',
    solution: 'Used GSAP’s lagSmoothing and synced animation frames to a single global ticker, ensuring smooth movement on all displays.',
    metrics: {
      loadingTime: 'Page loads under 0.9s',
      fps: 'Smooth 120fps rendering on premium displays',
      satisfaction: '100% positive client review feedback'
    },
    timeline: '2.5 Months',
    results: 'Increased the agency’s inbound project leads by 180%, securing high-tier luxury brand commissions.',
    future: 'Add a Web Audio synthesizer that adapts its volume and pitch to the user’s scroll speed.'
  }
];
