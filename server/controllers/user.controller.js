const User = require("../models/User.model");
const Note = require("../models/Note.model");

/* asyncHandler is a middleware for handling exceptions inside asynchronous route handlers.
It catches any errors that occur while executing the route handler function 
and passes them to the next middleware function.
This way, we don't need to include try/catch blocks in each route handler. */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find()
    .select("-password")
    .populate("notes", "-user")
    .lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  // Data Validation
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd, roles };

  // Creating new user
  const user = await User.create(userObject);
  if (!user) {
    res.status(400).json({ message: "Invalid user data received" });
  }
  res.status(201).json({ message: `New user ${username} created` });
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, activeStatus, password } = req.body;

  // Data Validation
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof activeStatus !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exists to update?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Allow updates to the user
  user.username = username;
  user.roles = roles;
  user.activeStatus = activeStatus;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();

  res.status(202).json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Data Validation
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exists?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const username = user.username;

  // Does the user still have assigned notes?
  if (user.notes.length > 0) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  await user.deleteOne();
  res.status(202).json(`${username} was deleted successfully`);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
