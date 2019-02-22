const express = require("express"),
      app = express(),
      passport    = require("passport"),
      router  = express.Router(),
      CareerAwareness        = require("../Schema/careerAwareness");


app.route("/careerawareness")
  .get((req, res) => res.render('createCareerAwareness'))
  .post((req, res) => {
    const { ca1, ca2, ca3 } = req.body;
    const newCareerAwareness = {
      CAquestion1: ca1,
      CAquestion2: ca2,
      CAquestion3: ca3,
    };

  // Create a Career Awareness and save to DB
  CareerAwareness.create(newCareerAwareness, function(err, createdCareerAwareness){
    if(err){
      console.log(err);
    } else{
      createdCareerAwareness.currentUser.id = req.user._id;
      createdCareerAwareness.currentUser.username = req.user.username;
      createdCareerAwareness.save();
      // Redirect to next page
      res.render('createMentorship');
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
