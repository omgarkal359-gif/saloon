import React, { useState } from 'react';
import { Scissors, Sparkles, Smile, Flower } from 'lucide-react';

const categoryIcons = {
  'Hair & Styling': <Scissors className="w-5 h-5" />,
  'Skin & Body Care': <Flower className="w-5 h-5" />,
  'Nails & Hands': <Sparkles className="w-5 h-5" />,
  'Bridal & Artistry': <Smile className="w-5 h-5" />,
};

const ServiceMenu = ({ services }) => {
  const [activeTab, setActiveTab] = useState('Hair & Styling');

  const categories = ['Hair & Styling', 'Skin & Body Care', 'Nails & Hands', 'Bridal & Artistry'];

  const filteredServices = services.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-24 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Indulge Yourself</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Our Treatment Menu</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            Explore our curated service offerings. To book a session, please reach out to us directly on WhatsApp or visit our salon.
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
            return (
              <div
                key={service._id}
                className="service-card glass-card p-6 rounded-xl flex flex-col justify-between gap-4 border border-gold/5"
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
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServiceMenu;
