import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
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

    // Hide default cursor
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: -3, left: -3,
        width: 6, height: 6, borderRadius: '50%',
        backgroundColor: hovered ? 'transparent' : '#c9a84c',
        pointerEvents: 'none', zIndex: 999999,
        transition: 'background-color 0.2s ease',
        transform: 'translate3d(0,0,0)',
      }} />
      <div ref={ringRef} style={{
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
