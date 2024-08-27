const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  fullname: String,
  age: String,
  higher_qualification: String,
  email: String,
  descripition: String,
  resumeId: String,
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model("Data", dataSchema);
