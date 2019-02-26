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

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'mitchbrudel@gmail.com',
    pass: 'olympic1'
  }
 })
// Index Route
router.route("/")
  .get((req, res) => res.redirect("/register"))

// Student Dashboard
router.route("/dashboard")
  .get(isLoggedIn, (req, res) => res.render("studentDashboard"))

router.route("/register")
  .get((req, res) => res.render("register"))
  .post((req, res) => {
    User.register(new User({username: req.body.username, sQuestion: req.body.secretQ, sAnswer: req.body.secretA}), req.body.password, (err, user) => {
      // password: req.body.password, secretQuestion: req.body.secretQ, secretAnswer: req.body.secretA
      if(err){
        console.log(err)
        return res.render("register")
       }
        passport.authenticate("local")(req, res, () => {
          console.log();
        res.redirect("/about-you")
      })
    })
})

router.route("/login")
  .get((req, res) => res.render("login",))
  .post(
    passport.authenticate("local", {
      successRedirect: "/about-you",
      failureRedirect: "/login",
      failureFlash: true
    }), (req, res) => {

  })

// Verification document submission form
router.route("/submitdocuments")
  .get(isLoggedIn, (req, res) => res.render("submitdocuments", {currentUser: req.user}))
  .post(isLoggedIn, (req, res) => {
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'mitchbrudel@gmail.com',
        pass: 'olympic1'
      }
     })
    let mailOptions = {
      from: req.body.email, // sender address
         to: "mitchbrudel@gmail.com", // list of receivers
         subject: req.body.subject, // Subject line
         text: req.body.message, // plain text body
         html:  req.body.message// html body
     };

     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message %s sent: %s', info.messageId, info.response);
             res.render('studentDashboard');
         });
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
