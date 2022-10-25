const router = require('express').Router();
const {
  postItems,
  getItems,
  updateItemById,
  getItemById,
  deleteItemById,
} = require('../controllers/item.controller');
const {checkToken}  = require("../middleware/checkToken");

router.get('/api/items', getItems);
router.post('/api/items',postItems);
router.put('/api/items/:id' ,updateItemById);
router.get('/api/items/:id', getItemById);
router.delete('/api/items/:id', deleteItemById);

module.exports = router;
