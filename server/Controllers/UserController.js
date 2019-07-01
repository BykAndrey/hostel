const User = require("./../Models/Base.js").User;
const mValid = require("./../lib/Validaror");
const userLib = require("../lib/user.js");

class UserController {
    constructor(db) {
        this.db = db;
    }
    users(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        User.find({}, function(er, data) {
            res.send(data);
        });
    }
    async edit(req, res) {
        let key = userLib.getToken(req);

        if (!key) {
            return res.sendStatus(401);
        }
        let user = await userLib.userByToken(key);

        if (!user) {
            return res.sendStatus(401);
        }
        let data = {
            name: req.body.name,
            phone: req.body.phone
        };
        User.update({ _id: user._id }, { $set: data }, (er, data) => {
            if (er) return res.send(er);
            return res.send(data);
        });
    }
    create(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var user = new User();
        user.name = req.body.name;
        user.mail = req.body.mail;
        user.password = req.body.password;
        user.token = userLib.GenerateKey();
        user.tokenTime = new Date();
        user.phone = req.body.phone;
        user.save(function(er, data) {
            if (er) {
                return res.send(er);
            }
            res.send(data);
        });
    }
    getById(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        User.find({ _id: req.params["id"] }, function(er, data) {
            if (er) {
                return res.send(er);
            }
            res.send(data);
        });
    }
}
module.exports = UserController;
