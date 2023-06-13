const router = require('express').Router();
const {
  getFavoriteById,
  deleteFavorite,
  addFavorite,
} = require('../controllers/favorite.controllers');
const middleware = require('../middleware/authentication.middleware');

router.get('/', middleware, getFavoriteById);
// router.put('/:customerId', updateFavorite);
router.delete('/:favoriteId', middleware, deleteFavorite);
router.post('/', middleware, addFavorite);

module.exports = router;
