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


router.route("/awareness")
  .get(isLoggedIn, (req, res) => res.render("createAwareness", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {

    Intake.findOneAndUpdate(
      {"currentUser.username": req.user.username},
      {$set:
        {
          "awareness.Aquestion1": req.body.ca,
          "awareness.Aquestion2": req.body.cb,
          "awareness.Aquestion3": req.body.cc,
          "awareness.Aquestion4": req.body.cd,
          "awareness.Aquestion5": req.body.ce,
          "awareness.Aquestion6": req.body.cf,
        }
      }, (err, updatedUser) => {
      if(err){
        console.log(err);
      } else {
        res.render("createCareerAwareness")
      }
    })

    // Add last visited url.
    // Should be deleted for this involvement
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
            res.render("createCareerAwareness")
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
