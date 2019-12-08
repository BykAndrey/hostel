const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const City = new Schema(
	{
		name: String,
		country_id: String,
		osme: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('City', City);
