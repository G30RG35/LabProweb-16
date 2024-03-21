import express from 'express';
import { addNewPeriodo, getAllPeriodos, getOnePeriodo } from "../controllers/PeriodoController.js";
const router = express.Router();

router.route('/').get(getAllPeriodos).post(addNewPeriodo);
router.route('/:id').get(getOnePeriodo)

export default router