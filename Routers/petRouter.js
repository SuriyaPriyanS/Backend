import express from 'express';

import {createPet,getPets,updatePet,deletePet, getPetById} from '../Controllers/petControllers.js';



const router = express.Router();



router.post('/pet',createPet)
router.get('/api/pet',getPets)
router.get('/pet/:id',getPetById)
router.put('/api/pet/:id',updatePet)
router.delete('/api/pet/:id',deletePet)


export default router;