import express from 'express';
import { createAppointment, getBusySlots } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/busy-slots', getBusySlots);

export default router;
