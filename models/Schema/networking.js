const mongoose = require("mongoose");

const networkingSchema = new mongoose.Schema({
   Nquestion1: Number,
   Nquestion2: Number,
   Nquestion3: String,
   Nquestion4: String,
   // Nquestion5: String,
});

const Networking = mongoose.model("Networking", networkingSchema);
module.exports = Networking;
