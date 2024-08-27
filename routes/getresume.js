const express = require("express");
const router = express.Router();
const Resume = require("../models/ResumeSchema");

// GET request to retrieve all data from the database
router.get("/:code", async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.code });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json({ resume: resume });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
