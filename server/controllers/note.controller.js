const Note = require("../models/Note.model");
const User = require("../models/User.model");

/* asyncHandler is a middleware for handling exceptions inside asynchronous route handlers.
It catches any errors that occur while executing the route handler function 
and passes them to the next middleware function.
This way, we don't need to include try/catch blocks in each route handler. */
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
  // Get all notes from database and populate their username field
  const notes = await Note.find().populate("user", "username").lean();

  // If no notes are present
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.status(200).json(notes);
});

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // Data Validation
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Create and store the new user
  const note = await Note.create({ user, title, text });
  if (!note) {
    // If note was not created
    return res.status(400).json({ message: "Invalid note data received" });
  }

  // Append this note to the userNotes[];
  const userInfo = await User.findById(user);
  userInfo.notes.push(note._id);
  await userInfo.save();

  return res.status(201).json({ message: "Note was created successfully" });
});

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Data Validation
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm note exists to update
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Allow updating of the note
  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();
  res.status(202).json(`${updatedNote.title} updated`);
});

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Data Validation
  if (!id) {
    return res.status(400).json({ message: "Note ID required" });
  }

  // Confirm note exists to delete
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }
  const noteTitle = note.title;

  // Remove the note form user notes[]
  const user = await User.findById(note.user);
  user.notes.pull(id);
  await user.save();

  // Now we can delete the note
  await note.deleteOne();
  res.status(202).json(`${noteTitle} was deleted successfully`);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
