const User = require('./../Models/Base.js').User;
class UserController {
    constructor(db) {
        console.log('User Controller Constructor');
        this.db = db;
    }
    users(req, res) {
        console.log('Main Page');
        User.find({}, function (er, data) {
            res.send(data);
        })
    }

    create(req, res) {
        var user=new User();
        user.name=req.body.name;
        user.mail=req.body.mail;
        user.password=req.body.password;
        user.age=req.body.age;
        user.save(function(er,data){
            if(er){
                return res.send(er)
            }
            res.send(data);
        })
      

    }
    getById(req, res) {
        User.find({"_id":req.params['id']},function(er,data){
            if(er) {
                return res.send(er)
            }
            res.send(data);
        })
        //res.send('Get by id='+req.params['id'])
    }

}
module.exports = UserController;