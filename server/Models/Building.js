const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const Building=new Schema({
    user_id:{
        type:String
    },
    address:{
        type:String
    },
    desc:{
        type:String,
    },
    chords:[],
    photo:[
        {
            url:String,
            desc:Date
        }
    ]
},{
    timestamps:true
});



module.exports= mongoose.model('Building',Building);