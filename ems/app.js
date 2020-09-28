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
    lastName: "Smith",
    jobTitle: "Grounds Keeper",
    department: "Maintenance"
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

app.get('/new', function(req, res) {
    res.render("new", {
      title: 'EMS | New'
    });
});

app.get("/list",function(request,response){
 Employee.find({},function(error,employees){
    if(error) throw error;
    
    response.render("list",{
        title:"Employee List",
        employees: employees
    });
 });
});

app.post("/process", function(request, response) {

    // console.log(request.body.txtName);
    if (!request.body.firstName||!request.body.lastName||!request.body.jobTitle||!request.body.department) {
        response.status(400).send("Entries must be filled out completely");
        return;
    }
 
    // get the request's form data

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var jobTitle = request.body.jobTitle;
    var department = request.body.department;
 
    console.log(firstName+', '+lastName+', '+jobTitle+', '+department);
 
    // create a employee model
    var employee = new Employee({
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        department: department
    });
 
    // save
    employee.save(function (error) {
        if (error) throw error;
        console.log(firstName+" "+lastName + " saved successfully!");
    });
 
    response.redirect("/");
 });

//create server
http.createServer(app).listen(8080, function() {
    console.log("Application started on port 8080!");
});