const express  = require("express"),
      passport = require("passport"),
      router   = express.Router(),
      User     = require("../Schema/user"),
      Exposure = require("../Schema/exposure")


router.route("/exposure")
  .get(isLoggedIn, (req, res) => res.render("createExposure"))
  .post(isLoggedIn, (req, res) => {
    console.log(req.body)
    const { ha, hb, yesNo } = req.body
    const newExposure = {
          Equestion1: ha,
          Equestion2: hb,
          Equestion3: yesNo
    }

  // Create a new User profile and save to DB
  Exposure.create(newExposure, (err, createdExposure) => {
    if(err){
      console.log(err)
    } else{
      createdExposure.currentUser.id = req.user._id
      createdExposure.currentUser.username = req.user.username
      createdExposure.save()
      // Redirect to next page
      res.render("createInternship")
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
