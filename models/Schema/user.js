const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new mongoose.Schema({
  userName: String,
  password: String,
  sQuestion: String,
  sAnswer: String
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema)
module.exports = User
