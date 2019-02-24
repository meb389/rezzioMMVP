const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  sQuestion: String,
  sAnswer: String
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", UserSchema)
module.exports = User
