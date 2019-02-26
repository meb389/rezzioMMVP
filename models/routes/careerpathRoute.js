const expressSanitzer = require("express-sanitizer"),
      LocalStrategy   = require('passport-local').Strategy,
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      router          = express.Router(),
      app             = express(),

      User   = require("../Schema/user"),
      Intake = require("../Schema/intake")


router.route("/careerpath")
  .get(isLoggedIn, (req, res) => res.render("createCareerPath", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    // Get data from path selection drop down
    console.log(req.body);
    const pathSelection = req.body.ba,
          currentUser = req.user.username

    const newPath = {
          "careerPath.pathSelection": pathSelection,
        }

  // Create career path and assign to user object in DB
  Intake.create(newPath, (err, createdIntake) => {
    if(err){
      console.log(err)
    } else{

      console.log(newPath)
      createdIntake.currentUser.username = req.user.username,
      createdIntake.save()
      // Redirect to next page
      res.render("questionnare")
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
