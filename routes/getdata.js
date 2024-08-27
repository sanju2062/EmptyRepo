const express = require("express");
const router = express.Router();
const Data = require("../models/DataSchema");

// GET request to retrieve all data from the database
router.get("/", async (req, res) => {
  try {
    const allData = await Data.find();
    if (!allData || allData.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({ data: allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
