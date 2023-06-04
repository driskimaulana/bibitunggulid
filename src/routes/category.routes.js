/**
* Programmer: D'Riski Maulana
* Filename: category.routes.js
* Contact: driskimaulana@upi.edu
* Date: May 24, 2023
* Description: This is a routes for functionalities related to category
* */

const router = require('express').Router();
const {
  getAllCategory, updateCategory, deleteCategory, addNewCategory,
} = require('../controllers/category.controllers');

router.get('/', getAllCategory);
// router.get('/:id', getCustomersById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.post('/', addNewCategory);

module.exports = router;
