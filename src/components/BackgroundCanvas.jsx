import { useEffect, useRef } from 'react';

// ─── Particle Constellation Config ─────────────────────────────────────────
const PARTICLE_COUNT = 18;
const MAX_DIST = 130;

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      mouse.current = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseleave', () => {
      mouse.current = { x: -1000, y: -1000 };
    });

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      r: rand(1.2, 2.2),
    }));

    const render = () => {
      const { x: mx, y: my } = mouse.current;
      const w = canvas.width, h = canvas.height;

      // Dark navy base
      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(0, 0, w, h);

      // Mouse-tracked radial spotlight (gold tint)
      const spot = ctx.createRadialGradient(mx, my, 0, mx, my, 520);
      spot.addColorStop(0, 'rgba(198, 168, 75, 0.035)');
      spot.addColorStop(0.5, 'rgba(29, 60, 120, 0.025)');
      spot.addColorStop(1, 'rgba(10, 14, 20, 0)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.012)';
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < w; gx += 90) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 90) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // Update & draw particles
      particles.current.forEach(p => {
        // Gentle mouse repulsion
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.6) { p.vx = (p.vx / speed) * 0.6; p.vy = (p.vy / speed) * 0.6; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(198, 168, 75, 0.3)';
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(198, 168, 75, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1, pointerEvents: 'none',
      }}
    />
  );
}
