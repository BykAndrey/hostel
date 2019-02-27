const session = require('express-session');
const User = require('./../Models/Base.js').User;

class AuthController{
    constructor(db){
        this.db=db;
    }
    login(req,res){
        User.find({
            "mail":req.body.mail,
            "password":req.body.password
        },function(er,data){
            if(er){
                res.send(er)
            }
            req.session.user_id=data['_id']
            res.send(data);
        })
        
    }
    logout(){

    }

}
module.exports = AuthController;