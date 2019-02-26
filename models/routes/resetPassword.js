const express    = require("express"),
      passport   = require("passport"),
      mongoose        = require("mongoose"),
      router     = express.Router(),
      User       = require("../Schema/user"),
      Intake     = require("../Schema/intake")


router.route("/resetPassword")
  .get((req, res) => res.render("resetPassword"))
  .post((req, res) => {
    console.log(req.body);
    const {uId, newPassword, sAnswer, secretQ} = req.body;
    User.findByUsername(uId).then(function(sanitizedUser){
      console.log(sanitizedUser);
        if (sanitizedUser){
          if (sAnswer == sanitizedUser.sAnswer && secretQ == sanitizedUser.sQuestion) {
            sanitizedUser.setPassword(newPassword, function(){
                sanitizedUser.save();
                res.status(200).json({message: 'password reset successful'});
            }
          )} else {
            res.status(500).json({message: 'The answer does not match!'});
          };
        } else {
            res.status(500).json({message: 'This user does not exist'});
        }
    },function(err){
        console.error(err);
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
