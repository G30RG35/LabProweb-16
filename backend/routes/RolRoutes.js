import express from 'express';
import { addNewRol, deleteRol, getAllRol, getOneRol, getUsers, updateRol } from '../controllers/RolController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/').get(getAllRol).post(checkAuth, addNewRol);
router.get('/usuarios/:rolID', checkAuth, getUsers);
router.route('/:id').get(getOneRol).put(checkAuth, updateRol).delete(checkAuth, deleteRol);

export default router;