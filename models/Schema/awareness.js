const mongoose = require("mongoose");

const awarenessSchema = new mongoose.Schema({
   Aquestion1: String,
   Aquestion2: String,
   Aquestion3: Number,
   Aquestion4: String,
   Aquestion5: Number,
   Aquestion6: Number,
   currentUser:{
     id: mongoose.Schema.Types.ObjectId,
     username: String
   }
});

const Awareness = mongoose.model("Awareness", awarenessSchema);
module.exports = Awareness;
