import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addNewEvento, deleteEvento, getAllEventos, updateEvento } from "../controllers/EventoController.js";

const router = express.Router();

router.route('/').get(checkAuth, getAllEventos).post(checkAuth, addNewEvento)
router.route('/:id').put(checkAuth, updateEvento).delete(checkAuth, deleteEvento)

export default router;
