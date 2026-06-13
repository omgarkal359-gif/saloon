import Settings from '../models/Settings.js';
import { getMockSettings, saveMockSettings } from '../utils/mockData.js';

// GET settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, settings });
  } catch (err) {
    console.warn('MongoDB unavailable, using mock settings');
    const settings = getMockSettings();
    res.json({ success: true, settings });
  }
};

// PUT update settings
export const updateSettings = async (req, res) => {
  const { phoneNumber, location, instagramUrl } = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ phoneNumber, location, instagramUrl });
    } else {
      if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber;
      if (location !== undefined) settings.location = location;
      if (instagramUrl !== undefined) settings.instagramUrl = instagramUrl;
      await settings.save();
    }
    res.json({ success: true, settings });
  } catch (err) {
    console.warn('MongoDB unavailable, using mock settings for update');
    const current = getMockSettings();
    const updated = {
      ...current,
      ...(phoneNumber !== undefined && { phoneNumber }),
      ...(location !== undefined && { location }),
      ...(instagramUrl !== undefined && { instagramUrl })
    };
    const saved = saveMockSettings(updated);
    if (saved) {
      res.json({ success: true, settings: saved });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save settings' });
    }
  }
};
