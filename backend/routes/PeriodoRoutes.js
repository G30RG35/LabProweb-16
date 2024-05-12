import express from 'express';
import { addNewPeriodo, deletePeriodo, getAllPeriodos, getOnePeriodo, updatePeriodo } from "../controllers/PeriodoController.js";
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.route('/').get(getAllPeriodos).post(checkAuth, addNewPeriodo);
router.route('/:id').get(getOnePeriodo).put(checkAuth, updatePeriodo).delete(checkAuth, deletePeriodo);

export default router