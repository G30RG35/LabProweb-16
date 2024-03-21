import express from "express";
import { addNewUser, getAllUsers, getOneUser, updateUser } from "../controllers/UserController.js";
const router = express.Router();

router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getOneUser).post(updateUser);

export default router