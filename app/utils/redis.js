import { createClient } from 'redis';

const Redis = createClient({
  url: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

(async () => {
  await Redis.connect();
})();

Redis.on('connect', () => console.log('Redis is connected')).on('error', err =>
  console.log(err)
);

export async function setRedis(key, data) {
  if (typeof data === 'object') data = JSON.stringify(data);
  if (typeof key === 'object') key = key.toString();
  return await Redis.set(key, data);
}

export async function setRedisEx(key, data, timer) {
  if (typeof data === 'object') data = JSON.stringify(data);
  if (typeof key === 'object') key = key.toString();
  return await Redis.setEx(key, timer, data);
}

export async function getRedis(key, parse = false) {
  try {
    if (!key) throw new Error('Cache key not found');
    const data = await Redis.get(key);
    return parse ? JSON.parse(data) : data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function delRedis(key) {
  try {
    if (!key) return false;
    return await Redis.del(key);
  } catch (error) {
    throw new Error(error);
  }
}

export default Redis;

