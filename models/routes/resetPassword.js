const express    = require("express"),
      passport   = require("passport"),
      mongoose        = require("mongoose"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      Networking = require("../Schema/networking")


router.route("/resetPassword")
  .get((req, res) => res.render("resetPassword"))
  .post((req, res) => {
    console.log(req.body);
    // users.findOne({ username: `${req.body.uId}` })
    //   .then((err, result) => {console.log(result)});
    // User.find({username: 'test2'}, function(err,obj) { console.log(obj[0].password); });
    const {uId, newPassword} = req.body;
    User.findByUsername(uId).then(function(sanitizedUser){
      console.log(sanitizedUser);
        if (sanitizedUser){
            sanitizedUser.setPassword(newPassword, function(){
                sanitizedUser.save();
                res.status(200).json({message: 'password reset successful'});
            });
        } else {
            res.status(500).json({message: 'This user does not exist'});
        }
    },function(err){
        console.error(err);
    })





    // const { la, lb, lc, ld, yesNo } = req.body
    // const newNetworking = {
    //       Nquestion1: la,
    //       Nquestion2: lb,
    //       Nquestion3: lc,
    //       Nquestion4: ld,
    //       Nquestion5: yesNo
    // }

  // Create a new User profile and save to DB
  // Networking.create(newNetworking, (err, createdNetworking) => {
  //   if(err){
  //     console.log(err)
  //   } else{
  //     createdNetworking.currentUser.id = req.user._id
  //     createdNetworking.currentUser.username = req.user.username
  //     createdNetworking.save()
  //     // Redirect to next page
  //     res.render("createInvolvement")
  //   }
  // })
})

// Function to chech if loggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
