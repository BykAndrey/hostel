var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mv = require('mv');
const BuildingModel = require('./../Models/Base.js').Building;





class Building {
    constructor(db) {
        this.db = db;
    }


    getOne(req, res) {
        console.log(req.params.id);
        BuildingModel.findOne({
            _id: req.params.id
        }, function (er, data) {
            if (er)
                return res.status(404).send('Not Found');
            return res.status(200).send(data);
        });

    }

    getList(req, res) {
        var page = parseInt(req.query.page);
        var size = parseInt(req.query.size);
        var skip = (page - 1) * size;

        BuildingModel.find({})
            .skip(skip)
            .limit(size)
            .exec(function (error, data) {
                if (error) {
                    return res.send(error);
                }
                BuildingModel.count({}, function (er2, d2) {
                    if (er2) {
                        return res.send(er2);
                    }
                    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                    res.header("Pragma", "no-cache");
                    res.header("Expires", 0);
                    res.header("Access-Control-Allow-Origin", '*');
                    return res.status(200).send({
                        data: data,
                        count: d2
                    });
                })

            })
        //return res.status(200).send('Get List')
    }
    create(req, res) {
        res.header("Access-Control-Allow-Origin", '*');
        var user_id = req.session.user_id;
        if (user_id === undefined) {
            return res.send('нужно авторизоваться')
        }
        var b = new BuildingModel({
            user_id: user_id,
            address: req.body.address,
            desc: req.body.desc,
            chords: [req.body.cord1, req.body.cord2],
            photo: req.body.photo,
        })
        b.save(function (er) {
            if (er) {
                return res.send(er)
            }
            return res.status(200).send(b)
        })
    }

    uploadImage(req, res) {


        // console.log("ID="+req.body.id);
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var id = fields.id;
            console.error("id undefined")
            if (id == undefined) {
                console.error("id undefined")
            }

            //return res.send(id)
            var oldpath = files.image.path;
            var newpath = path.join(__dirname, './../../images/') + files.image.name;
            mv(oldpath, newpath, function (er) {
                if (er) throw err;
                var rold = newpath;
                var newName=(Date.now() + '.png');
                var returnePath="/images/"+newName;
                var rnew = path.join(__dirname, './../../images/') +newName;
                fs.rename(rold, rnew, function (err) {
                    if (err) throw err;
                    BuildingModel.findOne({ _id: id }, function (error, data) {


                        var photos=data.photo;
                        var newObj={
                            url:returnePath,
                        };
                        photos.push=newObj;
                        console.log(photos);
                        BuildingModel.update({
                            _id: id
                        }, {
                            $push: {
                                photo:newObj
                            }
                            }, function (finder, todo) {
                                if (finder)
                                    return res.send(finder);


                                return res.send(newObj);
                            })
                    })


                    //   res.status(200).send(rnew);
                });
                //res.status(200).send(newpath);
            })
            /**/


        });

    }

    edit(req, res) {
        return res.status(200).send('Edit')
    }
    delete(req, res) {
        return res.status(200).send('Delete')
    }

}
module.exports = Building;