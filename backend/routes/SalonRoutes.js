import express from "express"
import { getAllSalon, getOneSalon, addNewSalon, updateSalon, deleteSalon } from "../controllers/SalonController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/').get(checkAuth, getAllSalon).post(checkAuth, addNewSalon)
router.route('/:id').get(checkAuth, getOneSalon).delete(checkAuth, deleteSalon).put(checkAuth, updateSalon)

export default router