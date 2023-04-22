const { logEvents } = require("./logger");

/*
This middleware is typically used to catch any errors that occur during the handling of a request, 
and then respond with an appropriate error message or HTML page.
*/

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // Server error

  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
