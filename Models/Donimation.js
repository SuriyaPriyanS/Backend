// models/DonationCampaign.js

import mongoose from 'mongoose';

const donationCampaignSchema = new mongoose.Schema({
    image: String,
    name: String,
    max_donation_limit: Number,
    last_donation_date: Date,
    shortdesp: String,
    longdesp: String,
    addedDate: String,
    userEmail: String,
    pause: Boolean
});

const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);

export default DonationCampaign;
