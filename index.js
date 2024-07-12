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
import contactOwner from './Routers/ContacteRouter.js'
import Stripe from 'stripe';
import connectDB from './Databases/Config.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    // res.send("Welcome to our API");
    res
      .status(200)
      .send(
        `<span style="background-color:aqua;color:black;font-weight:bold; font-size:80px">Welcome to our API</span>`
      );
  });

// Define routes
app.use('/api', petRoutes);
app.use('/api', userRouter);
app.use('/api', feedbackRouter);
app.use('/api', adoptionRouter); // Corrected variable name
app.use('/api', donationCampaignRouter);
app.use('/api', paymentRouter);
app.use('/api/application', applicationRoutes);
app.use('/api', contactOwner);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
