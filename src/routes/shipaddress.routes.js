/**
* Programmer: D'Riski Maulana
* Filename: shipaddress.routes.js
* Contact: driskimaulana@upi.edu
* Date: May 24, 2023
* Description: This is a routes for functionalities related to ship address
* */

const router = require('express').Router();
const {
  getShipAddressesByCustomersId,
  updateCustomersShipAddres,
  deleteCustomerShipAddress,
  addNewCustomerShipAddress,
} = require('../controllers/shipaddress.controllers');
const middleware = require('../middleware/authentication.middleware');

router.get('/', middleware, getShipAddressesByCustomersId);
// router.get('/:id', getCustomersById);
router.put('/:id', middleware, updateCustomersShipAddres);
router.delete('/:id', middleware, deleteCustomerShipAddress);
router.post('/', middleware, addNewCustomerShipAddress);

module.exports = router;
