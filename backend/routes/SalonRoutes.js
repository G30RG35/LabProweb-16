import express from "express"
import { getAllSalon, getOneSalon, addNewSalon, updateSalon } from "../controllers/SalonController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/').get(checkAuth, getAllSalon).post(checkAuth, addNewSalon)
router.route('/:id').get(checkAuth, getOneSalon).put(checkAuth, updateSalon)

export default router