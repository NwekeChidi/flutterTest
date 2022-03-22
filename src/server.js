require('dotenv').config();
require('./db/redis');
const http  = require('http');
const app   = require('./app');


// Instantiate the HTTP server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Start the HTTP server
server.listen(port, function () {
  console.log(`Application running on port ${port}`);
});
