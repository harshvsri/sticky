const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

/*
This code defines a router that handles HTTP requests for the root route ("/users")
using the get, post, patch, and delete methods. 
Each method is associated with a callback function in the userControllers module, 
which determines the behavior of the application when the respective HTTP method is used. 
*/
router
  .route("/")
  .get(users.getAllUsers)
  .post(users.createNewUser)
  .patch(users.updateUser)
  .delete(users.deleteUser);

module.exports = router;
