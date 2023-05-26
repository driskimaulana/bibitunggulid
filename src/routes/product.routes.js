const router = require('express').Router();
const {
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/product.controllers');

router.get('/', getProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;