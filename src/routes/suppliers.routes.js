const router = require('express').Router();
const {
  getAllSuppliers, addNewSupplier, deleteSuppliers, updateSupplier, getSupplierDetailsById,
} = require('../controllers/suppliers.controllers');

router.get('/', getAllSuppliers);
router.get('/:id', getSupplierDetailsById);
router.post('/', addNewSupplier);
router.delete('/:id', deleteSuppliers);
router.put('/:id', updateSupplier);
module.exports = router;
