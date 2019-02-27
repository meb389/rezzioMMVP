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


router.route("/mentorship")
  .get(isLoggedIn, (req, res) => res.render("createMentorship", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    Intake.findOneAndUpdate(
      {"currentUser.username": req.user.username},
      {$set:
        {
          "mentorship.Mquestion1": req.body.fa,
          "mentorship.Mquestion2": req.body.fb,
          "mentorship.Mquestion3": req.body.fc,
          "mentorship.Mquestion4": req.body.fd,
          "mentorship.Mquestion5": req.body.yesNo,
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.render("createExposure")
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
        res.render("createExposure")
      }
    })
  })
//     const { fa, fb, fc, fd, yesNo } = req.body;
//     const newMentorship = {
//           Mquestion1: fa,
//           Mquestion2: fb,
//           Mquestion3: fc,
//           Mquestion4: fd,
//           Mquestion5: yesNo
//     }
//
//   // Create a new User profile and save to DB
//   Mentorship.create(newMentorship, (err, createdMentorship) => {
//     if(err){
//       console.log(err)
//     } else{
//       createdMentorship.currentUser.id = req.user._id
//       createdMentorship.currentUser.username = req.user.username
//       createdMentorship.save()
//       // Redirect to next page
//       res.render("createExposure")
//     }
//   })
// })


// Function to chech if loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
