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

// Index
app.get('/', (req, res) => res.render('index'));

// Open about-you page for new users
app.get('/about-you/new', (req, res) => res.render('createUser'));
// Open awareness page for new users
app.get('/awareness/new', (req, res) => res.render('CreateAwareness'));

// CREATE New User object
app.post('/about-you/new', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let gender = req.body.gender;
  let emailAddress = req.body.emailAddress;
  let currentMajor = req.body.currentMajor;
  let currentMinor = req.body.currentMinor;
  let currentGrade = req.body.currentGrade;
  let graduationDate = req.body.graduationDate;

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



app.listen(3000, () => console.log('Example app listening on port 3000!'))
