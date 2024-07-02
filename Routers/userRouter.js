import express from 'express';
import {  google, login, register } from '../Controllers/usercontrollers.js';
 


const router = express.Router();



router.post('/register',register);
router.post('/login',login);
router.post('/google',google)




export default router;