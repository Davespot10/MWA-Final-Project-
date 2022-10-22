const Item = require('../models/item');
const { StatusCodes } = require('http-status-codes');
const locationCalculator = require('../middleware/location');

const postItems = async (req, res, next) => {
  const { state, city, street, zipcode } = req.body;
  let address = street + ',' + city + ',' + state + ' ' + zipcode;

  const result = await locationCalculator(address);

  let latitude = result.lat;
  let longitude = result.lng;

  console.log(address, latitude, longitude);
  let post = {
    itemType: req.body.itemType,
    postType: req.body.postType,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    date: req.body.date,
    lat: latitude,
    lng: longitude,
    owner: req.body.owner,
  };
  try {
    const item = await Item.create(post);
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
    const item = await Item.findByIdAndUpdate({ _id: req.params.id }, req.body);
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
