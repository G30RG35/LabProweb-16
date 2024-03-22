import express from 'express';
import { addNewMateria, getAllMaterias, getOneMateria, updateMateria } from "../controllers/MateriaController.js";
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.route('/').get(getAllMaterias).post(checkAuth, addNewMateria)
router.route('/:id').get(getOneMateria).put(checkAuth, updateMateria)

export default router;