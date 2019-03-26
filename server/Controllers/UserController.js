const User = require('./../Models/Base.js').User;
const mValid=require('./../lib/Validaror')
class UserController {
    constructor(db) {
        console.log('User Controller Constructor');
        this.db = db;
    }
    users(req, res) {
        res.header("Access-Control-Allow-Origin", '*');
        console.log('Main Page');
        User.find({}, function (er, data) {
            res.send(data);
        })
    }

    create(req, res) {
        res.header("Access-Control-Allow-Origin", '*');
        var user=new User();
      
        user.name=req.body.name;
        user.mail=req.body.mail;
        user.password=req.body.password;
        user.age=req.body.age;
        //res.send(req.body.name);
      /*  console.log('start');
        var er=mValid([
            {
                value:user.name,
                pattern:/\w{5,30}$/i,
                error:'Имя должно сожержать от 5 до 30 симоволов',
            },
            {
                value:user.mail,
                pattern:/\w?@\w{2,5}.\w{2,5}$/i,
                error:'Адресс введен не коректно'
            },{
                value:user.password,
                pattern:/\w{6,}$/i,
                error:'пароль должен содержать не меньше 6 символов '
            },{
                value:user.age,
                pattern:/\d{2,3}$/,
                error:'Возраст'
            }

        ])  
        console.log('end');
        if(er.length>0){
            return res.send(er)
        }*/
       // return res.send(er)

        user.save(function(er,data){
            if(er){
                return res.send(er)
            }
            res.send(data);
        })
      

    }
    getById(req, res) {
        res.header("Access-Control-Allow-Origin", '*');
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