const { createClient } = require('redis');

let REDIS_URI = process.env.REDIS_URI;

// if ( process.env.NODE_ENV === "production"){
//     REDIS_URI = process.env.REDIS_URI
// }
const redisClient = createClient({url: REDIS_URI});
redisClient.connect().catch(console.error)

module.exports = redisClient;