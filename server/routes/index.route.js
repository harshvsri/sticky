var express = require("express");
var router = express.Router();

/*
This code defines a router that handles HTTP requests for the root route ("/")
using the get, post methods.
*/

router
  .route("/")
  .get((req, res) => {
    res.render("index", { title: "Tech Notes" });
  })
  .post((req, res) => {
    const { username, password } = req.body;
    // Handle Login and Register
  });
module.exports = router;
