const router = require('express').Router();
const {
  createOrder, getAllOrder, getOrderDetails,
  getOrderByCustomerId, changeToOnShipping, changeToFinish,
} = require('../controllers/order.controllers');
const adminMiddleware = require('../middleware/admin.authentication.middleware');
const middleware = require('../middleware/authentication.middleware');

router.post('/', middleware, createOrder);
router.get('/', adminMiddleware, getAllOrder);
router.get('/details/:orderId', middleware, getOrderDetails);
router.get('/customer', middleware, getOrderByCustomerId);
router.put('/onshipping/:orderId', middleware, changeToOnShipping);
router.put('/finish/:orderId', middleware, changeToFinish);

module.exports = router;
