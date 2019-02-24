const express    = require("express"),
      passport   = require("passport"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      Mentorship = require("../Schema/mentorship")


router.route("/mentorship")
  .get(isLoggedIn, (req, res) => res.render("createMentorship", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    const { fa, fb, fc, fd, yesNo } = req.body;
    const newMentorship = {
          Mquestion1: fa,
          Mquestion2: fb,
          Mquestion3: fc,
          Mquestion4: fd,
          Mquestion5: yesNo
    }

  // Create a new User profile and save to DB
  Mentorship.create(newMentorship, (err, createdMentorship) => {
    if(err){
      console.log(err)
    } else{
      createdMentorship.currentUser.id = req.user._id
      createdMentorship.currentUser.username = req.user.username
      createdMentorship.save()
      // Redirect to next page
      res.render("createExposure")
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
