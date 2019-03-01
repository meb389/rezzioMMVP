const mongoose = require("mongoose")

const verificationDocumentSchema = new mongoose.Schema({
  currentUser: {
    networking: {
      documentType: String,
      documentName: String,
      document: String
    },
    mentorship: {
      documentType: String,
      documentName: String,
      document: String
    },
    internship: {
      documentType: String,
      documentName: String,
      document: String
    },
    involvement: {
      documentType: String,
      documentName: String,
      document: String
    },
    exposure: {
      documentType: String,
      documentName: String,
      document: String
    },
  }

  const VerificationDocument = mongoose.model("VerificationDocument", verificationDocumentSchema)
  module.exports = VerificiationDocument
