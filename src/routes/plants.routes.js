const router = require('express').Router();
const {
  addNewPlants, getPlants, deletePlants, updatePlants,
} = require('../controllers/plants.controller');

router.post('/', addNewPlants);
router.get('/', getPlants);
router.delete('/', deletePlants);
router.put(':/id', updatePlants);

module.exports = router;
