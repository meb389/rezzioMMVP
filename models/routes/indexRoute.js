const express = require("express"),
      passport    = require("passport"),
      router  = express.Router(),
      User        = require("../Schema/user");

// Index Route
router.route("/")
  .get((req, res) => res.redirect('/register'))

// Student Dashboard
router.route("/dashboard")
  .get((req, res) => res.render('studentDashboard'))

router.route('/register')
.get((req, res) => res.render("register"))
.post((req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/about-you");
      });
    });
})

router.route('/login')
.get((req, res) => res.render('login'))
.post(
  passport.authenticate('local', {
    successRedirect: '/about-you',
    failureRedirect: '/login'
  }), (req, res) => {

  })

// Thank You page
router.get('/thankyou', (req, res) => res.render('thankYou'));

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
