/**
* Programmer: D'Riski Maulana
* Filename: adminaccount.routes.js
* Contact: driskimaulana@upi.edu
* Date: June 01, 2023
* Description: Routes for adminaccount system
* */

const router = require('express').Router();
const {
  createAdminAccount, signInAdmin, deleteAdminAccount, getAllAdminAccount,
} = require('../controllers/adminaccount.controllers');

router.post('/', createAdminAccount);
router.post('/signin', signInAdmin);
router.delete('/', deleteAdminAccount);
router.get('/', getAllAdminAccount);

module.exports = router;
