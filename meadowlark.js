var express = require("express");
var http      = require("http");
var app 	   = express();
// set up handlebars view engine
var handlebars = require("express3-handlebars").create({defaultLayout:"main"});
var fortune = require("./lib/fortune.js");


app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

app.use(express.static(__dirname + "/public"));

app.get("/headers", function(req, resp){
	resp.set("Content-Type", "text/plain");
	var s = "";
	for (var name in req.headers) {
		s += name + ":" + req.headers[name] + "\n";
	}
	resp.send(s);
});

app.get("/", function(req, resp){
	//resp.type("text/plain");
	//resp.send("Meadowlark Travel");
	resp.render("home");
});

app.get("/about", function(req, resp){
//	resp.type("text/plain");
//	resp.send("About Meadowlark Travel");
	resp.render("about", {fortune: fortune.getFortune()});
});

app.use(function(req, resp, next){
//	resp.type("text/plain");
	resp.status(404);
//	resp.send("404 - Not Found");
	resp.render("404");
});
app.listen(app.get("port"));