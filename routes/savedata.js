const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Grid = require("gridfs-stream");
const { GridFSBucket } = require("mongodb");

const Data = require("../models/DataSchema");
const Resume = require("../models/ResumeSchema");

const conn = mongoose.connection;
let gfs;
let gridFSBucket;

conn.once("open", () => {
  // Initialize GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  // Alternative way using GridFSBucket
  gridFSBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// Set up Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

router.post("/", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    res.status(404).json({ error: "Pdf not found" });
  }
  try {
    // Log incoming form data and file
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { buffer, mimetype, originalname } = req.file;
    const resume = new Resume({
      buffer,
      mimetype,
      originalname,
    });
    const resumeData = await resume.save();
    if (!resumeData._id.toString()) {
      res.status(500).json({ Error: "Unable to upload pdf" });
    }
    const { fullname, age, higher_qualification, email, descripition } =
      req.body;
    const data = new Data({
      fullname,
      age,
      higher_qualification,
      email,
      descripition,
      resumeId: resumeData._id.toString(),
    });
    const savedData = await data.save();
    console.log(savedData);
    res.status(200).json({ message: "Pdf and data uploaded successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ Error: "Unable to upload pdf" });
  }
  // try {
  //   const { fullname, age, higher_qualification, email, descripition } =
  //     req.body;
  //   const data = new Data({
  //     fullname,
  //     age,
  //     higher_qualification,
  //     email,
  //     descripition,
  // resume: {
  //   data: req.file.buffer, // Save the PDF file data
  //   contentType: req.file.mimetype, // Save the MIME type (e.g., 'application/pdf')
  // },
  //     date: new Date(),
  //   });
  //   await data.save();
  //   res.status(200).json({ message: "Data and pdf upload successfully" });
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({ error: "Error in uploading Data and pdf" });
  // }
});

// POST endpoint to upload PDF
// router.post("/upload", upload.single("file"), async (req, res) => {
//   if (!gridFSBucket) {
//     return res.status(500).json({ error: "GridFSBucket is not initialized" });
//   }
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   try {
//     const writestream = gridFSBucket.openUploadStream(req.file.originalname, {
//       contentType: req.file.mimetype,
//     });

//     writestream.end(req.file.buffer);

//     writestream.on("finish", () => {
//       const fileUrl = `/files/${writestream.id}`;
//       res.json({ fileUrl });
//     });

//     writestream.on("error", (err) => {
//       console.error("Stream error:", err);
//       res.status(500).json({ error: "Error while uploading file" });
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: "An error occurred during upload" });
//   }
// });

module.exports = router;
