import { useState } from 'react';
import { ExternalLink, ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Enterprise ERP Platform',
    desc: 'Full-stack multi-tenant ERP system with real-time analytics, inventory workflows, and role-based access. Built on .NET Core + React with SQL Server cluster.',
    tech: ['React', '.NET Core', 'SQL Server', 'Azure'],
    type: 'Enterprise',
    year: '2024',
    detail: 'Architected from the ground up for a UK-based manufacturing client. Replaced their legacy Access DB system with a cloud-ready, real-time platform serving 200+ concurrent users. Query optimisation reduced average report load from 8s → 0.4s.',
  },
  {
    id: 2,
    title: 'Cross-Platform POS System',
    desc: 'Flutter-based point-of-sale application with offline-first architecture, SQLite sync, and live barcode scanning for retail chains.',
    tech: ['Flutter', 'Dart', 'SQLite', 'REST API'],
    type: 'Mobile',
    year: '2023',
    detail: 'Deployed across 12 retail branches in Sri Lanka. Offline-first design ensures zero downtime at point of sale even without network connectivity. Real-time sync resolves conflicts on reconnection.',
  },
  {
    id: 3,
    title: 'Premium Brand Portfolio',
    desc: 'Immersive agency portfolio built with React, GSAP ScrollTrigger, and WebGL shader backgrounds. Scored 98 on Lighthouse performance.',
    tech: ['React', 'GSAP', 'WebGL', 'TypeScript'],
    type: 'Web / Creative',
    year: '2023',
    detail: 'Built for a Colombo digital agency to showcase their brand identity projects. Features custom scroll-driven animations, kinetic typography, and a canvas-based interactive particle system.',
  },
  {
    id: 4,
    title: 'BI Dashboard Suite',
    desc: 'Spring Boot + React business intelligence dashboard with configurable chart panels, CSV export, and live SQL query builder.',
    tech: ['React', 'Spring Boot', 'MySQL', 'Chart.js'],
    type: 'Analytics',
    year: '2022',
    detail: 'Delivered for a logistics company to replace manual spreadsheet reporting. Features a drag-and-drop dashboard builder, scheduled PDF exports, and role-based data access policies.',
  },
];

export default function ProjectShowcase() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {/* Project list (Brittany Chiang style) */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {projects.map((p, idx) => (
          <li key={p.id}>
            <div
              className="card-hover interactive"
              style={{ padding: '20px', margin: '-20px', cursor: 'pointer' }}
              onClick={() => setSelected(p)}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '12px',
                alignItems: 'start',
              }}>
                <div>
                  {/* Type / year meta */}
                  <div style={{
                    display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px',
                  }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px',
                      color: '#c9a84c',
                    }}>
                      {p.type.toUpperCase()}
                    </span>
                    <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: '10px', color: '#484f58', letterSpacing: '1px' }}>{p.year}</span>
                  </div>

                  <h3 style={{
                    fontSize: '15px', fontWeight: 600,
                    color: '#e6edf3', marginBottom: '8px',
                    transition: 'color 0.2s ease',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#8b949e', marginBottom: '12px' }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.tech.map(t => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow icon */}
                <div style={{
                  color: '#484f58', paddingTop: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal overlay */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(13,17,23,0.88)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#161b22',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '560px',
              width: '100%',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              className="interactive"
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'transparent', border: 'none',
                color: '#484f58', cursor: 'pointer',
                padding: '4px', display: 'flex',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#e6edf3'}
              onMouseLeave={e => e.currentTarget.style.color = '#484f58'}
            >
              <X size={18} />
            </button>

            <div style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
              color: '#c9a84c', marginBottom: '12px',
            }}>
              {selected.type.toUpperCase()} · {selected.year}
            </div>
            <h2 style={{
              fontSize: '22px', fontWeight: 700,
              color: '#e6edf3', marginBottom: '16px',
            }}>
              {selected.title}
            </h2>
            <p style={{
              fontSize: '14px', lineHeight: 1.8,
              color: '#8b949e', marginBottom: '24px',
            }}>
              {selected.detail}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {selected.tech.map(t => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>

            <div style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '12px', alignItems: 'center',
            }}>
              <span style={{ fontSize: '12px', color: '#484f58' }}>Available on request</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
