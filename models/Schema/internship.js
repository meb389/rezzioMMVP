const mongoose = require("mongoose")

const internshipSchema = new mongoose.Schema({
  Iquestion1: String,
  Iquestion2: String,
  Iquestion3: String,
  Iquestion4: String,
  Iquestion5: String,
  Iquestion6: String,
  Iquestion7: String
  currentUser:{
    id: mongoose.Schema.Types.ObjectId,
    username: String
  }
})

const Internship = mongoose.model("Internship", internshipSchema)
module.exports = Internship
