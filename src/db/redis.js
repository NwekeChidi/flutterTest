const redis = require('redis');
const util  = require('util');
require('dotenv').config();

// get the port || uri
let REDIS_URL = process.env.REDIS_LOCAL;
if (process.env.NODE_ENV === "production") {
    REDIS_URL = process.env.REDIS_URL
}

// connect
const client = redis.createClient(REDIS_URL);

// promisify redis get and set
client.get = util.promisify(client.get);
client.set = util.promisify(client.set);

// set data to cache

module.exports = client;