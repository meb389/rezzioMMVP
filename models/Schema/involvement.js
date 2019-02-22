const mongoose = require("mongoose");

const involvementVSchema = new mongoose.Schema({
   IVquestion1: String,
   IVquestion2: String,
   IVquestion3: String,
   IVquestion4: String,
   IVquestion5: String,
   currentUser:{
     id: mongoose.Schema.Types.ObjectId,
     username: String
   }
   // IVquestion5: String,
});

const InvolvementV = mongoose.model("InvolvementV", involvementVSchema);
module.exports = InvolvementV;
