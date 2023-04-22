/*
Handles requests from a frontend web application. 
The server will only allow requests from the specified origins to prevent unauthorized access from other domains.
*/

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.dandrepairshop.com",
  "https://dandrepairshop.com",
];

module.exports = allowedOrigins;
