const express = require('express');
const Redis = require('ioredis');
const cors = require('cors'); // ייבוא ספריית cors

const app = express();
const PORT = 3000;

// חיבור ל-Redis
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // Redis host
  port: process.env.REDIS_PORT || 6379, // Redis port
});

app.use(cors());

// קריאת הנתונים מ-Redis
app.get('/greeting', async (req, res) => {
  try {
    // שליפת הערך 'greeting' מ-Redis
    const greeting = await redis.get('greeting');
    if (greeting) {
      res.json({ greeting });
    } else {
      res.json({ greeting: 'Default greeting' });
    }
  } catch (error) {
    console.error('Error retrieving greeting from Redis:', error);
    res.status(500).send('Error connecting to Redis');
  }
});

// חיבור לשרת
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
