import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import TextScramble from './TextScramble';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    
    // Live clock update for Colombo (GMT+5:30)
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    window.addEventListener('scroll', handleScroll);
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1000px',
        zIndex: 999,
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(0, 240, 255, 0.15)',
        backgroundColor: 'rgba(5, 5, 8, 0.65)',
        borderRadius: '40px',
        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Scroll Progress Bar inside the pill */}
      <div
        style={{
          width: `${scrollProgress}%`,
          height: '1px',
          backgroundColor: '#00f0ff',
          position: 'absolute',
          bottom: 0,
          left: '20px',
          right: '20px',
          maxWidth: 'calc(100% - 40px)',
          transition: 'width 0.1s ease-out',
        }}
      />

      <div
        style={{
          padding: '0 30px',
          height: '64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Editorial Logo */}
        <a
          href="#home"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '18px',
            letterSpacing: '4px',
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: '300',
            background: 'linear-gradient(to right, #ffffff, #00f0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          VENURA
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
          }}
          className="desktop-menu"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontSize: '10px',
                fontWeight: '600',
                letterSpacing: '2px',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#00f0ff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.6)')}
            >
              <TextScramble text={item.label} speed={40} />
            </a>
          ))}
        </div>

        {/* Right Info: Status & Time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
          className="desktop-menu"
        >
          {/* Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#39ff14',
                boxShadow: '0 0 10px #39ff14',
                display: 'inline-block',
                animation: 'pulseGold 2s infinite',
              }}
            />
            <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)' }}>
              ACTIVE COMMISSIONS
            </span>
          </div>

          {/* Colombo Time */}
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--accent-gold)' }}>
            {currentTime || '10:00:00 AM'}
          </span>
        </div>

        {/* Mobile menu toggle */}
        <div style={{ display: 'none' }} className="mobile-menu-btn">
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '74px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(6, 6, 8, 0.95)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxSizing: 'border-box',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '2px',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
              TIME (COLOMBO):
            </span>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--accent-gold)' }}>
              {currentTime}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
