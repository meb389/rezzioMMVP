const express    = require("express"),
      passport   = require("passport"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      CareerPath = require("../Schema/careerPath")


router.route("/careerpath")
  .get(isLoggedIn, (req, res) => res.render("createCareerPath"))
  .post(isLoggedIn, (req, res) => {
    // Get data from path selection drop down
    console.log(req.body);
    const pathSelection = req.body.ba

    const newPath = {
          pathSelection: pathSelection
        }

  // Create career path and assign to user object in DB
  CareerPath.create(newPath, (err, createdPath) => {
    if(err){
      console.log(err)
    } else{
      createdPath.currentUser.id = req.user._id
      createdPath.currentUser.username = req.user.username
      createdPath.save()
      // Redirect to next page
      res.render("questionnare")
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
