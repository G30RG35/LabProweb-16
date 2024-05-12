import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { addNewClaseAlumno, getAllClaseAlumno } from '../controllers/ClaseAlumnoController.js'

const router = express.Router()

router.route('/').get(checkAuth, getAllClaseAlumno).post(checkAuth, addNewClaseAlumno)

export default router