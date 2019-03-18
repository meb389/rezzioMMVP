const mongoose = require("mongoose")

const intakeSchema = new mongoose.Schema({
  careerPath: {
    pathSelection: String
  },
  awareness: {
    Aquestion1: String,
    Aquestion2: String,
    Aquestion3: Number,
    Aquestion4: String,
    Aquestion5: Number,
    Aquestion6: Number,
  },
  careerAwareness: {
    CAquestion1: String,
    CAquestion2: String,
    CAquestion3: String,
  },
  exposure: {
    Equestion1: Number,
    Equestion2: Number,
    Equestion3: String,
  },
  internship: {
    Iquestion1: String,
    Iquestion2: String,
    Iquestion3: String,
    Iquestion4: String,
    Iquestion5: String,
    Iquestion6: String,
    Iquestion7: String
  },
  involvement: {
    IVquestion1: String,
    IVquestion2: String,
    IVquestion3: String,
    IVquestion4: String,
    IVquestion5: String
  },
  mentorship: {
    Mquestion1: String,
    Mquestion2: String,
    Mquestion3: String,
    Mquestion4: String,
    Mquestion5: String
  },
  networking: {
    Nquestion1: String,
    Nquestion2: String,
    Nquestion3: String,
    Nquestion4: String,
    Nquestion5: String,
  },
  Dashboard: {
    profilePic: String,
  },
  currentUser:{
    id: mongoose.Schema.Types.ObjectId,
    username: String
  }
})

const Intake = mongoose.model("Intake", intakeSchema)
module.exports = Intake
