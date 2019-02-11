const express         = require("express"),
      app             = express(),
      bodyParser      = require("body-parser"),
      methodOverride  = require("method-override"),
      expressSanitzer = require("express-sanitizer");



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});
