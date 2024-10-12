const redis = require('redis'); /* Import the redis client */

class RedisClient {
  constructor () {
    /* connect to redis */
    this.client = redis.createClient();

    /* Handles errors */
    this.client.on('error', (err) => {
      console.error(`Redis client error: ${err}`); /* This logs any Redis connection errors */
    });
  }

  // isAlive function to check if Redis connection is active
  isAlive () {
    // if client is connected, return true else return false
    return this.client.connected;
  }

  // to retrieve a value from redis
  async get (key) {
    // redis inside a promise
    return new Promise((resolve, reject) => {
      // get method of redis client to retrieve the value
      this.client.get(key, (err, value) => {
        if (err) {
          // reject promise if error
          reject(err);
        } else {
          // resolve if true
          resolve(value);
        }
      });
    });
  }

  // function to interact with Redis server asynchronously
  async set (key, value, duration) {
    // redis setex(expiration)
    return new Promise((resolve, reject) => {
      // using setex to sstore key-value pair, after which they will expire
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          // if error, reject Promise
          reject(err);
        } else {
          // if successful, resolve promise
          resolve(true);
        }
      });
    });
  }

  // function to remove key-value pair asynchronously
  async del (key) {
    // wrapping the redis function inside a promise
    return new Promise((resolve, reject) => {
      // to delete key-value pair
      this.client.del(key, (err) => {
        if (err) {
          // reject if error occurs
          reject(err);
        } else {
          // resolve if successful
          resolve(true);
        }
      });
    });
  }
}

// Creating an instance of RedisClient
const redisClient = new RedisClient();

module.exports = redisClient; /* Exports the instance so it can be used in other parts of the application */
