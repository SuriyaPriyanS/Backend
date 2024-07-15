import express from 'express';

import {createPet,getPets,updatePet,deletePet, getPetById} from '../Controllers/petControllers.js';



const router = express.Router();



router.post('/pet',createPet)
router.get('/getpetall',getPets)
router.get('/pet/:id',getPetById)
router.put('/pet/:id',updatePet)
router.delete('/api/pet/:id',deletePet)


export default router;