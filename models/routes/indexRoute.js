const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      nodeMailer      = require("nodemailer"),
      path            = require("path"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      router          = express.Router()

const User            = require("../Schema/user")

// Index Route
router.route("/")
  .get((req, res) => res.redirect("/register"))

// Student Dashboard
router.route("/dashboard")
  .get( (req, res) => res.render("studentDashboard"))

router.route("/register")
  .get((req, res) => res.render("register"))
  .post((req, res) => {
    User.register(new User({username: req.body.username, sQuestion: req.body.secretQ, sAnswer: req.body.secretA, lastVisitedURL: ''}), req.body.password, (err, user) => {
      // password: req.body.password, secretQuestion: req.body.secretQ, secretAnswer: req.body.secretA
      if(err){
        console.log(err)
        return res.render("register")
       }
        passport.authenticate("local")(req, res, () => {
        res.redirect("/about-you")
      })
    })
})

router.route("/login")
  .get((req, res) => res.render("login"))
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
    }), (req, res) => {
      // console.log(req);
      // last visited url inside the response.
      const lastVisitedURL = res.req.user.lastVisitedURL;
      if (lastVisitedURL) {
        res.redirect(`${lastVisitedURL}`);
      }else {
        res.redirect('/dashboard');
      }
  })

// Thank You page
router.get("/thankyou", isLoggedIn, (req, res) => res.render("thankYou"))

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
