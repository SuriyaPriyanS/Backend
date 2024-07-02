// routes/application.js

import express from 'express';
import Application from '../Models/Application.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// POST /api/application/create
router.post('/create', authMiddleware, async (req, res) => {
     const { petID, message } = req.body;

    try {
        // Create a new application instance
        const newApplication = new Application({
            user: req.user.userId, // Assuming req.user.userId is where the user ID is stored in the decoded JWT payload
            pet: petID,
            message: message,
        });

        // Save the application to the database
        await newApplication.save();

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application: newApplication,
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application. Please try again later.',
        });
    }
});

export default router;
