import express from "express"
import { getAllSalon, getOneSalon, addNewSalon, updateSalon, deleteSalon } from "../controllers/SalonController.js";
const router = express.Router();

router.route('/').get(getAllSalon).post(addNewSalon)
router.route('/:id').get(getOneSalon).delete(deleteSalon).put(updateSalon)

export default router