const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      bodyParser      = require("body-parser"),
      express = require('express'),
      app = express();
      mongoose = require('mongoose');

      //rezzio
       mongoose.connect(`mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true })
       // mine
      // mongoose.connect(`mongodb://soufi:NHIadkQn0ULQKkoa@cluster0-shard-00-00-ku5v3.mongodb.net:27017,cluster0-shard-00-01-ku5v3.mongodb.net:27017,cluster0-shard-00-02-ku5v3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`)
        .then(() => console.log('Connected'))
        .catch(err => console.log(err));


      app.use(bodyParser.urlencoded({extended: true}));
      app.use(expressSanitzer());
      app.use(express.static("public"));
      app.use(methodOverride("_method"));
      app.set("view engine", "ejs");

      // Load user Schema
      const User = require('./models/Schema/user');

// Index
app.get('/', (req, res) => res.render('index'));
//Questionnaire
// app.get('/questionnaire', (req, res) => res.render('questionnaire'));
// Thank You page
// app.get('/thankyou', (req, res) => res.render('thank-you'));

// Open about-you page for new users
app.get('/about-you', (req, res) => res.render('createUser'));
// Open awareness page for new users
app.get('/awareness', (req, res) => res.render('CreateAwareness'));
// Open careerAwareness page for new users
// app.get('/careerAwareness/new', (req, res) => res.render('CreateCareerAwareness'));
// Open careerPath page for new users
// app.get('/careerPath/new', (req, res) => res.render('CreateCareerPath'));
// Open exposureA page for new users
// app.get('/exposureA/new', (req, res) => res.render('CreateExposureA'));
// Open exposureB page for new users
// app.get('/exposureB/new', (req, res) => res.render('CreateExposureB'));
// Open internshipA page for new users
// app.get('/internshipA/new', (req, res) => res.render('CreateInternshipA'));
// Open internshipB page for new users
// app.get('/internshipB/new', (req, res) => res.render('CreateInternshipB'));
// Open involvementA page for new users
// app.get('/involvementA/new', (req, res) => res.render('CreateInvolvementA'));
// Open involvementB page for new users
// app.get('/involvementB/new', (req, res) => res.render('CreateInvolvementB'));
// Open mentorshipA page for new users
// app.get('/mentorshipA/new', (req, res) => res.render('CreateMentorshipA'));
// Open mentorshipB page for new users
// app.get('/mentorshipB/new', (req, res) => res.render('CreateMentorshipB'));
// Open networkingA page for new users
// app.get('/networkingA/new', (req, res) => res.render('CreateNetworkingA'));
// Open networkingB page for new users
// app.get('/networkingB/new', (req, res) => res.render('CreateNetworkingB'));




// CREATE New User object
app.post('/about-you', (req, res) => {
  console.log(req.body);
  let firstName = req.body.aa;
  let lastName = req.body.ab;
  let gender = req.body.ac;
  let emailAddress = req.body.ad;
  let currentMajor = req.body.ae;
  let currentMinor = req.body.af;
  let currentGrade = req.body.ag;
  let graduationDate = req.body.ah;

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    gender:gender,
    emailAddress: emailAddress,
    currentMajor: currentMajor,
    currentMinor: currentMinor,
    currentGrade: currentGrade,
    graduationDate: graduationDate
  };
    // Create user and save to DB
    User.create(newUser, (err, createdUser) => {
      if(err){
        console.log(err);
      } else {
        res.redirect('awareness');
      }
    });
});



app.listen(5000, () => console.log('Example app listening on port 5000!'))
