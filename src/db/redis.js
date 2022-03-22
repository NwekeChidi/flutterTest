const { createClient } = require('redis');

let REDIS_URI = process.env.REDIS_URI;

// if ( process.env.NODE_ENV === "production"){
//     REDIS_URI = process.env.REDIS_URI
// }

console.log(REDIS_URI);
console.log(process.env.NODE_ENV)
const redisClient = createClient(REDIS_URI)
redisClient.connect().catch(console.error)

module.exports = redisClient;