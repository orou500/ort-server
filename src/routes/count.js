const express = require('express');
const redis = require('../services/redisClient');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware');

const router = express.Router();

// קבלת ה-Count עם Cache
router.get('/', cacheMiddleware('count'), async (req, res) => {
  try {
    // בדיקה אם יש ב-Redis את המפתח 'count'
    const count = await redis.get('count');
    const parsedCount = count ? parseInt(count, 10) : 0; // אם לא נמצא, הגדר 0
    res.json({count: parsedCount}); // שליחה ל-Frontend
  } catch (err) {
    console.error('Failed to retrieve count:', err);
    res.status(500).json({ error: 'Failed to retrieve count' });
  }
});

// עדכון ה-Count ב-Redis
router.post('/', async (req, res) => {
  const { count } = req.body;
  if (typeof count !== 'number') {
    return res.status(400).json({ error: 'Count must be a number' });
  }

  try {
    // שמירה ל-Redis
    await redis.set('count', count, 'EX', 60);
    res.json({ success: true, count });
  } catch (err) {
    console.error('Error updating count:', err);
    res.status(500).json({ error: 'Failed to update count' });
  }
});

module.exports = router;
