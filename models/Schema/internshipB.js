const mongoose = require("mongoose");

const internshipBSchema = new mongoose.Schema({
   IBquestion1: String,
   IBquestion2: String,
   IBquestion3: String,
   IBquestion4: String,
   IBquestion5: String,
   IBquestion6: String,
});

const InternshipB = mongoose.model("InternshipB", internshipBSchema);
module.exports = InternshipB;
