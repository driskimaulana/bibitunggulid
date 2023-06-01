const router = require('express').Router();
const {
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  addNewProduct,
} = require('../controllers/product.controllers');

router.get('/', getProduct);
router.post('/', addNewProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
