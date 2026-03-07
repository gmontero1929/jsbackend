import express from "express";
//import { authRequired, requirePermission } from "../middleware/auth.middleware.js";
import {getUsers, getUserByUserAndPass, registerUser, 
        deleteById,deleteByUser, getUserById,updateUser} 
        from '../controllers/user.controller.js'


const router = express.Router();

router.get('/users', getUsers);
router.get('/user/byid', getUserById);
router.post('/user/byuserandpass', getUserByUserAndPass);

//router.post('/user', getUserByUserId);
router.post('/user/create', registerUser);
router.put('/user/update', updateUser);
router.delete('/user/deletebyid', deleteById);
router.delete('/user/deletebyuser', deleteByUser);

export default router;