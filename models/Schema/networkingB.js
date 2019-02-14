const mongoose = require("mongoose");

const networkingBSchema = new mongoose.Schema({
   NBquestion1: String,
   NBquestion2: String,
   NBquestion3: String,
   NBquestion4: String,
});

const NetworkingB = mongoose.model("NetworkingB", networkingBSchema);
module.exports = NetworkingB;
