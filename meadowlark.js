var express = require("express");
var http      = require("http");
var app 	   = express();
// set up handlebars view engine
var handlebars = require("express3-handlebars").create({defaultLayout:"main",
					helpers:{
						section: function(name, options){
							if (!this._sections) this._sections = {};
							this._sections[name] = options.fn(this);
							console.log("name:" + name + " options.fn(this) :" + options.fn(this));
							return null;
						}
					}
				});
var fortune = require("./lib/fortune.js");
var bodyParser = require("body-parser");

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

app.get("/headers", function(req, resp){
	resp.set("Content-Type", "text/plain");
	var s = "";
	for (var name in req.headers) {
		s += name + ":" + req.headers[name] + "\n";
	}
	resp.send(s);
});

app.get("/test", function(req, resp){
	resp.render("test");
});

app.get("/enter", function(req, resp){
	console.log("Enter");
	resp.render("enter");
});

app.get("/thankyou", function(req, resp){
	console.log("thankyou");
	resp.render("thankyou");
});

app.post("/process", function(req, resp){
	console.log("Test (from querystring): " + req.query.test);
	console.log("Hush (from hidden form field): " + req.body.hush);
	console.log("Test (from visible form field): " + req.body.name);
	resp.redirect(302, "thankyou");
});

app.get("/", function(req, resp){
	resp.render("home");
});

app.get("/about", function(req, resp){
	resp.render("about", {fortune: fortune.getFortune()});
});

app.use(function(req, resp, next){
//	resp.type("text/plain");
	resp.status(404);
//	resp.send("404 - Not Found");
	resp.render("404");
});
app.listen(app.get("port"));