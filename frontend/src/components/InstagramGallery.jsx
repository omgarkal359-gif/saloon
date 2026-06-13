import React from 'react';
import mehndiImg from '../assets/gallery_mehndi.png';
import nailsImg from '../assets/gallery_nails.png';
import makeupImg from '../assets/gallery_makeup.png';
import spaImg from '../assets/gallery_spa.png';
import { Heart, MessageCircle, Instagram } from 'lucide-react';

const galleryItems = [
  {
    image: mehndiImg,
    likes: '1.2k',
    comments: '84',
    tag: '#MehndiArt'
  },
  {
    image: makeupImg,
    likes: '958',
    comments: '46',
    tag: '#BridalGlam'
  },
  {
    image: nailsImg,
    likes: '1.4k',
    comments: '112',
    tag: '#LuxuryNails'
  },
  {
    image: spaImg,
    likes: '820',
    comments: '39',
    tag: '#SpaSanctuary'
  }
];

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

      <div className="grid grid-cols-2 gap-4">
        {galleryItems.map((item, index) => (
          <div 
            key={index}
            className="group relative aspect-square rounded-lg overflow-hidden border border-gold/10 cursor-pointer"
          >
            {/* Gallery Image */}
            <img 
              src={item.image} 
              alt={item.tag} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-charcoal-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
              <span className="text-gold text-xs tracking-wider font-sans mb-1">{item.tag}</span>
              <div className="flex items-center gap-4 text-cream text-sm">
                <div className="flex items-center gap-1.5 hover:text-gold transition-colors">
                  <Heart className="w-4 h-4 fill-gold text-gold" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-gold transition-colors">
                  <MessageCircle className="w-4 h-4 fill-cream/10" />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramGallery;
