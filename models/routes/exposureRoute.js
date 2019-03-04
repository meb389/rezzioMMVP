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
      // Exposure = require("../Schema/exposure")


router.route("/exposure")
  .get(isLoggedIn, (req, res) => res.render("createExposure", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
  Intake.findOneAndUpdate(
    {"currentUser.username": req.user.username},
    {$set:
      {
        "exposure.Equestion1": req.body.ha,
        "exposure.Equestion2": req.body.hb,
        "exposure.Equestion3": req.body.yesNo,
      }
    }, (err, updatedUser) => {
    if(err) {
      console.log(err)
    } else {
      updatedUser.save()
      res.render("/instakeForms/createInternship")
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
        res.render("/instakeForms/createInternship")
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
