const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  userName: String,
  password: String
});

const signUp = mongoose.model("signUp", signUpSchema);
module.exports = signUp;
