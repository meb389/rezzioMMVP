const mongoose = require("mongoose");

const exposureBSchema = new mongoose.Schema({
   EBquestion1: String,
   EBquestion2: String,
   EBquestion3: String,
   EBquestion4: String,
   EBquestion5: String,
   EBquestion6: String,
});

const ExposureB = mongoose.model("ExposureB", exposureBSchema);
module.exports = ExposureB;
