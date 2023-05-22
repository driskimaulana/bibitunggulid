/**
* Programmer: D'Riski Maulana
* Filename: authentication.routes.js
* Contact: driskimaulana@upi.edu
* Date: May 22, 2023
* Description: Routes for authentication functionality
* */

const express = require('express').Router();
const { signUp, signIn } = require('../controllers/authentication.controllers.js');

const router = express;

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
