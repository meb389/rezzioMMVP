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
  .get(isLoggedIn, (req, res) => res.render("createInvolvement", {currentUser: req.user}))
//   .post(isLoggedIn, (req, res) => {
//     const { ia, ib, ic, id, yesNo } = req.body
//     const newInvolvement = {
//           IVquestion1: ia,
//           IVquestion2: ib,
//           IVquestion3: ic,
//           IVquestion4: id,
//           IVquestion5: yesNo
//     }
//
//   // Create a new User profile and save to DB
//   Involvement.create(newInvolvement, (err, createdInvolvement) => {
//     if(err) {
//       console.log(err)
//     } else {
//       createdInvolvement.currentUser.id = req.user._id
//       createdInvolvement.currentUser.username = req.user.username
//       createdInvolvement.save()
//       // Redirect to next page
//       res.render("thankYou")
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
