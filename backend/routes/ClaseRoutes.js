import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { addNewClase, getAllClases, getOneClase } from '../controllers/ClaseController.js';

const router = express.Router();

router.route('/').get(checkAuth, getAllClases).post(checkAuth, addNewClase);
router.route('/:grupoID/:materiaID/:usuarioID').get(checkAuth, getOneClase);

export default router