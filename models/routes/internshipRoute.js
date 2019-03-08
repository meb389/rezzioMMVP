const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      router          = express.Router(),
      app             = express();


      User   = require("../Schema/user"),
      Intake = require("../Schema/intake")


router.route("/internship")
  .get(isLoggedIn, (req, res) => res.render("createInternship", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    Intake.findOneAndUpdate(
    {"currentUser.username": req.user.username},
      {$set:
        {
          "internship.Iquestion1": req.body.ja,
          "internship.Iquestion2": req.body.jb,
          "internship.Iquestion3": req.body.jc,
          "internship.Iquestion4": req.body.jd,
          "internship.Iquestion5": req.body.je,
          "internship.Iquestion6": req.body.jf,
          "internship.Iquestion7": req.body.yesNo,
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.render("createNetworking")
      }
    })


// Add last visited url.
    User.findByIdAndUpdate(
    {_id: req.user.id},
      {$set:
        {
          lastVisitedURL: `${req.url}`
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
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
