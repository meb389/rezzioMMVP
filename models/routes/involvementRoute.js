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


router.route("/involvement")
  .get(isLoggedIn, (req, res) => res.render("/instakeForms/createInvolvement", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    Intake.findOneAndUpdate(
    {"currentUser.username": req.user.username},
      {$set:
        {
          "involvement.IVquestion1": req.body.ia,
          "involvement.IVquestion2": req.body.ib,
          "involvement.IVquestion3": req.body.ic,
          "involvement.IVquestion4": req.body.id,
          "involvement.IVquestion5": req.body.yesNo,
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.render("thankYou")
      }
    })

// Add last visited url.
// Should be deleted for this involvement
    User.findByIdAndUpdate(
    {_id: req.user.id},
      {$unset:
        {
          lastVisitedURL: null
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.redirect("thankYou")
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
