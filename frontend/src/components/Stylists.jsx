import React from 'react';
import sarahImg from '../assets/stylist_sarah.png';
import amaraImg from '../assets/stylist_amara.png';
import chloeImg from '../assets/stylist_chloe.png';

const stylistsList = [
  {
    name: 'Sarah Jenkins',
    role: 'Master Stylist & Colourist',
    experience: '12+ Years Experience',
    specialty: 'Balayage, Dimensional Coloring & Custom Hair Design',
    image: sarahImg,
    bio: 'Sarah trained in London and Paris, perfecting the art of French balayage. She is passionate about crafting colors that harmonize with each client\'s skin tone and lifestyle.'
  },
  {
    name: 'Amara Diallo',
    role: 'Skin & Body Therapist',
    experience: '8 Years Experience',
    specialty: 'Advanced Facials, Holistic Massage & Body Treatments',
    image: amaraImg,
    bio: 'Amara believes that skincare is a form of wellness. She customizes every facial utilizing natural elements and advanced lymphatic drainage techniques for a restorative glow.'
  },
  {
    name: 'Chloe Zhang',
    role: 'Lead Bridal Artist & Mehndi Designer',
    experience: '10 Years Experience',
    specialty: 'Bridal Glam, HD/Airbrush Makeup & Intricate Henna Art',
    image: chloeImg,
    bio: 'Chloe excels in creating flawless, camera-ready bridal transformations. She combines modern contouring methods with intricate traditional henna designs to highlight natural beauty.'
  }
];

const Stylists = () => {
  return (
    <section id="stylists" className="py-24 bg-charcoal border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="text-gold uppercase tracking-widest text-xs font-semibold block mb-3">Meet the Experts</span>
          <h2 className="text-4xl md:text-5xl font-light text-cream mb-4 font-serif">Our Luxury Artisans</h2>
          <p className="text-cream-muted max-w-xl mx-auto font-sans font-light tracking-wide">
            Our highly trained stylists are dedicated to providing a secluded, comforting, and personalized pampering experience.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stylistsList.map((stylist, index) => (
            <div 
              key={index}
              className="reveal service-card glass-card rounded-xl overflow-hidden flex flex-col h-full border border-gold/5"
            >
              {/* Image Container with Hover Scale */}
              <div className="service-card-image-container relative aspect-[4/5] overflow-hidden">
                <img 
                  src={stylist.image} 
                  alt={stylist.name} 
                  className="w-full h-full object-cover"
                />
                {/* Gold Highlight Border overlay */}
                <div className="absolute inset-0 border-b-4 border-gold/40" />
                <div className="absolute bottom-4 left-4 bg-charcoal/90 border border-gold/20 px-3 py-1 rounded text-xs text-gold uppercase tracking-widest font-sans font-medium">
                  {stylist.experience}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-cream font-normal mb-1">{stylist.name}</h3>
                  <span className="text-gold text-sm uppercase tracking-widest block mb-4 font-sans">{stylist.role}</span>
                  <p className="text-cream-muted text-sm font-sans font-light leading-relaxed mb-4">
                    {stylist.bio}
                  </p>
                </div>

                <div className="border-t border-gold/10 pt-4 mt-auto">
                  <span className="text-xs text-gold uppercase tracking-wider block mb-1 font-sans">Specialty Focus</span>
                  <span className="text-cream text-sm font-sans font-light block leading-normal">{stylist.specialty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stylists;
