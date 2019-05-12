const UserController = require("./Controllers/UserController.js");
const AuthController = require("./Controllers/AuthController.js");
const BuildingController = require("./Controllers/BuildingController.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app, db) {
  const userC = new UserController(db);
  const auth = new AuthController(db);
  const building = new BuildingController(db);

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

  app.post("/api/login", urlencodedParser, auth.login.bind(auth));
  app.get("/api/current-user", auth.currentUser.bind(auth));
  app.get("/api/logout", auth.logout.bind(auth));

  //
  app.get("/api/users/:id", userC.getById.bind(userC));

  app.get("/api/users", userC.users.bind(userC));
  app.put("/api/users", userC.create.bind(userC));
};
