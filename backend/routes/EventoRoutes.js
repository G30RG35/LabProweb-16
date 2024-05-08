import express from 'express'
import { addNewEvent, getAllEvents } from '../controllers/EventoController.js'

const router = express.Router()

router.route('/').get(getAllEvents).post(addNewEvent);

export default router