const mongoose = require("mongoose");

const involvementASchema = new mongoose.Schema({
   IAquestion1: String,
});

const InvolvementA = mongoose.model("InvolvementA", involvementASchema);
module.exports = InvolvementA;
