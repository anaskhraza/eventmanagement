import express from 'express';
import path from "path"
import CustomerController from '../controllers/CustomerController';

const router = express.Router();
const customerController = new CustomerController();

// declare routes 
router.get('/', customerController.fetchAllCustomers);
router.get('/:id', customerController.fetchCustomer);
router.post('/create', customerController.createCustomer);

module.exports = router;