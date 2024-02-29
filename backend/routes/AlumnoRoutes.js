import express from "express";
const router = express.Router();

router.get('/', getAlumnos);

export default router