const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  personalInformation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "personalInformation"
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
  }]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
