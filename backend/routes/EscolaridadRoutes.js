import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addNewEscolaridad, getAllEscolaridades, updateEscolaridad } from "../controllers/EscolaridadController.js";

const router = express.Router()

router.route("/").get(checkAuth, getAllEscolaridades).post(checkAuth, addNewEscolaridad);
router.route('/:id').put(checkAuth, updateEscolaridad);

export default router;