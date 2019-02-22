const mongoose = require("mongoose");

const careerPathSchema = new mongoose.Schema({
   pathSelection: String,
   currentUser:{
     id: mongoose.Schema.Types.ObjectId,
     username: String
   }
});

const CareerPath = mongoose.model("CareerPath", careerPathSchema);
module.exports = CareerPath;
