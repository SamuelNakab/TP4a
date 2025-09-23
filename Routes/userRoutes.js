import express from "express";  
import { verifyToken, verifyAdmin } from '../Middlewares/auth.js';
import { createUser, loginUser, getEscuchasUser} from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/crearusuario', createUser);
router.post('/login', loginUser);
router.get('/escucho', verifyToken, getEscuchasUser);
//



export default router;