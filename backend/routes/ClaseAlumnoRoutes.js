import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { addNewClaseAlumno, deleteClaseAlumno, getAllClaseAlumno, getClaseAluMaestro, getClaseAlumno, updateClaseAlumno } from '../controllers/ClaseAlumnoController.js'

const router = express.Router()

router.route('/').get(checkAuth, getAllClaseAlumno).post(checkAuth, addNewClaseAlumno)
router.get('/alumno/:usuarioID', checkAuth, getClaseAlumno);
router.route('/:grupoID/:materiaID/:maestroID/:usuarioID').put(checkAuth, updateClaseAlumno).delete(checkAuth, deleteClaseAlumno)
router.get('/maestro/:maestroID', checkAuth, getClaseAluMaestro)

export default router