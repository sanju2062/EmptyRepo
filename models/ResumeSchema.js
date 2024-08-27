const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  buffer: Buffer, // Store the PDF file as binary data
  mimetype: String, // Store the MIME type of the file
  originalname: String,
  uploadDate: {
    type: Date,
    default: new Date(), // Timestamp when the file was uploaded
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
