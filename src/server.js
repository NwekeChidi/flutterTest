require('dotenv').config();
const http  = require('http');
const app   = require('./app');
const db    = require('./db/connectDB');

// Connecting to the database
let DB = process.env.DB_LOCAL;
if (process.env.NODE_ENV === 'production') {
  DB = process.env.DB_CLOUD;
}
db.connect(DB);


// Instantiate the HTTP server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Start the HTTP server
server.listen(port, function () {
  console.log(`Application running on port ${port}`);
});
