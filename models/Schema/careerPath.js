const mongoose = require("mongoose");

const careerPathSchema = new mongoose.Schema({
   CPquestion1: String,
});

const CareerPath = mongoose.model("CareerPath", careerPathSchema);
module.exports = CareerPath;
