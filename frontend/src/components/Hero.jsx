import React from 'react';
import MagneticButton from './MagneticButton';
import heroBg from '../assets/salon_hero_bg.png';

const Hero = ({ onBookWhatsApp }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Dark Glassy Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/95 via-charcoal/80 to-charcoal-dark/95" />
      
      {/* Subtle gold design lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 border border-gold rounded-full filter blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-60 h-60 border border-gold rounded-full filter blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center gap-6 mt-16">
        {/* Ladies Only Tag */}
        <div className="reveal active inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full text-gold text-xs tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          Strictly Ladies Only
        </div>
        
        <h1 className="reveal active font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-light tracking-wide leading-tight">
          Forever Beauty <br />
          <span className="text-gold italic font-normal text-4xl md:text-6xl lg:text-7xl block mt-2">Salon</span>
        </h1>
        
        <p className="reveal active font-sans text-cream-dark text-lg md:text-xl lg:text-2xl font-light tracking-widest max-w-2xl leading-relaxed mt-2">
          Indulge in royal treatments designed to restore hair vitality, reveal a radiant skin glow, and sculpt flawless bridal artistry to elevate your natural elegance.
        </p>

        {/* Floating Magnetic CTA Button */}
        <div className="reveal active mt-8">
          <MagneticButton onClick={onBookWhatsApp} className="py-4 px-10 text-sm font-semibold tracking-widest shadow-gold/15">
            Book via WhatsApp
          </MagneticButton>
          <span className="block mt-3 text-xs text-cream-muted tracking-widest font-sans font-light uppercase">
            WhatsApp or Call: <span className="text-gold font-medium">+91 9326899376</span>
          </span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-muted text-xs tracking-widest uppercase pointer-events-none opacity-60">
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gold/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-4 bg-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
