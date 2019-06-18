const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const City = new Schema(
  {
    name: String,
    country_id: String,
    metro: Array,
    level: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("City", City);
