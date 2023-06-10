const router = require('express').Router();
const {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addNewProduct,
} = require('../controllers/product.controllers');
const adminMiddleware = require('../middleware/admin.authentication.middleware');

router.get('/', getProduct);
router.post('/', adminMiddleware, addNewProduct);
router.get('/:id', getProductById);
router.put('/:id', adminMiddleware, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
