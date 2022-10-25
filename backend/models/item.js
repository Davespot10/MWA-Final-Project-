const mongoose = require("mongoose");
const User = require("./user");
const geocoder = require("../util/geocoder");
const ItemSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Mobile",
        "ID_Card",
        "Jewelry",
        "Keys",
        "Pet",
        "Bags",
        "Luggage",
        "Books",
        "Others",
      ],
      required: true,
    },
    postType: {
      type: String,
      enum: ["LOST", "FOUND"],
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
    address: {
      type: String
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
    owner: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", ItemSchema);
