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
router.post('/api/items',checkToken ,postItems);
router.put('/api/items/:id',checkToken ,updateItemById);
router.get('/api/items/:id', checkToken,getItemById);
router.delete('/api/items/:id',checkToken, deleteItemById);

module.exports = router;
