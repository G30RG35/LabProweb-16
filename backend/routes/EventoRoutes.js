import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { getAllEventos } from "../controllers/EventoController.js";

const router = express.Router();

router.route('/').get(checkAuth, getAllEventos)

export default router;