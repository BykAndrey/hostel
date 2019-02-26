const UserController =require( './Controllers/UserController.js');

module.exports=function(app,db){
    const userC=new UserController(db);



    //
    app.get('/api/users/:id',userC.getById.bind(userC));

    app.get('/api/users',userC.users.bind(userC));
    app.put('/api/users',userC.create.bind(userC));
}