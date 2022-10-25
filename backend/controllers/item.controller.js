const Item = require('../models/item');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const geocoder = require('../util/geocoder');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_BUCKET_REGION,
});

var s3 = new AWS.S3();

const postItems = async (req, res, next) => {


  const loc = await geocoder.geocode(req.body.address);
 
  locate = {
    type: 'Point',
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
  };



  const fileStream = fs.createReadStream(
    path.join(__dirname, '..', 'uploads', req.body.imageUrl)
  );
  try {
    var params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: fileStream,
      Key: 'laf/' + Date.now() + '_' + path.basename(req.body.imageUrl),
    };

    const data = await s3.upload(params).promise();

    let post = {
      itemType: req.body.itemType,
      postType: req.body.postType,
      description: req.body.description,
      imageUrl: data.Location,
      date: req.body.date,
      address: req.body.address,
      location:locate,
      'owner.firsName': req.body.firstName,
      'owner.lastName': req.body.lastName,
      'owner.email': req.body.email,
      'owner.phone': req.body.phone,
    };
 

    const item = await Item.create(post);
    

    res.status(StatusCodes.CREATED).json(item);
  } catch (error) {
    res.json({ error });
  }
};

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json(items);
  } catch (error) {
    res.json({ error });
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    res.json({ error });
  }
};

const updateItemById = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(StatusCodes.OK).json(item);
  } catch (error) {
    res.json(error);
  }
};
const deleteItemById = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json(item);
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
