const mongoose = require("mongoose");

const exposureASchema = new mongoose.Schema({
   EAquestion1: String,
});

const ExposureA = mongoose.model("ExposureA", exposureASchema);
module.exports = ExposureA;
