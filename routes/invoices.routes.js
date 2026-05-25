import express from "express";
import InvoiceController from "../controllers/invoices.controller.js"; 
        
const invoiceControl = new InvoiceController();

const router = express.Router();

router.get('/invoices', invoiceControl.allInvoices);
router.get('/invoicesByCompany/:companyId', invoiceControl.allInvoicesByCompany);
//router.get('/customers/getbycode', clientControl.getClientByCode);
router.post('/invoice/create', invoiceControl.createClient);
//router.put('/customer/update', clientControl.updateClient);
//router.delete('/customer/delete', clientControl.deleteClient);

export default router;