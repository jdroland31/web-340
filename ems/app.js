//require
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
var logger = require("morgan");
var helmet = require("helmet");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

// setup csrf protection

var csrfProtection = csrf({cookie: true});

// initialize express

var app = express();

// use statements

app.use(logger("short"));

app.use(helmet.xssFilter());

app.use(bodyParser.urlencoded({

    extended: true

}));

app.use(cookieParser());

app.use(csrfProtection);

app.use(function(request, response, next) {

    var token = request.csrfToken();

    response.cookie('XSRF-TOKEN', token);

    response.locals.csrfToken = token;

    next();

});

var Employee = require("./models/employee");

// Database Connection
// mLab connection

var mongoDB = "mongodb+srv://secondUser:VXYmsanInCprgvg0@buwebdev-cluster-1.esxqv.mongodb.net/test?authSource=admin&replicaSet=atlas-mshxui-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));

db.once("open", function() {
    console.log("Application connected to mLab MongoDB instance");
});

//add employee model
var employee = new Employee({
    firstName: "Jim",
    lastName: "Smith"
});

//dependencies
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
        employees: employees,
        message: "New Employee:"
    });
});

app.post("/process", function(request, response) {

    console.log(request.body.txtName);

    response.redirect("/");

});

//create server
http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080!");
});