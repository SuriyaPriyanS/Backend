import express from 'express';
import { contactOwner } from '../Controllers/ContactControllers.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/contact-owner', authMiddleware, contactOwner);

export default router;
