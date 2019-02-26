const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      router          = express.Router(),
      app             = express(),

      User   = require("../Schema/user"),
      Intake = require("../Schema/intake")


router.route("/careerawareness")
  .get(isLoggedIn, (req, res) => res.render("createCareerAwareness", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    Intake.findOneAndUpdate(
      {"currentUser.username": req.user.username},
      {$set:
        {
          "careerAwareness.CAquestion1": req.body.career1,
          "careerAwareness.CAquestion2": req.body.career2,
          "careerAwareness.CAquestion3": req.body.career3,
        }
      }, (err, updatedUser) => {
      if(err) {
        res.redirect("/contact")
      } else {
        updatedUser.save()
        res.render("createMentorship")
      }
    })

// Add last visited url.
// Should be deleted for this involvement
    User.findByIdAndUpdate(
    {_id: req.user.id},
      {$set:
        {
          lastVisitedURL: `${req.headers.host}` + `${req.url}`
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.render("createMentorship")
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
