import express from 'express';
import { addPayment, getAllPayments } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/addPayment', addPayment);

router.get('/getAllPayments', getAllPayments);

export default router;