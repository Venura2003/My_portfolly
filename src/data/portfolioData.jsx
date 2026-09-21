// Supermarket ERP Images
import imgSupermarketAdmin from '../assets/supermarkert/admin-dashboard.png';
import imgSupermarketEmployee from '../assets/supermarkert/employee-dashboard.png';
import imgSupermarketLogin from '../assets/supermarkert/login.png';

// Leaf Intel Images
import imgLeafIntel1 from '../assets/leaf-intel/Screenshot 2026-07-21 231943.png';
import imgLeafIntel2 from '../assets/leaf-intel/Screenshot 2026-07-21 232145.png';
import imgLeafIntel3 from '../assets/leaf-intel/Screenshot 2026-07-21 232218.png';
import vidLeafIntel from '../assets/leaf-intel/Recording 2026-07-21 232513.mp4';

// Lunudehi Images
import imgLunudehi1 from '../assets/Lunudehi/1781264752035.jpg';
import imgLunudehi2 from '../assets/Lunudehi/1781264752164.jpg';
import imgLunudehi3 from '../assets/Lunudehi/1781264752677.jpg';
import imgLunudehi4 from '../assets/Lunudehi/1781264752898.jpg';

// Super Sonic Images
import vidSuperSonic from '../assets/SuperSonic/Recording 2026-07-22 111342.mp4';
import imgSuperSonic1 from '../assets/SuperSonic/Screenshot 2026-07-22 111424.png';

// Knight Production Images
import imgKnight1 from '../assets/Knightproduction/Screenshot 2026-07-22 112204.png';
import imgKnight2 from '../assets/Knightproduction/Screenshot 2026-07-22 112232.png';
import imgKnight3 from '../assets/Knightproduction/Screenshot 2026-07-22 112304.png';

// Super Sonic Sales POS Images
import imgSuperSonicSales1 from '../assets/Supersonic pos Sales/Screenshot 2026-09-19 124508.png';
import imgSuperSonicSales2 from '../assets/Supersonic pos Sales/Screenshot 2026-09-19 124813.png';
import imgSuperSonicSales3 from '../assets/Supersonic pos Sales/Screenshot 2026-09-19 124842.png';
import imgSuperSonicSales4 from '../assets/Supersonic pos Sales/Screenshot 2026-09-19 124927.png';

// Gym Management System Images
import imgGym1 from '../assets/GYM_Mangemnt/Screenshot 2026-09-19 125522.png';
import imgGym2 from '../assets/GYM_Mangemnt/Screenshot 2026-09-19 125707.png';
import imgGym3 from '../assets/GYM_Mangemnt/Screenshot 2026-09-19 125806.png';
import imgGym4 from '../assets/GYM_Mangemnt/Screenshot 2026-09-19 125915.png';

// Profile Image
export const imgProfile = new URL('../assets/MyImage/myimge.jpeg', import.meta.url).href;

/* ═══════════════════════════════════════════════════════════
   CONTENT DATA
═══════════════════════════════════════════════════════════ */
export const ROLES = [
  'Full Stack Developer',
  'Mobile App Developer',
  'Enterprise Systems Builder',
  'Software Engineer',
  'Flutter & .NET Developer',
];

export const EXPERIENCE = [
  {
    title: 'Full Stack Software Engineer',
    company: 'Ceylon Innovation Services',
    period: 'Jan 2026 – Present',
    location: 'Sri Lanka',
    desc: 'Building full-stack enterprise systems from day one. Within the first month, independently architected and deployed a complete production-grade Supermarket ERP & POS platform. Delivered real-world client systems across retail POS, agriculture, automotive trading, and event management sectors.',
    tech: ['Flutter Web', '.NET', 'MySQL', 'React', 'On-Premise Servers', 'REST APIs'],
  },
  {
    title: 'Remote Collaborative Developer',
    company: 'Independent Team / Freelance',
    period: 'March 2026 – Present',
    location: 'Remote',
    desc: 'Collaborating remotely with a team of friends outside of regular hours to build and launch real-world products. Successfully architected and deployed a complete Gym Management System that is currently active in production.',
    tech: ['React', 'Spring Boot', 'SQL', 'TypeScript'],
  },
  {
    title: 'IT Undergraduate (Software Engineering)',
    company: 'SLIIT — Sri Lanka Institute of Information Technology',
    period: '4th Year (2023 – Present)',
    location: 'Colombo',
    desc: 'Currently in my 4th Year, 1st Semester pursuing a Software Engineering degree with hands-on exposure to enterprise software architecture, mobile development, and full-stack web systems. Combining academic learning with real-world production delivery.',
    tech: ['Software Engineering', 'Algorithms', 'Database Design', 'OOP'],
  },
];

export const PROJECTS = [
  {
    id: 1,
    type: 'Enterprise Web Application',
    statusBadge: 'Enterprise Client System · Office Server Hosted',
    title: 'Supermarket ERP & POS System',
    desc: 'Full-stack enterprise supermarket web platform with role-based dashboards for Admin and Employee users — covering live inventory, real-time web billing, HR, payroll, and financial reporting.',
    problem: 'Supermarket chains suffered from slow checkout lines during peak customer rush, frequent stock desynchronization across multi-warehouse locations, and error-prone manual spreadsheet payroll reconciliations.',
    architecture: 'Independently architected a full-stack enterprise web application within month 1 at Ceylon Innovation Services: a high-speed web-based POS checkout terminal paired with an ASP.NET Core REST API hosted on in-house private company office servers. Designed for continuous internet connectivity with high-throughput transactional commits to MySQL.',
    systemFlow: [
      { layer: 'Web Client', desc: 'Web POS Terminal & Admin Dashboard' },
      { layer: 'API Gateway', desc: 'ASP.NET Core REST API + JWT Role-Based Auth' },
      { layer: 'Services', desc: 'Inventory Controller & Automated Payroll Engine' },
      { layer: 'Office Server', desc: 'MySQL Database on In-House Enterprise Office Servers' }
    ],
    metrics: [
      { val: '< 350ms', lbl: 'Checkout Latency' },
      { val: 'On-Premise', lbl: 'Office Server Hosted' },
      { val: 'Multi-Role', lbl: 'Admin & Cashier Security' }
    ],
    detail: 'Built independently within my first month at Ceylon Innovation Services. Features role-based access for Admin and Employee users, real-time inventory tracking, web billing engine, HR module with payroll, and financial dashboards. Hosted on private in-house enterprise office servers.',
    features: [
      'Role-Based Admin & Cashier Employee Web Dashboards',
      'High-Speed Web POS Checkout Terminal with Real-Time Validation',
      'Real-Time Multi-Warehouse Inventory & Stock Adjustments',
      'HR Module with Automated Payroll Processing & Attendance',
      'Financial Analytics & Automated P&L Profit Generation'
    ],
    tech: ['Flutter Web', '.NET', 'MySQL', 'On-Premise Servers'],
    link: null,
    images: [imgSupermarketLogin, imgSupermarketAdmin, imgSupermarketEmployee],
  },
  {
    id: 2,
    type: 'Client Web Application',
    statusBadge: 'Agricultural Production Web App · Active Client',
    title: 'Leaf Intel — Tea Collection System',
    desc: 'Client-facing web application for managing tea leaf collection workflows — tracking farmer submissions, weights, and processing records in real time with active internet connectivity.',
    problem: 'Agricultural tea factories experienced 15%+ calculation discrepancy rates from manual handwritten paper field weighings, delayed monthly farmer payouts, and zero real-time factory intake monitoring.',
    architecture: 'Engineered a centralized real-time web platform accessible via browser terminals. Field submissions and weighings are sent directly over the web to an ASP.NET Core API hosted on the company office enterprise servers, calculating real-time payout statements and grading logs.',
    systemFlow: [
      { layer: 'Web Portal', desc: 'Real-Time Tea Collection & Weighing Web App' },
      { layer: 'API Gateway', desc: '.NET Web API with Real-Time Validation' },
      { layer: 'Logic Engine', desc: 'Quality Grade Tracing & Automated Payout Calculator' },
      { layer: 'Office Server', desc: 'SQL Server on In-House Company Enterprise Servers' }
    ],
    metrics: [
      { val: 'Real-Time Web', lbl: 'Internet-Connected Portal' },
      { val: '100% Digital', lbl: 'Farmer Slip Accuracy' },
      { val: 'On-Premise', lbl: 'Office Server Hosted' }
    ],
    detail: 'A real-world production web application built for an agricultural client at Ceylon Innovation Services. Manages the end-to-end tea collection process online — from farmer leaf submissions to factory processing records and automated payout calculations. Hosted on private office servers.',
    features: [
      'Real-Time Farmer Leaf Collection & Digital Weight Entry',
      'Factory Processing & Quality Grade Tracing Logs',
      'Automated Payout Engine & Farmer Payment Statements',
      'Online Management Web Dashboards & Instant PDF Exporting',
      'Role-Secure Factory & Officer Access Control'
    ],
    tech: ['Flutter Web', '.NET', 'SQL Server', 'On-Premise Servers'],
    link: null,
    images: [vidLeafIntel, imgLeafIntel1, imgLeafIntel2, imgLeafIntel3],
  },
  {
    id: 3,
    type: 'Client Website · Office Project',
    statusBadge: 'Live Client Production Website',
    title: 'Lunudehi Official Band Website',
    desc: 'Modern, fully responsive official website for Lunudehi Band — designed, developed, and deployed with a focus on clean digital experience across all devices.',
    problem: 'The renowned Sri Lankan music group had fragmented audience reach across social media channels without an authoritative platform for upcoming national/international tour itineraries, ticket booking links, and discography.',
    architecture: 'Designed and deployed a responsive React & Vite web application featuring modern aesthetic glassmorphism, custom HTML5 audio playback widgets, mobile-optimized concert event listings, and 100% compliance with Google SEO and Accessibility web standards.',
    systemFlow: [
      { layer: 'Frontend UI', desc: 'React 18 + Vite with Bespoke Audio Interface' },
      { layer: 'Media Engine', desc: 'Custom HTML5 Audio Player & Event Showcase' },
      { layer: 'Web Standards', desc: '100/100 SEO & Accessibility Standards Compliance' }
    ],
    metrics: [
      { val: '100 / 100', lbl: 'SEO & Best Practices' },
      { val: '100%', lbl: 'Accessibility Score' },
      { val: 'Mobile First', lbl: 'Responsive Band UX' }
    ],
    detail: 'Responsible for the complete design, development, and deployment of this project. Built a modern and responsive website that represents the band\'s identity digitally. Delivered with performance, accessibility, and mobile-first design as top priorities.',
    features: [
      'Bespoke Modern Music Band Branding & Visual Layouts',
      'Google Lighthouse 100/100 on SEO, Accessibility & Best Practices',
      'Mobile-First Responsive Design for All Screen Sizes',
      'Interactive Concert Tour Schedule & Media Gallery',
      'Custom HTML5 Audio Player & Album Release Showcase'
    ],
    tech: ['React', 'Vite', 'Node.js'],
    link: 'https://lunudehiband.com',
    images: [imgLunudehi1, imgLunudehi2, imgLunudehi3, imgLunudehi4],
  },
  {
    id: 4,
    type: 'Automotive Enterprise System',
    statusBadge: 'Automotive Enterprise System · Office Server',
    title: 'Super Sonic Auto Trading Platform',
    desc: 'Operations management system for Japanese vehicle auction bidding calculations, vehicle acquisition, dismantling workflows, and spare parts cataloging.',
    problem: 'Before placing bids on vehicles at Japanese auctions, calculating the target maximum bid price (factoring shipping, duty, auction fees, and estimated part yields) was done manually. After winning vehicles, tracking vehicle dismantling and extracted spare parts was unorganized.',
    architecture: 'Architected an automotive bidding calculation and vehicle dismantling platform. Built a custom calculation engine in .NET to decide profitable vehicle bid prices prior to Japanese auctions, combined with a vehicle dismantling workflow to strip, categorize, and catalog extracted spare parts into SQL.',
    systemFlow: [
      { layer: 'Bid Calculator', desc: 'Pre-Auction Target Bid Price & Margin Engine' },
      { layer: 'Acquisition', desc: 'Japan Auction Vehicle Purchase & Duty Tracking' },
      { layer: 'Dismantling Core', desc: 'Vehicle Stripping & Component Extraction Log' },
      { layer: 'Office Server', desc: 'SQL Server Database on Company In-House Servers' }
    ],
    metrics: [
      { val: 'Pre-Bid Calc', lbl: 'Auction Bid Price Engine' },
      { val: 'Dismantling', lbl: 'Vehicle-to-Parts Extraction' },
      { val: 'On-Premise', lbl: 'Office Server Hosted' }
    ],
    detail: 'A comprehensive operations system managing the pre-auction calculation and dismantling lifecycle: calculating bid limits before Japanese auction auctions, logging acquired vehicles, and managing the stripping and inventory extraction of spare parts. Hosted on private office servers.',
    features: [
      'Pre-Auction Vehicle Target Bid Price Calculation Engine',
      'Japanese Auction Vehicle Acquisition & Bidding Logs',
      'Vehicle Dismantling & Spare Part Extraction Workflows',
      'Algorithmic Spare Part SKU Indexing & Stock Recording',
      'Hosted on Secure In-House Company Enterprise Servers'
    ],
    tech: ['Flutter Web', '.NET', 'SQL Server', 'On-Premise Servers'],
    link: null,
    images: [vidSuperSonic, imgSuperSonic1],
  },
  {
    id: 5,
    type: 'Client Website · Office Project',
    statusBadge: 'Live Client Website · Office Server Hosted',
    title: 'Knight Web Production — Event Company',
    desc: 'Professional website for Knight Web Production, an event organising company — built with React and TypeScript, hosted on company in-house servers.',
    problem: 'An elite corporate event management agency required an editorial-grade, ultra-smooth web presence to pitch high-profile luxury event and concert contracts without UI jitter or slow media render times.',
    architecture: 'Developed with React and strict TypeScript, implementing modular UI components, progressive picture lazy loading, and hosted directly on the company\'s private in-house enterprise servers with custom production domain configuration.',
    systemFlow: [
      { layer: 'Frontend UI', desc: 'React + Strict TypeScript Component Hierarchy' },
      { layer: 'Asset Optimizer', desc: 'Progressive Image Loading & Micro-Animations' },
      { layer: 'Hosting Tier', desc: 'Company In-House Enterprise Server with Custom Domain' }
    ],
    metrics: [
      { val: 'TypeScript', lbl: 'Type-Safe Codebase' },
      { val: 'Custom Domain', lbl: 'Company Server Hosted' },
      { val: 'Sub-Second', lbl: 'Page Interaction Speed' }
    ],
    detail: 'Designed and developed a clean, professional web presence for an event management company. Built with React and TypeScript for type safety and maintainability. Deployed on in-house company servers.',
    features: [
      'Editorial Creative Event Agency Layouts & Visuals',
      'TypeScript Type-Safe Component Architecture',
      'Interactive Event Portfolio & Services Showcase',
      'Hosted on Company In-House Enterprise Servers',
      'Optimized Image Lazy-Loading & Smooth Motion'
    ],
    tech: ['React', 'TypeScript', 'On-Premise Servers'],
    link: 'https://knightsproductionla.com',
    images: [imgKnight1, imgKnight2, imgKnight3],
  },
  {
    id: 6,
    type: 'Live Production App · Team Project',
    statusBadge: 'Active Commercial SaaS · Team Project',
    title: 'Gym Management App',
    desc: 'Full-stack gym management system — currently live in production. Collaboratively built with a team of friends, covering member management, attendance, and subscription billing.',
    problem: 'Commercial fitness centers struggled with member subscription churn due to expired package oversights, disorganized paper attendance registers at front desks, and lack of structured member routine plans.',
    architecture: 'Collaboratively engineered and shipped with a team of friends: React frontend for front-desk staff to manage member profiles and daily attendance, backed by a Java Spring Boot backend with automated scheduled cron workers for subscription renewal SMS notifications.',
    systemFlow: [
      { layer: 'Front Desk UI', desc: 'React Dashboard for Member Profiles & Attendance' },
      { layer: 'Backend API', desc: 'Java Spring Boot REST Services with Security' },
      { layer: 'Automation Cron', desc: 'Scheduled Daily Membership Expiry & SMS Worker' },
      { layer: 'Data Tier', desc: 'Relational SQL Database with Connection Pooling' }
    ],
    metrics: [
      { val: 'Team Project', lbl: 'Collaborative Full-Stack' },
      { val: 'Active Live', lbl: 'Commercial Gym Client' },
      { val: 'Auto Alerts', lbl: 'Subscription SMS Engine' }
    ],
    detail: 'A live, production-deployed gym management application built collaboratively with a team of friends. Handles member registrations, front-desk attendance logging, subscription billing renewals, and workout plan management. Running in production for a real gym.',
    features: [
      'Live Production Member Registration & Profile Directory',
      'Front-Desk Member Attendance Tracking & Logs',
      'Subscription Renewal Engine & Automated SMS Alerts',
      'Custom Workout Routine & Diet Plan Management',
      'Real-Time Monthly Revenue & Attendance Analytics'
    ],
    tech: ['React', 'Spring Boot', 'SQL', 'Team Collaboration'],
    link: null,
    images: [imgGym1, imgGym2, imgGym3, imgGym4],
  },
  {
    id: 7,
    type: 'Full-Stack Enterprise POS · PWA',
    statusBadge: 'Enterprise Retail PWA · Production-Grade',
    title: 'Super Sonic Sales – Retail POS & Inventory System',
    desc: 'Modern, high-performance Point of Sale (POS) and inventory management web application with real-time billing, stock control, expense tracking, and PWA offline capability.',
    problem: 'Small and medium retail establishments lacked accessible, hardware-independent POS software with real-time analytics, forcing high upfront capital expenditure on legacy terminal hardware.',
    architecture: 'Engineered a modern Progressive Web App (PWA) with Flutter Web (GetX state management, Material 3) backed by ASP.NET Core with Entity Framework Core and SQL Server. Implemented service worker offline caching to ensure continuous billing even during internet disruptions.',
    systemFlow: [
      { layer: 'PWA Frontend', desc: 'Flutter Web (GetX + Material 3 Design System)' },
      { layer: 'API & ORM Tier', desc: 'ASP.NET Core Web API + Entity Framework Core' },
      { layer: 'Offline Engine', desc: 'Service Worker Cache & Transaction Queuing' },
      { layer: 'Data Store', desc: 'SQL Server with ACID Transaction Isolation' }
    ],
    metrics: [
      { val: 'Hardware-Free', lbl: 'Browser & PWA Enabled' },
      { val: 'Zero Downtime', lbl: 'Offline Billing Resilience' },
      { val: 'Enterprise', lbl: 'EF Core Clean Architecture' }
    ],
    detail: 'Super Sonic Sales is a modern, high-performance Point of Sale (POS) and inventory management web application engineered for retail and small-to-medium businesses. Built with a responsive Flutter Web frontend (GetX, Material 3) and a scalable ASP.NET Core backend (EF Core, SQL Server), it delivers real-time transaction processing, automated inventory control, expense tracking, and visual financial analytics through an intuitive, PWA-enabled interface.',
    features: [
      'Optimized POS Checkout Terminal for Rapid Billing',
      'Real-Time Inventory Stock Tracking & Auto Notifications',
      'Integrated Operational Expense Tracking & Financial Graphs',
      'Material 3 Cross-Platform Light/Dark Responsive UI',
      'PWA Progressive Web App Offline Caching & Fast Loading'
    ],
    tech: ['Flutter Web', 'ASP.NET Core', 'SQL Server', 'GetX', 'EF Core', 'PWA'],
    link: null,
    images: [imgSuperSonicSales1, imgSuperSonicSales2, imgSuperSonicSales3, imgSuperSonicSales4],
  },
];

export const SKILLS = [
  { cat: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'HTML5', 'CSS3'] },
  { cat: 'Backend', items: ['.NET', 'Spring Boot', 'Node.js', 'REST APIs'] },
  { cat: 'Mobile', items: ['Flutter', 'Dart', 'Cross-Platform'] },
  { cat: 'Database', items: ['MySQL', 'SQL Server', 'SQLite'] },
];

export const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Venura2003',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width={18} height={18}>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/venura-wickramasingha-b8935739a/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:uthsaravenura@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export const STATS = [
  { value: 7, suffix: '+', label: 'Projects shipped to production' },
  { value: 8, suffix: ' mo', label: 'Enterprise Experience at Ceylon Innovation' },
  { value: 3, suffix: '+', label: 'Real-world clients served' },
];

export const NAV_SECTIONS = ['about', 'experience', 'projects', 'contact'];
