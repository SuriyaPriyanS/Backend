import express from 'express';
import feedback from '../Models/feedback.js';




 export const createFeedback = async (req, res) => {
    const { petId, message, rating }  = req.body;
    try {
        const feedback = await feedback.create({
            user: req.user.id,
            pet: petId,
            message: message,
            rating: rating,
        });
        res.status(200).json({message: 'feedback successfully', feedback: feedback});

    } catch (error) {
        res.status(500).json({error: 'error message found', error: error.message});
    }
};

 export const getFeedback = async (req,res) => {
    try {
        const feedback = await feedback.find({pet: req.params.petId});
        res.status(200).json({feedback: feedback});
    } catch (error) {
        res.status(500).json({error: 'error message found', error: error.message});
    }
};

