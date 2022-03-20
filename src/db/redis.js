// require('dotenv').config();
// const util  = require('util');
// const redis = require('redis');

// // Creating Redis client
// let REDIS_URL = process.env.REDIS_LOCAL;
// if (process.env.NODE_ENV === "production") {
//     REDIS_URL = process.env.REDIS_URL
// }

// const client = redis.createClient();
// client.on('connect', () => {
//     console.log("Client is connected")
// })

// client.get = util.promisify(client.get);
// client.setEx = util.promisify(client.setEx);

const { createClient } = require('redis')
const redisClient = createClient()
redisClient.connect().catch(console.error)

module.exports = redisClient