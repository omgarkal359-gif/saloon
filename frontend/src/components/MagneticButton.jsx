import React, { useRef, useState } from 'react';

const MagneticButton = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull the button up to 35% of the distance from center
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className={`btn-magnetic text-charcoal font-medium uppercase tracking-wider text-sm py-3 px-8 rounded-full shadow-lg hover:shadow-gold/20 active:scale-95 transition-shadow select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out'
      }}
    >
      <span className="relative z-10 block pointer-events-none">{children}</span>
    </button>
  );
};

export default MagneticButton;
