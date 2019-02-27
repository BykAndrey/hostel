const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    mail:String,
    password:String,
    role:Number,
    age:Number
})
const User=mongoose.model('User',userSchema);

exports.User=User;