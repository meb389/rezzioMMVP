const express = require("express"),
      app = express(),
      passport    = require("passport"),
      router  = express.Router(),
      Networking        = require("../Schema/networking");


router.route("/networking")
  .get((req, res) => res.render('createNetworking'))
  .post((req, res) => {
    const { la, lb, lc, ld, yesNo } = req.body;
    const newNetworking = {
          Nquestion1: la,
          Nquestion2: lb,
          Nquestion3: lc,
          Nquestion4: ld,
          Nquestion5: yesNo
    };

  // Create a new User profile and save to DB
  Networking.create(newNetworking, function(err, createdNetworking){
    if(err){
      console.log(err);
    } else{
      createdNetworking.currentUser.id = req.user._id;
      createdNetworking.currentUser.username = req.user.username;
      createdNetworking.save();
      // Redirect to next page
      res.render('createInvolvement');
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
