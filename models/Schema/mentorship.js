const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
   Mquestion1: String,
   Mquestion2: String,
   Mquestion3: String,
   Mquestion4: String,
   // Mquestion5: Number,
});

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
module.exports = Mentorship;
