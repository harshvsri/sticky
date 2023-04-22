require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);

/* cors
Cross-Origin Resource Sharing, which is a mechanism that allows resources 
(such as fonts, AJAX requests or APIs) on a web page to be requested from another domain outside the domain
from which the first resource was served.
*/
app.use(cors(corsOptions));

/* express.json()
Without the express.json() middleware function, the incoming request data would be available in (req.body)
as a raw string, and it would need to be manually parsed into a JavaScript object
before it can be used in the application.

In summary, it is middleware used to parse incoming JSON data in the request body
*/
app.use(express.json());

/* What is a cookie?
Cookies are small pieces of data that are stored on the client side, 
and can be used to store information such as user preferences, session IDs, or authentication tokens.
*/
app.use(cookieParser());

// We are telling express where to find static files, like CSS or other resources.
app.use("/", express.static(path.join(__dirname, "public")));

// When an HTTP request is made to the root URL path, the function defined in root.js will be executed.
app.use("/", require("./routes/root"));

// When an HTTP request is made to the /users URL path, the function defined in userRoutes.js will be executed.
app.use("/users", require("./routes/userRoutes"));

// When an HTTP request is made to the /notes URL path, the function defined in noteRoutes.js will be executed.
app.use("/notes", require("./routes/noteRoutes"));
/*
This middleware function handles any request made to any URL path that the server does not have a route defined for,
and responds with an appropriate HTTP status code and content type depending on what the client can accept. 
*/
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      message: "404 Not Found",
    });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

/*
This is an event listener that listens for the "open" event. 
Once the connection is established successfully, the callback function is executed, 
which logs a message "Connected to MongoDB" to the console and starts the server using the app.listen() method.
*/
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
});

/*
This is another event listener that listens for the "error" event. 
If any error occurs during the connection process, the callback function is executed, 
which logs the error to the console and writes the error details to a log file using the logEvents() function.
*/
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
