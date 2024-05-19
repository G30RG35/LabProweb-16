import express from 'express';
import { handleContacto } from '../controllers/ContactoController.js';

const router = express.Router();

router.post('/info', handleContacto);

export default router;