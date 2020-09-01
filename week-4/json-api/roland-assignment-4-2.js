/*
============================================
; Title:  roland-assignment-4-2.js
; Author: Prof. Krasso
; Date:   31 August 2020
; Modified By: Jonathan Roland
; Description: A program demonstrating understanding of json in an API context
;===========================================
*/

//set require statements
var express = require("express");
var http = require("http");
var app = express();
var logger = require('morgan');

//use the logger in dev mode
app.use(logger('dev'));

//create a json response for the customer/:id route
app.get("/customer/:id", function (request, response) {
    var id = parseInt(request.params.id, 10);
    response.json({
        battlemech: "Timberwolf",
        variant: "Prime",
        customerId: id
    });
});

//create server listening on 8080 and log application start message to console
http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080");
});