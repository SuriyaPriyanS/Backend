import express from 'express';
import { createFeedback, getFeedback } from '../Controllers/feedbackControllers.js';



const router = express.Router();


router.post('/api/feeds', createFeedback)
router.get('/api/feeds',getFeedback )




export default router;