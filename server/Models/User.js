const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    mail:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator(v){
                return (/\w{3,}@\w{2,10}\.\w{2,10}/i).test(v)
            },
            message:props=> `${props.value} некоректный адресс`
        }
    },
    password:{
        type:String,
        validate:{
            validator:v=>(/\w{6,50}/).test(v),
            message:p=>`Слишком короткий пароль`
        },
       
    },
    role:Number,
    age:Number,
    last_login:Date,
    

},{
    timestamps:true
})
userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
const User=mongoose.model('User',userSchema);
module.exports= User;