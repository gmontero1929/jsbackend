import express from "express";
import { authRequired, requirePermission } from "../middleware/auth.middleware.js";
import {getUsers, getUserByUserId, registerUser, deleteUser, getUserById,updateUser} from '../controllers/user.controller.js'

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/getbyid', getUserById);
router.post('/user', getUserByUserId);
router.post('/user/create', registerUser);
router.put('/user/updateUser', updateUser);
router.delete('/user/delete', deleteUser);

export default router;