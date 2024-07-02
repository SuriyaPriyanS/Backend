// adoptionPost.controller.js

import AdoptionPost from '../Models/Adptionfrom.js';


// Create a new adoption post
export const createAdoptionPost = async (req, res) => {
    const { name, description, photo, message, postedBy } = req.body;

    try {
        const newAdoptionPost = new AdoptionPost({
            name,
            description,
            photo,
            message,
            postedBy
        });

        const savedAdoptionPost = await newAdoptionPost.save();
        res.status(201).json(savedAdoptionPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all adoption posts
export const getAllAdoptionPosts = async (req, res) => {
    try {
        const adoptionPosts = await AdoptionPost.find().populate('postedBy', 'username');
        res.status(200).json(adoptionPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single adoption post by ID
export const getAdoptionPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const adoptionPost = await AdoptionPost.findById(id).populate('postedBy', 'username');
        if (!adoptionPost) {
            return res.status(404).json({ message: 'Adoption post not found' });
        }
        res.status(200).json(adoptionPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an adoption post by ID
export const updateAdoptionPost = async (req, res) => {
    const { id } = req.params;
    const { name, description, photo, message } = req.body;

    try {
        const updatedAdoptionPost = await AdoptionPost.findByIdAndUpdate(
            id,
            { name, description, photo, message },
            { new: true }
        );
        if (!updatedAdoptionPost) {
            return res.status(404).json({ message: 'Adoption post not found' });
        }
        res.status(200).json(updatedAdoptionPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an adoption post by ID
export const deleteAdoptionPost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAdoptionPost = await AdoptionPost.findByIdAndDelete(id);
        if (!deletedAdoptionPost) {
            return res.status(404).json({ message: 'Adoption post not found' });
        }
        res.status(200).json({ message: 'Adoption post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
