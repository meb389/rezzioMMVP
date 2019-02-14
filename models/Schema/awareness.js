const mongoose = require("mongoose");

const awarenessSchema = new mongoose.Schema({
   Aquestion1: String,
   Aquestion2: String,
   Aquestion3: String,
   Aquestion4: String,
   Aquestion5: String,
   Aquestion6: String,
});

const Awareness = mongoose.model("Awareness", awarenessSchema);
module.exports = Awareness;
