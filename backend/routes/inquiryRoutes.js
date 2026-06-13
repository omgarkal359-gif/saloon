import express from 'express';
import { createInquiry, getInquiries, resolveInquiry } from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/', getInquiries);
router.put('/:id', resolveInquiry);

export default router;
