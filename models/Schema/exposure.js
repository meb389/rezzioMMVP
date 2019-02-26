const mongoose = require("mongoose")

const exposureSchema = new mongoose.Schema({
  Equestion1: Number,
  Equestion2: Number,
  Equestion3: String
  currentUser:{
    id: mongoose.Schema.Types.ObjectId,
    username: String
  }
})

const Exposure = mongoose.model("Exposure", exposureSchema)
module.exports = Exposure
