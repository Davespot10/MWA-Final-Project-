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

router.get('/api/items', getItems);

router.get('/api/items',getItems);

router.post('/api/items',postItems);
router.put('/api/items/:id', checkToken, updateItemById);
router.delete('/api/items/:id',checkToken,deleteItemById);
router.get('/api/items/myitems/:email',getItemByEmail)
router.get('/api/items/:id',getItemById);




module.exports = router;
