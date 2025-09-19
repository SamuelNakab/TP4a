import express from "express";  

import { createUser, loginUser } from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/crearusuario', createUser);
router.post('/login', loginUser);

export default router;