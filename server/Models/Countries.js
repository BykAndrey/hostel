const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Countries = new Schema(
  {
    name: String,
    iso3166: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Countries", Countries);
