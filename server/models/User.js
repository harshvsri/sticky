const mongoose = require("mongoose");

// Defining the User schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  activeStatus: {
    type: Boolean,
    default: true,
  },
});

// Defining the model.
module.exports = mongoose.model("User", userSchema);
