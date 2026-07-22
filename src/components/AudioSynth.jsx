import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function AudioSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const oscsRef = useRef([]);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  const toggle = () => {
    if (isPlaying) {
      gainRef.current?.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1);
      setTimeout(() => {
        oscsRef.current.forEach(o => { try { o.stop(); } catch (e) {} });
        oscsRef.current = [];
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
      }, 1100);
    } else {
      try {
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        ctxRef.current = ac;
        const analyser = ac.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;
        const gain = ac.createGain();
        gain.gain.setValueAtTime(0, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, ac.currentTime + 2);
        gain.connect(analyser);
        analyser.connect(ac.destination);
        gainRef.current = gain;

        [155.56, 233.08, 392.00, 587.33, 698.46].forEach((freq) => {
          const osc = ac.createOscillator();
          const oscGain = ac.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          osc.detune.value = (Math.random() - 0.5) * 10;
          osc.connect(oscGain);
          oscGain.connect(gain);
          oscGain.gain.value = 0.2;
          osc.start();
          oscsRef.current.push(osc);
        });

        setIsPlaying(true);

        const draw = () => {
          if (!canvasRef.current || !analyserRef.current) return;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const buf = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(buf);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const bw = (canvas.width / buf.length) * 1.4;
          let x = 0;
          buf.forEach(v => {
            const h = (v / 255) * canvas.height * 0.85;
            ctx.fillStyle = '#c9a84c';
            ctx.globalAlpha = 0.7;
            ctx.fillRect(x, canvas.height - h, bw - 1, h);
            x += bw;
          });
          rafRef.current = requestAnimationFrame(draw);
        };
        draw();
      } catch (e) { console.error('Audio init failed', e); }
    }
  };

  useEffect(() => () => {
    oscsRef.current.forEach(o => { try { o.stop(); } catch (e) {} });
    cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="interactive"
      onClick={toggle}
      style={{
        position: 'fixed', bottom: '28px', left: '28px', zIndex: 999,
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(22,27,34,0.85)',
        border: '1px solid rgba(201,168,76,0.15)',
        padding: '8px 14px', borderRadius: '999px',
        cursor: 'pointer', backdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)'}
    >
      <span style={{ color: isPlaying ? '#c9a84c' : 'var(--text-muted)', display: 'flex' }}>
        {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </span>
      {isPlaying
        ? <canvas ref={canvasRef} width={38} height={12} style={{ width: 38, height: 12 }} />
        : <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', color: 'var(--text-muted)' }}>AMBIENT</span>
      }
    </div>
  );
}
