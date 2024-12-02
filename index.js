const express = require('express');
const Redis = require('ioredis');

const app = express();
const PORT = 3000;

// חיבור ל-Redis, לאור משתני הסביבה שציינו ב-docker-compose
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // Redis host, ברירת מחדל localhost
  port: process.env.REDIS_PORT || 6379, // Redis port, ברירת מחדל 6379
});

// דוגמה לאחסון מפתח וערך ב-Redis
redis.set('greeting', 'Hello from Redis!');

// קריאת הנתונים מ-Redis
app.get('/', async (req, res) => {
  try {
    // שליפת ערך מ-Redis
    const greeting = await redis.get('greeting');
    res.send(greeting || 'Default greeting');
  } catch (error) {
    console.error('Error retrieving greeting from Redis:', error);
    res.status(500).send('Error connecting to Redis');
  }
});

// חיבור לשרת
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
