import React from 'react';
import MagneticButton from './MagneticButton';
import { Sparkles } from 'lucide-react';

const Navbar = ({ onContactUs }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 h-20">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Sparkles className="text-gold w-6 h-6 animate-pulse" />
        <span className="font-serif text-xl md:text-2xl text-gold tracking-widest uppercase font-medium">
          Forever Beauty
        </span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex items-center gap-8 text-cream-dark font-sans text-sm tracking-widest uppercase">
        <button 
          onClick={() => scrollToSection('services')} 
          className="hover:text-gold transition-colors duration-300"
        >
          Services
        </button>
        <button 
          onClick={() => scrollToSection('transformation')} 
          className="hover:text-gold transition-colors duration-300"
        >
          Transformations
        </button>

        <button 
          onClick={() => scrollToSection('about')} 
          className="hover:text-gold transition-colors duration-300"
        >
          Sanctuary
        </button>
      </div>

      {/* Contact Button */}
      <div>
        <MagneticButton onClick={onContactUs} className="py-2 px-6 text-xs">
          Contact Us
        </MagneticButton>
      </div>
    </nav>
  );
};

export default Navbar;
