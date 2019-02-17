const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      bodyParser      = require("body-parser"),
      express         = require('express'),
      mongoose        = require('mongoose'),
      User            = require('./models/Schema/user');
      //rezzio
       mongoose.connect(`mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true });
       // mine
       // mongoose.connect(`mongodb://soufi:NHIadkQn0ULQKkoa@cluster0-shard-00-00-ku5v3.mongodb.net:27017,cluster0-shard-00-01-ku5v3.mongodb.net:27017,cluster0-shard-00-02-ku5v3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true })
       //  .then(() => console.log('Connected'))
       //  .catch(err => console.log(err));

      app = express(),
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitzer());
      app.use(express.static("public"));
      app.use(methodOverride("_method"));
      app.set("view engine", "ejs");

      // Index
      app.get('/', (req, res) => res.render('index'));
      // Open about-you page for new users
      app.get('/about-you', (req, res) => res.render('createUser'));
      // Open careerPath page for new users
      app.get('/careerpath', (req, res) => res.render('createCareerPath'));
      //Questionnaire
      app.get('/questionnare', (req, res) => res.render('questionnare'));
      // Open awareness page for new users
      app.get('/awareness', (req, res) => res.render('createAwareness'));
      // Open careerAwareness page for new users
      app.get('/careerawareness', (req, res) => res.render('createCareerAwareness'));
      // Open mentorship page for new users
      app.get('/mentorship', (req, res) => res.render('CreateMentorship'));
      // Open exposure page for new users
      app.get('/exposure', (req, res) => res.render('CreateExposure'));
      // Open internship page for new users
      app.get('/internship', (req, res) => res.render('createInternship'));
      // Open networkingA page for new users
      app.get('/networking', (req, res) => res.render('createNetworking'));
      // Open involvementA page for new users
      app.get('/involvement', (req, res) => res.render('createInvolvement'));
      // Thank You page
      app.get('/thankyou', (req, res) => res.render('thankYou'));

// Post route for submiting user data
app.post('/about-you', (req, res) => {
  // Get data from form and add to users profile
  let firstName = req.body.aa,
      lastName = req.body.ab,
      gender = req.body.ac,
      emailAddress = req.body.ad,
      currentMajor = req.body.ae,
      currentMinor = req.body.af,
      currentGrade = req.body.ag,
      graduationDate = req.body.ah;

  let newUser = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      emailAddress: emailAddress,
      currentMajor: currentMajor,
      currentMinor: currentMinor,
      currentGrade: currentGrade,
      graduationDate: graduationDate
  };

  // Create a new User profile and save to DB
  User.create(newUser, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

app.post('/careerPath', (req, res) => {

});

app.post('/awareness', (req, res) => {

});

app.post('/careerAwareness', (req, res) => {

});

app.post('/mentorship', (req, res) => {

});

app.post('/exposure', (req, res) => {

});

app.post('/internship', (req, res) => {

});

app.post('/networking', (req, res) => {

});

app.post('/involvement', (req, res) => {

});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'))
