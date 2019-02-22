const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   =require("passport-local"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      express         = require('express'),
      mongoose        = require('mongoose')
      // bcrypt          = require('bcrypt')
      // Joi             = require('joi')

// Reauiring Schamas for account creation
const CareerPath        = require('./models/Schema/careerPath'),
      User              = require('./models/Schema/user'),
      Awareness         = require('./models/Schema/awareness'),
      CareerAwareness   = require('./models/Schema/careerAwareness'),
      Exposure          = require('./models/Schema/exposure'),
      Internship        = require('./models/Schema/internship'),
      Involvement       = require('./models/Schema/involvement'),
      Mentorship        = require('./models/Schema/mentorship'),
      Networking        = require('./models/Schema/networking'),
      PersonalInformation =require('./models/Schema/personalInformation')

//rezzio
 mongoose.connect(`mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true });
 // mine
 // mongoose.connect(`mongodb://soufi:NHIadkQn0ULQKkoa@cluster0-shard-00-00-ku5v3.mongodb.net:27017,cluster0-shard-00-01-ku5v3.mongodb.net:27017,cluster0-shard-00-02-ku5v3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true })
 //  .then(() => console.log('Connected'))
 //  .catch(err => console.log(err));

// =============================================================================
// App config
app = express(),
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitzer());
app.use(express.static(__dirname + "public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// Passing user info through to all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
// css connection
app.use(express.static(__dirname + '/public'));
// =============================================================================
// Passport config
app.use(require("express-session")({
    secret: "Rezzio Learning #1",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============================================================================
// Routes

// Index Route
app.route("/")
  .get((req, res) => res.redirect('/register'))

// Student Dashboard
app.route("/dashboard")
  .get((req, res) => res.render('studentDashboard'))

// About You Routes
app.route("/about-you")
  .get(isLoggedIn, (req, res) => res.render('createUser'))
  .post(isLoggedIn, (req, res) => {
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
          graduationDate: graduationDate,
    };
    //
    // console.log(currentUserUsername);


  // Create a new User profile and save to DB
  PersonalInformation.create(newUser, function(err, createdUser){
    if(err){
      console.log(err);
    } else{
      createdUser.currentUser.id = req.user._id;
      createdUser.currentUser.username = req.user.username;
      createdUser.save();
      // Redirect to next page
      res.render('createCareerPath');
    }
  })
})

// Careerpath Routes
app.route("/careerpath")
  .get((req, res) => res.render('createCareerPath'))
  .post((req, res) => {
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
  })
})

//Questionnaire
app.get('/questionnare', (req, res) => res.render('questionnare'));

// Awareness Routes
app.route("/awareness")
  .get((req, res) => res.render('createAwareness'))
  .post((req, res) => {
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
  })
})

// Career awareness Routes
app.route("/careerawareness")
  .get((req, res) => res.render('createAwareness'))
  .post((req, res) => {
    const { ca1, ca2, ca3 } = req.body;
    const newCareerAwareness = {
      CAquestion1: ca1,
      CAquestion2: ca2,
      CAquestion3: ca3,
    };

  // Create a Career Awareness and save to DB
  CareerAwareness.create(newCareerAwareness, function(err, createdCareerAwareness){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  })
})

// Mentorship Routes
app.route("/mentorship")
  .get((req, res) => res.render('createMentorship'))
  .post((req, res) => {
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
      res.render('createExposure');
    }
  })
})

// Exposure Routes
app.route("/mentorship")
  .get((req, res) => res.render('createExposure'))
  .post((req, res) => {
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
      res.render('createInternship');
    }
  })
})

// Internship Routes
app.route("/internship")
  .get((req, res) => res.render('createInternship'))
  .post((req, res) => {
    const { ja, jb, jc, jd, je, jf } = req.body;
    const newInternship = {
          Iquestion1: ja,
          Iquestion2: jb,
          Iquestion3: jc,
          Iquestion4: jd,
          Iquestion5: je,
          Iquestion6: jf,
    };

  // Create a new User profile and save to DB
  Internship.create(newInternship, function(err, createdInternship){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  })
})

// Networking Routes
app.route("/networking")
  .get((req, res) => res.render('createNetworking'))
  .post((req, res) => {
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
      res.render('createInvolvement');
    }
  })
})

// Involvement Routes
app.route("/involvement")
  .get((req, res) => res.render('createInvolvement'))
  .post((req, res) => {
    const { ia, ib, ic, id } = req.body;
    const newInvolvement = {
          IVquestion1: ia,
          IVquestion2: ib,
          IVquestion3: ic,
          IVquestion4: id,
    };

  // Create a new User profile and save to DB
  Involvement.create(newInvolvement, function(err, createdInvolvement){
    if(err){
      console.log(err);
    } else{
      // Redirect to next page
      res.render('createCareerPath');
    }
  })
})

// Thank You page
app.get('/thankyou', (req, res) => res.render('thankYou'));






//------------------------------------login Implementation----------------------------------

app.route('/register')
.get((req, res) => res.render("register"))
.post((req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/about-you");
      });
    });
})

app.route('/login')
.get((req, res) => res.render('login'))
.post(
  passport.authenticate('local', {
    successRedirect: '/about-you',
    failureRedirect: '/login'
  }), (req, res) => {

  })

  function isLoggedIn(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }

      res.redirect("/login");
  }


// const schema = Joi.object().keys({
//   // first_name: Joi.string().required(),
//   // last_name: Joi.string().required(),
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
//   // email: Joi.string().email({ minDomainAtoms: 2 })
// });

//
// app.get('/signup', function(req, res, next) {
//   res.render('signUp');
// });

// app.post('/signup', (req, res, next) => {
//   //res.send(req.body)
//   // res.send('hello;')
//   //console.log(req.body);
//   // const { userName, password } = req.body;
//   const result = Joi.validate(req.body, schema);
    // // res.json(result);
    // if (result.error === null) {
    //   res.send('hello;')
    // }else {
    //   res.send(result)
    // }
//   if(result.error === null){
//     //check if this user exist
//     SignUp
//     .findOne({username : req.body.username})
//     .exec()
//     .then( user => {
//       // if user is undefined user email is not in the db otherwise duplicate user.
//       if (user){
//         // this user exist
//         const error = new Error('This email exist. Please choose another one.');
//         // next(error);
//         console.log(error);
//       } else {
//         //hash password
//         bcrypt.hash(req.body.password, 12)
//         .then( hashedpassword => {
//           const newUserAcc = {
//             userName: req.body.username,
//             password: hashedpassword
//           };
//
//           //here I have to use the create methods to create the user
//           SignUp.create(newUserAcc, function(err, createdUserAcc){
//             if(err){
//               console.log(err);
//             } else{
//               // Redirect to next page
//               res.render('createCareerPath');
//             }
//           });
//         });
//       }
//     });
//   }else {
//     // next(result.error);
//     console.log('error end');
//   }
// });


app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'));
