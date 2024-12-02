const express = require('express');
const Redis = require('ioredis');
const cors = require('cors'); // ייבוא ספריית cors
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// חיבור ל-Redis
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost', // Redis host
  port: process.env.REDIS_PORT || 6379, // Redis port
});

app.use(cors());
// Middleware
app.use(bodyParser.json());


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

// Endpoint להחזרת count
app.get('/count', async (req, res) => {
  try {
    const count = await redis.get('count');
    res.json({ count: count ? parseInt(count, 10) : 0 }); // אם המפתח לא קיים, מחזיר 0
  } catch (err) {
    console.error('Failed to retrieve count:', err);
    res.status(500).json({ error: 'Failed to retrieve count' });
  }
});

// Endpoint לעדכון count
app.post('/count', async (req, res) => {
  const { count } = req.body;
  if (typeof count !== 'number') {
    return res.status(400).json({ error: 'Count must be a number' });
  }

  try {
    await redis.set('count', count); // שמירה ב-Redis
    res.json({ success: true, count });
  } catch (err) {
    console.error('Error updating count:', err);
    res.status(500).json({ error: 'Failed to update count' });
  }
});

// חיבור לשרת
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
