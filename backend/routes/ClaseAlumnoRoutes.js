import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { addNewClaseAlumno, getAllClaseAlumno, getClaseAlumno, updateClaseAlumno } from '../controllers/ClaseAlumnoController.js'

const router = express.Router()

router.route('/').get(checkAuth, getAllClaseAlumno).post(checkAuth, addNewClaseAlumno)
router.get('/alumno/:usuarioID', checkAuth, getClaseAlumno);
router.route('/:grupoID/:materiaID/:maestroID/:usuarioID').put(checkAuth, updateClaseAlumno)

export default router