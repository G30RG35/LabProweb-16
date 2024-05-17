import express from "express";
import { addNewUser, deleteUser, getAllUsers, getOneUser, updateUser } from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/').get(checkAuth, getAllUsers).post(checkAuth, addNewUser);
router.route('/:id').get(checkAuth, getOneUser).put(updateUser).delete(checkAuth, deleteUser);

export default router
