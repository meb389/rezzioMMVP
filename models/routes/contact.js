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

 // Verification document submission form
 router.route("/contact")
   .get(isLoggedIn, (req, res) => res.render("contact", {currentUser: req.user}))
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
       text: req.body.email, // plain text body
       html: req.body.message + " -- " + req.body.email + " -- " + req.body.name// html body
     };
     transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
       return console.log(error);
       }
         res.render('studentDashboard');
     })
   })

   function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next()
       }
       res.redirect("/login")
   }

   module.exports = router
