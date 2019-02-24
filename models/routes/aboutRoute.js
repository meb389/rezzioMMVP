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
      PersonalInformation = require("../Schema/personalInformation")


router.route("/about-you")
  .get(isLoggedIn, (req, res) => res.render("createUser", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    // Get data from form and add to users profile
    const firstName = req.body.aa,
          lastName = req.body.ab,
          gender = req.body.ac,
          emailAddress = req.body.ad,
          currentMajor = req.body.ae,
          currentMinor = req.body.af,
          currentGrade = req.body.ag,
          graduationDate = req.body.ah

    const newUser = {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          emailAddress: emailAddress,
          currentMajor: currentMajor,
          currentMinor: currentMinor,
          currentGrade: currentGrade,
          graduationDate: graduationDate
    }

  // Create a new User profile and save to DB
  PersonalInformation.create(newUser, (err, createdUser) => {
    if(err){
      console.log(err)
    } else{
      createdUser.currentUser.id = req.user._id
      createdUser.currentUser.username = req.user.username
      createdUser.save()
      // Redirect to next page
      res.render("createCareerPath")
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
