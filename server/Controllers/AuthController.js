const session = require('express-session');
const User = require('./../Models/Base.js').User;
const bcrypt=require('bcrypt');


class AuthController{
    constructor(db){
        this.db=db;
    }
    currentUser(req,res){
        res.header("Access-Control-Allow-Origin", '*');
        console.log('===currentUser')
        console.log(req.session.user)
        console.log('===/currentUser')
        var user={
            id:req.session.user_id,
            user:req.session.user
        }
        return res.send(user)
    }
    login(req,res){
        console.log('Route:login')
        //edit ddscsdfc
        res.header("Access-Control-Allow-Origin", '*');
        console.log(req.body)
    
       // return res.send(req.body);
        console.log(req.body.password)
        User.find({
            "mail":req.body.mail,
            //"password":req.body.password
        },function(er,data){
            if(er){
                console.log(er)
                return res.send(er)
            }
            console.log(req.body.password+"+++"+data[0].password)
            bcrypt.compare(req.body.password,data[0].password,function(error,resb){
                if(error){
                    console.log(error)
                    return res.send(error);
                }
                if(resb===true){
                    console.log("Пользователь прошол проверку")
                    req.session.user_id=data[0]['_id'];
                    req.session.user={
                        mail:data[0]['mail'],
                        name:data[0]['name'],
                    };
                    console.log('===login')
                    console.log(req.session.user)
                    console.log('===/login')
                    return res.send(data);
                }else{
                    console.log("Пользователь не прошол проверку")
                    return res.send('ERROR PASS');
                }
            })
            
        })
        
    }
    logout(req,res){
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
        req.session.user_id=undefined;
        req.session.user=undefined;
        console.log('LOG OUT2')
        
        return res.status(200).send({1:2});
    }

}
module.exports = AuthController;