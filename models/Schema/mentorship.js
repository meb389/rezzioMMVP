const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema({
   Mquestion1: String,
   Mquestion2: String,
   Mquestion3: Number,
   Mquestion4: String,
   Mquestion5: Number,
});

const Mentorship = mongoose.model("Exposure", mentorshipSchema);
module.exports = Mentorship;
