const allowedOrigins = require("./allowedOrigins");

/*
This code sets up CORS configuration options for the backend server, 
which ensures that requests are only allowed from specified origins and credentials are properly handled.
*/
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
