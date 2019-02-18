const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      bodyParser      = require("body-parser"),
      express         = require('express'),
      mongoose        = require('mongoose')

// Reauiring Schamas for account creation
const CareerPath        = require('./models/Schema/careerPath'),
      User              = require('./models/Schema/user'),
      Login              = require('./models/Schema/login'),
      Awareness         = require('./models/Schema/awareness'),
      CareerAwareness   = require('./models/Schema/careerAwareness'),
      Exposure          = require('./models/Schema/exposure'),
      Internship        = require('./models/Schema/internship'),
      Involvement       = require('./models/Schema/involvement'),
      Mentorship        = require('./models/Schema/mentorship'),
      Networking        = require('./models/Schema/networking')

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

// Submit username and Password to User profile
app.post('/', (req, res) => {
  const {userName, password} = req.body

  const userLogin = {
        userName: userName,
        password: password
  };

  Login.create(userLogin, (err, newLogin) => {
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createUser');
    }
  });
});

// Post route for creating a user profile
app.post('/about-you', (req, res) => {
  // Get data from form and add to users profile
  const firstName = req.body.aa,
        lastName = req.body.ab,
        gender = req.body.ac,
        emailAddress = req.body.ad,
        currentMajor = req.body.ae,
        currentMinor = req.body.af,
        currentGrade = req.body.ag,
        graduationDate = req.body.ah;

  const newUser = {
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
  User.create(newUser, function(err, createdUser){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

// Create a career path for user
app.post('/careerpath', (req, res) => {
  // Get data from path selection drop down
  console.log(req.body);
  const pathSelection = req.body.ba

  const newPath = {
        pathSelection: pathSelection
      };
      console.log(newPath);

  // Create career path and assign to user object in DB
  CareerPath.create(newPath, function(err, createdPath){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('questionnare');
    }
  });
});

app.post('/awareness', (req, res) => {
  const { ca, cb, cc, cd, ce, cf } = req.body;
  const newAwareness = {
        Aquestion1: ca,
        Aquestion2: cb,
        Aquestion3: cc,
        Aquestion4: cd,
        Aquestion5: ce,
        Aquestion6: cf
  };

  // Create a new User profile and save to DB
  Awareness.create(newAwareness, function(err, createdAwareness){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

app.post('/careerawareness', (req, res) => {
  const { ca1, ca2, ca3 } = req.body;
  const newCareerAwareness = {
        CAquestion1: ca1,
        CAquestion2: ca2,
        CAquestion3: ca3,
  };
  console.log(newCareerAwareness);

  // Create a Career Awareness and save to DB
  CareerAwareness.create(newCareerAwareness, function(err, createdCareerAwareness){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

app.post('/mentorship', (req, res) => {
  console.log(req.body);
  const { fa, fb, fc, fd, fe } = req.body;
  const newMentorship = {
        Mquestion1: fa,
        Mquestion2: fb,
        Mquestion3: fc,
        Mquestion4: fd,
        // Aquestion5: fe
  };

  // Create a new User profile and save to DB
  Mentorship.create(newMentorship, function(err, createdMentorship){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});


app.post('/exposure', (req, res) => {
  console.log(req.body);
  const { ha, hb, yesNoStorage } = req.body;
  const newExposure = {
        Equestion1: ha,
        Equestion2: hb,
        Equestion3: yesNoStorage
  };

  // Create a new User profile and save to DB
  Exposure.create(newExposure, function(err, createdExposure){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

app.post('/internship', (req, res) => {
  console.log(req.body);
  const { ja, jb, jc, jd, je, jf } = req.body;
  const newInternship = {
        Iquestion1: ja,
        Iquestion2: jb,
        Iquestion3: jc,
        Iquestion4: jd,
        Iquestion5: je,
        Iquestion6: jf,
        // Aquestion7: jg
  };

  // Create a new User profile and save to DB
  Internship.create(newInternship, function(err, createdInternship){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});


app.post('/networking', (req, res) => {
  console.log(req.body);
  const { la, lb, lc, ld } = req.body;
  const newNetworking = {
        Nquestion1: la,
        Nquestion2: lb,
        Nquestion3: lc,
        Nquestion4: ld,
        // Nquestion5: le
  };

  // Create a new User profile and save to DB
  Networking.create(newNetworking, function(err, createdNetworking){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

// ----------------------------------------Until here working------------------------------//


app.post('/involvement', (req, res) => {
  console.log(req.body);
  const { ia, ib, ic, id } = req.body;
  const newInvolvement = {
        IVquestion1: ia,
        IVquestion2: ib,
        IVquestion3: ic,
        IVquestion4: id,
        // Aquestion5: ie,
        // Aquestion6: if,
        // Aquestion7: ig
  };

  // Create a new User profile and save to DB
  Involvement.create(newInvolvement, function(err, createdInvolvement){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  });
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'))
