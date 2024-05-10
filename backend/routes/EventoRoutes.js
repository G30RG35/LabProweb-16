import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addNewEvento, getAllEventos } from "../controllers/EventoController.js";

const router = express.Router();

router.route('/').get(checkAuth, getAllEventos).post(checkAuth, addNewEvento)

export default router;