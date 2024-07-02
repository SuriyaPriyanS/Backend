// routes/donationCampaign.js

import express from 'express';
import DonationCampaign from '../Models/Donimation.js';
import jwt from 'jsonwebtoken'; // Import jwt from jsonwebtoken package



// POST /api/adddonationcamp - Create a new donation campaign
 export const  creataddonation = async (req, res, next) => {
    const {
        image,
        name,
        max_donation_limit,
        last_donation_date,
        shortdesp,
        longdesp,
        addedDate,
        userEmail,
        pause
    } = req.body;

    try {
        const newDonationCampaign = new DonationCampaign({
            image,
            name,
            max_donation_limit,
            last_donation_date,
            shortdesp,
            longdesp,
            addedDate,
            userEmail,
            pause
        });

        const savedCampaign = await newDonationCampaign.save();

        // Create JWT payload
        const payload = {
            donationCampaignId: savedCampaign._id, // Assuming your DonationCampaign model has an '_id' field
            userEmail: userEmail,
            role: 'donation_campaign', // Example role for a donation campaign
        };

        // Sign JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('JWT signing error:', err.message);
                    return res.status(500).json({ error: 'Failed to create token' });
                }
                res.status(201).json({ campaign: savedCampaign, token });
            }
        );
    } catch (error) {
        console.log('Error creating donation campaign:', error);
        res.status(500).json({ message: error.message });
    }
};

