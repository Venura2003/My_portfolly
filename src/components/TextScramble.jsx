import { useState, useEffect, useRef } from 'react';

export default function TextScramble({ text, speed = 30, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const hasRevealed = useRef(false);
  const chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789$#@&%+';

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          // Start scrambled initially, then resolve
          setTimeout(scramble, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, speed, delay]);

  const handleMouseEnter = () => {
    scramble();
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      style={{
        cursor: 'default',
        transition: 'color 0.3s ease',
      }}
    >
      {displayText}
    </span>
  );
}
