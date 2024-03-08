import express from 'express';
import { addNewMateria, getAllMaterias, getOneMateria, updateMateria } from "../controllers/MateriaController.js";
const router = express.Router();

router.route('/').get(getAllMaterias).post(addNewMateria)
router.route('/:id').get(getOneMateria).put(updateMateria)

export default router;