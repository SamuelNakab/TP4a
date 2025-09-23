import express from "express";  
import { verifyToken, verifyAdmin } from '../Middlewares/auth.js';
import { createSong, updateSong, deleteSong, escucharCancion} from '../Controllers/cancionControllers.js';

const router = express.Router();

router.post('/cancion', verifyToken, verifyAdmin, createSong);
router.put('/cancion', verifyToken, verifyAdmin, updateSong);
router.delete('/cancion', verifyToken, verifyAdmin, deleteSong);

router.post('/escucho', verifyToken, escucharCancion);


export default router;