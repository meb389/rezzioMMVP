const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   =require("passport-local"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      express         = require("express"),
      mongoose        = require("mongoose")

// Creating Route Files
const indexRoute = require("./models/routes/indexRoute"),
      aboutRoute = require("./models/routes/aboutRoute"),
      careerpathRoute = require("./models/routes/careerpathRoute"),
      awarenessRoute = require("./models/routes/awarenessRoute"),
      careerawarenessRoute = require("./models/routes/careerawarenessRoute"),
      mentorshipRoute = require("./models/routes/mentorshipRoute"),
      exposureRoute = require("./models/routes/exposureRoute"),
      internshipRoute = require("./models/routes/internshipRoute"),
      networkingRoute = require("./models/routes/networkingRoute"),
      involvementRoute = require("./models/routes/involvementRoute");


// // Reauiring Schamas for account creation
const PersonalInformation =require("./models/Schema/personalInformation"),
      CareerAwareness   = require("./models/Schema/careerAwareness"),
      Involvement       = require("./models/Schema/involvement"),
      CareerPath        = require("./models/Schema/careerPath"),
      Internship        = require("./models/Schema/internship"),
      Mentorship        = require("./models/Schema/mentorship"),
      Networking        = require("./models/Schema/networking"),
      Awareness         = require("./models/Schema/awareness"),
      Exposure          = require("./models/Schema/exposure"),
      User              = require("./models/Schema/user")

//rezzio
mongoose.connect(`mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true });
 // mine
 // mongoose.connect(`mongodb://soufi:NHIadkQn0ULQKkoa@cluster0-shard-00-00-ku5v3.mongodb.net:27017,cluster0-shard-00-01-ku5v3.mongodb.net:27017,cluster0-shard-00-02-ku5v3.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true })
  // .then(() => console.log('Connected'))
  // .catch(err => console.log(err));

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
app.use(express.static(__dirname + "/public"));

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


app.use(indexRoute),
app.use(aboutRoute),
app.use(careerpathRoute),
app.use(awarenessRoute),
app.use(careerawarenessRoute),
app.use(mentorshipRoute),
app.use(exposureRoute),
app.use(internshipRoute),
app.use(networkingRoute),
app.use(involvementRoute)


app.listen(process.env.PORT || 5000, () => console.log("Example app listening on port 5000!"));
