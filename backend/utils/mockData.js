import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_DB_FILE = path.join(__dirname, '..', 'mock_appointments.json');

export const mockServices = [
  // TAB 1: Hair & Styling
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

  // TAB 2: Skin & Body Care
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

  // TAB 3: Nails & Hands
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

  // TAB 4: Bridal & Artistry
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

// Read appointments from mock file
export const getMockAppointments = () => {
  try {
    if (!fs.existsSync(MOCK_DB_FILE)) {
      fs.writeFileSync(MOCK_DB_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(MOCK_DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock appointments:', error);
    return [];
  }
};

// Write appointment to mock file
export const saveMockAppointment = (appointment) => {
  try {
    const appointments = getMockAppointments();
    const newAppointment = {
      _id: `mock_app_${Date.now()}`,
      ...appointment,
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(appointments, null, 2));
    return newAppointment;
  } catch (error) {
    console.error('Error saving mock appointment:', error);
    return null;
  }
};
