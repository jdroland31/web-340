// require
var express = require('express');
var http = require("http");
var logger = require("morgan");
var mongoose = require("mongoose");


var mongoDB = "mongodb+srv://secondUser:VXYmsanInCprgvg0@buwebdev-cluster-1.esxqv.mongodb.net/test?authSource=admin&replicaSet=atlas-mshxui-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(mongoDB,{
    useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console, "MongoDB connection error: "));
db.once('open', function(){
    console.log("Application connected to mLab");
});

var app = express();
app.use(logger('dev'));

http.createServer(app).listen(5000, function(){
    console.log("Application started and listening on port 5000");
});