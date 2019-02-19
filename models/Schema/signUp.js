const mongoose = require("mongoose");
var bcrypt     = require('bcrypt');

const signUpSchema = new mongoose.Schema({
  userName: String,
  password: String,
  userInfo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  awareness: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Awareness"
  }],
  careerAwareness: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CareerAwareness"
  }],
  careerPath: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CareerPath"
  }],
  exposure: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exposure"
  }],
  internship: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship"
  }],
  involvement: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Involvement"
  }],
  mentorship: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentorship"
  }],
  networking: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Networking"
  }],
});

const SignUp = mongoose.model("SignUp", signUpSchema);
module.exports = SignUp;
