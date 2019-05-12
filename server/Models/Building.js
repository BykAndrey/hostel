const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Building = new Schema(
  {
    user_id: {
      type: String
    },
    price: Number,
    title: String,
    type_deal: String,
    type: String,
    countroom: Number,
    address: {
      type: String
    },
    desc: {
      type: String
    },

    chords: [],
    metro: [],
    photo: [
      {
        url: String,
        desc: Date
      }
    ],
    views: Number,
    active: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Building", Building);
