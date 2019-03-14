const expressSanitzer = require("express-sanitizer"),
      methodOverride  = require("method-override"),
      LocalStrategy   = require('passport-local').Strategy,
      nodeMailer      = require("nodemailer"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      mongoose        = require("mongoose"),
      express         = require("express"),
      path            = require('path'),
      multer          = require('multer'),
      GridFsStorage   = require('multer-gridfs-storage'),
      Grid            = require('gridfs-stream'),
      crypto          = require('crypto'),
      router          = express.Router();

      const mongoURI = `mongodb://Amadou:AmadouPassword@cluster0-shard-00-00-lujlt.mongodb.net:27017,cluster0-shard-00-01-lujlt.mongodb.net:27017,cluster0-shard-00-02-lujlt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

      const conn = mongoose.connection;
var gfs
// upload routes
  conn.once('open', function () {
     gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('files');

  // all set!
});


// function Uploader(req, res, next) {
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'files'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
//  const upload = multer({ storage });
//  return upload
// };


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // const UserID = req.body.UserID;
                // console.log('inside the promise:' + UserID);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'files'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = module.exports = { upload : multer({ storage }),
                                  gfs: gfs}

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
//   // res.redirect('/');
// });


  // module.exports =  Uploader;
