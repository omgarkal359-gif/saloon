import React, { useState, useRef, useEffect } from 'react';
import beforeImg from '../assets/hair_before.png';
import afterImg from '../assets/hair_after.png';
import { Eye } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="transformation" className="py-24 bg-charcoal-dark border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Witness the Artistry</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Bespoke Transformations</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            Slide the handle to reveal our signature luxury hair coloring and restoration treatments.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="reveal relative aspect-[4/3] md:aspect-[16/9] w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-gold/20 shadow-2xl select-none"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <img 
            src={afterImg} 
            alt="After Transformation" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute bottom-4 right-4 bg-charcoal/80 border border-gold/30 px-3 py-1 text-xs text-gold uppercase tracking-widest rounded backdrop-blur">
            After Treatment
          </div>

          {/* Before Image (Foreground overlay) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={beforeImg} 
              alt="Before Transformation" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
              style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
            />
            <div className="absolute bottom-4 left-4 bg-charcoal/80 border border-gold/30 px-3 py-1 text-xs text-cream uppercase tracking-widest rounded backdrop-blur whitespace-nowrap">
              Before Treatment
            </div>
          </div>

          {/* Slider Line Divider */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-gold z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal border-2 border-gold rounded-full flex items-center justify-between px-2.5 shadow-2xl slider-handle hover:scale-105 active:scale-95 transition-transform">
              <span className="text-gold text-xs font-bold font-sans">◀</span>
              <span className="text-gold text-xs font-bold font-sans">▶</span>
            </div>
          </div>
        </div>

        {/* Slide Callout Hint */}
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-cream-muted text-sm tracking-wide">
          <Eye className="w-4 h-4 text-gold" />
          <span>Drag the central gold handle left or right to compare</span>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSlider;
