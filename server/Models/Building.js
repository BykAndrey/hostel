const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Building = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    country_id: {
      type: Schema.Types.ObjectId,
      ref: "Countries"
    },
    city_id: {
      type: Schema.Types.ObjectId,
      ref: "City"
    },
    price: Number,
    title: String,
    type_deal: String,
    type: String,
    countroom: Number,
    countroomMax: Number,
    total_area: Number,
    live_area: Number,
    kitchen_area: Number,
    level: Number,
    levelMax: Number,
    restroom: Boolean,
    address: {
      type: String
    },
    desc: {
      type: String
    },
    chords: [],
    metro_auto: [],
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
