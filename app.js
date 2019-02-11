const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      bodyParser      = require("body-parser"),
      express = require('express'),
      app = express();

      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitzer());
      app.use(express.static("public"));
      app.use(methodOverride("_method"));
      app.set("view engine", "ejs");

app.get('/', (req, res) => res.render('index'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
