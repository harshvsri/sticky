const express = require("express");
const router = express.Router();
const notes = require("../controllers/note.controller");

/* This code defines a router that handles HTTP requests for the root route ("/notes")
using the get, post, patch, and delete methods.
Each method is associated with a callback function in the noteControllers module, 
which determines the behavior of the application when the respective HTTP method is used. */
router
  .route("/")
  .get(notes.getAllNotes)
  .post(notes.createNewNote)
  .patch(notes.updateNote)
  .delete(notes.deleteNote);

module.exports = router;
