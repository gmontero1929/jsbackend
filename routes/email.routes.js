import express from "express";
import {sendEmails} from '../controllers/email.controller.js'



const router = express.Router();

router.post('/sendEmails', sendEmails);



export default router;