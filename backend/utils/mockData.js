import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICES_FILE = path.join(__dirname, '..', 'mock_services.json');
const APPOINTMENTS_FILE = path.join(__dirname, '..', 'mock_appointments.json');
const INQUIRIES_FILE = path.join(__dirname, '..', 'mock_inquiries.json');
const SETTINGS_FILE = path.join(__dirname, '..', 'mock_settings.json');
const TRANSFORMATIONS_FILE = path.join(__dirname, '..', 'mock_transformations.json');

// Default initial catalog
const defaultServices = [
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

// Initialize JSON files if missing
try {
  if (!fs.existsSync(SERVICES_FILE)) {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(defaultServices, null, 2));
  }
} catch (err) {
  console.warn('Could not initialize mock services file:', err.message);
}

try {
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([]));
  }
} catch (err) {
  console.warn('Could not initialize mock appointments file:', err.message);
}

try {
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([]));
  }
} catch (err) {
  console.warn('Could not initialize mock inquiries file:', err.message);
}

const defaultSettings = {
  phoneNumber: '+91 9326899376',
  location: 'Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206',
  instagramUrl: 'https://instagram.com/foreverbeautysalon'
};

try {
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
  }
} catch (err) {
  console.warn('Could not initialize mock settings file:', err.message);
}

try {
  if (!fs.existsSync(TRANSFORMATIONS_FILE)) {
    fs.writeFileSync(TRANSFORMATIONS_FILE, JSON.stringify([]));
  }
} catch (err) {
  console.warn('Could not initialize mock transformations file:', err.message);
}

// ----------------------------------------------------
// Service CRUD Fallbacks
// ----------------------------------------------------
export const getMockServices = () => {
  try {
    const data = fs.readFileSync(SERVICES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock services:', error);
    return defaultServices;
  }
};

export const saveMockService = (service) => {
  try {
    const services = getMockServices();
    const newService = {
      _id: `mock_svc_${Date.now()}`,
      ...service,
    };
    services.push(newService);
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
    return newService;
  } catch (error) {
    console.error('Error saving mock service:', error);
    return null;
  }
};

export const updateMockService = (id, updatedData) => {
  try {
    const services = getMockServices();
    const idx = services.findIndex(s => s._id.toString() === id.toString());
    if (idx === -1) return null;
    services[idx] = { ...services[idx], ...updatedData };
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
    return services[idx];
  } catch (error) {
    console.error('Error updating mock service:', error);
    return null;
  }
};

export const deleteMockService = (id) => {
  try {
    const services = getMockServices();
    const filtered = services.filter(s => s._id.toString() !== id.toString());
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting mock service:', error);
    return false;
  }
};

// Expose mockServices dynamically
export const mockServices = getMockServices();

// ----------------------------------------------------
// Appointment Fallbacks
// ----------------------------------------------------
export const getMockAppointments = () => {
  try {
    const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock appointments:', error);
    return [];
  }
};

export const saveMockAppointment = (appointment) => {
  try {
    const appointments = getMockAppointments();
    const newAppointment = {
      _id: `mock_app_${Date.now()}`,
      ...appointment,
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    return newAppointment;
  } catch (error) {
    console.error('Error saving mock appointment:', error);
    return null;
  }
};

// ----------------------------------------------------
// Inquiry Fallbacks
// ----------------------------------------------------
export const getMockInquiries = () => {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock inquiries:', error);
    return [];
  }
};

export const saveMockInquiry = (inquiry) => {
  try {
    const inquiries = getMockInquiries();
    const newInquiry = {
      _id: `mock_inq_${Date.now()}`,
      status: 'unread',
      ...inquiry,
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    return newInquiry;
  } catch (error) {
    console.error('Error saving mock inquiry:', error);
    return null;
  }
};

export const resolveMockInquiry = (id) => {
  try {
    const inquiries = getMockInquiries();
    const idx = inquiries.findIndex(i => i._id.toString() === id.toString());
    if (idx === -1) return null;
    inquiries[idx].status = 'resolved';
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    return inquiries[idx];
  } catch (error) {
    console.error('Error resolving mock inquiry:', error);
    return null;
  }
};

// Settings CRUD
export const getMockSettings = () => {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock settings:', error);
    return defaultSettings;
  }
};

export const saveMockSettings = (settings) => {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    return settings;
  } catch (error) {
    console.error('Error saving mock settings:', error);
    return null;
  }
};

// Transformations CRUD
export const getMockTransformations = () => {
  try {
    const data = fs.readFileSync(TRANSFORMATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock transformations:', error);
    return [];
  }
};

export const saveMockTransformation = (transformation) => {
  try {
    const items = getMockTransformations();
    const newItem = {
      _id: `mock_trans_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...transformation
    };
    items.push(newItem);
    fs.writeFileSync(TRANSFORMATIONS_FILE, JSON.stringify(items, null, 2));
    return newItem;
  } catch (error) {
    console.error('Error saving mock transformation:', error);
    return null;
  }
};

export const deleteMockTransformation = (id) => {
  try {
    const items = getMockTransformations();
    const filtered = items.filter(item => item._id.toString() !== id.toString());
    fs.writeFileSync(TRANSFORMATIONS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting mock transformation:', error);
    return false;
  }
};
