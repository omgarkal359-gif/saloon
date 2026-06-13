import React, { useState } from 'react';
import { Scissors, Sparkles, Smile, Flower } from 'lucide-react';

const categoryIcons = {
  'Hair & Styling': <Scissors className="w-5 h-5" />,
  'Skin & Body Care': <Flower className="w-5 h-5" />,
  'Nails & Hands': <Sparkles className="w-5 h-5" />,
  'Bridal & Artistry': <Smile className="w-5 h-5" />,
};

const ServiceMenu = ({ services, selectedServices, onToggleService, onBookNow }) => {
  const [activeTab, setActiveTab] = useState('Hair & Styling');

  const categories = ['Hair & Styling', 'Skin & Body Care', 'Nails & Hands', 'Bridal & Artistry'];

  const filteredServices = services.filter(s => s.category === activeTab);

  const totalCount = selectedServices.length;
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  return (
    <section id="services" className="py-24 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Indulge Yourself</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Our Treatment Menu</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            Select one or more services to curate your custom salon session. Designed exclusively for ladies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="reveal flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gold/15 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 font-sans border-b-2 ${
                activeTab === cat
                  ? 'border-gold text-gold font-medium bg-gold/5'
                  : 'border-transparent text-cream-muted hover:text-cream hover:border-cream/30'
              }`}
            >
              {categoryIcons[cat]}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map(service => {
            const isSelected = selectedServices.some(s => s._id === service._id);
            return (
              <div
                key={service._id}
                onClick={() => onToggleService(service)}
                className={`service-card glass-card p-6 rounded-xl flex flex-col justify-between gap-4 cursor-pointer hover:border-gold/30 transition-all select-none ${
                  isSelected ? 'border-gold/60 bg-gold/5 shadow-[0_4px_15px_rgba(212,175,55,0.08)]' : ''
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg md:text-xl text-cream tracking-wide font-normal mb-2 flex items-center gap-2">
                      {service.name}
                    </h3>
                    <p className="text-cream-muted text-xs md:text-sm font-light leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Select Checkbox Indicator */}
                  <div className="flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}} // handled by parent div click
                      className="w-5 h-5 rounded border-gold/40 text-gold focus:ring-gold focus:ring-offset-charcoal bg-charcoal cursor-pointer accent-gold"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gold/10 pt-4 mt-2">
                  <div className="text-cream-muted text-xs font-sans font-light tracking-wide">
                    Duration: <span className="text-gold font-medium">{service.duration} mins</span>
                  </div>
                  <div className="text-gold font-serif text-xl font-normal">
                    ₹{service.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky floating totals counter at the bottom */}
        {totalCount > 0 && (
          <div className="fixed bottom-6 left-6 right-6 md:left-12 md:right-12 z-40 bg-charcoal-dark/95 border border-gold/40 shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur animate-slide-up">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left">
              <div>
                <span className="text-gold uppercase tracking-widest text-xs block mb-1">Your Curated Treatment</span>
                <span className="text-cream font-serif text-lg font-normal">
                  {totalCount} Service{totalCount > 1 ? 's' : ''} Selected
                </span>
              </div>
              <div className="hidden md:block w-[1px] h-10 bg-gold/20" />
              <div>
                <span className="text-gold uppercase tracking-widest text-xs block mb-1">Total Duration</span>
                <span className="text-cream font-sans text-lg font-light tracking-wider">
                  {totalDuration} mins
                </span>
              </div>
              <div className="hidden md:block w-[1px] h-10 bg-gold/20" />
              <div>
                <span className="text-gold uppercase tracking-widest text-xs block mb-1">Total Price</span>
                <span className="text-gold font-serif text-2xl font-semibold">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={onBookNow}
              className="w-full md:w-auto bg-gold hover:bg-gold-light text-charcoal font-medium uppercase tracking-wider text-sm py-4 px-10 rounded-full shadow-lg transition-colors duration-300"
            >
              Continue Booking
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServiceMenu;
