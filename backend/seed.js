import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

dotenv.config();

const services = [
  // TAB 1: Hair & Styling
  {
    name: 'Luxury Haircut & Styling',
    category: 'Hair & Styling',
    price: 1200,
    duration: 45,
    description: 'A customized cut, wash, and blow-dry tailored to your features and lifestyle, using premium nourishing shampoos.'
  },
  {
    name: 'Balayage & Hair Colouring',
    category: 'Hair & Styling',
    price: 4500,
    duration: 120,
    description: 'Expert dimensional hand-painted color and highlights to create a natural, sun-kissed look.'
  },
  {
    name: 'Premium Keratin Hair Treatment',
    category: 'Hair & Styling',
    price: 3500,
    duration: 90,
    description: 'Deep conditioning treatment to restore strength, moisture, and mirror-like shine to damaged hair.'
  },
  {
    name: 'Aromatherapy Head Massage',
    category: 'Hair & Styling',
    price: 800,
    duration: 30,
    description: 'A deeply relaxing head massage using premium essential oils to release stress and tension.'
  },

  // TAB 2: Skin & Body Care
  {
    name: 'Organic Glow Facial',
    category: 'Skin & Body Care',
    price: 2200,
    duration: 60,
    description: 'Revitalizing skin therapy utilizing organic serums, custom masks, and massage to restore a youthful glow.'
  },
  {
    name: 'Smooth Silk Waxing',
    category: 'Skin & Body Care',
    price: 1200,
    duration: 45,
    description: 'Gentle, full-leg and arm organic hot wax treatment for ultra-smooth skin with minimal discomfort.'
  },
  {
    name: 'Swedish Full Body Massage',
    category: 'Skin & Body Care',
    price: 3500,
    duration: 75,
    description: 'Secluded full-body relaxation massage designed to improve circulation and ease muscle tightness.'
  },
  {
    name: 'Precision Threading (Brows & Upper Lip)',
    category: 'Skin & Body Care',
    price: 250,
    duration: 150,
    description: 'Accurate and clean facial hair shaping using pure cotton thread for pristine definition.'
  },

  // TAB 3: Nails & Hands
  {
    name: 'Spa Manicure',
    category: 'Nails & Hands',
    price: 1000,
    duration: 45,
    description: 'Nail shaping, cuticle care, luxury hand scrub, and moisturizing massage finished with premium gel polish.'
  },
  {
    name: 'Revitalizing Pedicure',
    category: 'Nails & Hands',
    price: 1200,
    duration: 50,
    description: 'Warm foot soak, exfoliation, nail grooming, and relaxing massage to refresh tired feet.'
  },
  {
    name: 'All-inclusive Nail Treatment & Extensions',
    category: 'Nails & Hands',
    price: 2000,
    duration: 60,
    description: 'Gel extension overlay or intense strengthening therapy to give your nails a stunning, long-lasting look.'
  },

  // TAB 4: Bridal & Artistry
  {
    name: 'Royal Bridal Makeup',
    category: 'Bridal & Artistry',
    price: 15000,
    duration: 150,
    description: 'Complete high-definition bridal look with premium lashes, contouring, and setting for your special day.'
  },
  {
    name: 'Premium Makeup Package (Party/Festive)',
    category: 'Bridal & Artistry',
    price: 7500,
    duration: 90,
    description: 'Custom glam for any event, focusing on flawless skin, elegant eyes, and long-wearing luxury finishes.'
  },
  {
    name: 'Exquisite Royal Mehndi Design',
    category: 'Bridal & Artistry',
    price: 3000,
    duration: 90,
    description: 'Bespoke hand-applied henna art featuring intricate traditional and contemporary bridal patterns.'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Existing services cleared.');

    // Seed services
    await Service.insertMany(services);
    console.log('Salon services successfully seeded!');

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
