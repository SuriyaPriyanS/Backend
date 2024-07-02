import express from 'express';

import { createPaymentIntent, savePayment, getPayments, deletePayment } from '../Controllers/PaymentControllers.js';
const router = express.Router();
router.post('/create-payment-intent', createPaymentIntent);
router.post('/payments', savePayment);
router.get('/payments', getPayments);
router.delete('/payments/:id', deletePayment);

export default router;
