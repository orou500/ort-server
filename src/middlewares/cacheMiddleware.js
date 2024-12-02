const redis = require('../services/redisClient');

// middleware עבור cache
const cacheMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      const cachedData = await redis.get(key); // קבלת הנתונים מה-cache
      if (cachedData) {
        return res.json(JSON.parse(cachedData)); // אם יש ב-cache, שלח את הנתונים מיידית
      }
      next(); // אם אין ב-cache, המשך לשלוף את הנתונים
    } catch (err) {
      console.error('Cache middleware error:', err);
      next(); // במקרה של שגיאה, המשך לעיבוד
    }
  };
};

module.exports = { cacheMiddleware };
