const router = require('express').Router();
const {
  createOrder, getAllOrder, getOrderDetails,
  getOrderByCustomerId, changeToOnShipping, changeToFinish, getOrderPaymentDetails,
} = require('../controllers/order.controllers');
const adminMiddleware = require('../middleware/admin.authentication.middleware');
const middleware = require('../middleware/authentication.middleware');

router.post('/', middleware, createOrder);
router.get('/', adminMiddleware, getAllOrder);
router.get('/details/:orderId', middleware, getOrderDetails);
router.get('/details/payment/:orderId', middleware, getOrderPaymentDetails);
router.get('/customer', middleware, getOrderByCustomerId);
router.put('/onshipping/:orderId', changeToOnShipping);
router.put('/finish/:orderId', middleware, changeToFinish);

module.exports = router;
