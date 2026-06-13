import React from 'react';
import InstagramGallery from './InstagramGallery';

const Footer = ({ onAdminClick, salonSettings = {} }) => {
  return (
    <footer className="bg-charcoal-dark border-t border-gold/10 pt-16 pb-10 text-cream-dark">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        {/* Instagram Gallery Widget */}
        <InstagramGallery instagramUrl={salonSettings.instagramUrl} />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans font-light text-cream-muted">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <h3 className="font-serif text-lg text-gold tracking-widest uppercase mb-0.5">Forever Beauty</h3>
          <p className="text-[10px] text-cream-muted uppercase tracking-widest font-sans font-light">Salon of Timeless Beauty</p>
        </div>
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Forever Beauty Salon. All Rights Reserved. &bull;{' '}
          <span onClick={onAdminClick} className="hover:text-gold cursor-pointer transition-colors font-medium">
            Admin Portal
          </span>
        </p>
        <div className="flex gap-6">
          <span className="hover:text-gold cursor-pointer transition-colors font-sans">Privacy Policy</span>
          <span className="hover:text-gold cursor-pointer transition-colors font-sans">Terms of Service</span>
          <span className="hover:text-gold cursor-pointer transition-colors font-sans">Booking Guidelines</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
