const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      bodyParser      = require("body-parser"),
      express = require('express'),
      app = express(),
      mongoose = require('mongoose');

      //const Name = 'Amadou';
      //const Pass = 'R?ezzio2019';
      //const uri = `mongodb://Amadou:R%3Fezzio2019%0D%0A@cluster0-shard-00-00-lujlt.mongodb.net:27017|,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
      //mongoose.connect(`mongodb+srv://Amadou:R%3Fezzio2019%0D%0A@cluster0-lujlt.mongodb.net/test?retryWrites=true`)
      mongoose.connect(`mongodb://soufi:NHIadkQn0ULQKkoa@cluster0-shard-00-00-ku5v3.mongodb.net:27017,cluster0-shard-00-01-ku5v3.mongodb.net:27017,cluster0-shard-00-02-ku5v3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`)
      //mongoose.connect('mongodb+srv://Amadou:R?ezzio2019@cluster0-lujlt.mongodb.net/test', {dbName: 'Test'})
        .then(() => console.log('Connected'))
        .catch(err => console.log(err));
//${encodeURIComponent(Name)}:${encodeURIComponent(Pass)}
      //const uri = 'mongodb://Amadou:R?ezzio2019@' +
      // 'cluster0-shard-00-00-lujlt.mongodb.net:27017' +
      // 'cluster0-shard-00-01-lujlt.mongodb.net:27017,' +
      // 'cluster0-shard-00-02-lujlt.mongodb.net:27017/Test' +
      // 'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

      //mongoose.connect(uri);
      //const db = mongoose.connection;

      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitzer());
      app.use(express.static("public"));
      app.use(methodOverride("_method"));
      app.set("view engine", "ejs");

app.get('/', (req, res) => res.render('index'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
