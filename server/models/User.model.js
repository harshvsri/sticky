const mongoose = require("mongoose");

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
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Note",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
