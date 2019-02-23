const express    = require("express"),
      passport   = require("passport"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      Internship = require("../Schema/internship")


router.route("/internship")
  .get((req, res) => res.render("createInternship"))
  .post((req, res) => {
    const { ja, jb, jc, jd, je, jf, yesNo } = req.body;
    const newInternship = {
          Iquestion1: ja,
          Iquestion2: jb,
          Iquestion3: jc,
          Iquestion4: jd,
          Iquestion5: je,
          Iquestion6: jf,
          Iquestion7: yesNo
    }

  // Create a new User profile and save to DB
  Internship.create(newInternship, (err, createdInternship) => {
    if(err) {
      console.log(err)
    } else {
      createdInternship.currentUser.id = req.user._id
      createdInternship.currentUser.username = req.user.username
      createdInternship.save()
      // Redirect to next page
      res.render("createNetworking")
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
