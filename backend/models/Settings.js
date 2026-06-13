import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      default: '+91 9326899376',
    },
    location: {
      type: String,
      default: 'Shop No. 2, Plot No. 13, Mahavir Sparsh, Sector-3, Ulwe, Navi Mumbai - 410206',
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com/foreverbeautysalon',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
