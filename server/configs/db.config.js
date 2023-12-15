const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/notesDB");
  mongoose.connection.once("open", function () {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectDB;
