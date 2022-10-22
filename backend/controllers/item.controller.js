const Item = require('../models/item');
const { StatusCodes } = require('http-status-codes');


const postItems = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    // uploading image using multer to amazon s3upload will be implemented here
    res.status(StatusCodes.CREATED).json({ item });
  } catch (error) {
    res.json({ error });
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json({ items });
  } catch (error) {
    res.json({ error });
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(StatusCodes.OK).json({ item });
  } catch (error) {
    res.json({ error });
  }
};
const updateItemById = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate({ _id: req.params.id },req.body);
    res.status(StatusCodes.OK).json({ item });
  } catch (error) {
    res.json(error);
  }
};
const deleteItemById = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ item });
  } catch (error) {
    res.json({ error });
  }
};


module.exports = {
  postItems,
  getItems,
  updateItemById,
  getItemById,
  deleteItemById,
};
