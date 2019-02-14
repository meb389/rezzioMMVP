const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   gender: Number,
   emailAddress: String,
   currentMajor: String,
   currentMinor: String,
   currentGrade: String,
   graduationDate: String,
});

const User = mongoose.model("User", campgroundSchema);
module.exports = User;
