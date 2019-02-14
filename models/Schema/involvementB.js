const mongoose = require("mongoose");

const involvementBSchema = new mongoose.Schema({
   IBquestion1: String,
   IBquestion2: String,
   IBquestion3: String,
   IBquestion4: String,
});

const InvolvementB = mongoose.model("InvolvementB", involvementBSchema);
module.exports = InvolvementB;
