var formidable = require("formidable");
var fs = require("fs");
var path = require("path");
var mv = require("mv");
const BuildingModel = require("./../Models/Base.js").Building;
const userLib = require("../lib/user.js");

class Building {
    constructor(db) {
        this.db = db;
    }

    getOne(req, res) {
        console.log(req.params.id);
        BuildingModel.findOne({
            _id: req.params.id
        })
            .populate("user_id")
            .populate("country_id")
            .populate("city_id")
            .exec(function(er, data) {
                if (er) return res.status(404).send("Not Found");
                return res.status(200).send(data);
            });
    }

    getList(req, res) {
        var page = parseInt(req.query.page);
        var size = parseInt(req.query.size);
        var skip = (page - 1) * size;

        BuildingModel.find({})
            .populate("user_id")
            .populate("country_id")
            .populate("city_id")
            //.skip(skip)
            //.limit(size)
            .exec(function(error, data) {
                if (error) {
                    return res.send(error);
                }
                BuildingModel.count({}, function(er2, d2) {
                    if (er2) {
                        return res.send(er2);
                    }
                    res.header(
                        "Cache-Control",
                        "no-cache, no-store, must-revalidate"
                    );
                    res.header("Pragma", "no-cache");
                    res.header("Expires", 0);
                    res.header("Access-Control-Allow-Origin", "*");
                    data = data.sort((a, b) => {
                        if (
                            new Date(a.updatedAt).getTime() >
                            new Date(b.updatedAt).getTime()
                        ) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    return res.status(200).send({
                        data: data,
                        count: d2
                    });
                });
            });
        //return res.status(200).send('Get List')
    }
    async create(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        // = req.session.user_id;
        /*
    if (user_id === undefined) {
      return res.send("нужно авторизоваться");
    }*/
        let key = userLib.getToken(req);

        if (!key) {
            return res.sendStatus(401);
        }
        let user = await userLib.userByToken(key);

        if (!user) {
            return res.sendStatus(401);
        }
        console.log("user", user);
        var user_id = user._id;
        let price = req.body.price;
        let data = {
            user_id: user_id,
            address: req.body.address,
            desc: req.body.desc,
            chords: [req.body.cord1, req.body.cord2],
            photo: req.body.photo,
            price: price,
            title: req.body.title,
            type_deal: req.body.type_deal,
            type: req.body.type,
            metro: req.body.metro,
            views: 0,
            active: false,
            countroom: req.body.countroom,
            country_id: req.body.country_id,
            city_id: req.body.city_id,
            total_area: req.body.total_area,
            live_area: req.body.live_area,
            kitchen_area: req.body.kitchen_area
        };

        var b = new BuildingModel(data);
        b.save(function(er) {
            if (er) {
                return res.send(er);
            }
            return res.status(200).send(b);
        });
    }
    uploadImage(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            var id = fields.id;
            fs.readFile(files.image.path, function(error, data) {
                if (error) throw error; // если возникла ошибка

                let newName = Date.now() + "." + files.image.name.split(".")[1];
                let imagePath = "/static/images/" + newName;
                var newpath =
                    path.join(__dirname, "./../../static/images/") + newName;
                fs.writeFile(newpath, data, function(e) {
                    BuildingModel.findOne({ _id: id }, function(error1, data) {
                        var photos = data.photo;
                        photos = photos == null ? [] : photos;

                        var newObj = {
                            url: imagePath
                        };
                        photos.push(newObj);
                        BuildingModel.update(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    photo: photos
                                }
                            },
                            function(finder, todo) {
                                if (finder) return res.send(finder);
                                return res.send(newObj);
                            }
                        );
                    });
                });
            });
        });
    }
    removeImage(req, res) {
        let idbuild = req.body.id;
        let indexPhoto = req.body.photo;

        BuildingModel.findOne({ _id: idbuild }, function(er, data) {
            if (er) return res.send(er);

            let photo = data.photo.filter(el => {
                let res = el._id + "" !== indexPhoto;
                if (!res) {
                    fs.unlink(path.join(__dirname, "../../" + el.url), function(
                        er
                    ) {
                        console.error(er);
                    });
                }
                return res;
            });
            console.log(`${data.photo.length}=${photo.length}`);
            BuildingModel.update(
                {
                    _id: idbuild
                },
                {
                    $set: {
                        photo: photo
                    }
                },
                function(finder, todo) {
                    if (finder) return res.send(finder);
                    return res.send(photo);
                }
            );
        });
        /* return res.send({
            idbuild: idbuild,
            indexPhoto: indexPhoto
        });*/
    }

    async edit(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var user_id = req.session.user_id;
        /** */
        let key = userLib.getToken(req);

        if (!key) {
            return res.sendStatus(401);
        }
        let user = await userLib.userByToken(key);
        if (!user) {
            return res.sendStatus(401);
        }
        /** */
        let price = req.body.price;
        let data = {
            user_id: user_id,
            address: req.body.address,
            desc: req.body.desc,
            chords: [req.body.cord1, req.body.cord2],
            photo: req.body.photo,
            price: price,
            title: req.body.title,
            type_deal: req.body.type_deal,
            type: req.body.type,
            metro: req.body.metro,
            views: req.body.views,
            active: req.body.active,
            countroom: req.body.countroom,
            country_id: req.body.country_id,
            city_id: req.body.city_id,
            total_area: req.body.total_area,
            live_area: req.body.live_area,
            kitchen_area: req.body.kitchen_area
        };

        BuildingModel.update({ _id: req.body._id }, { $set: data }, function(
            er,
            data
        ) {
            if (er) return res.send(er);
            return res.send(data);
        });
    }
    delete(req, res) {
        return res.status(200).send("Delete");
    }
}
module.exports = Building;
