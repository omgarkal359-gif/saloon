import React, { useState, useRef, useEffect } from 'react';
import beforeImg from '../assets/hair_before.png';
import afterImg from '../assets/hair_after.png';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

// Static built-in slider component (kept as showcase demo)
const StaticSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e) => { if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX); };

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
    <div
      ref={containerRef}
      className="reveal relative aspect-[4/3] md:aspect-[16/9] w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-gold/20 shadow-2xl select-none"
      style={{ touchAction: 'none' }}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <img src={afterImg} alt="After Transformation" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute bottom-4 right-4 bg-charcoal/80 border border-gold/30 px-3 py-1 text-xs text-gold uppercase tracking-widest rounded backdrop-blur">
        After Treatment
      </div>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={beforeImg} alt="Before Transformation" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute bottom-4 left-4 bg-charcoal/80 border border-gold/30 px-3 py-1 text-xs text-cream uppercase tracking-widest rounded backdrop-blur whitespace-nowrap">
          Before Treatment
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-[2px] bg-gold z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal border-2 border-gold rounded-full flex items-center justify-between px-2.5 shadow-2xl slider-handle hover:scale-105 active:scale-95 transition-transform">
          <span className="text-gold text-xs font-bold font-sans">◀</span>
          <span className="text-gold text-xs font-bold font-sans">▶</span>
        </div>
      </div>
    </div>
  );
};

// Gallery card for uploaded transformations — before/after side by side
const TransformationCard = ({ transformation }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => { if (isDragging) handleMove(e.clientX); };
  const handleTouchMove = (e) => { if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX); };

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
    <div className="reveal flex flex-col rounded-xl overflow-hidden border border-gold/20 shadow-xl bg-charcoal-dark group hover:border-gold/40 transition-all duration-500">
      {/* Interactive Before/After Slider */}
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden"
        style={{ touchAction: 'none' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After (background) */}
        <img
          src={transformation.afterImage}
          alt={`After - ${transformation.title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute bottom-3 right-3 bg-charcoal/85 border border-gold/30 px-2 py-0.5 text-[10px] text-gold uppercase tracking-widest rounded backdrop-blur z-10">
          After
        </div>

        {/* Before (foreground clip) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={transformation.beforeImage}
            alt={`Before - ${transformation.title}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute bottom-3 left-3 bg-charcoal/85 border border-gold/30 px-2 py-0.5 text-[10px] text-cream uppercase tracking-widest rounded backdrop-blur whitespace-nowrap z-10">
            Before
          </div>
        </div>

        {/* Divider Handle */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-gold z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-charcoal border-2 border-gold rounded-full flex items-center justify-between px-2 shadow-xl slider-handle hover:scale-110 active:scale-95 transition-transform">
            <span className="text-gold text-[9px] font-bold">◀</span>
            <span className="text-gold text-[9px] font-bold">▶</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-gold/10">
        <h4 className="font-serif text-sm text-cream">{transformation.title}</h4>
        {transformation.description && (
          <p className="text-[11px] text-cream-muted mt-0.5 font-sans font-light">{transformation.description}</p>
        )}
      </div>
    </div>
  );
};

const BeforeAfterSlider = ({ transformations = [] }) => {
  const hasUploaded = transformations && transformations.length > 0;

  return (
    <section id="transformation" className="py-24 bg-charcoal-dark border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Witness the Artistry</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Bespoke Transformations</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            {hasUploaded
              ? 'Drag the handle on each result to compare before and after our signature luxury treatments.'
              : 'Slide the handle to reveal our signature luxury hair coloring and restoration treatments.'}
          </p>
        </div>

        {/* Uploaded Transformations Gallery */}
        {hasUploaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map(t => (
              <TransformationCard key={t._id} transformation={t} />
            ))}
          </div>
        ) : (
          /* Static demo slider when no uploads exist */
          <>
            <StaticSlider />
            <div className="text-center mt-6 flex items-center justify-center gap-2 text-cream-muted text-sm tracking-wide">
              <Eye className="w-4 h-4 text-gold" />
              <span>Drag the central gold handle left or right to compare</span>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default BeforeAfterSlider;
