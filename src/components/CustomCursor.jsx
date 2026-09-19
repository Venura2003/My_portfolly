import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      const touchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024;
      setIsMobile(touchDevice);
    };
    checkMobile();

    const onTouch = () => setIsMobile(true);

    window.addEventListener('resize', checkMobile);
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = 'auto';
      return;
    }

    const onMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onOver = (e) => {
      const t = e.target;
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('.interactive') || t.closest('a') || t.closest('button')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.innerHTML = `@media (min-width: 1025px) { * { cursor: none !important; } }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.style.cursor = 'auto';
      const el = document.getElementById('custom-cursor-style');
      if (el) document.head.removeChild(el);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-element" style={{
        position: 'fixed', top: -3, left: -3,
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: hovered ? 'transparent' : '#c9a84c',
        pointerEvents: 'none', zIndex: 999999,
        transition: 'background-color 0.2s ease',
        transform: 'translate3d(0,0,0)',
      }} />
      <div ref={ringRef} className="custom-cursor-element" style={{
        position: 'fixed', top: -18, left: -18,
        width: hovered ? 52 : 36, height: hovered ? 52 : 36,
        borderRadius: '50%',
        border: hovered ? '1.5px solid #c9a84c' : '1px solid rgba(201,168,76,0.4)',
        backgroundColor: hovered ? 'rgba(201,168,76,0.04)' : 'transparent',
        pointerEvents: 'none', zIndex: 999998,
        transition: 'width 0.3s ease, height 0.3s ease, border 0.3s ease, background-color 0.3s ease',
        transform: 'translate3d(0,0,0)',
      }} />
    </>
  );
}

