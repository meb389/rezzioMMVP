const express    = require("express"),
      passport   = require("passport"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      Networking = require("../Schema/networking")


router.route("/networking")
  .get(isLoggedIn, (req, res) => res.render("createNetworking", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    const { la, lb, lc, ld, yesNo } = req.body
    const newNetworking = {
          Nquestion1: la,
          Nquestion2: lb,
          Nquestion3: lc,
          Nquestion4: ld,
          Nquestion5: yesNo
    }

  // Create a new User profile and save to DB
  Networking.create(newNetworking, (err, createdNetworking) => {
    if(err){
      console.log(err)
    } else{
      createdNetworking.currentUser.id = req.user._id
      createdNetworking.currentUser.username = req.user.username
      createdNetworking.save()
      // Redirect to next page
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
