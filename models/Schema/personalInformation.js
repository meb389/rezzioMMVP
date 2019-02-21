const mongoose = require("mongoose");

const PersonalInformationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  emailAddress: String,
  currentMajor: String,
  currentMinor: String,
  currentGrade: String,
  graduationDate: String,
  });

  const PersonalInformation = mongoose.model("PersonalInformation", PersonalInformationSchema);
  module.exports = PersonalInformation;