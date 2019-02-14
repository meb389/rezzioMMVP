const mongoose = require("mongoose");

const mentorshipBSchema = new mongoose.Schema({
   MBquestion1: String,
   MBquestion2: String,
   MBquestion3: String,
   MBquestion4: String,
});

const MentorshipB = mongoose.model("ExposureB", mentorshipBSchema);
module.exports = MentorshipB;
