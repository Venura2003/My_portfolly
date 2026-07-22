import { useEffect, useState } from 'react';

const STAGES = [
  { at: 25, msg: 'Compiling experience data...' },
  { at: 55, msg: 'Loading project case studies...' },
  { at: 82, msg: 'Rendering architecture blueprints...' },
  { at: 95, msg: 'Preparing presentation...' },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initialising environment...');
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 3.5 + 0.8, 100);
        STAGES.forEach(s => { if (p < s.at && next >= s.at) setStatus(s.msg); });
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 700);
          }, 500);
        }
        return next;
      });
    }, 55);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0e14',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 99999,
      fontFamily: "'Inter', system-ui, sans-serif",
      opacity: exiting ? 0 : 1,
      transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Wordmark */}
      <div style={{
        fontSize: '10px', fontWeight: 700, letterSpacing: '5px',
        color: '#c6a84b', marginBottom: '52px',
        textTransform: 'uppercase', opacity: 0.85,
      }}>
        Venura Wickramasingha
      </div>

      {/* Large counter */}
      <div style={{
        fontSize: '88px', fontWeight: 300, lineHeight: 1,
        color: '#dde5f0', marginBottom: '36px',
        letterSpacing: '-4px', fontVariantNumeric: 'tabular-nums',
      }}>
        {String(Math.floor(progress)).padStart(2, '0')}
        <span style={{ fontSize: '28px', color: '#3d4f63', letterSpacing: '0' }}>%</span>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '220px', height: '1px',
        background: 'rgba(198,168,75,0.08)',
        position: 'relative', marginBottom: '22px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          background: 'linear-gradient(90deg, #c6a84b, #d9bc72)',
          width: `${progress}%`,
          transition: 'width 0.12s linear',
        }} />
      </div>

      {/* Status */}
      <p style={{
        fontSize: '11px', color: '#3d4f63',
        letterSpacing: '0.5px', minHeight: '16px',
        transition: 'opacity 0.3s ease',
      }}>
        {status}
      </p>
    </div>
  );
}
