const mongoose = require('mongoose');
const User = require('./user');
const geocoder = require('../utils/geocoder')
const ItemSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      enum: [
        'Electronics',
        'Clothing',
        'Mobile',
        'ID Card',
        'Jewelry',
        'Keys',
        'Pet',
        'Bags',
        'Luggage',
        'Books',
        'Others',
      ],
      required: true,
    },
    postType: {
      type: String,
      enum: ['LOST', 'FOUND'],
      require: true,
    },

    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    address:{
      type:String,
      required:[true]
    },
    location: {
      type: {
        type: String, 
        enum: ['Point'], 
       
      },
      coordinates: {
        type: [Number],
        index:'2dsphere'
      },
      formattedAddress:String
    },
    owner: {
      firstName: {
        type: String,
         required: true,
      },
      lastName: {
        type: String,
         required: true,
      },
      email: {
        type: String,
         required: true,
      },
      phone: String,
    },
  },

  {
    timestamps: true,
  }
);

ItemSchema.pre("save",async(next)=>{
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type:'Point',
    coordinates:[loc[0].longitude, loc[0].latitude],
    formattedAddress:loc[0].formattedAddress

  },
  this.address = undefined;
  next();
})

module.exports = mongoose.model('Item', ItemSchema);
