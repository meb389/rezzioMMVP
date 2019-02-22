const express = require("express"),
      app = express(),
      passport    = require("passport"),
      router  = express.Router(),
      PersonalInformation        = require("../Schema/personalInformation");


app.route("/about-you")
  .get(isLoggedIn, (req, res) => res.render('createUser'))
  .post(isLoggedIn, (req, res) => {
    // Get data from form and add to users profile
    const firstName = req.body.aa,
          lastName = req.body.ab,
          gender = req.body.ac,
          emailAddress = req.body.ad,
          currentMajor = req.body.ae,
          currentMinor = req.body.af,
          currentGrade = req.body.ag,
          graduationDate = req.body.ah;

    const newUser = {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          emailAddress: emailAddress,
          currentMajor: currentMajor,
          currentMinor: currentMinor,
          currentGrade: currentGrade,
          graduationDate: graduationDate,
    };
    //
    // console.log(currentUserUsername);


  // Create a new User profile and save to DB
  PersonalInformation.create(newUser, function(err, createdUser){
    if(err){
      console.log(err);
    } else{
      createdUser.currentUser.id = req.user._id;
      createdUser.currentUser.username = req.user.username;
      createdUser.save();
      // Redirect to next page
      res.render('createCareerPath');
    }
  })
})

// Function to chech if loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
