const express = require("express");
const router = express.Router();
const notesController = require("../controllers/noteControllers");

/*
This code defines a router that handles HTTP requests for the root route ("/")
using the get, post, patch, and delete methods. 
Each method is associated with a callback function in the noteControllers module, 
which determines the behavior of the application when the respective HTTP method is used.
*/
router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;
