//dependency setup
var express = require("express");
var http = require("http");
var path = require("path");
app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//create an array of names
var f = [
  "Jake",
  "Lucy",
  "Sven",
  "Annette"
];

//set the home route
app.get("/", function(request, response) {
    //render the index page
    response.render("index", {
        //pass index.js a variable 'names' with the array of names
        names: f
    })
});

//create server on localhost port 8080
http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080!");
});