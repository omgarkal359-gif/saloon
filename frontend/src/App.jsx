import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceMenu from './components/ServiceMenu';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Static fallback services catalog in case backend is loading or unreachable
const FALLBACK_SERVICES = [
  {
    _id: '666ab1234567890123456781',
    name: 'Luxury Haircut & Styling',
    category: 'Hair & Styling',
    price: 1200,
    duration: 45,
    description: 'A customized cut, wash, and blow-dry tailored to your features and lifestyle, using premium nourishing shampoos.'
  },
  {
    _id: '666ab1234567890123456782',
    name: 'Balayage & Hair Colouring',
    category: 'Hair & Styling',
    price: 4500,
    duration: 120,
    description: 'Expert dimensional hand-painted color and highlights to create a natural, sun-kissed look.'
  },
  {
    _id: '666ab1234567890123456783',
    name: 'Premium Keratin Hair Treatment',
    category: 'Hair & Styling',
    price: 3500,
    duration: 90,
    description: 'Deep conditioning treatment to restore strength, moisture, and mirror-like shine to damaged hair.'
  },
  {
    _id: '666ab1234567890123456784',
    name: 'Aromatherapy Head Massage',
    category: 'Hair & Styling',
    price: 800,
    duration: 30,
    description: 'A deeply relaxing head massage using premium essential oils to release stress and tension.'
  },
  {
    _id: '666ab1234567890123456785',
    name: 'Organic Glow Facial',
    category: 'Skin & Body Care',
    price: 2200,
    duration: 60,
    description: 'Revitalizing skin therapy utilizing organic serums, custom masks, and massage to restore a youthful glow.'
  },
  {
    _id: '666ab1234567890123456786',
    name: 'Smooth Silk Waxing',
    category: 'Skin & Body Care',
    price: 1200,
    duration: 45,
    description: 'Gentle, full-leg and arm organic hot wax treatment for ultra-smooth skin with minimal discomfort.'
  },
  {
    _id: '666ab1234567890123456787',
    name: 'Swedish Full Body Massage',
    category: 'Skin & Body Care',
    price: 3500,
    duration: 75,
    description: 'Secluded full-body relaxation massage designed to improve circulation and ease muscle tightness.'
  },
  {
    _id: '666ab1234567890123456788',
    name: 'Precision Threading (Brows & Upper Lip)',
    category: 'Skin & Body Care',
    price: 250,
    duration: 150,
    description: 'Accurate and clean facial hair shaping using pure cotton thread for pristine definition.'
  },
  {
    _id: '666ab1234567890123456789',
    name: 'Spa Manicure',
    category: 'Nails & Hands',
    price: 1000,
    duration: 45,
    description: 'Nail shaping, cuticle care, luxury hand scrub, and moisturizing massage finished with premium gel polish.'
  },
  {
    _id: '666ab1234567890123456790',
    name: 'Revitalizing Pedicure',
    category: 'Nails & Hands',
    price: 1200,
    duration: 50,
    description: 'Warm foot soak, exfoliation, nail grooming, and relaxing massage to refresh tired feet.'
  },
  {
    _id: '666ab1234567890123456791',
    name: 'All-inclusive Nail Treatment & Extensions',
    category: 'Nails & Hands',
    price: 2000,
    duration: 60,
    description: 'Gel extension overlay or intense strengthening therapy to give your nails a stunning, long-lasting look.'
  },
  {
    _id: '666ab1234567890123456792',
    name: 'Royal Bridal Makeup',
    category: 'Bridal & Artistry',
    price: 15000,
    duration: 150,
    description: 'Complete high-definition bridal look with premium lashes, contouring, and setting for your special day.'
  },
  {
    _id: '666ab1234567890123456793',
    name: 'Premium Makeup Package (Party/Festive)',
    category: 'Bridal & Artistry',
    price: 7500,
    duration: 90,
    description: 'Custom glam for any event, focusing on flawless skin, elegant eyes, and long-wearing luxury finishes.'
  },
  {
    _id: '666ab1234567890123456794',
    name: 'Exquisite Royal Mehndi Design',
    category: 'Bridal & Artistry',
    price: 3000,
    duration: 90,
    description: 'Bespoke hand-applied henna art featuring intricate traditional and contemporary bridal patterns.'
  }
];

function App() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home'); // 'home' or 'admin'

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch services from Backend
  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      const data = await response.json();
      if (data.success && data.services && data.services.length > 0) {
        setServices(data.services);
      }
    } catch (error) {
      console.warn('Backend API service catalog fetch failed. Falling back to static data.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();

    // Support typing ?admin in the browser URL to immediately access gateway
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin')) {
      setView('admin');
    }
  }, []);

  // Sync services when entering home view (to refresh dynamic changes)
  useEffect(() => {
    if (view === 'home') {
      fetchServices();
    }
  }, [view]);

  // Setup Scroll-Driven Reveal (IntersectionObserver)
  useEffect(() => {
    if (view !== 'home' || loading) return;

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    reveals.forEach((reveal) => observer.observe(reveal));

    return () => {
      reveals.forEach((reveal) => observer.unobserve(reveal));
    };
  }, [loading, services, view]);

  const handleBookWhatsApp = () => {
    const text = encodeURIComponent("Hello Forever Beauty Salon! I would like to inquire about booking a treatment.");
    window.open(`https://wa.me/15559876543?text=${text}`, '_blank');
  };

  const handleContactUs = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (view === 'admin') {
    return <AdminPanel onBack={() => setView('home')} />;
  }

  return (
    <div className="relative min-h-screen bg-charcoal text-cream font-sans antialiased animate-fade-in">
      {/* Navigation Header */}
      <Navbar onContactUs={handleContactUs} />

      {/* Main Luxury Content Sections */}
      <main>
        <Hero onBookWhatsApp={handleBookWhatsApp} />
        
        <ServiceMenu services={services} />
        
        <BeforeAfterSlider />
      </main>

      {/* Footer Details */}
      <Footer onAdminClick={() => setView('admin')} />
    </div>
  );
}

export default App;
