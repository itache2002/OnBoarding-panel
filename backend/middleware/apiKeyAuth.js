// middleware/apiKeyAuth.js
const db          = require('../Services/db');
const { verifyKey } = require('../lib/apikey');

module.exports = async (req, res, next) => {
  try {
    const presented =
      req.header('x-api-key') || req.query.api_key || req.body?.api_key;
    if (!presented) return res.status(401).json({ error: 'API key missing' });

    const { rows } = await db.query(
      `SELECT id, user_id, api_key_hash, expires_at
         FROM api_keys
        WHERE active = TRUE`
    );

    for (const row of rows) {
      if (row.expires_at && new Date(row.expires_at) < new Date()) continue;
      if (await verifyKey(presented, row.api_key_hash)) {
        req.apiKeyId = row.id;
        req.userId   = row.user_id;
        return next();                                  // ✅ authorised
      }
    }
    res.status(401).json({ error: 'Invalid API key' });
  } catch (err) {
    next(err);
  }
};
