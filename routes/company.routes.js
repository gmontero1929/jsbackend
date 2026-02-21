import express from "express";
import { companyController,getCompanies } from "../controllers/company.controller.js";

const router = express.Router();

router.get('/companies', getCompanies);

export default router;