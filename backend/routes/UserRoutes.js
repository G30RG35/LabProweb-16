import express from "express";
import { addNewUser, deleteUser, getAllUsers, getOneUser, recoverUser, updateUser } from "../controllers/UserController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route('/').get(checkAuth, getAllUsers).post(checkAuth, addNewUser);
router.route('/:id').get(checkAuth, getOneUser).put(updateUser).delete(checkAuth, deleteUser).post(checkAuth, recoverUser);

export default router
