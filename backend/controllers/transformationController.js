import Transformation from '../models/Transformation.js';
import { getMockTransformations, saveMockTransformation, deleteMockTransformation } from '../utils/mockData.js';

// GET all transformations
export const getTransformations = async (req, res) => {
  try {
    const transformations = await Transformation.find().sort({ createdAt: -1 });
    res.json({ success: true, transformations });
  } catch (err) {
    console.warn('MongoDB unavailable, using mock transformations');
    const transformations = getMockTransformations();
    res.json({ success: true, transformations });
  }
};

// POST create a new transformation
export const createTransformation = async (req, res) => {
  const { title, description, beforeImage, afterImage } = req.body;
  if (!title || !beforeImage || !afterImage) {
    return res.status(400).json({ success: false, message: 'Title, Before Image, and After Image are required.' });
  }
  try {
    const transformation = await Transformation.create({ title, description, beforeImage, afterImage });
    res.status(201).json({ success: true, transformation });
  } catch (err) {
    console.warn('MongoDB unavailable, using mock transformations for create');
    const transformation = saveMockTransformation({ title, description, beforeImage, afterImage });
    if (transformation) {
      res.status(201).json({ success: true, transformation });
    } else {
      res.status(500).json({ success: false, message: 'Failed to save transformation' });
    }
  }
};

// DELETE a transformation
export const deleteTransformation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Transformation.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ success: false, message: 'Transformation not found' });
    res.json({ success: true, message: 'Transformation deleted' });
  } catch (err) {
    console.warn('MongoDB unavailable, using mock transformations for delete');
    const ok = deleteMockTransformation(id);
    if (ok) {
      res.json({ success: true, message: 'Transformation deleted' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to delete transformation' });
    }
  }
};
