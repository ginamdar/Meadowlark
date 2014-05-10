var express = require("express");
var http      = require("http");
var app 	   = express();
// set up handlebars view engine
var handlebars = require("express3-handlebars").create({defaultLayout:"main"});

var fortuneCookies = ['conquer your fears or they will conquer you.',
				'rivers need springs.',
				'do not fear what you don\'t know.',
				'you will have a pleasant surprise.',
				'whenever possible, keep it simple.'];

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, resp){
	//resp.type("text/plain");
	//resp.send("Meadowlark Travel");
	resp.render("home");
});

app.get("/about", function(req, resp){
//	resp.type("text/plain");
//	resp.send("About Meadowlark Travel");
	var randomFuture = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	resp.render("about", {fortune: randomFuture});
});

app.use(function(req, resp, next){
//	resp.type("text/plain");
	resp.status(404);
//	resp.send("404 - Not Found");
	resp.render("404");
});
app.listen(app.get("port"));