import express from 'express';
import { addNewPeriodo, getAllPeriodos, getOnePeriodo } from "../controllers/PeriodoController.js";
import checkAuth from '../middleware/checkAuth.js';
const router = express.Router();

router.route('/').get(getAllPeriodos).post(checkAuth, addNewPeriodo);
router.route('/:id').get(getOnePeriodo)

export default router