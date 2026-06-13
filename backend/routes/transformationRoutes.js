import express from 'express';
import { getTransformations, createTransformation, deleteTransformation } from '../controllers/transformationController.js';

const router = express.Router();

router.get('/', getTransformations);
router.post('/', createTransformation);
router.delete('/:id', deleteTransformation);

export default router;
