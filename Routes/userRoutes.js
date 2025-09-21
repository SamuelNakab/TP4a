import express from "express";  
import { authMiddleware } from '../Middlewares/auth.js';
import { createUser, loginUser, getEscuchasUser} from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/crearusuario', createUser);
router.post('/login', loginUser);
router.get('/escucho', authMiddleware, getEscuchasUser);

export default router;