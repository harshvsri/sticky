const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/notesDB");

  // Once the connection is open, log a message to the console
  mongoose.connection.once("open", () => console.log("Connected to MongoDB"));
};

module.exports = connectDB;
