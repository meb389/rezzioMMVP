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
//   .post(isLoggedIn, (req, res) => {
//     console.log(req.body);
//     const { ca1, ca2, ca3 } = req.body;
//     const newCareerAwareness = {
//       CAquestion1: ca1,
//       CAquestion2: ca2,
//       CAquestion3: ca3
//     }
//
//   // Create a Career Awareness and save to DB
//   CareerAwareness.create(newCareerAwareness, (err, createdCareerAwareness) => {
//     if(err){
//       console.log(err)
//     } else{
//       createdCareerAwareness.currentUser.id = req.user._id
//       createdCareerAwareness.currentUser.username = req.user.username
//       createdCareerAwareness.save()
//       // Redirect to next page
//       res.render("createMentorship")
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
