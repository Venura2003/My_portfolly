import { useRef, useState } from 'react';

export default function MagneticButton({ children, className = '', style = {}, as: Component = 'button', ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Max pull distance
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const combinedStyle = {
    ...style,
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 
      ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Springy return
      : 'transform 0.1s linear', // Follow mouse tightly
    display: 'inline-flex',
    willChange: 'transform'
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
