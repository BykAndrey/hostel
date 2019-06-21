const CityModel = require("../Models/Base.js").City;

class City {
  constructor(db) {
    this.db = db;
  }

  getList(req, res) {
    CityModel.find({}, (er, docs) => {
      if (er) res.send(er);

      res.send(docs);
    });
  }

  add(req, res) {
    if (!req.body.name && req.body.name === "") {
      return res.send("no data");
    }
    let metro = JSON.parse(req.body.metro);

    let el = new CityModel({
      name: req.body.name,
      country_id: req.body.country_id,
      metro: metro,
      level: parseInt(req.body.level),
      osme: req.body.osme
    });
    el.save();
    res.send(el);
  }

  getOne(req, res) {
    if (!req.params.id) {
      return res.send("no");
    }
    CityModel.findOne(
      {
        _id: req.params.id
      },
      (er, data) => {
        if (er) {
          return res.send(er);
        }
        return res.send(data);
      }
    );
  }

  delete(req, res) {
    if (!req.params.id) {
      return res.send("no");
    }
    CityModel.deleteOne(
      {
        _id: req.params.id
      },
      er => {
        if (er) {
          return res.send(er);
        }
        return res.sendStatus(200);
      }
    );
  }

  async update(req, res) {
    let data = {};
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.country_id) {
      data.country_id = req.body.country_id;
    }
    if (req.body.metro) {
      let metro = JSON.parse(req.body.metro);
      data.metro = metro;
    }
    if (req.body.level) {
      data.level = parseInt(req.body.level);
    }
    if (req.body.osme) {
      data.osme = req.body.osme;
    }
    if (!req.params.id) {
      return res.send("no");
    }
    let r = await CityModel.updateOne(
      {
        _id: req.params.id
      },
      data
    );
    CityModel.findOne(
      {
        _id: req.params.id
      },
      (er, data) => {
        if (er) return res.send(er);
        return res.send(data);
      }
    );
  }
}
module.exports = City;