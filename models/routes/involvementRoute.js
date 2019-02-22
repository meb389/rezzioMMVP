const express = require("express"),
      app = express(),
      passport    = require("passport"),
      router  = express.Router(),
      Involvement        = require("../Schema/involvement");


app.route("/involvement")
  .get((req, res) => res.render('createInvolvement'))
  .post((req, res) => {
    const { ia, ib, ic, id, yesNo } = req.body;
    const newInvolvement = {
          IVquestion1: ia,
          IVquestion2: ib,
          IVquestion3: ic,
          IVquestion4: id,
          IVquestion5: yesNo
    };

  // Create a new User profile and save to DB
  Involvement.create(newInvolvement, function(err, createdInvolvement){
    if(err){
      console.log(err);
    } else{
      createdInvolvement.currentUser.id = req.user._id;
      createdInvolvement.currentUser.username = req.user.username;
      createdInvolvement.save();
      // Redirect to next page
      res.render('thankYou');
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
