const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

/* What are logs?
Logs refer to the record of events that are created when the server receives requests. 
These logs can help developers troubleshoot problems and understand how the server is performing. 
The logEvents function is responsible for writing the logs to files in a directory called logs. 
The logger function is a middleware function that uses the logEvents function to create logs for each request received by the server.
*/

/* logEvents
Creates a log item using the message, timestamp, and a UUID (a unique identifier)
and then appends it to a log file specified by the logFileName parameter.
*/
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

/* logger
The logger function is a middleware function that logs information about incoming HTTP requests
using the logEvents function.
*/
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
