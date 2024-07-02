import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URl, {
           
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

