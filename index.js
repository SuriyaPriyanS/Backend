import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import petRoutes from './Routers/petRouter.js';
import userRouter from './Routers/userRouter.js';
import feedbackRouter from './Routers/feedbackRouter.js';
import adoptionRouter from './Routers/adipationRouter.js'; // Ensure correct path
import donationCampaignRouter from './Routers/donationRouters.js';
import paymentRouter from './Routers/paymentRouters.js';
import applicationRoutes from './Routers/applicationRouter.js';
import Stripe from 'stripe';
import connectDB from './Databases/Config.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());



// Define routes
app.use('/api', petRoutes);
app.use('/api', userRouter);
app.use('/api', feedbackRouter);
app.use('/api', adoptionRouter); // Corrected variable name
app.use('/api', donationCampaignRouter);
app.use('/api', paymentRouter);
app.use('/api/application', applicationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
