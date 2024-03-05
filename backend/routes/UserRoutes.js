import express from "express";
import { addNewUser, getAllUsers, getOneUser } from "../controllers/AlumnoController.js";
const router = express.Router();

router.route('/').get(getAllUsers).post(addNewUser);
router.get('/:id', getOneUser);

export default router