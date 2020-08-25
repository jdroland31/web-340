/*
============================================
; Title:  roland-assignment-3-4.js
; Author: Prof. Krasso
; Date:   24 August 2020
; Modified By: Jonathan Roland
; Description: A program demonstrating a simple node single page application with routing and ejs partials
;===========================================
*/

var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("short"));

app.get("/", function(request, response) {
    response.render("index", {
        message: "home page"
    });
});

app.get("/about", function(request, response) {
    response.render("about", {
        message: "about page"
    });
});

app.get("/contact", function(request, response) {
    response.render("contact", {
        message: "contact page"
    })
});

app.get("/products", function(request, response) {
   response.render("products", {
       message: "products page"
   });
});

http.createServer(app).listen(8080, function() {
   console.log("Application started on port 8080.");
});