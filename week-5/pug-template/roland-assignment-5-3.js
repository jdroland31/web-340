//dependencies
var express = require("express");
var http = require("http");
var pug = require("pug");
var path = require("path");var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");
//set the home route
app.get("/", function(request, response) {
    response.render("index", {
        //pass message string to index
        message: "To boldly go where no one has gone before..."
    });
});

http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080!");
});