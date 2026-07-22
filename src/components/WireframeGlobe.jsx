import { useEffect, useRef } from 'react';

export default function WireframeGlobe() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Globe configuration
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    
    const radius = 140;
    const points = [];
    const numLat = 12;
    const numLon = 24;

    // Generate sphere points
    for (let i = 0; i <= numLat; i++) {
      const lat = Math.PI * i / numLat - Math.PI / 2;
      for (let j = 0; j < numLon; j++) {
        const lon = 2 * Math.PI * j / numLon;
        points.push({
          x: radius * Math.cos(lat) * Math.cos(lon),
          y: radius * Math.sin(lat),
          z: radius * Math.cos(lat) * Math.sin(lon)
        });
      }
    }

    let angleX = 0;
    let angleY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      // Normalize mouse influence
      mouse.current.targetY = x * 0.00005;
      mouse.current.targetX = y * 0.00005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Base rotation + mouse influence
      angleX += 0.001 + mouse.current.x;
      angleY += 0.002 + mouse.current.y;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project and draw points
      ctx.strokeStyle = 'rgba(198, 168, 75, 0.15)';
      ctx.fillStyle = 'rgba(198, 168, 75, 0.8)';
      ctx.lineWidth = 1;

      const projectedPoints = points.map(p => {
        // Rotate around X axis
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        
        // Rotate around Y axis
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        // Simple perspective projection
        const fov = 350;
        const scale = fov / (fov + z2);

        return {
          x: x2 * scale + width / 2,
          y: y1 * scale + height / 2,
          z: z2
        };
      });

      // Draw latitude lines
      for (let i = 0; i <= numLat; i++) {
        ctx.beginPath();
        for (let j = 0; j < numLon; j++) {
          const p = projectedPoints[i * numLon + j];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw longitude lines
      for (let j = 0; j < numLon; j++) {
        ctx.beginPath();
        for (let i = 0; i <= numLat; i++) {
          const p = projectedPoints[i * numLon + j];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="wireframe-globe-container"
      style={{
        width: '400px',
        height: '400px',
        opacity: 0.6,
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        right: '-50px',
        transform: 'translateY(-50%)',
        zIndex: 0
      }}
    />
  );
}
