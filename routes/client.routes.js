import express from "express";
import ClientController from "../controllers/client.controller.js"; 
        
const clientControl = new ClientController();

const router = express.Router();

router.get('/customers', clientControl.getClients);
router.get('/customers/getbycode', clientControl.getClientByCode);
router.post('/customer/create', clientControl.createClient);
router.put('/customer/update', clientControl.updateClient);
router.delete('/customer/delete', clientControl.deleteClient);

export default router;