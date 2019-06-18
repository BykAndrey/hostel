const CountriesModel = require("../Models/Base.js").Countries;

class Countries {
  constructor(db) {
    this.db = db;
  }

  getList(req, res) {
    CountriesModel.find({}, (er, docs) => {
      if (er) res.send(er);

      res.send(docs);
    });
  }

  add(req, res) {
    if (!req.body.name && req.body.name === "") {
      return res.send("no data");
    }
    let el = new CountriesModel({
      name: req.body.name
    });
    el.save();
    res.send(el);
  }
  getOne(req, res) {
    if (!req.params.id) {
      return res.send("no");
    }
    CountriesModel.findOne(
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
    CountriesModel.deleteOne(
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
    let data = {
      name: req.body.name
    };
    if (!req.params.id) {
      return res.send("no");
    }
    let r = await CountriesModel.updateOne(
      {
        _id: req.params.id
      },
      data
    );
    CountriesModel.findOne(
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
module.exports = Countries;
