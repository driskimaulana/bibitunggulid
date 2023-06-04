const router = require('express').Router();
const {
  getFavoriteById,
  deleteFavorite,
  addFavorite,
} = require('../controllers/favorite.controllers');

router.get('/:customerId', getFavoriteById);
// router.put('/:customerId', updateFavorite);
router.delete('/:favoriteId', deleteFavorite);
router.post('/', addFavorite);

module.exports = router;
