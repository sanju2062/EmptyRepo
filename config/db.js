const mongoose = require("mongoose");
const config = require("config");
const db = process.env.mongoURI || config.get("mongoURI");

const connectDB = async () => {
  mongoose
    .connect(db, {
      serverSelectionTimeoutMS: 5000, // Increase to 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

module.exports = connectDB;
