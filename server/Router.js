const UserController = require("./Controllers/UserController.js");
const AuthController = require("./Controllers/AuthController.js");

const BuildingController = require("./Controllers/BuildingController.js");
const CountriesController = require("./Controllers/CountriesController.js");
const CityController = require("./Controllers/CityController.js");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app, db) {
  const userC = new UserController(db);
  const auth = new AuthController(db);
  const building = new BuildingController(db);
  const countries = new CountriesController(db);
  const city = new CityController(db);

  app.use("/api/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });
  /*Building*/
  app.post("/api/building/create", building.create.bind(building));
  app.post("/api/building/upload-image", building.uploadImage.bind(building));
  app.post("/api/building/remove-image", building.removeImage.bind(building));
  // app.post('/api/building/edit/',building.getList.bind(building));
  app.post("/api/building/edit/:id", building.edit.bind(building));
  app.get("/api/building/:id", building.getOne.bind(building));

  app.get("/api/building", building.getList.bind(building));

  /*app.pos('/api/building',building.getList.bind(building));
    app.get('/api/building',building.getList.bind(building));*/
  /*/Building*/

  /**Countries */
  app.get("/api/countries", countries.getList.bind(countries));
  app.post("/api/countries", countries.add.bind(countries));
  app.get("/api/countries/:id", countries.getOne.bind(countries));
  app.delete("/api/countries/:id", countries.delete.bind(countries));
  app.put("/api/countries/:id", countries.update.bind(countries));

  /**City */
  app.get("/api/city", city.getList.bind(countries));
  app.post("/api/city", city.add.bind(countries));
  app.get("/api/city/:id", city.getOne.bind(countries));
  app.delete("/api/city/:id", city.delete.bind(countries));
  app.put("/api/city/:id", city.update.bind(countries));

  app.post("/api/login", urlencodedParser, auth.login.bind(auth));
  app.get("/api/current-user", auth.currentUser.bind(auth));
  app.get("/api/logout", auth.logout.bind(auth));

  //
  app.get("/api/users/:id", userC.getById.bind(userC));

  app.get("/api/users", userC.users.bind(userC));
  app.put("/api/users", userC.create.bind(userC));
};
