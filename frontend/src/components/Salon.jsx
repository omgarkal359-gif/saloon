import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

const Salon = () => {
  return (
    <section id="about" className="py-24 bg-charcoal-dark border-t border-gold/10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Our Salon</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">The Salon</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide text-sm md:text-base leading-relaxed">
            Welcome to a private luxury retreat designed exclusively for ladies, nurturing absolute peace, comfort, and premium self-care.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Exclusivity & Experience (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-card p-8 md:p-10 rounded-2xl border border-gold/15 hover:border-gold/30 transition-all duration-500 shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                  <ShieldCheck className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream">Ladies-Only Privacy</h3>
                  <span className="text-xs text-gold/80 font-sans tracking-wide uppercase">Strict Security</span>
                </div>
              </div>

              <p className="text-sm text-cream-dark font-sans font-light leading-relaxed">
                Forever Beauty is strictly a women-only salon. No male entry is permitted, ensuring complete relaxation, freedom, and security during your personalized hair, skin, and nail treatments.
              </p>

              <div className="h-px bg-gold/10 my-2" />

              {/* Direct Info list */}
              <div className="flex flex-col gap-4 text-sm font-sans font-light text-cream-dark">
                <div className="flex items-start gap-3.5 group/item">
                  <MapPin className="text-gold w-5 h-5 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <span className="leading-snug">Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206</span>
                </div>
                <div className="flex items-center gap-3.5 group/item">
                  <Phone className="text-gold w-5 h-5 shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span>+91 9326899376 (Call or WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3.5 group/item">
                  <Mail className="text-gold w-5 h-5 shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span>info@foreverbeautysalon.com</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-gold font-sans uppercase tracking-widest font-medium">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Timeless Beauty Awaits</span>
            </div>
          </div>

          {/* Card 2: Operating Hours (lg:col-span-3) */}
          <div className="lg:col-span-3 glass-card p-8 rounded-2xl border border-gold/15 hover:border-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gold/10 rounded-lg border border-gold/20">
                  <Clock className="text-gold w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-cream">Hours</h3>
              </div>

              <div className="flex flex-col gap-4 text-sm font-sans font-light text-cream-dark">
                <div className="flex flex-col border-b border-gold/5 pb-2">
                  <span className="text-xs text-cream-muted uppercase tracking-widest font-medium mb-0.5">Weekdays</span>
                  <div className="flex justify-between items-center">
                    <span>Monday - Friday</span>
                    <span className="text-cream text-xs font-medium bg-gold/10 px-2 py-0.5 rounded border border-gold/10">10:00 AM - 8:30 PM</span>
                  </div>
                </div>
                <div className="flex flex-col border-b border-gold/5 pb-2">
                  <span className="text-xs text-cream-muted uppercase tracking-widest font-medium mb-0.5">Saturdays</span>
                  <div className="flex justify-between items-center">
                    <span>Saturday</span>
                    <span className="text-cream text-xs font-medium bg-gold/10 px-2 py-0.5 rounded border border-gold/10">10:00 AM - 8:30 PM</span>
                  </div>
                </div>
                <div className="flex flex-col pb-2">
                  <span className="text-xs text-cream-muted uppercase tracking-widest font-medium mb-0.5">Sundays</span>
                  <div className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="text-cream text-xs font-medium bg-gold/10 px-2 py-0.5 rounded border border-gold/10">10:00 AM - 8:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/10 text-center">
              <p className="text-[11px] text-cream-muted font-sans font-light uppercase tracking-wider leading-relaxed">
                Prior reservation recommended via direct WhatsApp.
              </p>
            </div>
          </div>

          {/* Card 3: Location Map (lg:col-span-4) */}
          <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-gold/15 hover:border-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden relative group">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gold/10 rounded-lg border border-gold/20">
                  <Calendar className="text-gold w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-cream">Our Location</h3>
              </div>

              {/* Map Container */}
              <div className="relative w-full flex-grow min-h-[180px] lg:min-h-0 rounded-xl overflow-hidden border border-gold/15">
                <iframe
                  title="Forever Beauty Salon Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.671449673995!2d73.0152579!3d18.9890477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3905be8d203%3A0xe5419992f036577b!2sMahavir%20Sparsh!5e0!3m2!1sen!2sin!4v1718270000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] saturate-[60%] brightness-[90%]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Dark premium overlay */}
                <div className="absolute inset-0 bg-gold/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Salon;
