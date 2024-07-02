// routes/donationCampaign.js

import express from 'express';
import { creataddonation,  } from '../Controllers/DonationControllers.js';

const router = express.Router();

// POST /api/adddonationcamp - Create a new donation campaign
router.post('/adddonationcamp', creataddonation);

export default router;
