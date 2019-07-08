const express = require("express");
const fs = require("fs");
const path = require("path");
//const MongoClient=require('mongodb').MongoClient;
const mongoose = require("mongoose");
const session = require("express-session");

var bodyParser = require("body-parser");

const app = express();
app.use(
    session({
        secret: "hotel"
    })
);

// parse application/json

app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/dist")));
app.use("/static", express.static(path.join(__dirname, "/static")));
let db = undefined;

mongoose.connect(
    "mongodb://localhost:27017/hotel",
    { useNewUrlParser: true },
    function(er) {
        if (er) {
            return console.log(er);
        }
        //db=client;
        app.listen(3000);
    }
);

const router = require("./server/Router.js");

router(app);
/*
app.get('/api/users',function(req,res){
    db.db('hotel')
    res.send([
        {
            name:"Андрей Сергеевич Бык",
            role:'Администратор',
            last_log:"20/12/2019",
        },
        {
            name:"Гадя Петрович Хренова",
            role:'Пользователь',
            last_log:"22/5/2019",
        },
        {
            name:"Геннадий Иванович Сидочук ",
            role:'Пользователь',
            last_log:"1/11/2019",
        }
    ]);
   
})
app.get('/',function(req,res){
    fs.readFile('./dist/index.html',function(error,data){
        if(error){
            return res.send(error)
        }
        res.setHeader('Content-Type',"text/html");
        res.send(data);
    })
   
})*/
