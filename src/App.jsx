import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, Mail, MapPin, ArrowRight, X } from 'lucide-react';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import TextScramble from './components/TextScramble';
import MagneticButton from './components/MagneticButton';
import WireframeGlobe from './components/WireframeGlobe';

// Supermarket ERP Images
import imgSupermarketAdmin from './assest/supermarkert/admin-dashboard.png';
import imgSupermarketEmployee from './assest/supermarkert/employee-dashboard.png';
import imgSupermarketLogin from './assest/supermarkert/login.png';

// Leaf Intel Images
import imgLeafIntel1 from './assest/leaf-intel/Screenshot 2026-07-21 231943.png';
import imgLeafIntel2 from './assest/leaf-intel/Screenshot 2026-07-21 232145.png';
import imgLeafIntel3 from './assest/leaf-intel/Screenshot 2026-07-21 232218.png';
import vidLeafIntel from './assest/leaf-intel/Recording 2026-07-21 232513.mp4';

// Lunudehi Images
import imgLunudehi1 from './assest/Lunudehi/1781264752035.jpg';
import imgLunudehi2 from './assest/Lunudehi/1781264752164.jpg';
import imgLunudehi3 from './assest/Lunudehi/1781264752677.jpg';
import imgLunudehi4 from './assest/Lunudehi/1781264752898.jpg';

// Super Sonic Images
import vidSuperSonic from './assest/SuperSonic/Recording 2026-07-22 111342.mp4';
import imgSuperSonic1 from './assest/SuperSonic/Screenshot 2026-07-22 111424.png';

// Knight Production Images
import imgKnight1 from './assest/Knightproduction/Screenshot 2026-07-22 112204.png';
import imgKnight2 from './assest/Knightproduction/Screenshot 2026-07-22 112232.png';
import imgKnight3 from './assest/Knightproduction/Screenshot 2026-07-22 112304.png';

// Gymnish Images
import imgGymnish1 from './assest/gymnsih/Screenshot 2026-07-22 112910.png';
import imgGymnish2 from './assest/gymnsih/Screenshot 2026-07-22 112935.png';
import imgGymnish3 from './assest/gymnsih/Screenshot 2026-07-22 112952.png';

/* ═══════════════════════════════════════════════════════════
   CONTENT DATA
═══════════════════════════════════════════════════════════ */
const ROLES = [
  'Full Stack Developer',
  'Mobile App Developer',
  'Enterprise Systems Builder',
  'Software Engineering Intern',
  'Flutter & .NET Developer',
];

const EXPERIENCE = [
  {
    title: 'Full Stack Developer Intern',
    company: 'Ceylon Innovation PVT',
    location: 'Sri Lanka',
    desc: 'Building full-stack enterprise systems from day one. Within the first month independently architected and deployed a complete Supermarket ERP & POS platform. Progressed to deliver real-world client-based systems across agriculture, automotive, and event management sectors.',
    tech: ['Flutter', '.NET', 'MySQL', 'React', 'Azure', 'Render', 'Vercel'],
  },
  {
    title: 'Remote Collaborative Developer',
    company: 'Independent Team / Freelance',
    location: 'Remote',
    desc: 'Collaborating remotely with a team of friends outside of regular hours to build and launch real-world products. Successfully architected and deployed a complete Gym Management System that is currently active in production.',
    tech: ['React', 'Spring Boot', 'SQL', 'TypeScript'],
  },
  {
    title: 'IT Undergraduate',
    company: 'SLIIT — Sri Lanka Institute of Information Technology',
    location: 'Colombo',
    desc: 'Pursuing a Software Engineering degree with hands-on exposure to enterprise software architecture, mobile development, and full-stack web systems. Combining academic learning with real-world production delivery.',
    tech: ['Software Engineering', 'Algorithms', 'Database Design', 'OOP'],
  },
];

const PROJECTS = [
  {
    id: 1,
    type: 'Enterprise · Internship',
    title: 'Supermarket ERP & POS System',
    desc: 'Full-stack supermarket management platform with role-based dashboards for Admin and Employee users — covering inventory, billing, HR, payroll, and financial reporting.',
    detail: 'Built independently within my first month at Ceylon Innovation PVT. Features role-based access for Admin and Employee users, real-time inventory tracking, billing engine, HR module with payroll, and financial dashboards. Deployed across Render, Vercel, and Azure.',
    tech: ['Flutter', '.NET', 'MySQL', 'Render', 'Vercel', 'Azure'],
    link: null,
    images: [imgSupermarketLogin, imgSupermarketAdmin, imgSupermarketEmployee],
  },
  {
    id: 2,
    type: 'Client System · Internship',
    title: 'Leaf Intel — Tea Collection System',
    desc: 'Client-facing web application for managing tea leaf collection workflows — tracking farmer submissions, weights, and processing records in real time.',
    detail: 'A real-world production system built for an agricultural client at Ceylon Innovation PVT. Manages the end-to-end tea collection process — from farmer leaf submissions to processing records and payment tracking. Built with Flutter frontend, .NET backend, and SQL database.',
    tech: ['Flutter', '.NET', 'SQL'],
    link: null,
    images: [vidLeafIntel, imgLeafIntel1, imgLeafIntel2, imgLeafIntel3],
  },
  {
    id: 3,
    type: 'Client Website',
    title: 'Lunudehi Official Band Website',
    desc: 'Modern, fully responsive official website for Lunudehi Band — designed, developed, and deployed with a focus on clean digital experience across all devices.',
    detail: 'Responsible for the complete design, development, and deployment of this project. Built a modern and responsive website that represents the band\'s identity digitally. Delivered with performance and mobile-first design as a priority.',
    tech: ['React', 'Vite', 'Node.js'],
    link: 'https://lunudehiband.com',
    images: [imgLunudehi1, imgLunudehi2, imgLunudehi3, imgLunudehi4],
  },
  {
    id: 4,
    type: 'Client System · Internship',
    title: 'Super Sonic Auto Trading Platform',
    desc: 'Comprehensive operations management system for a major automotive client, streamlining the process of buying vehicles from Japan auctions, dismantling them, and extracting parts.',
    detail: 'A robust client system managing the complex lifecycle of automotive trading. It specifically tracks the entire workflow: acquiring vehicles from Japanese auctions, the dismantling process, and the extraction and inventory management of individual spare parts. Built utilizing Flutter for mobile interfaces, .NET for the backend logic, and SQL for the core database.',
    tech: ['Flutter', '.NET', 'SQL'],
    link: null,
    images: [vidSuperSonic, imgSuperSonic1],
  },
  {
    id: 5,
    type: 'Client Website',
    title: 'Knight Web Production — Event Company',
    desc: 'Professional website for Knight Web Production, an event organising company — built with React and TypeScript for a fast, modern presentation.',
    detail: 'Designed and developed a clean, professional web presence for an event management company. Built with React and TypeScript for type safety and maintainability.',
    tech: ['React', 'TypeScript'],
    link: 'https://knights-production-la.vercel.app/',
    images: [imgKnight1, imgKnight2, imgKnight3],
  },
  {
    id: 6,
    type: 'Live Production App',
    title: 'Gym Management App',
    desc: 'Full-stack gym management system — currently live in production. Built with a friend, covering member management, attendance, and billing workflows.',
    detail: 'A live, production-deployed gym management application built collaboratively. Handles member registrations, attendance tracking, subscription billing, and workout plan management. Running in production for a real gym.',
    tech: ['React', 'Spring Boot', 'SQL'],
    link: null,
  },
  {
    id: 7,
    type: 'Marketing Website',
    title: 'Gymnish — Gym System Marketing Site',
    desc: 'Marketing and landing website for the Gymnish gym management platform — showcasing features and driving user acquisition.',
    detail: 'Built the marketing website to present and promote the Gymnish gym management system. Clean, conversion-focused design with product feature sections and calls to action.',
    tech: ['React', 'TypeScript'],
    link: 'https://gymnish.vercel.app/',
    images: [imgGymnish1, imgGymnish2, imgGymnish3],
  },
];

const SKILLS = [
  { cat: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'HTML5', 'CSS3'] },
  { cat: 'Backend', items: ['.NET', 'Spring Boot', 'Node.js', 'REST APIs'] },
  { cat: 'Mobile', items: ['Flutter', 'Dart', 'Cross-Platform'] },
  { cat: 'Database', items: ['MySQL', 'SQL Server', 'SQLite'] },
];

const SOCIALS = [
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
    href: 'mailto:venura.wickramasingha@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const STATS = [
  { value: 7, suffix: '+', label: 'Projects shipped to production' },
  { value: 6, suffix: ' mo', label: 'Enterprise internship at Ceylon Innovation' },
  { value: 3, suffix: '+', label: 'Real-world clients served' },
];

const NAV_SECTIONS = ['about', 'experience', 'projects', 'contact'];

/* ═══════════════════════════════════════════════════════════
   WOW FACTOR 1 — TYPEWRITER ROLE
═══════════════════════════════════════════════════════════ */
function TypewriterRole() {
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | waiting | deleting

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setPhase('waiting'), 2400);
      }
    } else if (phase === 'waiting') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 32);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return (
    <span style={{ color: 'var(--text-hi)', fontWeight: 500 }}>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   WOW FACTOR 2 — STAT COUNTER
═══════════════════════════════════════════════════════════ */
function useCountUp(target, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, start }) {
  const count = useCountUp(value, 1200, start);
  return (
    <div className="stat-card">
      <div className="stat-number">
        {count}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CASE STUDY VIEW (Cinematic Takeover)
═══════════════════════════════════════════════════════════ */
function ProjectCaseStudy({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const hasMedia = project.images && project.images.length > 0;
  const mainMedia = hasMedia ? project.images[0] : null;
  const isVideo = mainMedia && typeof mainMedia === 'string' && mainMedia.includes('.mp4');

  return (
    <div className="cinematic-overlay" onClick={onClose}>
      <div className="cinematic-container" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="cinematic-close">
          <X size={24} />
        </button>

        {/* Cinematic Background Layer */}
        <div className="cinematic-bg-layer">
          {isVideo ? (
            <video src={mainMedia} autoPlay loop muted playsInline className="cinematic-media" />
          ) : mainMedia ? (
            <img src={mainMedia} alt={project.title} className="cinematic-media" />
          ) : (
            <div className="cinematic-media" style={{ background: 'var(--bg)' }} />
          )}
          <div className="cinematic-gradient" />
        </div>

        {/* Content Layer */}
        <div className="cinematic-content">
          <div className="cinematic-text-block">
            <div className="text-label" style={{ marginBottom: '16px' }}>{project.type}</div>
            <h2 className="cinematic-title">{project.title}</h2>
            <p className="cinematic-desc">{project.detail}</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {project.tech.map(t => <span key={t} className="badge badge-cinematic">{t}</span>)}
            </div>
            
            {project.link && (
              <div style={{ marginBottom: '40px' }}>
                <MagneticButton
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cinematic-btn"
                >
                  VISIT LIVE SITE <ArrowUpRight size={14} />
                </MagneticButton>
              </div>
            )}
          </div>

          {/* Secondary Gallery Carousel */}
          {hasMedia && project.images.length > 1 && (
            <div className="cinematic-carousel">
              {project.images.slice(1).map((media, idx) => {
                const isVid = typeof media === 'string' && media.includes('.mp4');
                return isVid ? (
                  <video key={idx} src={media} autoPlay loop muted playsInline className="cinematic-carousel-item" />
                ) : (
                  <img key={idx} src={media} alt="Screenshot" className="cinematic-carousel-item" />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION LABEL (sticky header — Brittany Chiang style)
═══════════════════════════════════════════════════════════ */
function SectionLabel({ children }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      paddingTop: '16px', paddingBottom: '16px',
      backdropFilter: 'blur(16px)',
      background: 'rgba(10,14,20,0.8)',
      marginBottom: '32px',
    }}>
      <h2 className="text-section-head">
        <TextScramble text={children} speed={40} delay={100} />
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [hoverProject, setHoverProject] = useState(false);
  const statsRef = useRef(null);
  const appRef = useRef(null);

  const handleGlobalMouseMove = (e) => {
    if (!appRef.current) return;
    const rect = appRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    appRef.current.style.setProperty('--mouse-x', `${x}px`);
    appRef.current.style.setProperty('--mouse-y', `${y}px`);

    const mesh = document.getElementById('project-mesh');
    if (mesh) {
      mesh.style.left = `${e.clientX}px`;
      mesh.style.top = `${e.clientY}px`;
    }
  };

  useReveal();

  // Track active section
  useEffect(() => {
    if (loading) return;
    const observers = NAV_SECTIONS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [loading]);

  // Trigger stat counters
  useEffect(() => {
    if (loading || !statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSent(true);
      setTimeout(() => { setFormSent(false); setFormData({ name: '', email: '', message: '' }); }, 6000);
    }
  };

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div ref={appRef} onMouseMove={handleGlobalMouseMove} style={{ animation: 'fadeIn 0.7s ease-out forwards', minHeight: '100vh', position: 'relative' }}>
      <BackgroundCanvas />
      <CustomCursor />
      <WireframeGlobe />
      
      {/* Project Hover Mesh */}
      <div id="project-mesh" className={`project-hover-mesh ${hoverProject ? 'active' : ''}`} />

      <div className="app-layout">

        {/* ══════════════════════════════════════════════
            LEFT PANEL — sticky
        ══════════════════════════════════════════════ */}
        <header className="left-panel">

          {/* Top block */}
          <div>
            {/* Name */}
            <h1 className="text-hero" style={{ marginBottom: '10px' }}>
              Venura<br />Wickramasingha
            </h1>

            {/* Typewriter role — WOW FACTOR 1 */}
            <div className="text-role" style={{ marginBottom: '18px', minHeight: '24px' }}>
              <TypewriterRole />
            </div>

            {/* Short bio */}
            <p style={{
              fontSize: '13.5px', lineHeight: 1.75, color: 'var(--text-md)',
              maxWidth: '290px',
            }}>
              I build{' '}
              <span style={{ color: 'var(--gold)' }}>precise, high-performance</span>{' '}
              enterprise systems and immersive digital products — obsessing over every detail between concept and production.
            </p>

            {/* Status badge */}
            <div style={{
              marginTop: '22px', display: 'inline-flex', alignItems: 'center',
              gap: '8px', padding: '6px 14px',
              background: 'rgba(74,222,128,0.06)',
              border: '1px solid rgba(74,222,128,0.15)',
              borderRadius: '999px',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ade80', display: 'inline-block',
                animation: 'pulse 2.5s infinite',
              }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#4ade80' }}>
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            {/* Navigation */}
            <nav style={{ marginTop: '52px' }}>
              {NAV_SECTIONS.map(id => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link${activeSection === id ? ' active' : ''}`}
                >
                  <span className="nav-indicator" />
                  <span className="nav-label">
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            {SOCIALS.map(s => (
              <MagneticButton
                as="a"
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                style={{
                  color: 'var(--text-lo)',
                  display: 'flex',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-lo)'}
              >
                {s.icon}
              </MagneticButton>
            ))}
          </div>
        </header>

        {/* ══════════════════════════════════════════════
            RIGHT PANEL — scrolling content
        ══════════════════════════════════════════════ */}
        <main className="right-panel">

          {/* ── ABOUT ─────────────────────────────── */}
          <section id="about" style={{ marginBottom: '112px', scrollMarginTop: '88px' }}>
            <SectionLabel>About</SectionLabel>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)' }}>
                I'm a{' '}
                <span style={{ color: 'var(--text-hi)', fontWeight: 500 }}>Software Engineering undergraduate at SLIIT</span>{' '}
                and a Full Stack Developer Intern at{' '}
                <span style={{ color: 'var(--gold)' }}>Ceylon Innovation PVT</span>.
                Within my first month of internship, I independently designed, built, and deployed a
                production-grade Supermarket ERP & POS system — and haven't slowed down since.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)' }}>
                Beyond my day job, I collaborate remotely with a dedicated team of friends during the night to build real-world products. A prime example is our fully-fledged <span style={{ color: 'var(--text-hi)', fontWeight: 500 }}>Gym Management System</span>, which is already live and operating in production.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)' }}>
                I work across the full stack — from{' '}
                <span style={{ color: 'var(--gold)' }}>Flutter</span> mobile apps and{' '}
                <span style={{ color: 'var(--gold)' }}>.NET</span> backends to{' '}
                <span style={{ color: 'var(--gold)' }}>React</span> frontends and SQL databases.
                I've shipped 7+ real systems for real clients — spanning agriculture, automotive,
                event management, retail, and fitness industries.
              </p>
            </div>

            {/* Skills grid */}
            <div className="reveal reveal-d2" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '28px', marginTop: '32px',
            }}>
              {SKILLS.map(s => (
                <div key={s.cat}>
                  <div className="text-label" style={{ marginBottom: '10px' }}>{s.cat}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {s.items.map(item => <span key={item} className="badge">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* STAT COUNTERS — WOW FACTOR 3 */}
            <div
              ref={statsRef}
              className="reveal reveal-d3"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px', marginTop: '36px',
              }}
            >
              {STATS.map((s, i) => (
                <StatCard key={i} {...s} start={statsVisible} />
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ────────────────────────── */}
          <section id="experience" style={{ marginBottom: '112px', scrollMarginTop: '88px' }}>
            <SectionLabel>Experience</SectionLabel>
            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {EXPERIENCE.map((item, i) => (
                <li key={i} className={`reveal reveal-d${Math.min(i + 1, 4)}`}>
                  <div
                    className="card-hover"
                    style={{ padding: '22px', margin: '0 -22px', cursor: 'default' }}
                  >
                    {/* Company + title */}
                    <div style={{
                      display: 'flex', alignItems: 'flex-start',
                      justifyContent: 'space-between', marginBottom: '10px',
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '14.5px', fontWeight: 600,
                          color: 'var(--text-hi)', marginBottom: '3px', letterSpacing: '-0.2px',
                        }}>
                          {item.title}
                        </h3>
                        <div style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 500 }}>
                          {item.company}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '11px', color: 'var(--text-lo)',
                        letterSpacing: '0.5px', flexShrink: 0, paddingTop: '2px',
                      }}>
                        {item.location}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-md)', marginBottom: '14px' }}>
                      {item.desc}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.tech.map(t => <span key={t} className="badge">{t}</span>)}
                    </div>
                  </div>

                  {/* Separator */}
                  {i < EXPERIENCE.length - 1 && (
                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* ── PROJECTS ──────────────────────────── */}
          <section id="projects" style={{ marginBottom: '112px', scrollMarginTop: '88px' }}>
            <SectionLabel>Projects</SectionLabel>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {PROJECTS.map((p, i) => (
                <li key={p.id} className={`reveal reveal-d${Math.min(i + 1, 4)}`}>
                  <div
                    className="card-hover"
                    style={{ padding: '22px', margin: '0 -22px', cursor: 'pointer' }}
                    onClick={() => setSelectedProject(p)}
                    onMouseEnter={() => setHoverProject(true)}
                    onMouseLeave={() => setHoverProject(false)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div className="text-label" style={{ marginBottom: '8px' }}>{p.type}</div>
                        <h3 style={{
                          fontSize: '14.5px', fontWeight: 600,
                          color: 'var(--text-hi)', marginBottom: '8px', letterSpacing: '-0.2px',
                        }}>
                          {p.title}
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-md)', marginBottom: '14px' }}>
                          {p.desc}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
                        </div>
                      </div>
                      <div style={{ paddingLeft: '16px', paddingTop: '2px', color: 'var(--text-lo)', flexShrink: 0 }}>
                        <ArrowRight size={15} style={{ transition: 'transform 0.2s ease, color 0.2s ease' }} />
                      </div>
                    </div>
                  </div>
                  {i < PROJECTS.length - 1 && (
                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* ── CONTACT ───────────────────────────── */}
          <section id="contact" style={{ marginBottom: '80px', scrollMarginTop: '88px' }}>
            <SectionLabel>Contact</SectionLabel>

            <div className="reveal">
              <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)', maxWidth: '440px', marginBottom: '36px' }}>
                Open to select commissions and enterprise partnerships. Have a system to build or a challenge to solve?{' '}
                <span style={{ color: 'var(--text-hi)' }}>I'd love to hear from you.</span>
              </p>

              {/* Contact meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
                {[
                  { Icon: Mail, text: 'venura.wickramasingha@gmail.com', href: 'mailto:venura.wickramasingha@gmail.com' },
                  { Icon: MapPin, text: 'Colombo, Sri Lanka — Open to Remote', href: null },
                ].map(({ Icon, text, href }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    {href
                      ? <a href={href} className="gold-link" style={{ fontSize: '13.5px' }}>{text}</a>
                      : <span style={{ fontSize: '13.5px', color: 'var(--text-md)' }}>{text}</span>
                    }
                  </div>
                ))}
              </div>

              {/* Form */}
              {formSent ? (
                <div style={{
                  padding: '36px', border: '1px solid var(--gold-line)',
                  borderRadius: '12px', background: 'rgba(198,168,75,0.03)',
                  textAlign: 'center', animation: 'fadeUp 0.4s ease',
                }}>
                  <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '12px' }}>✦</div>
                  <h3 style={{ color: 'var(--text-hi)', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>
                    Message received
                  </h3>
                  <p style={{ color: 'var(--text-md)', fontSize: '13px' }}>
                    I'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '460px' }}>
                  {[
                    { id: 'name', label: 'Name', type: 'text', key: 'name' },
                    { id: 'email', label: 'Email', type: 'email', key: 'email' },
                  ].map(({ id, label, type, key }) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label htmlFor={id} className="text-label">{label}</label>
                      <input
                        id={id} type={type} required
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        className="form-input"
                        placeholder={`Your ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="message" className="text-label">Message</label>
                    <textarea
                      id="message" required rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="form-input"
                      placeholder="Tell me about your project..."
                      style={{ resize: 'none' }}
                    />
                  </div>
                  <MagneticButton
                    as="button"
                    type="submit"
                    style={{
                      alignSelf: 'flex-start',
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '11px 26px',
                      background: 'transparent',
                      border: '1px solid var(--gold-line)',
                      borderRadius: '6px',
                      color: 'var(--gold)',
                      fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px',
                      cursor: 'pointer', fontFamily: 'var(--font)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--gold-dim)';
                      e.currentTarget.style.borderColor = 'var(--gold)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'var(--gold-line)';
                    }}
                  >
                    SEND MESSAGE <ArrowUpRight size={12} />
                  </MagneticButton>
                </form>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer style={{ borderTop: '1px solid var(--border)', paddingTop: '36px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-lo)', lineHeight: 1.8 }}>
              Designed & built by{' '}
              <span style={{ color: 'var(--text-md)' }}>Venura Wickramasingha</span>.
            </p>
          </footer>
        </main>
      </div>

      {/* Project Case Study */}
      {selectedProject && (
        <ProjectCaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
