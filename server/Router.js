const bodyParser =require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const UserController =require( './Controllers/UserController.js');
const AuthController =require( './Controllers/AuthController.js');
module.exports=function(app,db){
    const userC=new UserController(db);
    const auth=new AuthController(db);

    app.post('/api/login',urlencodedParser,auth.login.bind(auth));
    app.get('/api/logout',auth.logout.bind(auth));

    //
    app.get('/api/users/:id',userC.getById.bind(userC));

    app.get('/api/users',userC.users.bind(userC));
    app.put('/api/users',urlencodedParser,userC.create.bind(userC));
}