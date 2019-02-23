const mongoose = require("mongoose")

const networkingSchema = new mongoose.Schema({
  Nquestion1: String,
  Nquestion2: String,
  Nquestion3: String,
  Nquestion4: String,
  Nquestion5: String,
  currentUser:{
    id: mongoose.Schema.Types.ObjectId,
    username: String
  }
})

const Networking = mongoose.model("Networking", networkingSchema)
module.exports = Networking
