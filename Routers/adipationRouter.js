import express from 'express';
import {
    createAdoptionPost,
    getAllAdoptionPosts,
    getAdoptionPostById,
    updateAdoptionPost,
    deleteAdoptionPost
} from '../Controllers/AdptionControllers.js';


const router = express.Router();







router.post('/adoptionPosts', createAdoptionPost);
router.get('/adoptionPosts', getAllAdoptionPosts);
router.get('/adoptionPosts/:id', getAdoptionPostById);
router.put('/adoptionPosts/:id', updateAdoptionPost);
router.delete('/adoptionPosts/:id', deleteAdoptionPost);

export default router;