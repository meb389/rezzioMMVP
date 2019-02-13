const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   gender: String,
   emailAddress: String,
   currentMajor: String,
   currentMinor: String,
   currentGrade: String,
   graduationDate: String,
});

module.exports = mongoose.model("User", userSchema);
