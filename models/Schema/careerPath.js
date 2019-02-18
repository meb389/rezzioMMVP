const mongoose = require("mongoose");

const careerPathSchema = new mongoose.Schema({
   pathSelection: String,
});

const CareerPath = mongoose.model("CareerPath", careerPathSchema);
module.exports = CareerPath;
