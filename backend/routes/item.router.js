const router = require('express').Router();
// const uploader = require('../middleware/s3');
const {
  postItems,
  getItems,
  updateItemById,
  getItemById,
  deleteItemById,
} = require('../controllers/item.controller');
const {checkToken}  = require("../middleware/checkToken");

// middle ware is removed for testing purpose only 
router.get('/api/items', getItems);
router.post('/api/items',postItems);
router.put('/api/items/:id' ,updateItemById);
router.get('/api/items/:id', getItemById);
router.delete('/api/items/:id', deleteItemById);

module.exports = router;
