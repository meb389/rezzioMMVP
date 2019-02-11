const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      expressSanitzer = require("express-sanitizer");

      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitzer());
      app.use(express.static("public"));
      app.use(methodOverride("_method"));
      app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.send("Home Page");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});
