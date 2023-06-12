/**
* Programmer: D'Riski Maulana
* Filename: customer.routes.js
* Contact: driskimaulana@upi.edu
* Date: May 24, 2023
* Description: This is a routes for functionalities related to customers
* */

const router = require('express').Router();
const {
  getCustomers, getCustomersById, updateCustomers, deleteCustomers,
} = require('../controllers/customers.controllers');

router.get('/', getCustomers);
router.get('/:id', getCustomersById);
router.put('/:id', updateCustomers);
router.delete('/', deleteCustomers);

module.exports = router;
