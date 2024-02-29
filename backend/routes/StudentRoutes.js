import express from "express";
import { addNewStudent, getAllStudents, getOneStudent } from "../controllers/AlumnoController.js";
const router = express.Router();

router.route('/').get(getAllStudents).post(addNewStudent);
router.get('/:id', getOneStudent);

export default router