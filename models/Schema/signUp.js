const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  userName: String,
  password: String,
  userInfo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
});

const SignUp = mongoose.model("SignUp", signUpSchema);
module.exports = SignUp;
