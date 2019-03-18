const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      nodeMailer      = require("nodemailer"),
      path            = require("path"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      multer          = require('multer'),
      GridFsStorage   = require('multer-gridfs-storage'),
      Grid            = require('gridfs-stream'),
      crypto          = require('crypto'),
      upload    = require("../../middlewares"),
      router          = express.Router()

      Intake = require("../Schema/intake")


    //   const mongoURI = `mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
      const conn = mongoose.connection;
    //
    //
    let gfs;
      conn.once('open', function () {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('files');

      // all set!
    });

    //
    //   const storage = new GridFsStorage({
    //     url: mongoURI,
    //     file: (req, file) => {
    //       return new Promise((resolve, reject) => {
    //         crypto.randomBytes(16, (err, buf) => {
    //           if (err) {
    //             return reject(err);
    //           }
    //           const filename = buf.toString('hex') + path.extname(file.originalname);
    //           const fileInfo = {
    //             filename: filename,
    //             bucketName: 'files'
    //           };
    //           resolve(fileInfo);
    //         });
    //       });
    //     }
    //   });
    //   const upload = multer({ storage });

    // let gfs = upload.gfs;


const User            = require("../Schema/user");
// const Uploaders = Uploader.single('file');

// Index Route
router.route("/")
  .get((req, res) => res.redirect("/register"))


// Student Dashboard
router.route("/dashboard")
  .get(isLoggedIn, (req, res) => {
  //   console.log(await conn.collection('files.chunks').find().toArray());
  //   conn.collection('files.chunks').find().toArray((err, files) => {
  //     res.render('studentDashboard', { files: files });
  //
  //   })
  //   const files = files.files;
  //   const files = await gfs.chunks;
  //  console.log( files );

  // gfs.files.find().toArray((err, files) => {
  //   // console.log(files);
  //   // Check if files
  //   if (!files || files.length === 0) {
  //     res.render('studentDashboard', { files: false });
  //   } else {
  //     files.map(file => {
  //       if (
  //         file.contentType === 'image/jpeg' ||
  //         file.contentType === 'image/png'
  //       ) {
  //         file.isImage = true;
  //       } else {
  //         file.isImage = false;
  //       }
  //     });
  //     res.render('studentDashboard', { files: files });
  //   }
  // });
    var files = Intake.findOne({"currentUser.username": req.user.username}).exec();
    files.then(function (file) {
      pic = [file.Dashboard.profilePic];
      // console.log(pic)
      res.render('studentDashboard', { files: pic });
    });
    // console.log(files);
    // res.render('studentDashboard', { files: files });
  })
  .post(isLoggedIn, upload.upload.single('profile'), (req, res) => {
    // console.log(req.file.filename);
    Intake.findOneAndUpdate(
    {"currentUser.username": req.user.username},
      {$set:
        {
          "Dashboard.profilePic": req.file.filename
        }
      }, (err, updatedUser) => {
      if(err) {
        console.log(err)
      } else {
        updatedUser.save()
        res.json({ file: req.file })
      }
    })
    // console.log(res);
    })


  router.route('/image/:filename')
    .get((req, res) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });
  });





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


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router
