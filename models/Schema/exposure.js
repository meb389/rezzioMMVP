const mongoose = require("mongoose");

const exposureSchema = new mongoose.Schema({
   Equestion1: Number,
   Equestion2: Number,
   Equestion3: String,
   currentUser:{
     id: mongoose.Schema.Types.ObjectId,
     username: String
   }

   // Equestion4: String,
   // Equestion5: String,
   // Equestion6: String,
   // Equestion7: String,
});

const Exposure = mongoose.model("Exposure", exposureSchema);
module.exports = Exposure;
