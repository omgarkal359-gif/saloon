import React, { useState } from 'react';
import MagneticButton from './MagneticButton';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = ({ onContactUs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileContact = () => {
    setIsOpen(false);
    onContactUs();
  };

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 h-20">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer z-50" 
        onClick={() => {
          setIsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
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
          Our Salon
        </button>
      </div>

      {/* Contact Button - Desktop */}
      <div className="hidden md:block">
        <MagneticButton onClick={onContactUs} className="py-2 px-6 text-xs">
          Contact Us
        </MagneticButton>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <div className="md:hidden flex items-center z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-cream hover:text-gold transition-colors focus:outline-none p-1"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-charcoal-dark/95 border-b border-gold/20 backdrop-blur-lg flex flex-col items-center py-8 gap-6 z-40 animate-fade-in shadow-2xl md:hidden">
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-cream hover:text-gold font-sans text-sm tracking-widest uppercase transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('transformation')} 
            className="text-cream hover:text-gold font-sans text-sm tracking-widest uppercase transition-colors"
          >
            Transformations
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-cream hover:text-gold font-sans text-sm tracking-widest uppercase transition-colors"
          >
            Our Salon
          </button>
          <MagneticButton onClick={handleMobileContact} className="py-2.5 px-8 text-xs mt-2">
            Contact Us
          </MagneticButton>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
