const express = require("express");
const router = express.Router();
const path = require("path");

/* 
(^/$) matches the root URL path, which is the URL path with no additional segments beyond the domain name (e.g. https://example.com/).
/index(.html)? matches /index, /index.html, and /index.html.html, allowing for some flexibility in the filename and extension.
The file that is sent is the index.html file located in the views directory relative to the current file.
The path.join() method is used to construct the file path in a platform-independent way
by joining the directory and file names with the appropriate path separator for the current operating system.
*/

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
