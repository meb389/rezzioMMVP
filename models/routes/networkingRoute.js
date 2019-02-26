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


router.route("/networking")
  .get(isLoggedIn, (req, res) => res.render("createNetworking", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    Intake.findOneAndUpdate(
    {"currentUser.username": req.user.username},
      {$set:
        {
          "networking.Nquestion1": req.body.la,
          "networking.Nquestion2": req.body.lb,
          "networking.Nquestion3": req.body.lc,
          "networking.Nquestion4": req.body.ld,
          "networking.Nquestion5": req.body.yesNo,
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.render("createInvolvement")
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
