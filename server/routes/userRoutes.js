const expres = require("express");
const router = expres.Router();
const userController = require("../controllers/userControllers");

/*
This code defines a router that handles HTTP requests for the root route ("/")
using the get, post, patch, and delete methods. 
Each method is associated with a callback function in the userControllers module, 
which determines the behavior of the application when the respective HTTP method is used. 
*/
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
