/*
============================================
; Title:  roland-assignment-3-2.js
; Author: Prof. Krasso
; Date:   24 August 2020
; Modified By: Jonathan Roland
; Description: A program demonstrating node logging with morgan
;===========================================
*/

var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');

var app = express();

app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');

app.use(logger('dev'));

app.get('/',function(req,res) {
    res.render('index',{
        message: "Hello, this is Jonathan's Morgan logger example!"
    });
});

http.createServer(app).listen(3000, function(){
    console.log('Application started and listening on port %s',3000);
});