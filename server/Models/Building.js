const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const Building=new Schema({
    user_id:{
        type:String
    },
    title:String,
    forsale:Boolean,
    type:String,
    countroom:Number,
    address:{
        type:String
    },
    desc:{
        type:String,
    },
    price:{
        type:Number
    },
    chords:[],
    metro:[],
    photo:[
        {
            url:String,
            desc:Date
        }
    ],
    views:Number,
    active:Boolean
},{
    timestamps:true
});



module.exports= mongoose.model('Building',Building);