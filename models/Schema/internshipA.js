const mongoose = require("mongoose");

const internshipASchema = new mongoose.Schema({
   IAquestion1: String,
});

const InternshipA = mongoose.model("InternshipA", internshipASchema);
module.exports = InternshipA;
