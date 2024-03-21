import express from 'express';
import { addNewRol, deleteRol, getAllRol, getOneRol, updateRol } from '../controllers/RolController.js';

const router = express.Router();

router.route('/').get(getAllRol).post(addNewRol);
router.route('/:id').get(getOneRol).put(updateRol).delete(deleteRol);

export default router;