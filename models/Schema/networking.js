const mongoose = require("mongoose");

const networkingSchema = new mongoose.Schema({
   Nquestion1: String,
   Nquestion2: Number,
   Nquestion3: Number,
   Nquestion4: String,
   Nquestion5: String,
});

const Networking = mongoose.model("Networking", networkingSchema);
module.exports = Networking;
