import React, { useState } from 'react';
import MagneticButton from './MagneticButton';
import { Sparkles, Menu, X, Share2 } from 'lucide-react';

const Navbar = ({ onContactUs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMobileContact = () => {
    setIsOpen(false);
    onContactUs();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Forever Beauty Salon',
      text: 'Escape to Forever Beauty Salon, an exclusive ladies-only sanctuary of timeless beauty.',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('Share failed or was canceled:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
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

      {/* Contact & Share Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-3 relative">
        <MagneticButton onClick={onContactUs} className="py-2 px-6 text-xs">
          Contact Us
        </MagneticButton>
        <button 
          onClick={handleShare}
          className="p-2.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/50 rounded-xl text-gold transition-all duration-300 flex items-center justify-center"
          title="Share Website"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Desktop Share Popover */}
        {showShareMenu && (
          <div className="absolute right-0 top-14 w-52 bg-charcoal-dark/95 border border-gold/20 rounded-xl p-3 shadow-2xl backdrop-blur-lg flex flex-col gap-2 z-50 animate-fade-in text-left">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Discover Forever Beauty Salon, Navi Mumbai - an exclusive ladies-only luxury sanctuary: ' + window.location.origin)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowShareMenu(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-sans text-cream hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
            >
              <svg className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.022 14.069 1 11.999 1c-5.438 0-9.863 4.372-9.867 9.8.001 1.73.457 3.418 1.32 4.937L2.4 20.29l4.247-1.136zM17.15 14.39c-.282-.142-1.67-.824-1.928-.918-.258-.094-.446-.142-.634.142-.188.283-.728.918-.892 1.107-.164.188-.328.212-.61.07-2.8-.14-3.854-1.222-5.232-2.41-.28-.242-.164-.226.07-.557.172-.24.328-.567.422-.756.094-.189.047-.354-.023-.496-.071-.141-.634-1.53-.869-2.097-.23-.552-.462-.477-.635-.485-.164-.008-.353-.01-.541-.01s-.494.07-.753.353c-.259.283-.988.966-.988 2.359s1.012 2.738 1.153 2.926c.141.189 1.99 3.04 4.821 4.259 2.83 1.22 2.83.814 3.347.767.518-.047 1.67-.683 1.905-1.343.236-.66.236-1.228.165-1.342-.07-.116-.258-.165-.541-.307z"/>
              </svg>
              <span>Share on WhatsApp</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-sans text-left text-cream hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
            >
              <svg className="w-4 h-4 text-gold fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <div className="h-px bg-gold/10 my-1" />
            <p className="text-[10px] text-cream-muted font-sans font-light px-3 leading-relaxed">
              To share on Instagram, copy the link and add it to your story/bio.
            </p>
          </div>
        )}
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
          <div className="flex gap-3 mt-2 w-full px-8 justify-center">
            <MagneticButton onClick={handleMobileContact} className="py-2.5 px-6 text-xs flex-1 max-w-[140px]">
              Contact Us
            </MagneticButton>
            <button
              onClick={handleShare}
              className="py-2.5 px-6 rounded-xl border border-gold/30 bg-gold/10 text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold/20 flex items-center justify-center gap-2 flex-1 max-w-[140px] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
