import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { addNewGrupo, getAllGrupos } from "../controllers/GrupoController.js";

const router = express.Router();

router.route('/').get(checkAuth, getAllGrupos).post(checkAuth, addNewGrupo)

export default router;