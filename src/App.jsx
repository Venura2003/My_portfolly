import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, Mail, MapPin, ArrowRight, X, Menu, ChevronLeft, ChevronRight, Maximize2, CheckCircle2, Sparkles, AlertCircle, Workflow, TrendingUp, Layers, ShieldCheck, Cpu } from 'lucide-react';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import TextScramble from './components/TextScramble';
import MagneticButton from './components/MagneticButton';
import WireframeGlobe from './components/WireframeGlobe';
import DeveloperTerminal from './components/DeveloperTerminal';
import SystemFlowSimulator from './components/SystemFlowSimulator';

import {
  imgProfile,
  ROLES,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  SOCIALS,
  STATS,
  NAV_SECTIONS,
} from './data/portfolioData';

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
   FULLSCREEN LIGHTBOX MODAL (Image Zoom & Carousel)
═══════════════════════════════════════════════════════════ */
function LightboxModal({ images, activeIndex, onClose, onNavigate }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, images.length, onClose, onNavigate]);

  const currentMedia = images[activeIndex];
  const isVideo = currentMedia && typeof currentMedia === 'string' && currentMedia.endsWith('.mp4');

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        background: 'rgba(5, 7, 10, 0.97)', backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '20px', animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          position: 'absolute', top: '20px', left: '24px', right: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 1000
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          fontSize: '11px', fontWeight: 700, color: 'var(--gold-light)',
          background: 'var(--gold-dim)', border: '1px solid var(--gold-line)',
          padding: '5px 16px', borderRadius: '999px', letterSpacing: '1.5px',
          textTransform: 'uppercase'
        }}>
          SCREENSHOT {activeIndex + 1} OF {images.length}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff', borderRadius: '50%', padding: '10px',
            cursor: 'pointer', display: 'flex', transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Fullscreen Stage */}
      <div
        style={{
          position: 'relative', maxWidth: '94vw', maxHeight: '82vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={e => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={currentMedia}
            autoPlay loop muted playsInline controls
            style={{
              maxWidth: '100%', maxHeight: '82vh', borderRadius: '12px',
              boxShadow: '0 25px 80px rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        ) : (
          <img
            src={currentMedia}
            alt={`Fullscreen view ${activeIndex + 1}`}
            style={{
              maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain',
              borderRadius: '12px', boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        )}

        {/* Prev Arrow */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
            style={{
              position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(10, 14, 20, 0.9)', border: '1px solid var(--gold-line)',
              color: 'var(--gold)', borderRadius: '50%', padding: '14px',
              cursor: 'pointer', display: 'flex', backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dim)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10, 14, 20, 0.9)'}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            style={{
              position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(10, 14, 20, 0.9)', border: '1px solid var(--gold-line)',
              color: 'var(--gold)', borderRadius: '50%', padding: '14px',
              cursor: 'pointer', display: 'flex', backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)', transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-dim)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10, 14, 20, 0.9)'}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Selector Bar */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute', bottom: '24px', display: 'flex', gap: '10px',
            background: 'rgba(10,14,20,0.85)', padding: '8px 16px', borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)'
          }}
          onClick={e => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              style={{
                width: '48px', height: '36px', borderRadius: '6px', overflow: 'hidden',
                border: activeIndex === idx ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.2)',
                opacity: activeIndex === idx ? 1 : 0.5, cursor: 'pointer', padding: 0,
                background: '#000', transition: 'all 0.2s ease'
              }}
            >
              {typeof img === 'string' && img.endsWith('.mp4') ? (
                <video src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CASE STUDY VIEW (Cinematic Interactive Overlay)
═══════════════════════════════════════════════════════════ */
function ProjectCaseStudy({ project, onClose }) {
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(project.initialTab || 'overview');

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !isLightboxOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, isLightboxOpen]);

  const hasMedia = project.images && project.images.length > 0;
  const currentMedia = hasMedia ? project.images[activeMediaIdx] : null;
  const isVideo = currentMedia && typeof currentMedia === 'string' && currentMedia.endsWith('.mp4');

  return (
    <div className="split-overlay" onClick={onClose}>
      <div className="split-container" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="split-close" aria-label="Close Case Study">
          <X size={22} />
        </button>

        {/* Left Panel: Main Media Stage & Thumbnail Switcher */}
        <div className="split-media-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Main Media Stage */}
          <div
            style={{
              position: 'relative', flex: 1, cursor: hasMedia ? 'zoom-in' : 'default',
              overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={() => hasMedia && setIsLightboxOpen(true)}
            title="Click to view fullscreen"
          >
            {isVideo ? (
              <video src={currentMedia} autoPlay loop muted playsInline className="split-main-media" />
            ) : currentMedia ? (
              <img src={currentMedia} alt={project.title} className="split-main-media" />
            ) : (
              <div className="split-main-media empty-media" />
            )}

            {/* Click to Enlarge Overlay Badge */}
            {hasMedia && (
              <div style={{
                position: 'absolute', bottom: '16px', right: '16px', zIndex: 10,
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(10, 14, 20, 0.85)', border: '1px solid var(--gold-line)',
                color: 'var(--gold-light)', fontSize: '11px', fontWeight: 600,
                padding: '6px 14px', borderRadius: '999px', backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease', cursor: 'pointer'
              }}>
                <Maximize2 size={13} /> Click to Enlarge
              </div>
            )}
            <div className="split-media-overlay" />
          </div>

          {/* Interactive Thumbnail Bar (Below Main Stage) */}
          {hasMedia && project.images.length > 1 && (
            <div style={{
              padding: '12px 16px', background: 'rgba(10, 14, 20, 0.95)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '10px', overflowX: 'auto'
            }} className="hide-scrollbar">
              {project.images.map((img, idx) => {
                const isVid = typeof img === 'string' && img.endsWith('.mp4');
                const isActive = activeMediaIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIdx(idx)}
                    style={{
                      flexShrink: 0, width: '70px', height: '48px', borderRadius: '6px',
                      overflow: 'hidden', border: isActive ? '2px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                      opacity: isActive ? 1 : 0.6, cursor: 'pointer', padding: 0,
                      background: '#000', transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 0 12px rgba(198,168,75,0.3)' : 'none'
                    }}
                  >
                    {isVid ? (
                      <video src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Panel: Rich Structured Case Study Details */}
        <div className="split-content-panel">
          <div className="split-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <div className={`case-study-status-badge ${project.statusBadge?.toLowerCase().includes('live') ? 'live' : ''}`}>
                <span className="status-dot" />
                {project.statusBadge || project.type}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', fontWeight: 700, color: 'var(--gold-light)',
                    background: 'var(--gold-dim)', border: '1px solid var(--gold-line)',
                    padding: '3px 10px', borderRadius: '999px', textDecoration: 'none'
                  }}
                >
                  Live Demo <ArrowUpRight size={12} />
                </a>
              )}
            </div>

            <h2 className="split-title">{project.title}</h2>

            {/* Linear / Stripe Style Tab Switcher */}
            <div className="case-study-tabs">
              <button
                className={`case-study-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span>📌 Story & Overview</span>
              </button>
              
              {project.systemFlow && project.systemFlow.length > 0 && (
                <button
                  className={`case-study-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  <span className="tab-pulse-dot" />
                  <span>⚡ Architecture Flow</span>
                </button>
              )}

              {project.features && project.features.length > 0 && (
                <button
                  className={`case-study-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  <span>✨ Key Features</span>
                </button>
              )}
            </div>
          </div>

          <div className="split-body">
            {activeTab === 'overview' && (
              <>
                {/* Engineering Impact Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="impact-metrics-grid">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="impact-metric-box">
                        <span className="impact-metric-val">{m.val}</span>
                        <span className="impact-metric-lbl">{m.lbl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* The Problem vs The Engineering Architecture (STAR Framework) */}
                {project.problem && project.architecture && (
                  <div className="star-grid">
                    <div className="star-card problem">
                      <div className="star-card-title">
                        <AlertCircle size={14} /> The Problem & Bottlenecks
                      </div>
                      <p className="star-card-text">{project.problem}</p>
                    </div>
                    <div className="star-card architecture">
                      <div className="star-card-title">
                        <Cpu size={14} /> Architectural Decision
                      </div>
                      <p className="star-card-text">{project.architecture}</p>
                    </div>
                  </div>
                )}

                {/* Overview Detail */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
                    📌 System Overview
                  </h3>
                  <p className="split-desc" style={{ marginBottom: 0 }}>
                    {project.detail}
                  </p>
                </div>

                {/* Jump to Architecture banner */}
                {project.systemFlow && project.systemFlow.length > 0 && (
                  <div className="tab-jump-banner" onClick={() => setActiveTab('architecture')}>
                    <span>⚡ Want to simulate the live request flow?</span>
                    <strong>Open Architecture Simulator ➔</strong>
                  </div>
                )}
              </>
            )}

            {activeTab === 'architecture' && (
              <>
                {/* Interactive System Architecture Flow Simulator */}
                {project.systemFlow && project.systemFlow.length > 0 && (
                  <SystemFlowSimulator systemFlow={project.systemFlow} projectTitle={project.title} />
                )}

                {/* Tech Stack Pills */}
                <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>
                    🛠️ Tech Stack & Architecture
                  </h3>
                  <div className="split-tech-stack">
                    {project.tech.map(t => <span key={t} className="badge badge-split">{t}</span>)}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'features' && (
              <>
                {/* Key Features & System Highlights */}
                {project.features && project.features.length > 0 && (
                  <div style={{ marginBottom: '28px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} /> Key Features & Capabilities
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {project.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--text-hi)', lineHeight: 1.6 }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '14px' }}>
                    🛠️ Technologies Used
                  </h3>
                  <div className="split-tech-stack">
                    {project.tech.map(t => <span key={t} className="badge badge-split">{t}</span>)}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Action Footer (Only when live site link exists) */}
          {project.link && (
            <div className="split-footer">
              <MagneticButton
                as="a"
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="split-btn"
              >
                VISIT LIVE SITE <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Trigger */}
      {isLightboxOpen && hasMedia && (
        <LightboxModal
          images={project.images}
          activeIndex={activeMediaIdx}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(idx) => setActiveMediaIdx(idx)}
        />
      )}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

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

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL OBSERVER
  ═══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: observer.unobserve(entry.target) if you only want it to reveal once
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeFilter]);

  /* ═══════════════════════════════════════════════════════════
     3D TILT EFFECT FOR CARDS
  ═══════════════════════════════════════════════════════════ */
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  if (loading) return <Preloader onComplete={() => setLoading(false)} />;

  return (
    <div ref={appRef} onMouseMove={handleGlobalMouseMove} style={{ minHeight: '100vh' }}>
      {/* Film Grain Overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E")', mixBlendMode: 'overlay' }} />

      <BackgroundCanvas />
      <CustomCursor />
      <DeveloperTerminal />
      
      {/* Project Hover Mesh */}
      <div id="project-mesh" className={`project-hover-mesh ${hoverProject ? 'active' : ''}`} />

      {/* Mobile Sticky Header */}
      <div className="mobile-header">
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            background: 'rgba(198, 168, 75, 0.08)',
            border: '1px solid rgba(198, 168, 75, 0.3)',
            borderRadius: '50%',
            color: 'var(--gold)',
            cursor: 'pointer',
            zIndex: 100001,
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
          }}
        >
          {isMobileMenuOpen ? (
            <X size={20} color="#c6a84b" strokeWidth={2} />
          ) : (
            <Menu size={20} color="#c6a84b" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: 'absolute', top: '24px', right: '20px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--gold)', borderRadius: '50%', padding: '10px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10005
          }}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <nav className="mobile-nav-menu">
          {NAV_SECTIONS.map((id, index) => (
            <a
              key={id}
              href={`#${id}`}
              className={`mobile-nav-link${activeSection === id ? ' active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <span className="mobile-nav-num">0{index + 1}.</span>
              <span className="mobile-nav-label">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </span>
            </a>
          ))}
        </nav>
        
        <div className="mobile-nav-footer">
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-start' }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-social-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

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

            {/* Status & CTA */}
            <div style={{
              marginTop: '22px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap'
            }}>
              {/* Status badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
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

              {/* Download CV CTA */}
              <a 
                href="/cv.html" 
                target="_blank"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '6px 16px', background: 'var(--gold-dim)',
                  border: '1px solid var(--gold-line)', borderRadius: '999px',
                  color: 'var(--gold-light)', fontSize: '10px', fontWeight: 700,
                  letterSpacing: '1.5px', textDecoration: 'none', transition: 'all 0.2s ease',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gold)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--gold-dim)';
                  e.currentTarget.style.color = 'var(--gold-light)';
                }}
              >
                Download CV
              </a>
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

          {/* Social links */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '7px 14px', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)', borderRadius: '999px',
                  color: 'var(--text-hi)', fontSize: '11.5px', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--gold-dim)';
                  e.currentTarget.style.borderColor = 'var(--gold-line)';
                  e.currentTarget.style.color = 'var(--gold-light)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-hi)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </header>

        {/* ══════════════════════════════════════════════
            RIGHT PANEL — scrolling content
        ══════════════════════════════════════════════ */}
        <main className="right-panel">

          {/* ── ABOUT (BENTO BOX LAYOUT) ─────────────────────────────── */}
          <section id="about" style={{ marginBottom: '112px', scrollMarginTop: '88px' }}>
            <SectionLabel>About</SectionLabel>

            <div className="bento-grid reveal">
              {/* Main Bio Card */}
              <div className="bento-card bio-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img 
                    src={imgProfile} 
                    alt="Venura Wickramasingha" 
                    style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }} 
                  />
                  <h3 className="bento-title" style={{ margin: 0 }}>Who I Am</h3>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)' }}>
                  I'm a <span style={{ color: 'var(--text-hi)', fontWeight: 500 }}>Software Engineering undergraduate at SLIIT</span> and a <span style={{ color: 'var(--gold)' }}>Full Stack Software Engineer</span> at Ceylon Innovation Services. 
                  Within my first month, I independently designed and deployed a production-grade Supermarket ERP & POS system.
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--text-md)', marginTop: '12px' }}>
                  I work across the full stack — from Flutter mobile apps to .NET backends and React frontends. I've shipped 7+ real systems for real clients.
                </p>
              </div>

              {/* Location Card */}
              <div className="bento-card location-card" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <WireframeGlobe />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <MapPin size={32} color="var(--gold)" style={{ marginBottom: '12px' }} />
                  <h3 className="bento-title" style={{ marginBottom: '4px' }}>Based in</h3>
                  <p style={{ color: 'var(--text-hi)', fontWeight: 600 }}>Sri Lanka</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-md)', marginTop: '4px' }}>Available globally</p>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="bento-card skills-card" style={{ gridColumn: '1 / -1' }}>
                <h3 className="bento-title" style={{ marginBottom: '20px' }}>Tech Stack</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                  {SKILLS.map(s => (
                    <div key={s.cat}>
                      <div className="text-label" style={{ marginBottom: '10px' }}>{s.cat}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {s.items.map(item => <span key={item} className="badge">{item}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ENGINEERING IMPACT HIGHLIGHTS */}
            <div className="reveal reveal-d2" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {[
                { badge: '⚡ Month 1 Delivery', title: 'Supermarket ERP & POS', desc: 'Independently architected & shipped a 4-module ERP within 30 days.' },
                { badge: '📦 7+ Production Systems', title: 'Enterprise & Client Scale', desc: 'Shipped systems across Retail POS, Agriculture, Auto Auction & Gyms.' },
                { badge: '🛡️ 99.9% Cashier Uptime', title: 'Offline-First Caching', desc: 'Built local SQLite buffering for high-volume billing terminals.' },
                { badge: '🌐 Full Stack Core', title: 'Flutter · .NET · React', desc: 'Cross-platform mobile, REST API backends & Azure deployments.' },
              ].map((item, idx) => (
                <div key={idx} className="bento-card" style={{ padding: '18px 20px', background: 'rgba(15, 20, 28, 0.7)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {item.badge}
                  </span>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-hi)', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-md)', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* STAT COUNTERS — WOW FACTOR 3 */}
            <div
              ref={statsRef}
              className="stats-grid reveal reveal-d3"
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
                      flexWrap: 'wrap', gap: '8px'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '14.5px', fontWeight: 600,
                          color: 'var(--text-hi)', marginBottom: '3px', letterSpacing: '-0.2px',
                        }}>
                          {item.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600 }}>
                            {item.company}
                          </span>
                          {item.period && (
                            <span style={{
                              fontSize: '11px', color: 'var(--gold-light)',
                              background: 'var(--gold-dim)', border: '1px solid var(--gold-line)',
                              padding: '2px 8px', borderRadius: '999px', fontWeight: 500
                            }}>
                              {item.period}
                            </span>
                          )}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '11px', color: '#94a3b8',
                        letterSpacing: '0.5px', flexShrink: 0, paddingTop: '2px', fontWeight: 500
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <SectionLabel>Projects</SectionLabel>
              
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="project-filters hide-scrollbar">
                {['All', 'Enterprise', 'Client', 'Live'].map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      background: activeFilter === f ? 'var(--gold-dim)' : 'transparent',
                      color: activeFilter === f ? 'var(--gold)' : 'var(--text-md)',
                      border: `1px solid ${activeFilter === f ? 'var(--gold-line)' : 'var(--border)'}`,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {PROJECTS.filter(p => activeFilter === 'All' || p.type.includes(activeFilter)).map((p, i) => (
                <li key={p.id} className={`reveal reveal-d${Math.min(i + 1, 4)}`}>
                    <div
                      className="card-hover project-card-item"
                      style={{ padding: '22px', margin: '0 -22px', cursor: 'pointer', display: 'flex', gap: '20px', alignItems: 'center' }}
                      onClick={() => setSelectedProject(p)}
                      onMouseEnter={() => setHoverProject(true)}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={(e) => {
                        setHoverProject(false);
                        handleCardMouseLeave(e);
                      }}
                    >
                      {/* Thumbnail Image */}
                      {p.images && p.images[0] && (
                        <div className="project-card-thumb" style={{ flexShrink: 0, width: '130px', height: '86px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-hover)' }}>
                          {p.images[0].endsWith('.mp4') ? (
                            <video src={p.images[0]} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                          ) : (
                            <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                          )}
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span className="text-label">{p.type}</span>
                            {p.statusBadge && (
                              <span className={`card-status-badge ${p.statusBadge.toLowerCase().includes('live') ? 'live' : ''}`}>
                                <span className="status-dot" />
                                {p.statusBadge}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                            {p.systemFlow && p.systemFlow.length > 0 && (
                              <button
                                onClick={() => setSelectedProject({ ...p, initialTab: 'architecture' })}
                                className="card-flow-action-btn"
                                title="Open Live System Architecture Simulator"
                              >
                                <span className="tab-pulse-dot" />
                                <span>⚡ Architecture Flow</span>
                              </button>
                            )}

                            {p.link ? (
                              <a
                                href={p.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                                  fontSize: '11px', fontWeight: 700, color: 'var(--gold-light)',
                                  background: 'var(--gold-dim)', border: '1px solid var(--gold-line)',
                                  padding: '4px 10px', borderRadius: '999px', textDecoration: 'none',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'var(--gold)';
                                  e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'var(--gold-dim)';
                                  e.currentTarget.style.color = 'var(--gold-light)';
                                }}
                              >
                                Live Demo <ArrowUpRight size={12} />
                              </a>
                            ) : (
                              <span style={{
                                fontSize: '10px', fontWeight: 600, color: '#94a3b8',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                                padding: '3px 8px', borderRadius: '999px'
                              }}>
                                🏢 Enterprise Server
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 style={{
                          fontSize: '14.5px', fontWeight: 600,
                          color: 'var(--text-hi)', marginBottom: '8px', letterSpacing: '-0.2px',
                        }}>
                          {p.title}
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: 1.75, color: 'var(--text-md)', marginBottom: '14px' }}>
                          {p.desc}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
                          </div>
                          <span className="card-explore-hint">
                            Case Study & System Specs <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '3px' }} />
                          </span>
                        </div>
                      </div>

                      <div style={{ color: '#94a3b8', flexShrink: 0, alignSelf: 'center' }} title="Click to view details">
                        <ArrowRight size={16} className="card-end-arrow" />
                      </div>
                    </div>
                  {i < PROJECTS.length - 1 && (
                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* ── QUICK HIRE & COMMISSIONS BANNER ───────────────────────────── */}
          <div className="reveal" style={{
            marginBottom: '64px',
            padding: '32px 28px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(198,168,75,0.08) 0%, rgba(15,20,28,0.85) 100%)',
            border: '1px solid var(--gold-line)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="text-label" style={{ marginBottom: '8px', color: 'var(--gold)' }}>
                ✦ AVAILABLE FOR SELECT ROLES & COMMISSIONS
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 3vw, 26px)',
                fontWeight: 700,
                color: 'var(--text-hi)',
                marginBottom: '10px'
              }}>
                Looking for a Full Stack & Flutter Engineer who ships from Day 1?
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-md)', maxWidth: '560px', marginBottom: '24px', lineHeight: 1.7 }}>
                Whether you need a high-performance POS platform, a Flutter mobile app, or a scalable .NET/React system — I deliver production-ready software with speed and precision.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/94707238483?text=Hi%20Venura,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', background: '#25D366',
                    color: '#000', fontWeight: 700, fontSize: '11.5px',
                    borderRadius: '999px', textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(37,211,102,0.25)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  💬 WhatsApp Direct
                </a>
                <a
                  href="mailto:uthsaravenura@gmail.com"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', background: 'var(--gold-dim)',
                    border: '1px solid var(--gold-line)', color: 'var(--gold-light)',
                    fontWeight: 700, fontSize: '11.5px', borderRadius: '999px',
                    textDecoration: 'none', transition: 'all 0.2s ease'
                  }}
                >
                  ✉️ Quick Email
                </a>
                <a
                  href="/cv.html"
                  target="_blank"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px', background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border)', color: 'var(--text-hi)',
                    fontWeight: 600, fontSize: '11.5px', borderRadius: '999px',
                    textDecoration: 'none', transition: 'all 0.2s ease'
                  }}
                >
                  📄 Download CV (PDF)
                </a>
              </div>
            </div>
          </div>

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
                  { Icon: Mail, text: 'uthsaravenura@gmail.com', href: 'mailto:uthsaravenura@gmail.com' },
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
