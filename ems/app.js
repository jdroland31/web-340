//require
var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var app = express();



app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));

//home route
app.get("/", function (request, response) {
    var employees = [
        {
            firstName: "Bob",
            lastName: "Smith",
            job: "Manager",
            department: "Human Resources"
        },
        {
            firstName: "Jill",
            lastName: "Karns",
            job: "C.T.O",
            department: "Information Technology"
        },
        {
            firstName: "Greg",
            lastName: "Hunt",
            job: "Secretary",
            department: "Human Resources"
        },
        {
            firstName: "Theresa",
            lastName: "Bremmer",
            job: "Sales Manager",
            department: "Sales"
        },
    ];
    response.render("index", {
        title: "Home page",
        employees: employees
    });
});

//create server
http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080!");
});