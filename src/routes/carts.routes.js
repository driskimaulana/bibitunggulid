/**
* Programmer: D'Riski Maulana
* Filename: carts.routes.js
* Contact: driskimaulana@upi.edu
* Date: June 01, 2023
* Description: Routes for carts system
* */

const router = require('express').Router();
const {
  getCartByCustomerId,
  addProductToCustomerCarts,
  deleteProductFromCustomersCart,
  reduceProductFromCustomersCart,
} = require('../controllers/carts.controllers');
const middleware = require('../middleware/authentication.middleware.js');

router.get('/', middleware, getCartByCustomerId);
router.post('/', middleware, addProductToCustomerCarts);
router.delete('/:productId', middleware, deleteProductFromCustomersCart);
router.put('/:productId', middleware, reduceProductFromCustomersCart);

module.exports = router;
