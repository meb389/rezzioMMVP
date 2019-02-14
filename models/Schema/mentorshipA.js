const mongoose = require("mongoose");

const mentorshipASchema = new mongoose.Schema({
   MAquestion1: String,
});

const MentorshipA = mongoose.model("MentorshipA", mentorshipASchema);
module.exports = MentorshipA;
