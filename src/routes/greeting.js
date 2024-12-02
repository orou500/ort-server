const express = require('express');
const redis = require('../services/redisClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const greeting = await redis.get('greeting');
    const data = { greeting: greeting || 'Default greeting' };
    res.json(data);
  } catch (error) {
    console.error('Error retrieving greeting from Redis:', error);
    res.status(500).send('Error connecting to Redis');
  }
});

module.exports = router;
