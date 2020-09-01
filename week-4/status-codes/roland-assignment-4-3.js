/*
============================================
; Title:  roland-assignment-4-3.js
; Author: Prof. Krasso
; Date:   31 August 2020
; Modified By: Jonathan Roland
; Description: A program demonstrating understanding of HTTP status codes in a Node context
;===========================================
*/

//set require statements
var express = require("express");
var http = require("http");
var app = express();
//set 404 response
app.get("/not-found", function(request, response) {
    response.status(404);
    response.json({
        error: "Couldn't find that resource."
    });
});
//set 200 response
app.get("/ok", function(request, response) {
    response.status(200);
    response.json({
        message: "Here it is."
    });
});
//set 501 response
app.get("/not-implemented", function(request, response) {
    response.status(501);
    response.json({
        error: "No one by that name here."
    });
});
//create server and log start message to console.
http.createServer(app).listen(8080, function() {
   console.log("Application started on port 8080!");
});