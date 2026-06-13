import Service from '../models/Service.js';
import { mockServices } from '../utils/mockData.js';

export const getServices = async (req, res) => {
  try {
    let services;
    if (global.isMockDB) {
      services = mockServices;
    } else {
      services = await Service.find({});
    }
    return res.status(200).json({
      success: true,
      services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving services catalog.',
      error: error.message
    });
  }
};
