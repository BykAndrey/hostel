/*const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt'),
*/
const User = require("./User.js");
const Building = require("./Building.js");
const Countries = require("./Countries.js");
const City = require("./City.js");

exports.User = User;
exports.Building = Building;
exports.Countries = Countries;
exports.City = City;
