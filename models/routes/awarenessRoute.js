const express = require("express"),
      app = express(),
      passport    = require("passport"),
      router  = express.Router(),
      Awareness        = require("../Schema/awareness");


router.route("/awareness")
  .get((req, res) => res.render('createAwareness'))
  .post((req, res) => {
    const { ca, cb, cc, cd, ce, cf } = req.body;
    const newAwareness = {
          Aquestion1: ca,
          Aquestion2: cb,
          Aquestion3: cc,
          Aquestion4: cd,
          Aquestion5: ce,
          Aquestion6: cf
    };

  // Create a new User profile and save to DB
  Awareness.create(newAwareness, function(err, createdAwareness){
    if(err){
      console.log(err);
    } else{
      createdAwareness.currentUser.id = req.user._id;
      createdAwareness.currentUser.username = req.user.username;
      createdAwareness.save();
      // Redirect to next page
      res.render('createCareerAwareness');
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
