const router = require('express').Router();
const {
  postItems,
  getItems,
  updateItemById,
  getItemById,
  deleteItem,
} = require('../controllers/item.controller');

router.get('/api/items', getItems);
router.post('/api/items', postItems);
router.put('/api/items/:id', updateItemById);
router.get('/api/items/:id', getItemById);
router.delete('/api/items/:id', deleteItem);

module.exports = router;
