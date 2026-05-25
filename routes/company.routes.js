import express from "express";
import { companyController,getCompanies, createCompany, deleteCompany, updateCompany, getCompanyByCode, getCompanyByRnc } 
        from "../controllers/company.controller.js";

const router = express.Router();

router.get('/companies', getCompanies);
router.get('/company/getbycode', getCompanyByCode);
router.get('/company/getbyrnc', getCompanyByRnc);
router.post('/company/create', createCompany);
router.put('/company/update', updateCompany);
router.delete('/company/delete', deleteCompany);

export default router;