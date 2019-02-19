const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  emailAddress: String,
  currentMajor: String,
  currentMinor: String,
  currentGrade: String,
  graduationDate: String,
  login: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login"
    }
  ],
  awareness: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Awareness"
    }
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
