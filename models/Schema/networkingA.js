const mongoose = require("mongoose");

const networkingASchema = new mongoose.Schema({
   NAquestion1: String,
});

const NetworkingA = mongoose.model("NetworkingA", networkingASchema);
module.exports = NetworkingA;
