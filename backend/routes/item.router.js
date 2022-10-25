const router = require('express').Router();
const {
  postItems,
  getItems,
  updateItemById,
  getItemById,
  deleteItemById,
  getItemByEmail
} = require('../controllers/item.controller');
const {checkToken}  = require("../middleware/checkToken");

// middle ware is removed for testing purpose only 
router.get('/api/items',getItems);
router.post('/api/items',postItems);
router.put('/api/items/:id', checkToken, updateItemById);
router.delete('/api/items/:id',checkToken,deleteItemById);
router.get('/api/items/myitems/:email',checkToken,getItemByEmail)
router.get('/api/items/:id',getItemById);




module.exports = router;
