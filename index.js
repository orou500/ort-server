const express = require('express');
const Redis = require('ioredis');

const app = express();
const PORT = 3000;

// יצירת חיבור ל-Redis (ברירת המחדל מחברת ל-localhost:6379)
const redis = new Redis();

// דוגמה לאחסון מפתח וערך ב-Redis
redis.set('Hello', 'Hello from OrMoshe - Redis!');

// קריאת הנתונים מ-Redis
app.get('/', async (req, res) => {
  try {
    // שליפת ערך מ-Redis
    const greeting = await redis.get('Hello');
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
