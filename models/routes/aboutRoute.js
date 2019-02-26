const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      router          = express.Router()
      app             = express()

      User                = require("../Schema/user"),
      // PersonalInformation = require("../Schema/personalInformation")


router.route("/about-you")
  .get(isLoggedIn, (req, res) => res.render("createUser", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    // Get data from form and add to users profile

  // Create a new User profile and save to DB
  User.findOneAndUpdate(
    {_id: req.user.id},
    {$set:
      {
        firstName: req.body.aa,
        lastName: req.body.ab,
        gender: req.body.ac,
        emailAddress: req.body.ad,
        currentMajor: req.body.ae,
        currentMinor: req.body.af,
        currentGrade: req.body.ag,
        graduationDate: req.body.ah
      }
    }, (err, updatedUser) => {
    if(err){
      res.redirect("/contact")
    } else {
      res.render("Success")
    }
  })
})


// Function to chech if loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
