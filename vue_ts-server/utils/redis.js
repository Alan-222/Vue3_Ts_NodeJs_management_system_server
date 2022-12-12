const redis = require('redis');
const config = require('../config/index');
const client = redis.createClient(config.post, config.url);

client.on('error', function (err) {
  console.log('Error ' + err);
});

client.on('connect', () => {
  console.log('redis connect success');
});

client.auth(config.password);

const redisConnect = {};
redisConnect.setKey = (key, value, expire) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, replay) => {
      if (err) {
        reject(err);
      }
      if (!isNaN(expire) && expire > 0) {
        client.expire(key, parseInt(expire));
      }
      resolve(replay);
    });
  });
};

redisConnect.getKey = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, replay) => {
      if (err) {
        reject(err);
      } else {
        resolve(replay);
      }
    });
  });
};

module.exports = redisConnect;
