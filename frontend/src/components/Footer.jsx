import React from 'react';
import InstagramGallery from './InstagramGallery';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

const Footer = ({ onAdminClick }) => {
  return (
    <footer id="about" className="bg-charcoal-dark border-t border-gold/20 pt-20 pb-10 text-cream-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        
        {/* Column 1: Contact, Hours & Ladies-only privacy badge */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-2xl text-gold tracking-widest uppercase mb-1">Forever Beauty</h3>
            <p className="text-xs text-cream-muted uppercase tracking-widest font-sans font-light">Sanctuary of Timeless Beauty</p>
          </div>
          
          <p className="text-sm font-sans font-light leading-relaxed">
            Welcome to a private haven where every detail is tailored to your comfort and relaxation. Our environment is strictly reserved for ladies, providing a peaceful retreat from the outside world.
          </p>

          <div className="flex items-center gap-3 bg-gold/5 border border-gold/20 p-4 rounded-lg">
            <ShieldCheck className="text-gold w-6 h-6 shrink-0" />
            <div className="text-xs leading-normal font-sans text-gold">
              <strong>Private & Secure Environment:</strong> Strictly ladies-only. No male entry permitted, ensuring complete relaxation and comfort during treatments.
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm font-sans font-light">
            <div className="flex items-center gap-3">
              <MapPin className="text-gold w-4 h-4 shrink-0" />
              <span>Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gold w-4 h-4 shrink-0" />
              <span>+1 (555) 987-6543 (Call or WhatsApp)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-gold w-4 h-4 shrink-0" />
              <span>info@foreverbeautysalon.com</span>
            </div>
          </div>
        </div>

        {/* Column 2: Hours & Styled Google Map */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-lg text-cream tracking-widest uppercase mb-4 flex items-center gap-2">
              <Clock className="text-gold w-4 h-4" />
              <span>Operating Hours</span>
            </h3>
            
            <div className="flex flex-col gap-2.5 text-sm font-sans font-light">
              <div className="flex justify-between border-b border-gold/5 pb-1.5">
                <span>Monday - Friday</span>
                <span className="text-cream font-medium">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-1.5">
                <span>Saturday</span>
                <span className="text-cream font-medium">09:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-gold/5 pb-1.5">
                <span className="text-gold font-medium">Sunday (Exclusive VIP)</span>
                <span className="text-gold font-medium">10:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Styled Google Map */}
          <div>
            <span className="text-xs text-cream-muted uppercase tracking-widest font-sans font-light block mb-3">Our Location</span>
            <div className="relative w-full h-44 rounded-lg overflow-hidden border border-gold/20 shadow-lg group">
              {/* Dark filter over iframe map to match styling */}
              <iframe
                title="Forever Beauty Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215286591789!2d-73.9878441!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] saturate-[60%] brightness-[90%]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gold/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* Column 3: Instagram Gallery Widget */}
        <div className="flex flex-col">
          <InstagramGallery />
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans font-light text-cream-muted">
        <p>
          &copy; {new Date().getFullYear()} Forever Beauty Salon. All Rights Reserved. &bull;{' '}
          <span onClick={onAdminClick} className="hover:text-gold cursor-pointer transition-colors">
            Admin Portal
          </span>
        </p>
        <div className="flex gap-6">
          <span className="hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gold cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-gold cursor-pointer transition-colors">Booking Guidelines</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
