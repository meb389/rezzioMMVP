const mongoose = require("mongoose")

const careerAwarenessSchema = new mongoose.Schema({
  CAquestion1: String,
  CAquestion2: String,
  CAquestion3: String,
  currentUser:{
    id: mongoose.Schema.Types.ObjectId,
    username: String
  }
})

const CareerAwareness = mongoose.model("CareerAwareness", careerAwarenessSchema)
module.exports = CareerAwareness
