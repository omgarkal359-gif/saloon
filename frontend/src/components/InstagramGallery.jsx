import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramGallery = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Instagram className="text-gold w-5 h-5" />
        <span className="font-serif text-lg text-cream font-light tracking-widest uppercase">
          On Instagram
        </span>
        <span className="text-xs text-gold/60 font-sans tracking-wide">
          @ForeverBeautySanctuary
        </span>
      </div>

      {/* Premium coming soon placeholder card */}
      <div className="glass-card p-8 rounded-xl border border-gold/15 flex flex-col items-center justify-center text-center gap-4 hover:border-gold/30 transition-all duration-300 shadow-xl">
        <div className="p-3 bg-gold/5 rounded-full border border-gold/10">
          <Instagram className="w-8 h-8 text-gold" />
        </div>
        <div>
          <h4 className="text-sm font-serif text-cream mb-1.5 tracking-wider">Our Visual Journey is Beginning</h4>
          <p className="text-xs text-cream-muted font-sans font-light leading-relaxed max-w-md mx-auto">
            We are currently curating a high-fashion lookbook of our signature transformations, luxury hair designs, and premium nail artistry. Follow our account to be notified when we launch.
          </p>
        </div>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 text-[10px] text-gold uppercase tracking-widest font-sans border-b border-gold/30 pb-0.5 hover:text-gold-light hover:border-gold-light transition-colors"
        >
          Follow @ForeverBeautySanctuary
        </a>
      </div>
    </div>
  );
};

export default InstagramGallery;
