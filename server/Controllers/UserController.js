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
        res.send('PUT')
    }
    getById(req, res) {
        res.send('Get by id='+req.id)
    }

}
module.exports = UserController;