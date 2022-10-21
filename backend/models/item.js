const mongoose = require('mongoose');

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
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      type:Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', ItemSchema);
