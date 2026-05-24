import express from "express";
import PaymentsController from "../controllers/payments.controller.js"; 
        
const paymentControl = new PaymentsController();

const router = express.Router();

//router.get('/customers', clientControl.getClients);
//router.get('/customers/getbycode', clientControl.getClientByCode);
router.post('/payment/create', paymentControl.createPayment);
//router.put('/customer/update', clientControl.updateClient);
//router.delete('/customer/delete', clientControl.deleteClient);

export default router;