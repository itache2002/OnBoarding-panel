// routes/apiKeys.js
const express            = require('express');
const db                 = require('../Services/db');
const { generateRawKey, hashKey } = require('../lib/apikey')
const router             = express.Router();

// POST /api/v1/keys
router.post('/', async (req, res, next) => {
  try {
    const { userId, label, expiresAt } = req.body;
    const raw  = generateRawKey();
    const hash = await hashKey(raw);

    await db.query(
      `INSERT INTO api_keys (user_id, api_key_hash, label, expires_at)
       VALUES ($1,$2,$3,$4)`,
      [userId, hash, label, expiresAt]
    );
    res.status(201).json({ apiKey: raw });    // show ONCE
  } catch (e) { next(e); }
});

module.exports = router;
