let REDIS_URI = process.env.REDIS_LOCAL;

if ( process.env.NODE_ENV === "production "){
    REDIS_URI = process.env.REDIS_URI
}

const { createClient } = require('redis')
const redisClient = createClient(REDIS_URI)
redisClient.connect().catch(console.error)

module.exports = redisClient