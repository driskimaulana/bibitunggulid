const router = require('express').Router();
const {
    getFavoriteById,
    updateFavorite,
    deleteFavorite,
    addFavorite,
} = require('../controllers/favorite.controllers');

router.get('/:favoriteId', getFavoriteById);
router.put('/:favoriteId', updateFavorite);
router.delete('/:favoriteId', deleteFavorite);
router.post('/:favoriteId', addFavorite);

module.exports = router;